provider "kubernetes" {
  host                   = "https://127.0.0.1:6443"
  client_certificate     = file("./client_cert.pem")
  client_key             = file("./client_key.pem")
  cluster_ca_certificate = file("./cluster_cert.pem")
}

module "namespace" {
  for_each = local.namespaces

  source = "./resources/namespace"
  name   = each.value
}

module "deployment" {
  for_each = local.deployments

  source    = "./resources/deployment"
  namespace = each.value.namespace
  name      = each.value.name
  port      = each.value.port
  type      = each.value.type
  image     = try(each.value.image, null)
  pull      = try(each.value.pull, null)
  node_port = try(each.value.node_port, null)
  env       = try(each.value.env, null)
  mounts    = try(each.value.mounts, null)
}

module "secret" {
  for_each = local.secrets

  source    = "./resources/secret"
  namespace = each.value.namespace
  name      = each.value.name
  data      = each.value.data
}

