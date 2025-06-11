source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "${F_BOLD}Generate Prisma Bindings${NO_FORMAT}\n"

pnpm prisma generate

echo "${F_BOLD}Done!${NO_FORMAT}"
