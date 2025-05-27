NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

echo "\n${F_BOLD}Test Packages${NO_FORMAT}\n"

echo "${C_GREY46}Test - frontend${NO_FORMAT}\n"
cd frontend
tsc
echo "${F_BOLD}Done!${NO_FORMAT}\n"

echo "${C_GREY46}Test - http${NO_FORMAT}\n"
cd ../http/cmd/api-server
go build 
echo "${F_BOLD}Done!${NO_FORMAT}\n"

# dotenvx run ../../.env.test --quiet -- vitest run
# "test:unit:watch": "dotenvx run ../.env.test -- vitest watch",
# "test:unit:coverage": "dotenvx run ../.env.test -- vitest run --coverage"

exit 0
