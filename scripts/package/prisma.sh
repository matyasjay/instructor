source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "${F_BOLD}Initialise Prisma Schema${NO_FORMAT}\n"

dotenvx run -f .env.local -- pnpm exec prisma migrate dev
dotenvx run -f .env.local -- pnpm exec prisma db seed

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"
