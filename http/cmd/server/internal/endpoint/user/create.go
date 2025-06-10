package user

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/cmd/server/internal"
	"http/pkg/model"
	"http/pkg/util"
)


func Create(c echo.Context) error {

	db := internal.GetDB()

	var input model.PostUserInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	hash, err := util.HashPassword(input.Password)
	if err != nil {
		return err
	}

	var user model.User

	rowErr := db.QueryRow(`
		INSERT INTO instructor."User" (id, name, email, password)
		VALUES ($1, $2, $3, $4)
		RETURNING id, email
	`, uuid.New(), input.Name, input.Email, hash).
		Scan(&user.ID, &user.Email)

	if rowErr != nil {
		return rowErr
	}

	token, _ := util.GenerateJWT(user.ID)
	return c.JSON(http.StatusCreated, model.UserResponse{
		User:  user,
		Token: token,
	})
}
