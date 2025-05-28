NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

clear

echo "\n${F_BOLD}Build Packages${NO_FORMAT}"

cd frontend 

dotenvx run -f --quiet ../.env.production -- node ../scripts/env/validate.mjs

echo "${C_GREY46}Build Service - frontend${NO_FORMAT}\n"

prettier --write --loglevel silent . && eslint . --fix 

tsc -b && dotenvx run -f --quiet ../.env.production -- pnpm vite build . --log-level silent

echo "${F_BOLD}Done!${NO_FORMAT}"

echo "\n${C_GREY46}Build Service - http${NO_FORMAT}\n"

cd ../http 

gofmt -w ./cmd/* ./internal/

CGO_ENABLED=0 GOOS=linux go build -C cmd -a -installsuffix cgo -o ../bin/main .

echo "${F_BOLD}Done!${NO_FORMAT}"

cd ../../

echo "\n${F_BOLD}Packages ready!${NO_FORMAT}\n"

exit 0
