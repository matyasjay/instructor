dev:
	sh scripts/package/dev.sh
	sh scripts/package/tail.sh

tail:
	sh scripts/package/tail.sh

sign:
	sh scripts/git/sign.sh

push:
	sh scripts/git/push.sh "$(PROJECT)"

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

test:
	${MAKE} -C frontend test
	${MAKE} -C http test

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

http-build:
	${MAKE} -C http build

http-fmt:
	${MAKE} -C http fmt

http-test:
	${MAKE} -C http test

http-run:
	${MAKE} -C http run
