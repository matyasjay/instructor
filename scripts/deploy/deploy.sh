make sign
sh ./scripts/deploy/docker.sh
make info
cd terraform
terraform apply -auto-approve
cd ../
make sign
make info
