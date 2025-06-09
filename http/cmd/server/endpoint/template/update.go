package template

import (
	"database/sql"
	"http/cmd/server/connection"
	"http/pkg/shared"
	"net/http"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"
)

func Update(c echo.Context) error {
	var unsafeInput shared.TemplateInput
	safeInput, err := shared.AssertInput(c, unsafeInput)
	if err != nil{
		return err
	}

	err = connection.WithTxDefault(func(tx *sql.Tx) error {
		_, err := tx.Exec(`
			UPDATE instructor."PromptTemplate"
			SET name = $1, description = $2, template = $3, "updatedAt" = NOW()
			WHERE id = $4
		`, safeInput.Name, safeInput.Description, safeInput.Template, safeInput.ID)
		if err != nil {
			return err
		}
		return nil
	})

	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, safeInput)
}
