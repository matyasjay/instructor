package template

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/internal/handler/connection"
)

type CreateTemplateInput struct {
	User        string `json:"user"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Template    string `json:"template"`
	Service     string `json:"service"`
	Input       string `json:"input"`
	Variable    string `json:"variable"`
}

func CreateTemplate(c echo.Context) error {
	db := connection.GetDB()

	var input CreateTemplateInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	tx, err := db.Begin()
	if err != nil {
		return err
	}

	defer func() {
		if err != nil {
			if rbErr := tx.Rollback(); rbErr != nil {
				fmt.Printf("tx rollback error: %v\n", rbErr)
			}
		}
	}()

	var templateID string
	err = tx.QueryRow(`
		INSERT INTO instructor."PromptTemplate" (name, description, template, "createdAt", "updatedAt")
		VALUES ($1, $2, $3, NOW(), NOW())
		RETURNING id
	`, input.Name, input.Description, input.Template).Scan(&templateID)
	if err != nil {
		return err
	}

	if input.Input != "" {
		_, err = tx.Exec(`
			INSERT INTO instructor."PromptInput" (templateId, input, "createdAt", "updatedAt")
			VALUES ($1, $2, NOW(), NOW())
		`, templateID, input.Input)
		if err != nil {
			return err
		}
	}

	if input.Variable != "" {
		_, err = tx.Exec(`
			INSERT INTO instructor."PromptVariable" (templateId, variable, "createdAt", "updatedAt")
			VALUES ($1, $2, NOW(), NOW())
		`, templateID, input.Variable)
		if err != nil {
			return err
		}
	}

	for _, serviceID := range input.Service {
		_, err = tx.Exec(`
			INSERT INTO instructor."TemplatesOnServices" (templateId, serviceId)
			VALUES ($1, $2)
		`, templateID, serviceID)
		if err != nil {
			return err
		}
	}

	if err := tx.Commit(); err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, map[string]string{
		"templateId": templateID,
	})
}
