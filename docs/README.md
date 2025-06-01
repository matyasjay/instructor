## Background

As LLMs become central to automation and productivity workflows, developers often need structured, repeatable ways to construct prompts with dynamic parameters. This project aims to provide a frontend interface for visually constructing prompts by filling in template parameters, and a backend service to handle those templates, parameters, and LLM execution.

The interface is designed with modern developer tools in mind, using a React-based frontend styled with Tailwind and ShadCN UI. A minimal HTTP backend will be developed in Go, exposing OpenAPI-compatible endpoints to process requests and manage templates. Infrastructure provisioning will be automated via Terraform, enabling consistent deployment.

This solution is tailored to users with frontend-heavy experience but expanding into Go for backend services. It will connect to OpenAI's o3 Reasoning model to serve as a personal software development assistant. While persistent template storage is a potential enhancement, the MVP will not include long-term data persistence.

## Infrastructure

The application will be deployed to a managed Kubernetes service and orchestrated using Terraform. The architecture will rely on a pod-per-deployment structure, each environment (dev, staging, prod) running its own multi-container pod setup consisting of:

- **Frontend**: A React application served over an HTTP container.
- **HTTP Service**: Go-based backend exposing a hybrid GraphQL and REST API with optional WebSocket support to handle templates, parameter submission, and prompt forwarding to OpenAI's o3 model. GraphQL allows precise data fetching, while REST handles compatibility for system-level operations.
- **Data Storage**: An optional persistent volume and Postgres database, containerised to run alongside the service when persistence is required.

Infrastructure provisioning includes:

- VPC networking and ingress setup
- TLS certificate management (e.g., via Cert-Manager)
- GitOps/CD integration for build and deployment automation
- Environment-specific config via ConfigMaps/Secrets

Kubernetes resources and infrastructure lifecycle will be managed with Terraform, supporting multi-environment management and secure, scalable rollouts.

## Method

### Prompt Template Schema (MVP)

A prompt template will follow a JSON structure with placeholder variables marked using double curly braces (e.g., `{{variable_name}}`). This format supports dynamic UI generation and runtime substitution.

```json
{
  "name": "code_assistant",
  "description": "Suggests improvements to submitted code snippets",
  "template": "Here is the code: {{code_snippet}}. Suggest improvements.",
  "variables": [
    {
      "name": "code_snippet",
      "type": "string",
      "required": true,
      "description": "A block of source code to analyze"
    }
  ]
}
```

Each template will be submitted via a GraphQL mutation and used to dynamically generate parameter inputs on the frontend.

### System Architecture

![UML diagram](./.github/uml.svg)

This diagram shows runtime and CI/CD flow:

- Developers commit to GitHub
- GitHub Actions build Docker images and push to a registry
- Terraform plans and applies infra changes
- Updated containers are deployed into Kubernetes
- Data flows from UI → Go API → OpenAI, with optional writes to a data store.

## Implementation

### Frontend

- Set up project with Vite, TypeScript, Tailwind, and ShadCN UI
- Create component to input template variables dynamically
- Connect to GraphQL API for submitting prompts and templates

### Backend

- Bootstrap Go project with GraphQL and REST routers (e.g., gqlgen + chi)
- Define OpenAPI spec and GraphQL schema for:

  - Submitting templates
  - Fetching templates
  - Submitting prompt inputs

- Add optional WebSocket endpoint for streaming responses
- Implement OpenAI API integration

### Infrastructure

- Write Terraform scripts for:

  - Kubernetes cluster setup
  - Namespace and resource quotas per environment
  - TLS via Cert-Manager
  - Postgres PVC [setup](https://www.section.io/docs/tutorials/data/postgres-on-pvc/](https://www.section.io/docs/tutorials/data/postgres-on-pvc/)

- Define Kubernetes manifests:

  - Deployment with 3 containers: frontend, backend, data-store
  - ConfigMaps and Secrets for API keys and ENV variables

### CI/CD

- Configure GitHub Actions for:

  - Frontend + backend Docker image builds
  - Push to Docker Registry (ECR)
  - Run Terraform apply in specific branches (dev/staging/prod)

### Testing & QA

- Unit tests for backend business logic (template validation, OpenAI call)
- Cypress tests for the frontend prompt submission flow

### Deployment

- Deploy to development cluster
- Validate LLM integration, prompt templating, and frontend usability
- Plan staging and prod rollouts via Terraform workspace targeting

## Milestones

| Week       | Goal                                                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Week 1** | Project Bootstrap: initialize frontend + backend projects, define GraphQL and REST schema, set up GitHub Actions workflows                   |
| **Week 2** | Local MVP: implement basic UI and prompt template logic, connect Go backend to OpenAI o3 API, mock template submission + parameter fill flow |
| **Week 3** | Infrastructure Provisioning: deploy Kubernetes cluster with Terraform, configure networking, TLS, and container deployments                  |
| **Week 4** | CI/CD Pipeline: push images to container registry, automate dev/staging deployments via Terraform workflows                                  |
| **Week 5** | E2E Testing: add Cypress coverage for frontend workflows, add backend validation and API tests                                               |
| **Week 6** | Pre-Production Validation: complete feature and stability testing, finalize Terraform rollout config for production                          |
| **Week 7** | Launch & Feedback: deploy to production, collect initial usage feedback, identify follow-up features (e.g., persistence, auth)               |

## Gathering Results

After launch, success will be evaluated through both functional validation and user-centered metrics:

- ✅ **Prompt rendering accuracy:** Compare UI-generated prompt payloads with expected backend structure
- ✅ **LLM response quality:** Log and manually evaluate a sample of responses for coherence and correctness
- ✅ **UI usability:** Collect qualitative feedback from testers/developers on form clarity and usefulness
- ✅ **Backend reliability:** Monitor API uptime, response time, and error logs in production
- ✅ **Adoption metrics:** Track number of template submissions, distinct users, and average usage duration

```sh
 instructor
   docker
   │ Dockerfile.backend
   │ Dockerfile.frontend
   │ kind-config.yml
   └ package.json
   frontend
   │ public
   │ │ fonts
   │ └ images
   │ src
   │ │ app
   │ │ │ page-1
   │ │ │ └ index.tsx
   │ │ │ page-2
   │ │ │ └ index.tsx
   │ │ │ index.tsx
   │ │ │ layout.tsx
   │ │ └ router.tsx
   │ │ components
   │ │ config
   │ │ types
   │ │ fonts.css
   │ └ global.css
   │ Makefile
   │ eslint.config.mjs
   │ index.html
   │ package.json
   │ prettier.config.json
   │ tailwind.config.ts
   │ tsconfig.json
   └ vite.config.ts
   http
   │ cmd
   │ internal
   │ Makefile
   └ package.json
   scripts
   │ deploy
   │ env
   │ package
   │ package.json
   terraform
   │ k8s.tf
   │ main.tf
   │ outputs.tf
   │ package.json
   │ providers.tf
   └ variables.tf
   Makefile
   package.json
```

#### Package version update

```
$ make sign
sh scripts/git/sign.sh
Commit Git working tree
make -C frontend fmt
prettier --log-level silent --write . && eslint . --fix
make -C http fmt
gofmt -w ./cmd/* ./internal/

Commit signed successfully!

$ make push
sh scripts/git/push.sh ""
scripts/git/push.sh: line 9: PROJECT: command not found

Update package versions.

sh scripts/package/info.sh

Cluster info for 'instructor-local'

Change project: make bump PROJECT=my-project

Project: 'instructor'
Namespace: 'instructor-deployment'

Application services:

NAME                  TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
instructor-backend    ClusterIP   10.96.7.118     <none>        80/TCP           143m
instructor-frontend   NodePort    10.96.187.123   <none>        3000:30000/TCP   143m

Database services:

NAME       TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)    AGE
postgres   ClusterIP   10.96.22.16   <none>        5432/TCP   16m

Progress
INFO    Working directory is clean.
INFO    Deprecated 1.1.22
INFO    Version bumped to 1.1.23
INFO    Package file versions updated to 1.1.23.
INFO    Tag 'instructor v1.1.23' ready to be released.
INFO    Changes are committed and ready to push.

Updated package versions successfully!
```

## Reset Script output

```
$ make reset
sh scripts/deploy/deploy.sh
sh scripts/git/sign.sh

Sign Git Working Tree

sh scripts/package/test.sh

Test Packages

Test - frontend

Done!

Test - http

No tests found!
Done!

sh scripts/package/build.sh

Build Packages

Environment validation succeded!

Build Service - frontend

Done!

Build Service - http

Done!

Packages ready!

Commit Details:

On branch main
Your branch is ahead of 'origin/main' by 4 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

Ready to push!

Reset Local Cluster

Deleting cluster "instructor-local" ...
Deleted nodes: ["instructor-local-control-plane"]
Creating cluster "instructor-local" ...
 ✓ Ensuring node image (kindest/node:v1.33.1) 🖼
 ✓ Preparing nodes 📦
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
Set kubectl context to "kind-instructor-local"
You can now use your cluster with:

kubectl cluster-info --context kind-instructor-local

Thanks for using kind! 😊

Done!

sh scripts/deploy/docker.sh

Load Kind Cluster

sh scripts/package/build.sh

Build Packages

Environment validation succeded!

Build Service - frontend

Done!

Build Service - http

Done!

Packages ready!

Build Docker Images

[+] Building 1.0s (10/10) FINISHED                                                                                                     docker:desktop-linux
 => [internal] load build definition from Dockerfile.frontend                                                                                          0.0s
 => => transferring dockerfile: 257B                                                                                                                   0.0s
 => [internal] load metadata for docker.io/library/node:22.12-alpine3.20                                                                               0.9s
 => [internal] load .dockerignore                                                                                                                      0.0s
 => => transferring context: 2B                                                                                                                        0.0s
 => [1/5] FROM docker.io/library/node:22.12-alpine3.20@sha256:027911463b296bdaf6df82b5ccf2c6b290fee725d5fba6513a037ed019400625                         0.0s
 => [internal] load build context                                                                                                                      0.0s
 => => transferring context: 613.89kB                                                                                                                  0.0s
 => CACHED [2/5] WORKDIR /usr/src/app                                                                                                                  0.0s
 => CACHED [3/5] COPY public ./public                                                                                                                  0.0s
 => CACHED [4/5] COPY dist ./dist                                                                                                                      0.0s
 => CACHED [5/5] COPY package.json ./package.json                                                                                                      0.0s
 => exporting to image                                                                                                                                 0.0s
 => => exporting layers                                                                                                                                0.0s
 => => writing image sha256:96dd13a6eda93e55c635115a619ece30c455b120b4e47bd335442f562fe6a833                                                           0.0s
 => => naming to docker.io/library/instructor-frontend:local                                                                                           0.0s

[+] Building 0.8s (8/8) FINISHED                                                                                                       docker:desktop-linux
 => [internal] load build definition from Dockerfile.backend                                                                                           0.0s
 => => transferring dockerfile: 181B                                                                                                                   0.0s
 => [internal] load metadata for docker.io/library/golang:1.23                                                                                         0.5s
 => [internal] load .dockerignore                                                                                                                      0.0s
 => => transferring context: 2B                                                                                                                        0.0s
 => [1/3] FROM docker.io/library/golang:1.23@sha256:1cc01afde44821895ea712b5b4b802ef3c3ddeb7a7bb3f2e69c19bbc5877dace                                   0.0s
 => => resolve docker.io/library/golang:1.23@sha256:1cc01afde44821895ea712b5b4b802ef3c3ddeb7a7bb3f2e69c19bbc5877dace                                   0.0s
 => [internal] load build context                                                                                                                      0.1s
 => => transferring context: 9.11MB                                                                                                                    0.1s
 => CACHED [2/3] WORKDIR /usr/src/app                                                                                                                  0.0s
 => [3/3] COPY ./bin/main ./                                                                                                                           0.1s
 => exporting to image                                                                                                                                 0.0s
 => => exporting layers                                                                                                                                0.0s
 => => writing image sha256:62b00dbc3ff1c5f11c73cb9cc420717b718c9d9f1cc3dc98ea5a3fbb7c1f4517                                                           0.0s
 => => naming to docker.io/library/instructor-backend:local                                                                                            0.0s

Done!

Load Docker Images

Image: "instructor-frontend:local" with ID "sha256:96dd13a6eda93e55c635115a619ece30c455b120b4e47bd335442f562fe6a833" not yet present on node "instructor-local-control-plane", loading...


Image: "instructor-backend:local" with ID "sha256:62b00dbc3ff1c5f11c73cb9cc420717b718c9d9f1cc3dc98ea5a3fbb7c1f4517" not yet present on node "instructor-local-control-plane", loading...

Done!

PEM files generated:
terraform/client_cert.pem
terraform/client_key.pem
terraform/cluster_cert.pem

cd terraform && terraform init && terraform plan && terraform apply -auto-approve

Initializing the backend...
Initializing modules...
Initializing provider plugins...
- Reusing previous version of hashicorp/kubernetes from the dependency lock file
- Using previously-installed hashicorp/kubernetes v2.37.1

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
module.secret["database"].kubernetes_secret.main: Refreshing state... [id=instructor-database/database-password]
module.namespace["app"].kubernetes_namespace.main: Refreshing state... [id=instructor-app]
module.namespace["db"].kubernetes_namespace.main: Refreshing state... [id=instructor-database]
module.deployment["database"].kubernetes_service.main: Refreshing state... [id=instructor-database/instructor-database]
module.deployment["backend"].kubernetes_service.main: Refreshing state... [id=instructor-app/instructor-backend]
module.deployment["frontend"].kubernetes_service.main: Refreshing state... [id=instructor-app/instructor-frontend]
module.deployment["frontend"].kubernetes_deployment.main: Refreshing state... [id=instructor-app/instructor-frontend]
module.deployment["backend"].kubernetes_deployment.main: Refreshing state... [id=instructor-app/instructor-backend]
module.deployment["database"].kubernetes_deployment.main: Refreshing state... [id=instructor-database/instructor-database]

───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
module.namespace["db"].kubernetes_namespace.main: Refreshing state... [id=instructor-database]
module.namespace["app"].kubernetes_namespace.main: Refreshing state... [id=instructor-app]
module.deployment["backend"].kubernetes_service.main: Refreshing state... [id=instructor-app/instructor-backend]
module.deployment["database"].kubernetes_service.main: Refreshing state... [id=instructor-database/instructor-database]
module.deployment["frontend"].kubernetes_service.main: Refreshing state... [id=instructor-app/instructor-frontend]
module.secret["database"].kubernetes_secret.main: Refreshing state... [id=instructor-database/database-password]
module.deployment["backend"].kubernetes_deployment.main: Refreshing state... [id=instructor-app/instructor-backend]
module.deployment["frontend"].kubernetes_deployment.main: Refreshing state... [id=instructor-app/instructor-frontend]
module.deployment["database"].kubernetes_deployment.main: Refreshing state... [id=instructor-database/instructor-database]

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # module.deployment["backend"].kubernetes_deployment.main will be created
  + resource "kubernetes_deployment" "main" {
      + id               = (known after apply)
      + wait_for_rollout = true

      + metadata {
          + generation       = (known after apply)
          + labels           = {
              + "app" = "instructor-backend"
            }
          + name             = "instructor-backend"
          + namespace        = "instructor-app"
          + resource_version = (known after apply)
          + uid              = (known after apply)
        }

      + spec {
          + min_ready_seconds         = 0
          + paused                    = false
          + progress_deadline_seconds = 600
          + replicas                  = "1"
          + revision_history_limit    = 10

          + selector {
              + match_labels = {
                  + "app" = "instructor-backend"
                }
            }

          + strategy (known after apply)

          + template {
              + metadata {
                  + generation       = (known after apply)
                  + labels           = {
                      + "app" = "instructor-backend"
                    }
                  + name             = (known after apply)
                  + resource_version = (known after apply)
                  + uid              = (known after apply)
                }
              + spec {
                  + automount_service_account_token  = true
                  + dns_policy                       = "ClusterFirst"
                  + enable_service_links             = true
                  + host_ipc                         = false
                  + host_network                     = false
                  + host_pid                         = false
                  + hostname                         = (known after apply)
                  + node_name                        = (known after apply)
                  + restart_policy                   = "Always"
                  + scheduler_name                   = (known after apply)
                  + service_account_name             = (known after apply)
                  + share_process_namespace          = false
                  + termination_grace_period_seconds = 30

                  + container {
                      + image                      = "instructor-backend:local"
                      + image_pull_policy          = "IfNotPresent"
                      + name                       = "instructor-backend"
                      + stdin                      = false
                      + stdin_once                 = false
                      + termination_message_path   = "/dev/termination-log"
                      + termination_message_policy = (known after apply)
                      + tty                        = false

                      + port {
                          + container_port = 3333
                          + protocol       = "TCP"
                        }

                      + resources (known after apply)
                    }

                  + image_pull_secrets (known after apply)

                  + readiness_gate (known after apply)
                }
            }
        }
    }

  # module.deployment["backend"].kubernetes_service.main will be created
  + resource "kubernetes_service" "main" {
      + id                     = (known after apply)
      + status                 = (known after apply)
      + wait_for_load_balancer = true

      + metadata {
          + generation       = (known after apply)
          + name             = "instructor-backend"
          + namespace        = "instructor-app"
          + resource_version = (known after apply)
          + uid              = (known after apply)
        }

      + spec {
          + allocate_load_balancer_node_ports = true
          + cluster_ip                        = (known after apply)
          + cluster_ips                       = (known after apply)
          + external_traffic_policy           = (known after apply)
          + health_check_node_port            = (known after apply)
          + internal_traffic_policy           = (known after apply)
          + ip_families                       = (known after apply)
          + ip_family_policy                  = (known after apply)
          + publish_not_ready_addresses       = false
          + selector                          = {
              + "app" = "instructor-backend"
            }
          + session_affinity                  = "None"
          + type                              = "ClusterIP"

          + port {
              + node_port   = (known after apply)
              + port        = 3333
              + protocol    = "TCP"
              + target_port = "3333"
            }

          + session_affinity_config (known after apply)
        }
    }

  # module.deployment["database"].kubernetes_deployment.main will be created
  + resource "kubernetes_deployment" "main" {
      + id               = (known after apply)
      + wait_for_rollout = true

      + metadata {
          + generation       = (known after apply)
          + labels           = {
              + "app" = "instructor-database"
            }
          + name             = "instructor-database"
          + namespace        = "instructor-database"
          + resource_version = (known after apply)
          + uid              = (known after apply)
        }

      + spec {
          + min_ready_seconds         = 0
          + paused                    = false
          + progress_deadline_seconds = 600
          + replicas                  = "1"
          + revision_history_limit    = 10

          + selector {
              + match_labels = {
                  + "app" = "instructor-database"
                }
            }

          + strategy (known after apply)

          + template {
              + metadata {
                  + generation       = (known after apply)
                  + labels           = {
                      + "app" = "instructor-database"
                    }
                  + name             = (known after apply)
                  + resource_version = (known after apply)
                  + uid              = (known after apply)
                }
              + spec {
                  + automount_service_account_token  = true
                  + dns_policy                       = "ClusterFirst"
                  + enable_service_links             = true
                  + host_ipc                         = false
                  + host_network                     = false
                  + host_pid                         = false
                  + hostname                         = (known after apply)
                  + node_name                        = (known after apply)
                  + restart_policy                   = "Always"
                  + scheduler_name                   = (known after apply)
                  + service_account_name             = (known after apply)
                  + share_process_namespace          = false
                  + termination_grace_period_seconds = 30

                  + container {
                      + image                      = "postgres:15"
                      + image_pull_policy          = "IfNotPresent"
                      + name                       = "instructor-database"
                      + stdin                      = false
                      + stdin_once                 = false
                      + termination_message_path   = "/dev/termination-log"
                      + termination_message_policy = (known after apply)
                      + tty                        = false

                      + env {
                          + name = "POSTGRES_PASSWORD"

                          + value_from {
                              + secret_key_ref {
                                  + key  = "POSTGRES_PASSWORD"
                                  + name = "database-password"
                                }
                            }
                        }

                      + port {
                          + container_port = 5432
                          + protocol       = "TCP"
                        }

                      + resources (known after apply)

                      + volume_mount {
                          + mount_path        = "/var/lib/postgresql/data"
                          + mount_propagation = "None"
                          + name              = "database-password-storage"
                          + read_only         = false
                        }
                    }

                  + image_pull_secrets (known after apply)

                  + readiness_gate (known after apply)

                  + volume {
                      + name = "database-password-storage"

                      + empty_dir {}
                    }
                }
            }
        }
    }

  # module.deployment["database"].kubernetes_service.main will be created
  + resource "kubernetes_service" "main" {
      + id                     = (known after apply)
      + status                 = (known after apply)
      + wait_for_load_balancer = true

      + metadata {
          + generation       = (known after apply)
          + name             = "instructor-database"
          + namespace        = "instructor-database"
          + resource_version = (known after apply)
          + uid              = (known after apply)
        }

      + spec {
          + allocate_load_balancer_node_ports = true
          + cluster_ip                        = (known after apply)
          + cluster_ips                       = (known after apply)
          + external_traffic_policy           = (known after apply)
          + health_check_node_port            = (known after apply)
          + internal_traffic_policy           = (known after apply)
          + ip_families                       = (known after apply)
          + ip_family_policy                  = (known after apply)
          + publish_not_ready_addresses       = false
          + selector                          = {
              + "app" = "instructor-database"
            }
          + session_affinity                  = "None"
          + type                              = "ClusterIP"

          + port {
              + node_port   = (known after apply)
              + port        = 5432
              + protocol    = "TCP"
              + target_port = "5432"
            }

          + session_affinity_config (known after apply)
        }
    }

  # module.deployment["frontend"].kubernetes_deployment.main will be created
  + resource "kubernetes_deployment" "main" {
      + id               = (known after apply)
      + wait_for_rollout = true

      + metadata {
          + generation       = (known after apply)
          + labels           = {
              + "app" = "instructor-frontend"
            }
          + name             = "instructor-frontend"
          + namespace        = "instructor-app"
          + resource_version = (known after apply)
          + uid              = (known after apply)
        }

      + spec {
          + min_ready_seconds         = 0
          + paused                    = false
          + progress_deadline_seconds = 600
          + replicas                  = "1"
          + revision_history_limit    = 10

          + selector {
              + match_labels = {
                  + "app" = "instructor-frontend"
                }
            }

          + strategy (known after apply)

          + template {
              + metadata {
                  + generation       = (known after apply)
                  + labels           = {
                      + "app" = "instructor-frontend"
                    }
                  + name             = (known after apply)
                  + resource_version = (known after apply)
                  + uid              = (known after apply)
                }
              + spec {
                  + automount_service_account_token  = true
                  + dns_policy                       = "ClusterFirst"
                  + enable_service_links             = true
                  + host_ipc                         = false
                  + host_network                     = false
                  + host_pid                         = false
                  + hostname                         = (known after apply)
                  + node_name                        = (known after apply)
                  + restart_policy                   = "Always"
                  + scheduler_name                   = (known after apply)
                  + service_account_name             = (known after apply)
                  + share_process_namespace          = false
                  + termination_grace_period_seconds = 30

                  + container {
                      + image                      = "instructor-frontend:local"
                      + image_pull_policy          = "IfNotPresent"
                      + name                       = "instructor-frontend"
                      + stdin                      = false
                      + stdin_once                 = false
                      + termination_message_path   = "/dev/termination-log"
                      + termination_message_policy = (known after apply)
                      + tty                        = false

                      + port {
                          + container_port = 3000
                          + protocol       = "TCP"
                        }

                      + resources (known after apply)
                    }

                  + image_pull_secrets (known after apply)

                  + readiness_gate (known after apply)
                }
            }
        }
    }

  # module.deployment["frontend"].kubernetes_service.main will be created
  + resource "kubernetes_service" "main" {
      + id                     = (known after apply)
      + status                 = (known after apply)
      + wait_for_load_balancer = true

      + metadata {
          + generation       = (known after apply)
          + name             = "instructor-frontend"
          + namespace        = "instructor-app"
          + resource_version = (known after apply)
          + uid              = (known after apply)
        }

      + spec {
          + allocate_load_balancer_node_ports = true
          + cluster_ip                        = (known after apply)
          + cluster_ips                       = (known after apply)
          + external_traffic_policy           = (known after apply)
          + health_check_node_port            = (known after apply)
          + internal_traffic_policy           = (known after apply)
          + ip_families                       = (known after apply)
          + ip_family_policy                  = (known after apply)
          + publish_not_ready_addresses       = false
          + selector                          = {
              + "app" = "instructor-frontend"
            }
          + session_affinity                  = "None"
          + type                              = "NodePort"

          + port {
              + node_port   = 30000
              + port        = 3000
              + protocol    = "TCP"
              + target_port = "3000"
            }

          + session_affinity_config (known after apply)
        }
    }

  # module.namespace["app"].kubernetes_namespace.main will be created
  + resource "kubernetes_namespace" "main" {
      + id                               = (known after apply)
      + wait_for_default_service_account = false

      + metadata {
          + generation       = (known after apply)
          + name             = "instructor-app"
          + resource_version = (known after apply)
          + uid              = (known after apply)
        }
    }

  # module.namespace["db"].kubernetes_namespace.main will be created
  + resource "kubernetes_namespace" "main" {
      + id                               = (known after apply)
      + wait_for_default_service_account = false

      + metadata {
          + generation       = (known after apply)
          + name             = "instructor-database"
          + resource_version = (known after apply)
          + uid              = (known after apply)
        }
    }

  # module.secret["database"].kubernetes_secret.main will be created
  + resource "kubernetes_secret" "main" {
      + binary_data_wo                 = (write-only attribute)
      + data                           = (sensitive value)
      + data_wo                        = (write-only attribute)
      + id                             = (known after apply)
      + type                           = "Opaque"
      + wait_for_service_account_token = true

      + metadata {
          + generation       = (known after apply)
          + name             = "database-password"
          + namespace        = "instructor-database"
          + resource_version = (known after apply)
          + uid              = (known after apply)
        }
    }

Plan: 9 to add, 0 to change, 0 to destroy.
module.namespace["app"].kubernetes_namespace.main: Creating...
module.namespace["db"].kubernetes_namespace.main: Creating...
module.secret["database"].kubernetes_secret.main: Creating...
module.deployment["frontend"].kubernetes_service.main: Creating...
module.deployment["database"].kubernetes_service.main: Creating...
module.deployment["backend"].kubernetes_service.main: Creating...
module.deployment["backend"].kubernetes_deployment.main: Creating...
module.deployment["frontend"].kubernetes_deployment.main: Creating...
module.deployment["database"].kubernetes_deployment.main: Creating...
module.namespace["app"].kubernetes_namespace.main: Creation complete after 0s [id=instructor-app]
module.namespace["db"].kubernetes_namespace.main: Creation complete after 0s [id=instructor-database]
module.secret["database"].kubernetes_secret.main: Creation complete after 0s [id=instructor-database/database-password]
module.deployment["frontend"].kubernetes_service.main: Creation complete after 0s [id=instructor-app/instructor-frontend]
module.deployment["backend"].kubernetes_service.main: Creation complete after 0s [id=instructor-app/instructor-backend]
module.deployment["database"].kubernetes_service.main: Creation complete after 0s [id=instructor-database/instructor-database]
module.deployment["frontend"].kubernetes_deployment.main: Creation complete after 2s [id=instructor-app/instructor-frontend]
module.deployment["backend"].kubernetes_deployment.main: Creation complete after 2s [id=instructor-app/instructor-backend]
module.deployment["database"].kubernetes_deployment.main: Still creating... [00m10s elapsed]
module.deployment["database"].kubernetes_deployment.main: Still creating... [00m20s elapsed]
module.deployment["database"].kubernetes_deployment.main: Creation complete after 26s [id=instructor-database/instructor-database]

Apply complete! Resources: 9 added, 0 changed, 0 destroyed.
sh scripts/git/sign.sh

Sign Git Working Tree

sh scripts/package/test.sh

Test Packages

Test - frontend

Done!

Test - http

No tests found!
Done!

sh scripts/package/build.sh

Build Packages

Environment validation succeded!

Build Service - frontend

Done!

Build Service - http

Done!

Packages ready!

Commit Details:

On branch main
Your branch is ahead of 'origin/main' by 4 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

Ready to push!

$
```
