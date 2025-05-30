resource "kubernetes_secret" "main" {
  metadata {
    name      = var.name
    namespace = var.namespace
  }

  data = {
    for k, v in var.data :
    k => base64encode(v)
  }

  type = "Opaque"
}

