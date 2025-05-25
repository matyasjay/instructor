build:
	cd cmd/api-server && dotenvx run -f ../../../.env.production -- go build 

fmt:
	gofmt -w ./cmd/* ./internal/

test:
	cd cmd/api-server && dotenvx run -f ../../../.env.production -- go build 

run:
	dotenvx run -f ../.env.production -- go run cmd/api-server/main.go

