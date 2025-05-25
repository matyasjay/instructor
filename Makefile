deploy:
	cd frontend && pnpm build 
	dotenvx run -f .env.production -- node cli/deploy.mjs
	vercel build 
	vercel --prod
	node cli/deploy-post.mjs

env-decrypt:
	sh cli/decrypt.sh

env-encrypt:
	sh cli/encrypt.sh

frontend-build:
	cd frontend && pnpm build

frontend-dev:
	cd frontend && pnpm dev

frontend-lint:
	cd frontend && tsc && pnpm lint:fix

frontend-test:
	cd frontend && pnpm test

http-run:
	cd http && dotenvx run -f ../.env.production -- go run cmd/api-server/main.go

http-build:
	cd http/cmd/api-server && dotenvx run -f ../../../.env.production -- go build 

http-docker:
	docker build -t app . && docker run -it --init --rm -p 3333:3333 app

http-test:
	cd http/cmd/api-server && dotenvx run -f ../../../.env.production -- go build 
	rm http/cmd/api-server/api-server

http-lint:
	gofmt -w ./http/cmd/* ./http/internal/

bump:
	sh cli/bump.sh

