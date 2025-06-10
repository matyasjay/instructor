package service

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/cmd/server/internal"
	"http/pkg/model"
	"http/pkg/util"
)

var GET_SERVICE_BY_USER_ID = "sql/get_services_by_user.sql"

func Get(c echo.Context) error {
	var unsafeInput model.PostServiceInput
	safeInput, err := util.AssertInput(c, unsafeInput)
	if err != nil {
		return err
	}

	file, err := os.ReadFile(GET_SERVICE_BY_USER_ID)
	if err != nil {
		return err
	}

	var services []model.Service

	err = internal.WithTxDefault(func(tx *sql.Tx) error {
		var row *sql.Rows
		query := string(file)

		if safeInput.Private {
			query = query + "WHERE u.id = $1 GROUP BY s.id;"
			row, err = tx.Query(query, safeInput.UserID)
		} else {
			query = query + "WHERE s.private = false GROUP BY s.id;"
			row, err = tx.Query(query)
		}
		if err != nil {
			return err
		}

		for row.Next() {
			var (
				service       model.Service
				usersJSON     []byte
				templatesJSON []byte
			)

			if err := row.Scan(
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
			if err := json.Unmarshal(templatesJSON, &service.Templates); err != nil {
				return err
			}
			services = append(services, service)
		}
		return row.Err()
	})
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, services)
}
