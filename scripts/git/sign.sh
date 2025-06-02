source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "\n${F_BOLD}Sign Git Working Tree${NO_FORMAT}\n"

make test
make build

echo "${C_GREY62}Commit Details:${NO_FORMAT}${C_GREY46}\n"

git add .
git commit -S  --no-verify

echo "\n${NO_FORMAT}${F_BOLD}Ready to push!${NO_FORMAT}\n"

