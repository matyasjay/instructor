package template

import (
	"database/sql"
	"http/cmd/server/internal"
	"http/pkg/model"
	"net/http"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"
)

func Get(c echo.Context) error {
	var templates []model.Template

	err := internal.WithTxDefault(func(tx *sql.Tx) error {
		rows, err := tx.Query(`
			SELECT
				"PromptTemplate".id
				"PromptTemplate".name
				"PromptTemplate".description
				"PromptTemplate".template"
				"PromptTemplate"."createAt"
				"PromptTemplate"."updatedAt"
			FROM instructor."PromptInput"
		`)
		if err != nil {
			return err
		}

		for rows.Next() {
			var template model.Template
			if err := rows.Scan(&template.ID,
				&template.Name,
				&template.Description,
				&template.Template,
			); err != nil {
				return err
			}
			templates = append(templates, template)
		}

		if err := rows.Close(); err != nil {
			return err
		}

		return rows.Err()
	})

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, templates)
}
