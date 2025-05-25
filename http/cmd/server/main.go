package main

import (
	"fmt"
	"io"
	"net/http"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
			return c.String(http.StatusOK, "ok")
	})

	e.GET("/manifest", func(c echo.Context) error {
			return c.String(http.StatusOK, "ok")
	})

	e.Logger.Fatal(e.Start(":3333"))
}
