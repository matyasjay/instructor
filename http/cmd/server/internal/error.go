package internal


import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

func HandleHTTPError(e *echo.Echo) {
	e.HTTPErrorHandler = func(err error, c echo.Context) {
		code := http.StatusInternalServerError
		msg := err.Error()

		if he, ok := err.(*echo.HTTPError); ok {
			code = he.Code
			msg = fmt.Sprintf("%v", he.Message)
		}

		if jsonErr := c.JSON(code, map[string]string{
			"error": msg,
		}); jsonErr != nil {
			c.Logger().Errorf("failed to send JSON error response: %v", jsonErr)
		}
	}
}
