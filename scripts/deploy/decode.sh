source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

echo "${F_BOLD}\nGenerate Certificates${NO_FORMAT}\n"

CONFIG=kind-kubeconfig.yaml

kind get kubeconfig --name instructor-local > kind-kubeconfig.yaml

CA_DATA=$(yq '.clusters[0].cluster["certificate-authority-data"]' "$CONFIG")
CLIENT_CERT_DATA=$(yq '.users[0].user["client-certificate-data"]' "$CONFIG")
CLIENT_KEY_DATA=$(yq '.users[0].user["client-key-data"]' "$CONFIG")

echo "${C_GREY42}Generate Cluster Certificate...${NO_FORMAT}\n"
echo "$CA_DATA" | base64 -d > terraform/cluster_cert.pem
echo "${F_BOLD}Done!${NO_FORMAT}\n"
echo "${C_GREY42}Generate Client Certificate...${NO_FORMAT}\n"
echo "$CLIENT_CERT_DATA" | base64 -d > terraform/client_cert.pem
echo "${F_BOLD}Done!${NO_FORMAT}\n"
echo "${C_GREY42}Generate Client Key...${NO_FORMAT}\n"
echo "$CLIENT_KEY_DATA" | base64 -d > terraform/client_key.pem
echo "${F_BOLD}Done!${NO_FORMAT}\n"


echo "${F_BOLD}Generated Certificates${NO_FORMAT}\n"

ls -1 terraform/*.pem

echo "\n${F_BOLD}Done!${NO_FORMAT}\n"

