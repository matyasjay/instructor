build:
	docker build --build-arg DOTENV_PRIVATE_KEY_PRODUCTION=$DOTENV_PRIVATE_KEY_PRODUCTION -t $PROJECT_NAME-frontend-app:latest -f docker/Dockerfile.frontend .
	docker build --build-arg DOTENV_PRIVATE_KEY_PRODUCTION=$DOTENV_PRIVATE_KEY_PRODUCTION -t $PROJECT_NAME-backend-app:latest -f docker/Dockerfile.backend http

local:
	kind load docker-image $PROJECT_NAME-frontend-app:latest --name $PROJECT_NAME-local
	kind load docker-image $PROJECT_NAME-backend-app:latest --name $PROJECT_NAME-local

development:
	kind load docker-image $PROJECT_NAME-frontend-app:latest --name $PROJECT_NAME-dev
	kind load docker-image $PROJECT_NAME-backend-app:latest --name $PROJECT_NAME-dev

staging:
	kind load docker-image $PROJECT_NAME-frontend-app:latest --name $PROJECT_NAME-stg
	kind load docker-image $PROJECT_NAME-backend-app:latest --name $PROJECT_NAME-stg

production:
	kind load docker-image $PROJECT_NAME-frontend-app:latest --name $PROJECT_NAME-prod
	kind load docker-image $PROJECT_NAME-backend-app:latest --name $PROJECT_NAME-prod
