package connection

import (
	"database/sql"
	"fmt"
	"github.com/labstack/echo/v4"
	"os"
)

func GetConnection(c echo.Context) *sql.DB {
	var host = os.Getenv("DATABASE_HOST")
	var port = os.Getenv("DATABASE_PORT")
	var user = os.Getenv("DATABASE_USER")
	var password = os.Getenv("DATABASE_PASSWORD")
	var dbname = "postgres"

	psqlInfo := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname,
	)

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		fmt.Println("Error connecting:", err)
		return nil
	}

	return db
}
