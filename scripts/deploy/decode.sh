#!/bin/bash

CONFIG=kind-kubeconfig.yaml

kind get kubeconfig --name instructor-local > kind-kubeconfig.yaml

# Extract base64 strings
CA_DATA=$(yq '.clusters[0].cluster["certificate-authority-data"]' "$CONFIG")
CLIENT_CERT_DATA=$(yq '.users[0].user["client-certificate-data"]' "$CONFIG")
CLIENT_KEY_DATA=$(yq '.users[0].user["client-key-data"]' "$CONFIG")

# Decode to PEM files
echo "$CA_DATA" | base64 -d > terraform/cluster_cert.pem
echo "$CLIENT_CERT_DATA" | base64 -d > terraform/client_cert.pem
echo "$CLIENT_KEY_DATA" | base64 -d > terraform/client_key.pem

echo "PEM files generated:"
ls -1 terraform/*.pem

