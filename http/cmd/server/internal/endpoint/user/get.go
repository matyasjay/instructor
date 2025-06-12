package user

import (
	"http/cmd/server/internal"
	"http/pkg/model"
	"net/http"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"
)

func Get(c echo.Context) error {
	db := internal.GetDB()

	var input model.PostUserInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	id := input.UserID

	var user model.User

	row := db.QueryRow(`
		SELECT id, name, email
		FROM instructor."User"
		WHERE id=$1
	`, id)

	err := row.Scan(&user.ID, &user.Name, &user.Email)

	if err != nil {
		return c.JSON(http.StatusNotFound, model.UserResponse{
			WithError: model.WithError{
				Error: err,
			},
		})
	}

	return c.JSON(http.StatusOK, user)
}
