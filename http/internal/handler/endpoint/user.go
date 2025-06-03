package endpoint

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"

	_ "github.com/lib/pq"

	"http/internal/handler/connection"
)

type User struct {
	ID   string
	Name string
}

func GetUsers(c echo.Context) error {
	db := connection.GetConnection(c)

	rows, err := db.Query(`SELECT id, name FROM instructor."User"`)

	if err != nil {
		fmt.Println("Error query rows:", err)
		return err
	}

	var users []User

	for rows.Next() {
		var user User
		if err := rows.Scan(&user.ID, &user.Name); err != nil {
			fmt.Println("Error scanning row:", err)
			return err
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Error reading rows:", err)
		return err
	}

	if err := db.Close(); err != nil {
		fmt.Println("Error closing database:", err)
		return err
	}

	return c.JSON(http.StatusOK, users)
}
