NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

echo "\n${F_BOLD}Clear Deployments${NO_FORMAT}\n"

kubectl delete deployment instructor-backend --namespace instructor-namespace
kubectl delete deployment instructor-frontend --namespace instructor-namespace
kubectl delete deployment instructor-database --namespace instructor-namespace

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"
