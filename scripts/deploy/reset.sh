source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "${F_BOLD}Reset Local Cluster${NO_FORMAT}\n"

make info

kind delete cluster -n instructor-local

kind create cluster -n instructor-local --config docker/kind-config.yml

sh ./scripts/deploy/decode.sh

make info

echo "${NO_FORMAT}\n${F_BOLD}Done!${NO_FORMAT}\n"

