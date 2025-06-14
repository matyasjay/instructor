package user

import (
	"http/pkg/model"
	"http/pkg/util"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func Get(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	token, err := util.TokenToString(user)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "You have no permission to perform this action!")
	}

	return c.JSON(http.StatusOK, model.UserResponse{
		User: model.UserDetails{
			ID:        string(claims["id"].(string)),
			Email:     string(claims["email"].(string)),
			Name:      string(claims["name"].(string)),
			Role:      string(claims["role"].(string)),
			CreatedAt: string(claims["createdAt"].(string)),
		},
		Token:  token,
		Expire: int(claims["expire"].(float64)),
	})
}
