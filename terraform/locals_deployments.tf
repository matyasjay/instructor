locals {
  deployments = {
    frontend = {
      name      = local.services.frontend
      namespace = local.namespaces.app
      port      = local.ports.frontend
      node_port = local.ports.node
      type      = local.const.node_port
      image     = local.images.frontend
      pull      = local.const.pull_if_not_present
      env       = []
      mounts    = []
    },
    backend = {
      name      = local.services.backend
      namespace = local.namespaces.app
      port      = local.ports.backend
      type      = local.const.cluster_ip
      image     = local.images.backend
      pull      = local.const.pull_if_not_present
      env       = []
      mounts    = []
    }
    database = {
      name      = local.services.database
      namespace = local.namespaces.db
      port      = local.ports.database
      type      = local.const.cluster_ip
      image     = local.images.database
      pull      = local.const.pull_if_not_present
      env       = local.envs.database
      mounts    = local.mounts.database
    }
  }
}
