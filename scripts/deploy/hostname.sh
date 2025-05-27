set -e

KUBECONFIG_PATH="${KUBECONFIG:-$HOME/.kube/config}"

HOSTNAME=$(yq e '.clusters[] | select(.name == .contexts[] | select(.name == .current-context).context.cluster) | .cluster.server' "$KUBECONFIG_PATH")

echo "{\"hostname\": \"$HOSTNAME\"}"

