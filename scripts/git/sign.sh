NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

echo "${F_BOLD}Sign Git Working Tree${NO_FORMAT}${C_GREY46}"

make test
make build

echo "${NO_FORMAT}${C_GREY62}Commit Details:${NO_FORMAT}${C_GREY46}\n"

git add .
git commit -S  --no-verify

echo "\n${NO_FORMAT}${F_BOLD}Ready to push!${NO_FORMAT}\n"

