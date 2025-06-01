locals {
  name = "instructor"

  ports = {
    frontend = 3000
    backend  = 3333
    node     = 30000
    database = 5432
  }

  namespaces = {
    app = "${local.name}-app"
    db  = "${local.name}-database"
  }

  images = {
    frontend = "${local.name}-frontend:local"
    backend  = "${local.name}-backend:local"
    database = "postgres:15"
  }

  services = {
    frontend = "${local.name}-frontend"
    backend  = "${local.name}-backend"
    database = "${local.name}-database"
  }

  secrets = {
    database = {
      name      = "database-password"
      namespace = local.namespaces.db
      data = {
        (local.vars.postgres.key) = local.vars.postgres.value
      }
    }
  }

  envs = {
    database = [{
      name = local.secrets.database.name
      key  = local.vars.postgres.key
    }]
  }

  mounts = {
    database = [
      {
        name = "${local.secrets.database.name}-storage"
        path = "/var/lib/postgresql/data"
      }
    ]
  }
}

