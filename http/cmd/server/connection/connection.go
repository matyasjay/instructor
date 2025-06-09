package connection

import (
	"database/sql"
	"fmt"
	"os"
	"sync"

	_ "github.com/lib/pq"
)

var (
	db   *sql.DB
	once sync.Once
)

func InitDB() (*sql.DB, error) {
	var initErr error
	once.Do(func() {
		var host = os.Getenv("DATABASE_HOST")
		var port = os.Getenv("DATABASE_PORT")
		var user = os.Getenv("DATABASE_USER")
		var password = os.Getenv("DATABASE_PASSWORD")
		var dbname = "postgres"

		psqlInfo := fmt.Sprintf(
			"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
			host, port, user, password, dbname,
		)

		db, initErr = sql.Open("postgres", psqlInfo)
		if initErr != nil {
			return
		}

		db.SetMaxOpenConns(20)
		db.SetMaxIdleConns(10)

		initErr = db.Ping()
	})

	return db, initErr
}

func GetDB() *sql.DB {
	return db
}

func WithTx(db *sql.DB, fn func(tx *sql.Tx) error) error {
	tx, err := db.Begin()
	if err != nil {
		return err
	}
	err = fn(tx)
	if err != nil {
		if rbErr := tx.Rollback(); rbErr != nil {
			fmt.Printf("tx rollback error: %v\n", rbErr)
		}
		return err
	}

	if err := tx.Commit(); err != nil {
		return err
	}
	return nil
}

func WithTxDefault(fn func(tx *sql.Tx) error) error {
	return WithTx(GetDB(), fn)
}
