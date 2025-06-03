package endpoint

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"

	_ "github.com/lib/pq"

	"http/internal/handler/connection"
)

type Message struct {
	Message string
}

type User struct {
	ID       string
	Name     string
	Password string
	Email    string
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

func GetUserByEmail(c echo.Context) error {
	db := connection.GetConnection(c)

	var payload struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.Bind(&payload); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid JSON"})
	}

	email := payload.Email
	password := payload.Password

	var user User

	err := db.QueryRow(`SELECT id, name, email FROM instructor."User" WHERE email=$1 AND password=$2`, email, password).Scan(
		&user.ID, &user.Name, &user.Email,
	)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusFound, user)
}
