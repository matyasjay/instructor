package handler

import (
	echo "github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
	"http/internal/handler/endpoint"
)

func RegisterRoutes(e *echo.Echo) {
	e.File("/", "static/swagger/index.html")
	e.Static("/", "static/swagger")
	e.OPTIONS("/*", endpoint.GetOptions)
	e.GET("/templates", endpoint.GetTemplates)
	e.GET("/users", endpoint.GetUsers)
}
