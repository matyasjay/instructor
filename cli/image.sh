docker build -t instructor-frontend-app:latest -f docker/Dockerfile.frontend frontend
docker build -t instructor-backend-app:latest -f docker/Dockerfile.backend http

kind load docker-image instructor-frontend-app:latest --name instructor
kind load docker-image instructor-backend-app:latest --name instructor

