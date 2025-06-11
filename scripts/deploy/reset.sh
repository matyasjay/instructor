source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "${F_BOLD}Reset Cluster${NO_FORMAT}\n"

sh scripts/package/info.sh

kind delete cluster -n instructor-local

kind create cluster -n instructor-local --config docker/kind-config.yml

sh scripts/deploy/decode.sh

sh scripts/package/info.sh

echo "${NO_FORMAT}\n${F_BOLD}Done!${NO_FORMAT}\n"

