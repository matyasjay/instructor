source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "\n${F_BOLD}Run Development Container${NO_FORMAT}${C_GREY46}\n"

echo "${NO_FORMAT}${F_BOLD}Building packages${NO_FORMAT}${C_GREY46}\n"

cd frontend 

tsc -b && pnpm vite build . --log-level silent

cd ../

go build -C http/cmd -o ../bin/main .

echo "${NO_FORMAT}${F_BOLD}Done!${NO_FORMAT}${C_GREY46}\n"

echo "${NO_FORMAT}${F_BOLD}Building development images${NO_FORMAT}${C_GREY46}\n"

docker-compose -f docker/docker-compose.yml up --build 

echo "\n${NO_FORMAT}${F_BOLD}Done!${NO_FORMAT}\n"

