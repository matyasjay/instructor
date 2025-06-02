source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "\n${F_BOLD}Tail development container${NO_FORMAT}\n"

docker-compose -f docker/docker-compose.yml logs -f --timestamps --no-log-prefix

