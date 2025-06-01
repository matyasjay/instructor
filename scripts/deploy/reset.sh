NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
F_DIM="\033[2m"
C_INDIANRED1="\033[38;5;203m"
C_SEAGREEN2="\033[38;5;83m"
C_GREY46="\033[38;5;243m"
C_GREY62="\033[38;5;247m"

echo "${F_BOLD}Reset Local Cluster${NO_FORMAT}\n"

make info

kind delete cluster -n instructor-local

kind create cluster -n instructor-local --config docker/kind-config.yml

sh ./scripts/deploy/decode.sh

make info

echo "${NO_FORMAT}\n${F_BOLD}Done!${NO_FORMAT}\n"

