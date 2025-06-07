package service

import (
	"net/http"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/internal/handler/connection"
	"http/internal/handler/models"
)

type GetAllServicesInput struct {
	ID string `json:"id"`
}

func GetAllServices(c echo.Context) error {

	db := connection.GetDB()

	var input GetAllServicesInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	id := input.ID

	rows, err := db.Query(`
		SELECT s.id, s.name, s.description, s.private
		FROM instructor."Service" s
		JOIN instructor."ServicesOnUsers" su ON s.id = su."serviceId"
		WHERE su."userId" != $1
		AND s."private" != true
		`, id)

	if err != nil {
		return err
	}

	var services []models.Service

	for rows.Next() {
		var service models.Service
		if err := rows.Scan(&service.ID, &service.Name, &service.Description, &service.Private); err != nil {
			return err
		}
		services = append(services, service)
	}

	return c.JSON(http.StatusOK, services)
}

