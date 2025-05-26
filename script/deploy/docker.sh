docker build --build-arg DOTENV_PRIVATE_KEY_PRODUCTION=$DOTENV_PRIVATE_KEY_PRODUCTION -t instructor-frontend-app:latest -f docker/Dockerfile.frontend .
docker build --build-arg DOTENV_PRIVATE_KEY_PRODUCTION=$DOTENV_PRIVATE_KEY_PRODUCTION -t instructor-backend-app:latest -f docker/Dockerfile.backend http

kind load docker-image instructor-frontend-app:latest --name instructor-local
kind load docker-image instructor-backend-app:latest --name instructor-local
