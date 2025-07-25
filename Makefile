dev:
	sh scripts/package/dev.sh

build:
	sh scripts/package/build.sh

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

apply:
	sh scripts/deploy/apply.sh

env-decrypt:
	sh scripts/env/decrypt.sh

env-encrypt:
	sh scripts/env/encrypt.sh

env-validate:
	sh scripts/env/validate.sh "$(ENV)"

prisma:
	sh scripts/package/prisma.sh

typegen:
	sh scripts/package/typegen.sh
