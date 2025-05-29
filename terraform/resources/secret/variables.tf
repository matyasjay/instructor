variable "name" {
  description = "Name of the secret"
  type        = string
}

variable "namespace" {
  description = "Namespace for the secret"
  type        = string
}

variable "data" {
  description = "Map of key-value pairs for the secret (will be base64-encoded automatically)"
  type        = map(string)
}
