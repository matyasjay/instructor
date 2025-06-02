package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"os"

	_ "github.com/lib/pq"
)

type User struct {
	ID   string
	Name string
}

type PromptTemplate struct {
		template_id   string
		template_name string
		template_description string
		template_content string
		input_id string
		input_content string
}

func getConnection(c echo.Context) *sql.DB {
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
			fmt.Println("Error connecting:",err)
			return  nil
	}

	return db
}



func getOptions(c echo.Context) error {
	return c.NoContent(http.StatusOK)
}


func getUsers(c echo.Context) error {
	  db := getConnection(c)

    rows, err := db.Query(`
				SELECT *
				FROM instructor."User" 
		`)

    if err != nil {
		 		fmt.Println("Error query rows:",err)
        return  err
    }

    var users []User

    for rows.Next() {
        var user User
        if err := rows.Scan(&user.ID, &user.Name); err != nil {
					fmt.Println("Error scanning row:",err)
					return err
        }
        users = append(users, user)
    }

    if err := rows.Err(); err != nil {
		 		fmt.Println("Error reading rows:",err)
        return err
    }

		if err := db.Close(); err != nil {
				fmt.Println("Error closing database:", err)
				return err
		}

   return c.JSON(http.StatusOK, users) 
}


func getTemplates(c echo.Context) error {
	  db := getConnection(c)

    rows, err := db.Query(`
				SELECT 
					"PromptTemplate"."id"        AS "template_id", 
					"PromptTemplate"."name"      AS "template_name", 
					"PromptTemplate".description AS "template_description", 
					"PromptTemplate"."template"  AS "template_content", 
					"PromptInput".id             AS "input_id",
					"PromptInput"."input"        AS "input_content"
				FROM instructor."PromptInput" 
				JOIN instructor."PromptTemplate" 
				ON "PromptTemplate".id = "PromptInput"."templateId"
		`)

    if err != nil {
		 		fmt.Println("Error query rows:",err)
        return  err
    }

    var templates []PromptTemplate

    for rows.Next() {
        var template PromptTemplate
        if err := rows.Scan(&template.template_id,
					&template.template_name,
					&template.template_description, 
					&template.template_content,
					&template.input_id,
					&template.input_content); err != nil {
					fmt.Println("Error scanning row:",err)
					return err
        }
        templates = append(templates, template)
    }

    if err := rows.Err(); err != nil {
		 		fmt.Println("Error reading rows:",err)
        return err
    }

		if err := db.Close(); err != nil {
				fmt.Println("Error closing database:", err)
				return err
		}

   return c.JSON(http.StatusOK, templates) 
}

func main() {
	e := echo.New()

	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3001"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	}))

	e.File("/", "static/swagger/index.html")
	e.Static("/", "static/swagger")

	e.OPTIONS("/*", getOptions)

	e.GET("/templates", getTemplates)
	e.GET("/users", getUsers)

	var http_port = os.Getenv("HTTP_PORT")

	if http_port == "" {
		http_port = "3333"
	}

	e.Logger.Fatal(e.Start(":" + http_port))
}
