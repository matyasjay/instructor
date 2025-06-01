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
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

Ready to push!


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

[+] Building 1.5s (10/10) FINISHED                                                                                                     docker:desktop-linux
 => [internal] load build definition from Dockerfile.frontend                                                                                          0.0s
 => => transferring dockerfile: 257B                                                                                                                   0.0s
 => [internal] load metadata for docker.io/library/node:22.12-alpine3.20                                                                               1.4s
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

What's Next?
  View a summary of image vulnerabilities and recommendations → docker scout quickview


[+] Building 1.4s (8/8) FINISHED                                                                                                       docker:desktop-linux
 => [internal] load build definition from Dockerfile.backend                                                                                           0.0s
 => => transferring dockerfile: 181B                                                                                                                   0.0s
 => [internal] load metadata for docker.io/library/golang:1.23                                                                                         1.3s
 => [internal] load .dockerignore                                                                                                                      0.0s
 => => transferring context: 2B                                                                                                                        0.0s
 => [1/3] FROM docker.io/library/golang:1.23@sha256:1cc01afde44821895ea712b5b4b802ef3c3ddeb7a7bb3f2e69c19bbc5877dace                                   0.0s
 => => resolve docker.io/library/golang:1.23@sha256:1cc01afde44821895ea712b5b4b802ef3c3ddeb7a7bb3f2e69c19bbc5877dace                                   0.0s
 => [internal] load build context                                                                                                                      0.1s
 => => transferring context: 9.11MB                                                                                                                    0.1s
 => CACHED [2/3] WORKDIR /usr/src/app                                                                                                                  0.0s
 => [3/3] COPY ./bin/main ./                                                                                                                           0.0s
 => exporting to image                                                                                                                                 0.0s
 => => exporting layers                                                                                                                                0.0s
 => => writing image sha256:2d676553166ed59df8a34f94754f590e2a9b2185524431d24d3d9b3bceaf9b6e                                                           0.0s
 => => naming to docker.io/library/instructor-backend:local                                                                                            0.0s

What's Next?
  View a summary of image vulnerabilities and recommendations → docker scout quickview

Done!

Load Docker Images

Image: "instructor-frontend:local" with ID "sha256:96dd13a6eda93e55c635115a619ece30c455b120b4e47bd335442f562fe6a833" found to be already present on all nodes.


Image: "instructor-backend:local" with ID "sha256:2d676553166ed59df8a34f94754f590e2a9b2185524431d24d3d9b3bceaf9b6e" not yet present on node "instructor-local-control-plane", loading...

Done!

sh scripts/package/info.sh

Cluster info for 'instructor-local'

Change project: make bump PROJECT=my-project

Project: 'instructor'
Namespace: 'instructor-deployment'

Application services:

No resources found in instructor-deployment namespace.

Database services:

No resources found in database namespace.

module.secret["database"].kubernetes_secret.main: Refreshing state... [id=instructor-database/database-password]
module.namespace["app"].kubernetes_namespace.main: Refreshing state... [id=instructor-app]
module.namespace["db"].kubernetes_namespace.main: Refreshing state... [id=instructor-database]
module.deployment["frontend"].kubernetes_service.main: Refreshing state... [id=instructor-app/instructor-frontend]
module.deployment["database"].kubernetes_service.main: Refreshing state... [id=instructor-database/instructor-database]
module.deployment["backend"].kubernetes_service.main: Refreshing state... [id=instructor-app/instructor-backend]
module.deployment["frontend"].kubernetes_deployment.main: Refreshing state... [id=instructor-app/instructor-frontend]
module.deployment["backend"].kubernetes_deployment.main: Refreshing state... [id=instructor-app/instructor-backend]
module.deployment["database"].kubernetes_deployment.main: Refreshing state... [id=instructor-database/instructor-database]

No changes. Your infrastructure matches the configuration.

Terraform has compared your real infrastructure against your configuration and found no differences, so no changes are needed.

Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
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
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

Ready to push!

sh scripts/package/info.sh

Cluster info for 'instructor-local'

Change project: make bump PROJECT=my-project

Project: 'instructor'
Namespace: 'instructor-deployment'

Application services:

No resources found in instructor-deployment namespace.

Database services:

No resources found in database namespace.

amatyas@matyasjay.local:~/Code/opensource/projects/instructor (main) $ make info
sh scripts/package/info.sh

Cluster info for 'instructor-local'

Change project: make bump PROJECT=my-project

Project: 'instructor'
Namespace: 'instructor-app'
Namespace: 'instructor-database'

Application services:

No resources found in instructor-deployment namespace.

Database services:

No resources found in database namespace.

```
