bump:
	sh cli/bump.sh

deploy:
	cd frontend && pnpm build 
	dotenvx run -f .env.production -- node cli/deploy.mjs
	vercel build 
	vercel --prod
	node cli/deploy-post.mjs

sign:
	git add .
	git commit -S

push:
	sh cli/bump.sh
	git push

# --- Environment

env-decrypt:
	sh cli/decrypt.sh

env-encrypt:
	sh cli/encrypt.sh

# --- Frontend

frontend-dev:
	${MAKE} -C frontend dev

frontend-build:
	${MAKE} -C frontend build

frontend-fmt:
	${MAKE} -C frontend fmt

frontend-test:
	${MAKE} -C frontend test

frontend-run:
	${MAKE} -C frontend run

# --- HTTP

http-build:
	${MAKE} -C http build

http-fmt:
	${MAKE} -C http fmt

http-test:
	${MAKE} -C http test

http-run:
	${MAKE} -C http run
