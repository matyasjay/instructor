package service

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/internal/handler/connection"
	"http/internal/handler/models"
)

type GetServicesByUserInput struct {
	ID string `json:"id"`
}

func GetUserServices(c echo.Context) error {

	db := connection.GetDB()

	var input GetServicesByUserInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	id := input.ID

	queryBytes, err := os.ReadFile("internal/handler/queries/get-user-services-by-user-id.sql")
	if err != nil {
		return err
	}

	query := string(queryBytes)

	rows, err := db.Query(query, id)

	if err != nil {
		return err
	}

	var services []models.Service

	for rows.Next() {
		var (
			service       models.Service
			usersJSON     []byte
			templatesJSON []byte
		)

		if err := rows.Scan(
			&service.ID,
			&service.Name,
			&service.Private,
			&service.Description,
			&usersJSON,
			&templatesJSON,
			&service.CreatedAt,
			&service.UpdatedAt); err != nil {
			return err
		}

		if err := json.Unmarshal(usersJSON, &service.Users); err != nil {
			return err
		}

		// Unmarshal templates
		if err := json.Unmarshal(templatesJSON, &service.Templates); err != nil {
			return err
		}

		services = append(services, service)
	}

	return c.JSON(http.StatusOK, services)
}
