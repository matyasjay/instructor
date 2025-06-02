package main

import (
	"database/sql"
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
	"os"
	"strconv"
	"sync"

	_ "github.com/lib/pq"
)

type (
	user struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	}
)

var (
	users = map[int]*user{}
	seq   = 1
	lock  = sync.Mutex{}
)

func getConnection(c echo.Context) (*sql.DB, error) {
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

	return db, err
}

func createUser(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()
	u := &user{
		ID: seq,
	}
	if err := c.Bind(u); err != nil {
		return err
	}
	users[u.ID] = u
	seq++
	return c.JSON(http.StatusCreated, u)
}

func getUser(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()
	id, _ := strconv.Atoi(c.Param("id"))
	return c.JSON(http.StatusOK, users[id])
}

func updateUser(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()
	u := new(user)
	if err := c.Bind(u); err != nil {
		return err
	}
	id, _ := strconv.Atoi(c.Param("id"))
	users[id].Name = u.Name
	return c.JSON(http.StatusOK, users[id])
}

func deleteUser(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()
	id, _ := strconv.Atoi(c.Param("id"))
	delete(users, id)
	return c.NoContent(http.StatusNoContent)
}

func getAllUsers(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()
	return c.JSON(http.StatusOK, users)
}

func getTemplates(c echo.Context) error {
	db, conn_err := getConnection(c)

	if conn_err != nil {
		return c.String(http.StatusOK, "Error")
	}

	row, err := db.Query("SELECT" + "\"PromptTemplate\".\"id\" AS \"template_id\"," + "\"PromptTemplate\".\"name\" AS \"template_name\"," + "\"PromptTemplate\".description AS \"template_description\"," + "\"PromptTemplate\".\"template\" AS \"template_content\"," + "\"PromptInput\".id AS \"input_id\"," + "\"PromptInput\".\"input\" AS \"input_content\"" + "FROM instructor.\"PromptInput\" JOIN instructor.\"PromptTemplate\" ON \"PromptTemplate\".id = \"PromptInput\".\"templateId\"")

	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No result found.")
		}
	}

	defer func() {
		if err := db.Close(); err != nil {
			fmt.Printf("Error closing DB: %v\n", err)
		}
	}()

	return c.JSON(http.StatusOK, row)
}

func getOptions(c echo.Context) error {
	return c.NoContent(http.StatusOK)
}
