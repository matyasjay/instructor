# `@instructor/core`

[![Latest Release](https://img.shields.io/badge/Release-1.1.28-blue)](https://github.com/matyasjay/instructor/releases/latest)
[![GolangCI](https://github.com/matyasjay/instructor/actions/workflows/golangcli-lint.yml/badge.svg?branch=main)](https://github.com/matyasjay/instructor/actions/workflows/golangcli-lint.yml)

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/install)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [Kind](https://kind.sigs.k8s.io/)

## Local Deployment with Kind & Terraform
1. Setup `~/.kube/config` if not exists already
2. Run `make reset` in the root directory
3. Visit `http://localhost:3000` in the browser
