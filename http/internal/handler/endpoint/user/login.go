package user

import (
	"net/http"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/internal/handler/connection"
	"http/internal/handler/models"
	"http/internal/utils"
)

type LoginUserResponse struct {
	User  models.User
	Token string
}

type LoginUserInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func LoginUser(c echo.Context) error {
	db := connection.GetDB()

	var input LoginUserInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	email := input.Email
	password := input.Password

	var user models.User
	var passwordHash string

	row := db.QueryRow(`
			SELECT id, name, email, password
			FROM instructor."User"
			WHERE email=$1`,
		email)

	err := row.Scan(&user.ID, &user.Name, &user.Email, &passwordHash)

	if err != nil {
		return err
	}

	if err != nil || !utils.CheckPasswordHash(password, passwordHash) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
	}

	token, _ := utils.GenerateJWT(user.ID)
	return c.JSON(http.StatusOK, LoginUserResponse{
		User:  user,
		Token: token,
	})
}

type GetUserByIdInput struct {
	ID string `json:"id"`
}

func GetUserById(c echo.Context) error {
	db := connection.GetDB()

	var input GetUserByIdInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	id := input.ID

	var user models.User

	row := db.QueryRow(`
			SELECT id, name, email
			FROM instructor."User"
			WHERE id=$1`,
		id)

	err := row.Scan(&user.ID, &user.Name, &user.Email)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, user)
}
