source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

dotenvx encrypt --env-file .env.test
dotenvx encrypt --env-file .env.local
dotenvx encrypt --env-file .env.development
dotenvx encrypt --env-file .env.staging
dotenvx encrypt --env-file .env.production
