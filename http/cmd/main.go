package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"os"

	_ "github.com/lib/pq"
)

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3001"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	}))

	e.File("/", "static/swagger/index.html")
	e.Static("/", "static/swagger")

	e.OPTIONS("/*", getOptions)

	e.GET("/users", getAllUsers)
	e.POST("/users", createUser)
	e.GET("/users/:id", getUser)
	e.PUT("/users/:id", updateUser)
	e.DELETE("/users/:id", deleteUser)

	e.GET("/templates", getTemplates)
	e.POST("/templates", createUser)
	e.GET("/templates/:id", getUser)
	e.PUT("/templates/:id", updateUser)
	e.DELETE("/templates/:id", deleteUser)

	var http_port = os.Getenv("HTTP_PORT")

	if http_port == "" {
		http_port = "3333"
	}

	e.Logger.Fatal(e.Start(":" + http_port))
}
