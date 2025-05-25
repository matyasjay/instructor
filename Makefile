frontend-build:
	pnpm frontend:build

frontend-dev:
	pnpm frontend:dev

frontend-lint:
	cd frontend && tsc --noEmit
	pnpm frontend:lint

frontend-test:
	pnpm frontend:test

http-run:
	cd http && go run cmd/server/main.go
