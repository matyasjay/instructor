# --- Git

sign:
	git add .
	git commit -S

shelf:
	git add .
	git commit -S
	git push

release:
	sh scripts/package/bump.sh "$(PROJECT)"
	git push

# --- Package

info:
	sh scripts/package/info.sh

reset:
	sh scripts/deploy/reset.sh

build:
	sh scripts/package/build.sh

plan:
	cd terraform && terraform plan

apply:
	cd terraform && terraform apply

deploy:
	sh scripts/deploy/docker.sh

vercel:
	sh scripts/deploy/vercel.sh

env-decrypt:
	sh scripts/env/decrypt.sh

env-encrypt:
	sh scripts/env/encrypt.sh

env-validate:
	sh scripts/env/validate.sh "$(ENV)"

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
