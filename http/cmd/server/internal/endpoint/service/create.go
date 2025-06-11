package service

import (
	"database/sql"
	"http/cmd/server/internal"
	"http/pkg/model"
	"http/pkg/util"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"
)

func Create(c echo.Context) error {
	var unsafeInput model.PostServiceInput
	safeInput, err := util.AssertInput(c, unsafeInput)
	if err != nil {
		return err
	}

	var user model.User
	var service model.Service
	var relation model.ServicesOnUsers

	err = internal.WithTxDefault(func(tx *sql.Tx) error {
		err = tx.QueryRow(`
			SELECT id, name, email
			FROM instructor."User"
			WHERE id=$1
		`, safeInput.UserID).Scan(&user.ID, &user.Name, &user.Email)
		if err != nil {
			return err
		}

		err := tx.QueryRow(`
			INSERT INTO instructor."Service" (id, name, private, description)
			VALUES ($1, $2, $3, $4)
			RETURNING id, name, description, private
		`, uuid.New(), safeInput.Name, safeInput.Private, safeInput.Description).
			Scan(&service.ID, &service.Name, &service.Private, &service.Description)
		if err != nil {
			return err
		}

		err = tx.QueryRow(`
			INSERT INTO instructor."ServicesOnUsers" ("userId", "serviceId")
			VALUES ($1, $2)
			RETURNING "userId", "serviceId"
		`, user.ID, service.ID).Scan(&relation.UserID, &relation.ServiceID)
		if err != nil {
			return err
		}
		return nil
	})

	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, service)
}
