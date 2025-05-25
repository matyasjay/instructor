env-decrypt:
	sh cli/decrypt.sh

env-encrypt:
	sh cli/encrypt.sh

frontend-build:
	pnpm frontend:build

frontend-deploy:
	cd frontend && pnpm build 
	vercel build 
	vercel --prod

frontend-dev:
	pnpm frontend:dev

frontend-lint:
	cd frontend && tsc --noEmit
	pnpm frontend:lint

frontend-test:
	pnpm frontend:test

http-run:
	cd http && dotenvx run -f .env.production -- go run cmd/api-server/main.go

http-build:
	cd http/cmd/api-server && dotenvx run -f ../../.env.production -- go build 

http-test:
	cd http/cmd/api-server && dotenvx run -f ../../.env.production -- go build 
	rm http/cmd/api-server/api-server

http-fmt:
	cd http && gofmt -w ./cmd/api-server/main.go

bump:
	pnpm bump
