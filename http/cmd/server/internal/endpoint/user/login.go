package user

import (
	"database/sql"
	"http/cmd/server/internal"
	"http/pkg/model"
	"http/pkg/util"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"
)

func Login(c echo.Context) error {
	var user model.User
	var token *jwt.Token
	var tokenString string

	var unsafeInput model.PostUserInput
	safeInput, err := util.AssertInput(c, unsafeInput)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid input format!")
	}

	err = internal.WithTxDefault(func(tx *sql.Tx) error {
		var passwordHash string
		row := tx.QueryRow(`
			SELECT id, name, email, password, role, "createdAt"
			FROM instructor."User"
			WHERE email=$1
		`, safeInput.Email)
		err := row.Scan(&user.ID, &user.Name, &user.Email, &passwordHash, &user.Role, &user.CreatedAt)
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "Unable to find user!")
		}
		if err := util.CheckPasswordHash(safeInput.Password, passwordHash); !err {
			return echo.NewHTTPError(http.StatusUnauthorized, "Invalid credentials!")
		}
		token = util.GenerateJWT(user)
		return nil
	})

	if err != nil {
		return c.JSON(http.StatusUnauthorized, model.UserResponse{
			User: model.UserDetails{
				ID:        user.ID,
				Email:     user.Email,
				Name:      user.Name,
				Role:      user.Role,
				CreatedAt: user.CreatedAt,
			},
			Token: tokenString,
			Expire: -1,
			WithError: model.WithError{
				Error: err,
			},
		})
	}

	tokenString, err = util.TokenToString(token)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate token!")
	}

	claims := token.Claims.(jwt.MapClaims)
	return c.JSON(http.StatusOK, model.UserResponse{
		User: model.UserDetails{
			ID:        user.ID,
			Email:     user.Email,
			Name:      user.Name,
			Role:      user.Role,
			CreatedAt: user.CreatedAt,
		},
		Token:  tokenString,
		Expire: int(claims["expire"].(int64)),
	})
}
