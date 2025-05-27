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
	sh scripts/package/test.sh

