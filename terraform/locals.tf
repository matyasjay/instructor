locals {
  name = "instructor"
  namespace = "${local.name}-namespace"

  port = {
    frontend = 3000
    backend  = 3333
    node     = 30000
    database = 5432
  }

  type = {
    node_port  = "NodePort"
    cluster_ip = "ClusterIP"
  }

  image = {
    frontend = "${local.name}-frontend:latest"
    backend  = "${local.name}-backend:latest"
    database = "postgres:15"
  }

  pull = {
    never = "Never"
  }

  services = {
    frontend = "${local.name}-frontend"
    backend  = "${local.name}-backend"
    database = "${local.name}-database"
  }

  secrets = {
    database_password = {
      name      = "database-password"
      mount     = "/var/lib/postgresql/data"
      key       = var.postgres_key
      value     = var.postgres_value
      data = {
        (var.postgres_key) = var.postgres_value
      }
    }
  }

  deployments = {
    frontend = {
      name      = local.services.frontend
      port      = local.port.frontend
      node_port = local.port.node
      type      = local.type.node_port
      image     = local.image.frontend
      env       = []
      mounts    = []
      volumes   = []
    },
    backend = {
      name      = local.services.backend
      port      = local.port.backend
      type      = local.type.cluster_ip
      image     = local.image.backend
      env       = []
      mounts    = []
      volumes   = []
    }
    database = {
      name      = local.services.database
      port      = local.port.database
      type      = local.type.cluster_ip
      image     = local.image.database

      env = [
        {
          name   = local.secrets.database_password.key
          key    = local.secrets.database_password.value
          secret = local.secrets.database_password.name
        }
      ]

      mounts = [
        {
          name = local.secrets.database_password.name
          path = local.secrets.database_password.mount
        }
      ]

      volumes = [
        {
          name = local.secrets.database_password.name
          dir  = {}
        }
      ]
    }
  }
}
