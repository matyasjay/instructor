source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

if [ -z "$1" ]; then
  echo "${C_INDIANRED1}No environment provided!${NO_FORMAT}"
  exit 1
else
  ENVIRONMENT=$1
fi

dotenvx run -f ".env.${ENVIRONMENT}" -- node scripts/env/validate.mjs
