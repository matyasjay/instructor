package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"os"

	"http/internal/handler"
)

func main() {
	e := echo.New()

	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3001"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	}))

	handler.RegisterRoutes(e)

	var http_port = os.Getenv("HTTP_PORT")

	if http_port == "" {
		http_port = "3333"
	}

	e.Logger.Fatal(e.Start(":" + http_port))
}
