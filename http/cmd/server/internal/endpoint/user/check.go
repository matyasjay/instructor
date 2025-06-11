package user

import (
	"http/pkg/model"
	"http/pkg/util"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func Check(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	token, err := util.TokenToString(user)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Failed to generate token!")
	}

	return c.JSON(http.StatusOK, model.CheckUserResponse{
		UserID: claims["user_id"].(string),
		Expire: int(claims["exp"].(float64)),
		Token:  token,
	})
}
