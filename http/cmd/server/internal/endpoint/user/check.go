package user

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"net/http"
)

func Check(c echo.Context) error {
	user := c.Get("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	return c.JSON(http.StatusOK, echo.Map{"user_id": claims["user_id"], "exp": claims["exp"]})
}
