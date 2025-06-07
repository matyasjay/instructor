package template

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"

	_ "github.com/lib/pq"

	"http/internal/handler/connection"
	"http/internal/handler/models"
)

func GetTemplates(c echo.Context) error {
	db := connection.GetDB()

	rows, err := db.Query(`
				SELECT
					"PromptTemplate"."id"
					"PromptTemplate"."name"
					"PromptTemplate".description
					"PromptTemplate"."template"
				FROM instructor."PromptInput"
		`)

	if err != nil {
		fmt.Println("Error query rows:", err)
		return err
	}

	var templates []models.PromptTemplate

	for rows.Next() {
		var template models.PromptTemplate
		if err := rows.Scan(&template.ID,
			&template.Name,
			&template.Description,
			&template.Template,
		); err != nil {
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
