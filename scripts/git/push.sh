NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"



echo "\n${F_BOLD}${C_INDIANRED1}--- Hit ENTER to confirm COMMIT and PUSH task ---${NO_FORMAT}\n"

read -r input

if [ -z "$input" ]; then
  echo "\n${F_BOLD}Sign and push local changes${NO_FORMAT}\n"
  make sign
  sh scripts/package/bump.sh "$(PROJECT)" && git push
else
  echo "\n${C_GREY62}Cancelled!${NO_FORMAT}\n"
fi

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"


