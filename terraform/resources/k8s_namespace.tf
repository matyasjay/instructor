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
    POSTGRES_PASSWORD = base64encode("password")
  }

  type = "Opaque"
}

