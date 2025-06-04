package handler

import (
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"http/internal/handler/connection"
	"http/internal/handler/endpoint"
	"net/http"
	"os"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

func RegisterRoutes(e *echo.Echo) {
	connection.HandleHTTPError(e)

	_, err := connection.InitDB()
	if err != nil {
		fmt.Println("Failed to setup database connection!")
	}

	e.File("/", "static/swagger/index.html")
	e.Static("/", "static/swagger")

	e.OPTIONS("/*", endpoint.GetOptions)

	e.GET("/templates", endpoint.GetTemplates)

	e.POST("/user", endpoint.GetUserByEmail)
	e.POST("/user/create", endpoint.CreateUser)

	var secret = os.Getenv("JWT_SECRET")

	jwtConfig := echojwt.Config{
		SigningKey: []byte(secret),
	}

	r := e.Group("/private")

	r.Use(echojwt.WithConfig(jwtConfig))

	r.GET("/me", func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(jwt.MapClaims)
		return c.JSON(http.StatusOK, echo.Map{"user_id": claims["user_id"]})
	})

	r.POST("/user/current", endpoint.GetUserById)

	r.POST("/service/create", endpoint.CreateService)
	r.POST("/service/all", endpoint.GetServicesByUser)
}
