package user

import (
	"database/sql"
	"http/cmd/server/internal"
	"http/pkg/model"
	"http/pkg/util"
	"net/http"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"
)

func Login(c echo.Context) error {
	var user model.User
	var token string

	var unsafeInput model.PostUserInput
	safeInput, err := util.AssertInput(c, unsafeInput)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid input format!")
	}

	err = internal.WithTxDefault(func(tx *sql.Tx) error {
		var passwordHash string
		row := tx.QueryRow(`
			SELECT id, name, email, password
			FROM instructor."User"
			WHERE email=$1
		`, safeInput.Email)
		err := row.Scan(&user.ID, &user.Name, &user.Email, &passwordHash)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Unable to find user!")
		}
		if err := util.CheckPasswordHash(safeInput.Password, passwordHash); !err {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials!")
		}
		token, err = util.GenerateJWT(user.ID)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate token!")
		}
		return nil
	})
	if err != nil {
		return c.JSON(http.StatusUnauthorized, model.UserResponse{
			User:  user,
			Token: token,
			WithError: model.WithError{
				Error: err,
			},
		})
	}
	return c.JSON(http.StatusOK, model.UserResponse{
		User:  user,
		Token: token,
	})
}
