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
      port        = 3333
      target_port = 3333
    }

    type = "ClusterIP"
  }
}

