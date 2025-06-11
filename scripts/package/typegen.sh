source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "${F_BOLD}Generate Types From Schema${NO_FORMAT}\n"

sh scripts/package/prisma.sh

echo "${F_BOLD}Generate Go Structs${NO_FORMAT}\n"

cd http

go build -o bin/gen-structs ./cmd/cli/typegen/structs
./bin/gen-structs

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"

echo "${F_BOLD}Generate TypeScript Declarations${NO_FORMAT}\n"

go build -o bin/gen-declarations ./cmd/cli/typegen/declarations
./bin/gen-declarations

cd ../

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"
