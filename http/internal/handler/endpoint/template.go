package endpoint

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"

	_ "github.com/lib/pq"

	"http/internal/handler/connection"
)

type PromptTemplate struct {
	template_id          string
	template_name        string
	template_description string
	template_content     string
	input_id             string
	input_content        string
}

func GetTemplates(c echo.Context) error {
	db := connection.GetDB()

	rows, err := db.Query(`
				SELECT
					"PromptTemplate"."id"        AS "template_id",
					"PromptTemplate"."name"      AS "template_name",
					"PromptTemplate".description AS "template_description",
					"PromptTemplate"."template"  AS "template_content",
					"PromptInput".id             AS "input_id",
					"PromptInput"."input"        AS "input_content"
				FROM instructor."PromptInput"
				JOIN instructor."PromptTemplate"
				ON "PromptTemplate".id = "PromptInput"."templateId"
		`)

	if err != nil {
		fmt.Println("Error query rows:", err)
		return err
	}

	var templates []PromptTemplate

	for rows.Next() {
		var template PromptTemplate
		if err := rows.Scan(&template.template_id,
			&template.template_name,
			&template.template_description,
			&template.template_content,
			&template.input_id,
			&template.input_content); err != nil {
			fmt.Println("Error scanning row:", err)
			return err
		}
		templates = append(templates, template)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error reading rows:", err)
		return err
	}

	if err := db.Close(); err != nil {
		fmt.Println("Error closing database:", err)
		return err
	}

	return c.JSON(http.StatusOK, templates)
}
