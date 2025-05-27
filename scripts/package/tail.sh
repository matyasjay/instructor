NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

echo "\n${F_BOLD}Tail development container${NO_FORMAT}${C_GREY46}\n"
docker-compose -f docker/docker-compose.yml logs -f --timestamps --no-log-prefix

