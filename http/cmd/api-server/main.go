package main

import (
	"database/sql"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "C77ahH3co@"
	dbname   = "postgres"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3003"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	}))

	e.OPTIONS("/*", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})

	e.GET("/", func(c echo.Context) error {
		psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
			"password=%s dbname=%s sslmode=disable",
			host, port, user, password, dbname)

		db, err := sql.Open("postgres", psqlInfo)

		if err != nil {
			return c.JSON(http.StatusServiceUnavailable, err)
		}

		rows, err := db.Query("SELECT id, name FROM users")

		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}

		defer func() {
			if cerr := rows.Close(); cerr != nil {
				fmt.Printf("Error closing DB: %v\n", cerr)
			}
		}()

		defer func() {
			if cerr := db.Close(); cerr != nil {
				fmt.Printf("Error closing DB: %v\n", cerr)
			}
		}()

		return c.JSON(http.StatusOK, rows)
	})

	e.GET("/manifest", func(c echo.Context) error {
		return c.String(http.StatusOK, "ok")
	})

	port := os.Getenv("HTTP_PORT")

	if port == "" {
		port = "3333"
	}

	e.Logger.Fatal(e.Start(":" + port))
}
