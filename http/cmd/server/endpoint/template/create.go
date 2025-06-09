package template

import (
	"database/sql"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/cmd/server/connection"
	"http/pkg/shared"
)

func Create(c echo.Context) error {
	var unsafeInput shared.TemplateInput
	safeInput, err := shared.AssertInput(c, unsafeInput)
	if err != nil {
		return err
	}

	var template shared.Template

	err = connection.WithTxDefault(func(tx *sql.Tx) error {
		err = tx.QueryRow(`
			INSERT INTO instructor."Template" (id, name, description, template, "createdAt", "updatedAt")
			VALUES ($1, $2, $3, $4, NOW(), NOW())
			RETURNING id, name, description, template, "createdAt", "updatedAt"
		`, uuid.New(), safeInput.Name, safeInput.Description, safeInput.Template).
			Scan(&template.ID, &template.Name, &template.Description, &template.Template, &template.CreatedAt, &template.UpdatedAt)
		if err != nil {
			return err
		}
		return nil
	})

	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, template)
}
