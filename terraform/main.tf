terraform {
  required_providers {
    kubernetes = {
      source   = "hashicorp/kubernetes"
      version  = "~> 2.0"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "matyasjay"

    workspaces {
      name = "instructor-local"
    }
  }
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "kind-instructor-local"
  host           = "http://localhost:3000" 
  insecure       = true
}
