package server

import (
	"fmt"
	"http/cmd/server/internal"
	"http/cmd/server/internal/endpoint/service"
	"http/cmd/server/internal/endpoint/template"
	"http/cmd/server/internal/endpoint/user"
	"net/http"
	"os"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

func RegisterRoutes(e *echo.Echo) {

	internal.HandleHTTPError(e)

	_, err := internal.InitDB()
	if err != nil {
		fmt.Println("Failed to setup database connection!")
	}

	e.OPTIONS("/*", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})

	e.File("/", "static/swagger/index.html")
	e.Static("/", "static/swagger")

	e.POST("/user/login", user.Login)
	e.POST("/user/create", user.Create)

	auth := e.Group("/auth")
	var jwtSecret = os.Getenv("JWT_SECRET")
	jwtConfig := echojwt.Config{
		SigningKey: []byte(jwtSecret),
	}
	auth.Use(echojwt.WithConfig(jwtConfig))

	auth.GET("/user/check", user.Check)
	auth.POST("/user/get", user.Get)
	auth.POST("/service/create", service.Create)
	auth.POST("/service/get", service.Get)
	auth.POST("/template/get", template.Get)
	auth.POST("/template/create", template.Create)
}
