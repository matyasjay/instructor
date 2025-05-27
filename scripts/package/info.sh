NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

PROJECT=""

if [ -z "$1" ]; then
  PROJECT="instructor"
else
  PROJECT=$1
fi

echo "\n${F_BOLD}Cluster info for '${PROJECT}-local'${NO_FORMAT}"
echo "${C_GREY46}"
echo "Change project: make bump PROJECT=my-project${NO_FORMAT}"
echo "${F_DIM}"
echo "Project: '$PROJECT'"
echo "Namespace: '$PROJECT-deployment'${NO_FORMAT}"
echo "\n${F_DIM}Application services:${NO_FORMAT}\n${C_GREY46}"

kubectl get svc -n "${PROJECT}-deployment"

echo "\n${NO_FORMAT}${F_DIM}Database services:${NO_FORMAT}\n${C_GREY46}"

kubectl get svc -n database

echo "${NO_FORMAT}"
