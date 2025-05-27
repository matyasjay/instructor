NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

echo "${F_BOLD}Commit Git working tree${NO_FORMAT}${C_GREY46}"

git add .
git commit -S && echo "${NO_FORMAT}${C_SEAGREEN2}Commit signed successfully!${NO_FORMAT}"

