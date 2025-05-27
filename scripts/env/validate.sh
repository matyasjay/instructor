NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

if [ -z "$1" ]; then
  echo "${C_INDIANRED1}No environment provided!${NO_FORMAT}"
  exit 1
else
  ENVIRONMENT=$1
fi

dotenvx run -f ".env.${ENVIRONMENT}" -- node scripts/env/validate.mjs
