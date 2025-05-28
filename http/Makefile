dev:
	./bin/air

build:
	cd cmd && go build 

fmt:
	gofmt -w ./cmd/* ./internal/

test:
	cd cmd && go build 

run:
	dotenvx run -f ../.env.production -- go run cmd/main.go

