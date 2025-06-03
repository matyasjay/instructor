package handler

import (
	"fmt"
	"http/internal/handler/connection"
	"http/internal/handler/endpoint"

	echo "github.com/labstack/echo/v4"
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

	e.POST("/users", endpoint.GetUserByEmail)

	e.POST("/users/create", endpoint.CreateUser)
}
