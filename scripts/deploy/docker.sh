source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "\n${F_BOLD}Load Kind Cluster${NO_FORMAT}\n"

make build

echo "${F_BOLD}Build Docker Images${NO_FORMAT}\n"

docker build --build-arg DOTENV_PRIVATE_KEY_PRODUCTION=$DOTENV_PRIVATE_KEY_PRODUCTION -t instructor-frontend:local -f docker/Dockerfile.frontend frontend

echo "\n"

docker build --build-arg DOTENV_PRIVATE_KEY_PRODUCTION=$DOTENV_PRIVATE_KEY_PRODUCTION -t instructor-backend:local -f docker/Dockerfile.backend http

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"

echo "${F_BOLD}Load Docker Images${NO_FORMAT}\n"

kind load docker-image instructor-frontend:local --name instructor-local

echo "\n"

kind load docker-image instructor-backend:local --name instructor-local

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"
