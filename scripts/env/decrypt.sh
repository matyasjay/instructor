source "$(dirname "${BASH_SOURCE[0]}")/../environment.sh"

dotenvx decrypt --env-file .env.test
dotenvx decrypt --env-file .env.local
dotenvx decrypt --env-file .env.development
dotenvx decrypt --env-file .env.staging
dotenvx decrypt --env-file .env.production
