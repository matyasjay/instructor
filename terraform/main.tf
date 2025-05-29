provider "kubernetes" {
  host                   = "https://127.0.0.1:6443"
  client_certificate     = file("./client_cert.pem")
  client_key             = file("./client_key.pem")
  cluster_ca_certificate = file("./cluster_cert.pem")
}

resource "kubernetes_namespace" "main" {
  metadata {
    name = local.namespace
  }
}

module "deployment" {
  for_each = local.deployments

  source    = "./resources/deployment"
  namespace = local.namespace
  name      = each.value.name
  port      = each.value.port
  type      = each.value.type
  image     = try(each.value.image, null)
  pull      = try(each.value.pull, null)
  node_port = try(each.value.node_port, null)
  env       = try(each.value.env, null)
  mounts    = try(each.value.mounts, null)
  volumes   = try(each.value.volumes, null)
}

module "secret" {
  for_each = local.secrets

  source    = "./resources/secret"
  namespace = local.namespace
  name      = each.value.name
  data      = each.value.data
}

