package user

import (
	"http/pkg/shared"
	"net/http"
	"http/cmd/server/connection"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"
)


func Get(c echo.Context) error {
	db := connection.GetDB()

	var input shared.UserInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	id := input.UserID

	var user shared.User

	row := db.QueryRow(`
		SELECT id, name, email
		FROM instructor."User"
		WHERE id=$1
	`, id)

	err := row.Scan(&user.ID, &user.Name, &user.Email)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, user)
}
