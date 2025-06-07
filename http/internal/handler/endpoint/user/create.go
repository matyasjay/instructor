package user

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/internal/handler/connection"
	"http/internal/handler/models"
	"http/internal/utils"
)

type CreateUserInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

type CreateUserResponse struct {
	User  models.User
	Token string
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

	var user models.User

	rowErr := db.QueryRow(`
		INSERT INTO instructor."User" (id, name, email, password)
		VALUES ($1, $2, $3, $4)
		RETURNING id, email, password`,
		uuid.New(), input.Name, input.Email, hash).Scan(&user.ID, &user.Email, &user.PasswordHash)

	if rowErr != nil {
		return rowErr
	}

	token, _ := utils.GenerateJWT(user.ID)
	return c.JSON(http.StatusCreated, CreateUserResponse{
		User:  user,
		Token: token,
	})
}
