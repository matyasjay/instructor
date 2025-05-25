frontend-build:
	pnpm frontend:build

frontend-deploy:
	cd frontend && pnpm build 
	vercel build 
	vercel .

frontend-dev:
	pnpm frontend:dev

frontend-lint:
	cd frontend && tsc --noEmit
	pnpm frontend:lint

frontend-test:
	pnpm frontend:test

http-run:
	cd http && go run cmd/server/main.go
