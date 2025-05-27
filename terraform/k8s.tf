resource "kubernetes_namespace" "app" {
  metadata {
    name = "instructor-deployment"
  }
}

resource "kubernetes_namespace" "db" {
  metadata {
    name = "database"
  }
}

resource "kubernetes_secret" "postgres" {
  metadata {
    name      = "postgres-secret"
    namespace = kubernetes_namespace.db.metadata[0].name
  }

  data = {
    POSTGRES_PASSWORD = base64encode("C77ahH3co@")
  }

  type = "Opaque"
}

resource "kubernetes_deployment" "postgres" {
  metadata {
    name      = "postgres"
    namespace = kubernetes_namespace.db.metadata[0].name
    labels = {
      app = "postgres"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "postgres"
      }
    }

    template {
      metadata {
        labels = {
          app = "postgres"
        }
      }

      spec {
        container {
          name  = "postgres"
          image = "postgres:15"

          port {
            container_port = 5432
          }

          env {
            name = "POSTGRES_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.postgres.metadata[0].name
                key  = "POSTGRES_PASSWORD"
              }
            }
          }

          volume_mount {
            name       = "postgres-storage"
            mount_path = "/var/lib/postgresql/data"
          }
        }

        volume {
          name = "postgres-storage"

          empty_dir {} 
        }
      }
    }
  }
}

resource "kubernetes_service" "postgres" {
  metadata {
    name      = "postgres"
    namespace = kubernetes_namespace.db.metadata[0].name
  }

  spec {
    selector = {
      app = "postgres"
    }

    port {
      port        = 5432
      target_port = 5432
    }

    type = "ClusterIP" 
  }
}

resource "kubernetes_deployment" "instructor-frontend" {
  metadata {
    name      = "instructor-frontend"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "instructor-frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "instructor-frontend"
        }
      }

      spec {
        container {
          name  = "instructor-frontend"
          image = "instructor-frontend-app:latest"
          image_pull_policy = "Never"

          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "instructor-frontend" {
  metadata {
    name      = "instructor-frontend"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  spec {
    selector = {
      app = "instructor-frontend"
    }

    port {
      port        = 3000
      target_port = 3000
      node_port   = 30000 
    }

    type = "NodePort"
  }
}

resource "kubernetes_deployment" "instructor-backend" {
  metadata {
    name      = "instructor-backend"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "instructor-backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "instructor-backend"
        }
      }

      spec {
        container {
          name  = "instructor-backend"
          image = "instructor-backend-app:latest"
          image_pull_policy = "Never"

          port {
            container_port = 3333
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "instructor-backend" {
  metadata {
    name      = "instructor-backend"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  spec {
    selector = {
      app = "instructor-backend"
    }

    port {
      port        = 80
      target_port = 3333
    }

    type = "ClusterIP"
  }
}

