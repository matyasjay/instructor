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
	var host = os.Getenv("DATABASE_HOST")
	var port = os.Getenv("DATABASE_PORT")
	var user = os.Getenv("DATABASE_USER")
	var password = os.Getenv("DATABASE_PASSWORD")
	var dbname = os.Getenv("DATABASE_NAME")

	psqlInfo := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname,
	)

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		return c.String(http.StatusServiceUnavailable, "Database connection error!")
	}

	defer func() {
		if cerr := db.Close(); cerr != nil {
			fmt.Printf("Error closing DB: %v\n", cerr)
		}
	}()

	return c.JSON(http.StatusOK, db)
}

func getOptions(c echo.Context) error {
	return c.NoContent(http.StatusOK)
}
