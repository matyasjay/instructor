echo "${F_BOLD}Generate Types From Schema${NO_FORMAT}\n"

sh scripts/package/prisma.sh

cd http

go build -o bin/gen-structs ./cmd/cli/typegen/structs
./bin/gen-structs

go build -o bin/gen-declarations ./cmd/cli/typegen/declarations
./bin/gen-declarations

cd ../

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"
