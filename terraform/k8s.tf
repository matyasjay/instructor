resource "kubernetes_namespace" "app" {
  metadata {
    name = "instructor-deployment"
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
