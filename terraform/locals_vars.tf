locals {
  # ./terraform.tfvars
  vars = {
    postgres = {
      key   = var.postgres_key
      value = var.postgres_value
    }
  }
}
