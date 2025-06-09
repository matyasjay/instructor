package user

import (
	"net/http"
	"http/cmd/server/connection"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/pkg/shared"
)


func Create(c echo.Context) error {

	db := connection.GetDB()

	var input shared.UserInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	hash, err := shared.HashPassword(input.Password)
	if err != nil {
		return err
	}

	var user shared.User

	rowErr := db.QueryRow(`
		INSERT INTO instructor."User" (id, name, email, password)
		VALUES ($1, $2, $3, $4)
		RETURNING id, email, password`,
		uuid.New(), input.Name, input.Email, hash).Scan(&user.ID, &user.Email, &user.PasswordHash)

	if rowErr != nil {
		return rowErr
	}

	token, _ := shared.GenerateJWT(user.ID)
	return c.JSON(http.StatusCreated, shared.UserResponse{
		User:  user,
		Token: token,
	})
}
