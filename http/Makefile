dev:
	cd ../ && sh scripts/package/typegen.sh
	dotenvx run -f ../.env.local -- node ../scripts/env/validate.mjs
	dotenvx run -f ../.env.local -- ./bin/air

build:
	cd ../ && sh scripts/package/typegen.sh
	dotenvx run -f ../.env.local -- node ../scripts/env/validate.mjs
	go build -o bin/main

fmt:
	gofmt -w ./pkg/* ./cmd/*

test:
	cd ../ && sh scripts/package/typegen.sh
	dotenvx run -f ../.env.local -- node ../scripts/env/validate.mjs
	go build

run:
	dotenvx run -f ../.env.local -- node ../scripts/env/validate.mjs
	dotenvx run -f ../.env.local -- go run main.go

