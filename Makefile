bump:
	sh cli/bump.sh

deploy:
	cd frontend && pnpm build 
	dotenvx run -f .env.production -- node cli/deploy.mjs
	vercel build 
	vercel --prod
	node cli/deploy-post.mjs

# --- Environment

env-decrypt:
	sh cli/decrypt.sh

env-encrypt:
	sh cli/encrypt.sh

# --- Frontend

frontend-dev:
	cd frontend && pnpm i && dotenvx run -f ../.env.local -- node ../cli/env.mjs
	cd frontend && dotenvx run -f ../.env.local -- vite

frontend-build:
	cd frontend && pnpm i && dotenvx run -f ../.env.production -- node ../cli/env.mjs
	cd frontend && tsc -b && dotenvx run -f ../.env.production -- pnpm exec vite build

frontend-fmt:
	cd frontend && prettier --write . && eslint . --fix

frontend-test:
	cd frontend && tsc && prettier --check . && eslint .

frontend-run:
	cd frontend && pnpm i && dotenvx run -f ../.env.production -- node ../cli/env.mjs
	cd frontend && dotenvx run -f ../.env.production -- pnpm exec vite

# --- HTTP

http-build:
	cd http/cmd/api-server && dotenvx run -f ../../../.env.production -- go build 

http-fmt:
	gofmt -w ./http/cmd/* ./http/internal/

http-test:
	cd http/cmd/api-server && dotenvx run -f ../../../.env.production -- go build 
	rm http/cmd/api-server/api-server

http-run:
	cd http && dotenvx run -f ../.env.production -- go run cmd/api-server/main.go

