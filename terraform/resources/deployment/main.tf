locals {
  volumes = [
    for m in var.mounts : {
      name      = m.name
      empty_dir = {}
    }
  ]

  mounts = [
    for m in var.mounts : {
      name       = m.name
      mount_path = m.path
    }
  ]
}

resource "kubernetes_deployment" "main" {
  metadata {
    name      = var.name
    namespace = var.namespace

    labels = {
      app = var.name
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = var.name
      }
    }

    template {
      metadata {
        labels = {
          app = var.name
        }
      }

      spec {
        container {
          name = var.name
          image = var.image
          image_pull_policy = var.pull

          port {
            container_port = var.port
          }

          dynamic "env" {
            for_each = var.env

            content {
              name = env.value.key

              value_from {
                secret_key_ref {
                  name = env.value.name
                  key  = env.value.key
                }
              }
            }
          }

          dynamic "volume_mount" {
            for_each = local.mounts
            content {
              name       = volume_mount.value.name
              mount_path = volume_mount.value.mount_path
            }
          }
        }

        dynamic "volume" {
          for_each = local.volumes
          content {
            name = volume.value.name
            empty_dir {}
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "main" {
  metadata {
    name      = var.name
    namespace = var.namespace
  }

  spec {
    selector = {
      app = var.name
    }

    port {
      port        = var.port
      target_port = var.port
      node_port   = var.node_port
    }

    type = var.type
  }
}

