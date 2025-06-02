source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "\n${F_BOLD}Test Packages${NO_FORMAT}\n"

echo "${C_GREY46}Test - frontend${NO_FORMAT}\n"

cd frontend

tsc

echo "${F_BOLD}Done!${NO_FORMAT}\n"

echo "${C_GREY46}Test - http${NO_FORMAT}\n"

echo "No tests found!"

echo "${F_BOLD}Done!${NO_FORMAT}\n"

# dotenvx run ../../.env.test --quiet -- vitest run
# "test:unit:watch": "dotenvx run ../.env.test -- vitest watch",
# "test:unit:coverage": "dotenvx run ../.env.test -- vitest run --coverage"

exit 0
