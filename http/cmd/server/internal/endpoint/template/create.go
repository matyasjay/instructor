package template

import (
	"database/sql"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/cmd/server/internal"
	"http/pkg/model"
	"http/pkg/util"
)

func Create(c echo.Context) error {
	var unsafeInput model.PostTemplateInput
	safeInput, err := util.AssertInput(c, unsafeInput)
	if err != nil {
		return err
	}

	var template model.Template
	var service model.Service

	err = internal.WithTxDefault(func(tx *sql.Tx) error {
		err = tx.QueryRow(`
			INSERT INTO instructor."Template" (id, name, description, template, "createdAt", "updatedAt")
			VALUES ($1, $2, $3, $4, NOW(), NOW())
			RETURNING id, name, description, template, "createdAt", "updatedAt"
		`, uuid.New(), safeInput.Name, safeInput.Description, safeInput.Template).
			Scan(&template.ID, &template.Name, &template.Description, &template.Template, &template.CreatedAt, &template.UpdatedAt)
		if err != nil {
			return err
		}

		err = tx.QueryRow(`
			INSERT INTO instructor."TemplatesOnServices" ("serviceId", "templateId")
			VALUES ($1, $2)
			RETURNING "serviceId", "templateId"
		`, &safeInput.ServiceID, &template.ID).
			Scan(&service.ID, &template.ID)
		if err != nil {
			return err
		}
		return nil
	})

	return c.JSON(http.StatusCreated, model.TemplateResponse{
		WithError: model.WithError{
			Error: err,
		},
		ServiceID:  service.ID,
		TemplateID: template.ID,
	})
}
