source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "\n${F_BOLD}Clear Kubernetes Deployments${NO_FORMAT}\n"

sh scripts/package/info.sh

kubectl delete deployment instructor-backend --namespace instructor-app
kubectl delete deployment instructor-frontend --namespace instructor-app
kubectl delete deployment instructor-database --namespace instructor-database

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"
