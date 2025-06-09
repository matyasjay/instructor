package user

import (
	"http/pkg/shared"
	"net/http"
	"http/cmd/server/connection"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"
)

func Login(c echo.Context) error {
	db := connection.GetDB()

	var input shared.UserInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	email := input.Email
	password := input.Password

	var user shared.User
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

	if err != nil || !shared.CheckPasswordHash(password, passwordHash) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials")
	}

	token, _ := shared.GenerateJWT(user.ID)
	return c.JSON(http.StatusOK, shared.UserResponse{
		User:  user,
		Token: token,
	})
}
