# `@instructor/core`

[![Latest Release](https://img.shields.io/badge/Release-1.1.38-blue)](https://github.com/matyasjay/instructor/releases/latest)
[![GolangCI](https://github.com/matyasjay/instructor/actions/workflows/golangcli-lint.yml/badge.svg?branch=main)](https://github.com/matyasjay/instructor/actions/workflows/golangcli-lint.yml)
[![CompileCI](https://github.com/matyasjay/instructor/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/matyasjay/instructor/actions/workflows/tests.yml)

![Go](https://img.shields.io/badge/Backend-Go-00ADD8?logo=go)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite)
![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)
![Docker](https://img.shields.io/badge/Containerized-Docker-2496ED?logo=docker)
![Terraform](https://img.shields.io/badge/IaC-Terraform-844FBA?logo=terraform)

## Prerequisites

- [Node v22](https://nodejs.org/en/download)
- [Go v1.22](https://go.dev/learn)
- [Kind](https://kind.sigs.k8s.io)
- [Docker](https://www.docker.com)
- [Docker Compose](https://docs.docker.com/compose/install)
- [Terraform](https://developer.hashicorp.com/terraform/install)
- [dotenvx](https://dotenvx.com/docs/install#npm)
- [pnpm v10](https://pnpm.io/installation)
- [kubectl](https://kubernetes.io/docs/reference/kubectl)
- [yq](https://github.com/mikefarah/yq)
- [TypeScript (tsc)](https://www.typescriptlang.org/download/)
- [Vite](https://vite.dev/guide/cli.html)
- [Prettier](https://prettier.io/docs/)
- [ESLint](https://eslint.org/docs/latest/use/getting-started)

## Workflow

```
.
├── Makefile             # Top level commands
├── docker               # Dockerand Kind configuration
├── frontend             # Vite/Tailwind based client service
│ ├── index.html         # Frontend entry point
│ ├── package.json       # Service level packages
│ ├── vite.config.ts     # Bundler configuration
│ ├── tailwind.config.ts # Theme configuration
│ ├── tsconfig.json      # Compiler options
│ ├── public/            # Publicly accessible assets
│ └── src/               # Applciation source code
│   ├── app/             # Application router
│   ├── components/      # Reusable components
│   ├── config/          # Configuration files
│   ├── lib/             # Utilities and tools
│   ├── types/           # Declaration files
│   ├── global.css       # Styling entry point
│   └── fonts.css        # Font declarations
├── http/                # Go-based backend service
│ ├── bin/               # Go executables
│ │ └── air              # Development mode Go server
│ ├── cmd/               # Application source code
│ │ └── main.go          # Backend entry point
│ ├── internal/          # Utilities and tools
│ ├── go.mod             # Go modules file
│ └── go.sum             # Go modules file
├── postgres/            # Database service
│ ├── package.json       # Service level packages
│ └── prisma/            # Prisma directory
│   └── schema.prisma    # Database schema definitions
├── scripts/             # Automations
│ ├── deploy/            # Pipeline helpers
│ ├── env/               # Environment and encription utilities
│ ├── git/               # Workflow helpers
│ └── package/           # Builders and package related scripts
└── terraform/           # Infrastructure code
```

Top level helpers are available to automate most workflows while developing or publishing the project. The scripts are exposed by `Makefile` and could be run with `make <script>` command from the root directory.

### Environment Setup

Add the neccessary Terraform secrets in the `terraform/terraform.tfvars` file.

```hcl
# terraform/terraform.tfvars
postgres_key   = "<envrionment-variable-key>"    # Environment variable name
postgres_value = "<environment-variable-secret>" # Local postgres password
```

Make sure that you local `instructor-local` cluster is up and running (_run_ `make reset` _to recreate_), then create the certificates for running the Terraform script.

```sh
make decode
```

This will create the `terraform/*.pem` files used to confgure the Kubernetes provider.

Finally, apply the Terraform infrastructure on the local Kind cluster.

```sh
make apply
```

By default, the local cluster API is accessible through `https://127.0.0.1:6443` and the frontend service is exposed on `http://localhost:3000`.

### Development

The development environment consists of the out-of-the-box Vite development server and Air to trigger rebuilds on file changes (Go). Both processes are containerised and run by `docker-compose` under the hood.

```sh
make dev
```

The development servers are available on `http://localhost:3001` for the frontend and `http://localhost:3333` for the backend respectively.
