variable "name" {
  description = "The name of the deployed service in the Kubernetes cluster"
  type        = string
}

variable "namespace" {
  description = "The name of the Kubernetes cluster"
  type        = string
}

variable "port" {
  description = "The port used for the service inside the container"
  type        = number
  default     = null
}

variable "node_port" {
  description = "The port to expose on the frontend"
  type        = number
  default     = null
}

variable "pull" {
  description = "Docker image pull policy setting"
  type        = string
  default     = null
}

variable "type" {
  description = "The type of the Kubernetes service"
  type        = string
  default     = null
}


variable "image" {
  description = "The docker image to use by the service"
  type        = string
  default     = null
}

variable "env" {
  description = "List of environment variables to inject from secrets"
  type = list(object({
    name   = string
    key    = string
  }))
  default = []
}

variable "mounts" {
  description = "List of volume mounts for containers"
  type = list(object({
    name = string
    path = string
  }))
  default = []
}
