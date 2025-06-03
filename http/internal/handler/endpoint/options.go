package endpoint

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

func GetOptions(c echo.Context) error {
	return c.NoContent(http.StatusOK)
}
