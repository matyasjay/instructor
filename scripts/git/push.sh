source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

clear

echo "\n\n\n\n\n\n${F_BOLD}${C_INDIANRED1}--- Hit [ENTER] to confirm COMMIT, BUMP, TAG, and PUSH changes ---${NO_FORMAT}\n\n\n\n\n"

read -r input

if [ -z "$input" ]; then
  clear
  echo "${F_BOLD}Sign and push local changes${NO_FORMAT}\n"
  make sign
  sh scripts/package/bump.sh "$(PROJECT)" && git push
else
  echo "\n${C_GREY62}Cancelled!${NO_FORMAT}\n"
fi

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"


