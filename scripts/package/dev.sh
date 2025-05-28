NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

clear 

echo "\n${F_BOLD}Run Development Container${NO_FORMAT}${C_GREY46}\n"

echo "${NO_FORMAT}${F_BOLD}Building packages${NO_FORMAT}${C_GREY46}\n"

cd frontend

tsc -b && dotenvx run -f --quiet ../.env.local -- pnpm vite build .

cd ../http/cmd && go build -o main .

echo "${NO_FORMAT}${F_BOLD}Done!${NO_FORMAT}${C_GREY46}\n"

echo "${NO_FORMAT}${F_BOLD}Building development images${NO_FORMAT}${C_GREY46}\n"

cd ../../

docker-compose -f docker/docker-compose.yml up --build 

echo "\n${NO_FORMAT}${F_BOLD}Done!${NO_FORMAT}\n"

