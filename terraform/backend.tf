terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "matyasjay"

    workspaces {
      name = "instructor"
    }
  }
}

