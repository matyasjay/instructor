package main

import (
	"os"
	"http/cmd/server/router"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	var http_port = os.Getenv("HTTP_PORT")

	if http_port == "" {
		http_port = "3333"
	}

	e := echo.New()

	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(
		middleware.CORSConfig{
			AllowOrigins:     []string{"http://localhost:3001"},
			AllowMethods:     []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS},
			AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization, echo.HeaderContentType},
			AllowCredentials: true,
		}))

	router.RegisterRoutes(e)

	e.Logger.Fatal(e.Start(":" + http_port))
}
