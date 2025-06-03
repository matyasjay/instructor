package endpoint

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/internal/handler/connection"
	"http/internal/utils"
)

type Response struct {
	User  User
	Token string
}

type User struct {
	ID           string
	Name         string
	Password     string
	Email        string
	PasswordHash string
}

type CreateUserInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

func CreateUser(c echo.Context) error {

	db := connection.GetDB()

	var input CreateUserInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	hash, err := utils.HashPassword(input.Password)
	if err != nil {
		return err
	}

	var user User

	rowErr := db.QueryRow(`
		INSERT INTO instructor."User" (id, name, email, password)
		VALUES ($1, $2, $3, $4)
		RETURNING id, email, password`,
		uuid.New(), input.Name, input.Email, hash).Scan(&user.ID, &user.Email, &user.PasswordHash)

	if rowErr != nil {
		return rowErr
	}

	token, _ := utils.GenerateJWT(user.ID)
	return c.JSON(http.StatusCreated, echo.Map{"token": token})
}

type GetUserByEmailInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func GetUserByEmail(c echo.Context) error {
	db := connection.GetDB()

	var input GetUserByEmailInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	email := input.Email
	password := input.Password

	var user User

	row := db.QueryRow(`
			SELECT id, name, email, password
			FROM instructor."User"
			WHERE email=$1`,
		email)

	err := row.Scan(&user.ID, &user.Name, &user.Email, &user.PasswordHash)

	if err != nil {
		return err
	}

	if err != nil || !utils.CheckPasswordHash(password, user.PasswordHash) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
	}

	token, _ := utils.GenerateJWT(user.ID)
	return c.JSON(http.StatusOK, Response{
		User:  user,
		Token: token,
	})
}
