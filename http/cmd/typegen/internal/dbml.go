package internal

import (
	"log"
	"os"
	"github.com/duythinht/dbml-go/parser"
	"github.com/duythinht/dbml-go/scanner"
)

func Parse() {
	schema := "../../frontend/src/lib/prisma/generated/dbml/schema.dbml"

	f, _ := os.Open(schema)
	s := scanner.NewScanner(f)
	parser := parser.NewParser(s)
	_, err := parser.Parse()
	if err != nil {
		log.Fatal(err)
	}
}
