package user

import (
	"net/http"

	"github.com/golang-jwt/jwt/v5"
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

	err = db.QueryRow(`
		INSERT INTO instructor."User" (id, name, email, password, role)
		VALUES ($1, $2, $3, $4, 'USER')
		RETURNING id, name, email, role
	`, uuid.New(), input.Name, input.Email, hash).
		Scan(&user.ID, &user.Name, &user.Email, &user.Role)
	if err != nil {
		return err
	}

	token := util.GenerateJWT(user)
	tokenString, err := util.TokenToString(token)
	if err != nil {
		return err
	}

	claims := token.Claims.(jwt.MapClaims)
	return c.JSON(http.StatusCreated, model.UserResponse{
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
