# --- Pipeline

sign:
	git add .
	git commit -S

shelf:
	git push

push:
	sh cli/bump.sh
	git push

build:
	${MAKE} -C frontend build
	${MAKE} -C http build
	sh cli/docker.sh

deploy:
	${MAKE} -C frontend build
	sh cli/docker.sh
	sh cli/kind.sh
	sh cli/terraform.sh

vercel:
	${MAKE} -C frontend build
	dotenvx run -f .env.production -- node cli/deploy.mjs
	vercel build 
	vercel .
	node cli/deploy-post.mjs

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
