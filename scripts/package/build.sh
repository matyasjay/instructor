source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

dotenvx run -f --quiet .env.production -- node scripts/env/validate.mjs

echo "\n${F_BOLD}Build Packages${NO_FORMAT}"


echo "${C_GREY46}Build Service - frontend${NO_FORMAT}\n"

cd frontend

pnpm prettier --write --log-level silent . && pnpm eslint . --fix

tsc --build && dotenvx run -f --quiet ../.env.production -- pnpm vite build . --log-level silent

echo "${F_BOLD}Done!${NO_FORMAT}"

echo "\n${C_GREY46}Build Service - http${NO_FORMAT}\n"

cd ../http

gofmt -w ./cmd/* ./pkg/*

CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o bin/main .

echo "${F_BOLD}Done!${NO_FORMAT}"

cd ../

echo "\n${F_BOLD}Packages ready!${NO_FORMAT}\n"
