source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "\n${F_BOLD}${C_INDIANRED1}Hit [ENTER] to confirm COMMIT, BUMP, TAG, and PUSH changes...${NO_FORMAT}"

read -r input

if [ -z "$input" ]; then
  echo "\n${F_BOLD}Confirmed!${NO_FORMAT}\n"
  sh scripts/package/sign.sh
  sh scripts/package/bump.sh "$(PROJECT)" && git push
else
  echo "\n${F_BOLD}${C_GREY62}Cancelled!${NO_FORMAT}\n"
fi

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"


