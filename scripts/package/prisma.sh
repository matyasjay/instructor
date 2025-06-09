source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "${F_BOLD}Initialise Prisma Schema${NO_FORMAT}\n"

cd frontend && pnpm generate:prisma

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"
