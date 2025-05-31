locals {
  name = "instructor"

  namespaces = {
    app = "${local.name}-app"
    db  = "${local.name}-database"
  }

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
    frontend = "${local.name}-frontend:local"
    backend  = "${local.name}-backend:local"
    database = "postgres:15"
  }

  pull = {
    never          = "Never"
    if_not_present = "IfNotPresent"
  }

  services = {
    frontend = "${local.name}-frontend"
    backend  = "${local.name}-backend"
    database = "${local.name}-database"
  }

  secrets = {
    database_password = {
      name      = "database-password"
      namespace = local.namespaces.db
      data = {
        (var.postgres_key) = var.postgres_value
      }
    }
  }

  deployments = {
    frontend = {
      name      = local.services.frontend
      namespace = local.namespaces.app
      port      = local.port.frontend
      node_port = local.port.node
      type      = local.type.node_port
      image     = local.image.frontend
      pull      = local.pull.if_not_present
      env       = []
      mounts    = []
      volumes   = []
    },
    backend = {
      name      = local.services.backend
      namespace = local.namespaces.app
      port      = local.port.backend
      type      = local.type.cluster_ip
      image     = local.image.backend
      pull      = local.pull.if_not_present
      env       = []
      mounts    = []
      volumes   = []
    }
    database = {
      name      = local.services.database
      namespace = local.namespaces.db
      port      = local.port.database
      type      = local.type.cluster_ip
      image     = local.image.database
      pull      = local.pull.if_not_present

      env = [
        {
          name   = local.secrets.database_password.name
          key    = var.postgres_key
        }
      ]

      mounts = [
        {
          name = "${local.secrets.database_password.name}-storage"
          path = "/var/lib/postgresql/data"
        }
      ]
    }
  }
}
