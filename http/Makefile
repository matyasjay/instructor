dev:
	dotenvx run -f ../.env.local -- ./bin/air

build:
	go build -o bin/main

fmt:
	gofmt -w ./internal/*

test:
	go build

run:
	dotenvx run -f ../.env.local -- go run main.go

