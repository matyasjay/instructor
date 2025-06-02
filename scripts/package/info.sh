source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

if [ -z "$1" ]; then
  PROJECT="instructor"
else
  PROJECT=$1
fi

echo "\n${F_BOLD}Cluster info for '${PROJECT}'${NO_FORMAT}"
echo "${C_GREY46}"
echo "Change project: make bump PROJECT=my-project${NO_FORMAT}"
echo "${F_DIM}"
echo "Project: '$PROJECT'"
echo "Namespace: '$PROJECT-app'${NO_FORMAT}"
echo "Namespace: '$PROJECT-database'${NO_FORMAT}"
echo "\n${F_DIM}Application services:${NO_FORMAT}\n${C_GREY46}"

kubectl get svc -n "${PROJECT}-app"

echo "\n${NO_FORMAT}${F_DIM}Database services:${NO_FORMAT}\n${C_GREY46}"

kubectl get svc -n "${PROJECT}-database"

echo "${NO_FORMAT}"
