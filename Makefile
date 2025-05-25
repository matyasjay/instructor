env-decrypt:
	sh cli/decrypt.sh

env-encrypt:
	sh cli/encrypt.sh

frontend-build:
	cd frontend && pnpm build

frontend-deploy:
	cd frontend && pnpm build 
	vercel build 
	vercel --prod

frontend-dev:
	cd frontend && pnpm dev

frontend-lint:
	cd frontend && tsc && pnpm lint

frontend-test:
	cd frontend && pnpm test

http-run:
	dotenvx run -f http/.env.production -- go run ./http/cmd/api-server/main.go

http-build:
	cd http/cmd/api-server && dotenvx run -f ../../.env.production -- go build 

http-test:
	cd http/cmd/api-server && dotenvx run -f ../../.env.production -- go build 
	rm http/cmd/api-server/api-server

http-lint:
	gofmt -w ./http/cmd/* ./http/internal/

bump:
	sh cli/bump.sh

