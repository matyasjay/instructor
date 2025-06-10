echo "${F_BOLD}Generate Types From Schema${NO_FORMAT}\n"

sh scripts/package/prisma.sh

cd http

go build -o bin/typegen ./cmd/typegen
./bin/typegen

cd ../

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"
