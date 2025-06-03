package handler

import (
	"http/internal/handler/connection"
	"http/internal/handler/endpoint"

	echo "github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

func RegisterRoutes(e *echo.Echo) {
	connection.HandleHTTPError(e)

	e.File("/", "static/swagger/index.html")

	e.Static("/", "static/swagger")

	e.OPTIONS("/*", endpoint.GetOptions)

	e.GET("/templates", endpoint.GetTemplates)

	e.GET("/users", endpoint.GetUsers)

	e.POST("/users", endpoint.GetUserByEmail)
}
