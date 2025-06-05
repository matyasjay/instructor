package endpoint

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/internal/handler/connection"
)

type Service struct {
	ID          string
	Name        string
	Description string
	Private     bool
}

type ServiceOnUser struct {
	UserID    string
	ServiceID string
}

type GetServicesByUserInput struct {
	ID string `json:"id"`
}

func GetServicesByUser(c echo.Context) error {

	db := connection.GetDB()

	var input GetServicesByUserInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	id := input.ID

	rows, err := db.Query(`
		SELECT s.id, s.name, s.description, s.private
		FROM instructor."Service" s
		JOIN instructor."ServicesOnUsers" su ON s.id = su."serviceId"
		WHERE su."userId" = $1`, id)

	if err != nil {
		return err
	}

	var services []Service

	for rows.Next() {
		var service Service
		if err := rows.Scan(&service.ID, &service.Name, &service.Description, &service.Private); err != nil {
			return err
		}
		services = append(services, service)
	}

	return c.JSON(http.StatusOK, services)
}

func GetAllServices(c echo.Context) error {

	db := connection.GetDB()

	var input GetServicesByUserInput
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

	var services []Service

	for rows.Next() {
		var service Service
		if err := rows.Scan(&service.ID, &service.Name, &service.Description, &service.Private); err != nil {
			return err
		}
		services = append(services, service)
	}

	return c.JSON(http.StatusOK, services)
}

type CreateServiceInput struct {
	User        string `json:"user"`
	Name        string `json:"name"`
	Private     bool   `json:"private"`
	Description string `json:"description"`
}

func CreateService(c echo.Context) error {

	db := connection.GetDB()

	var input CreateServiceInput
	if err := c.Bind(&input); err != nil {
		return err
	}

	userId := input.User

	var user User

	userRow := db.QueryRow(`
			SELECT id, name, email
			FROM instructor."User"
			WHERE id=$1`,
		userId)

	userErr := userRow.Scan(&user.ID, &user.Name, &user.Email)
	if userErr != nil {
		return userErr
	}

	var service Service

	serviceRow := db.QueryRow(`
		INSERT INTO instructor."Service" (id, name, private, description)
		VALUES ($1, $2, $3, $4)
		RETURNING id, name, description, private`,
		uuid.New(), input.Name, input.Private, input.Description)

	serviceErr := serviceRow.Scan(&service.ID, &service.Name, &service.Description, &service.Private)
	if serviceErr != nil {
		return serviceErr
	}

	var relation ServiceOnUser

	relationRow := db.QueryRow(`
		INSERT INTO instructor."ServicesOnUsers" ("userId", "serviceId")
		VALUES ($1, $2)
		RETURNING "userId", "serviceId"`,
		user.ID, service.ID)

	relationErr := relationRow.Scan(&relation.UserID, &relation.ServiceID)
	if relationErr != nil {
		return relationErr
	}

	return c.JSON(http.StatusCreated, relation)
}
