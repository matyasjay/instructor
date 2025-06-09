dev:
	sh scripts/package/dev.sh

typegen:
	cd http && make typegen-build
	cp http/internal/handler/model/main.go http/cmd/typegen/internal/model/main.go
	cd http/bin && ./typegen

test:
	sh scripts/package/test.sh

sign:
	sh scripts/git/sign.sh

push:
	sh scripts/git/push.sh "$(PROJECT)"

info:
	sh scripts/package/info.sh

deploy:
	sh scripts/deploy/deploy.sh

reset:
	sh scripts/deploy/reset.sh

clear:
	sh scripts/deploy/clear.sh

decode:
	sh scripts/deploy/decode.sh

build:
	sh scripts/package/build.sh

plan:
	cd terraform && terraform init && terraform plan

apply:
	cd terraform && terraform init && terraform plan && terraform apply -auto-approve

env-decrypt:
	sh scripts/env/decrypt.sh

env-encrypt:
	sh scripts/env/encrypt.sh

env-validate:
	sh scripts/env/validate.sh "$(ENV)"

prisma:
	sh scripts/package/prisma.sh
