# --- Pipeline

bump:
	sh scripts/package/bump.sh

sign:
	git add .
	git commit -S

shelf:
	git push

push:
	sh scripts/package/bump.sh
	git push

build:
	${MAKE} -C frontend build
	${MAKE} -C http build

plan:
	cd terraform && terraform plan

apply:
	cd terraform && terraform apply

deploy:
	dotenvx run -f .env.production -- sh scripts/deploy/docker.sh

vercel:
	${MAKE} -C frontend build
	node scripts/deploy/vercel-pre.mjs
	vercel build 
	vercel .
	node scripts/deploy/vercel-post.mjs

# --- Environment

env-decrypt:
	sh scripts/env/decrypt.sh

env-encrypt:
	sh scripts/env/encrypt.sh

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
