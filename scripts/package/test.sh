source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "\n${F_BOLD}Test Packages${NO_FORMAT}\n"

echo "${C_GREY46}Test - frontend${NO_FORMAT}\n"

cd frontend

pnpm prettier --write --log-level silent . && pnpm eslint . --fix

tsc --build && dotenvx run -f --quiet ../.env.production -- pnpm vite build . --log-level silent

echo "${F_BOLD}Done!${NO_FORMAT}\n"

echo "${C_GREY46}Test - http${NO_FORMAT}\n"

cd ../http

go build -a -o bin/main ./
go build -a -o bin/gen-structs ./cmd/cli/typegen/structs
go build -a -o bin/gen-declarations ./cmd/cli/typegen/declarations

echo "${F_BOLD}Done!${NO_FORMAT}\n"

exit 0
