variable "PROJECT_ID" {
  type    = string
  default = "PROJECT_ID"
}
variable "SOURCE_IMAGE_FAMILY" {
  type    = string
  default = "SOURCE_IMAGE_FAMILY"
}
variable "SSH_USERNAME" {
  type    = string
  default = "SSH_USERNAME"
}
variable "IMAGE_NAME" {
  type    = string
  default = "IMAGE-NAME"
}
variable "IMAGE_FAMILY" {
  type    = string
  default = "IMAGE-FAMILY"
}
variable "ZONE" {
  type    = string
  default = "ZONE"
}
variable "POSTGRES_DB" {
  type    = string
  default = "POSTGRES_DB"
}

variable "POSTGRES_PASSWORD" {
  type    = string
  default = "POSTGRES_PASSWORD"
}

variable "POSTGRES_USER" {
  type    = string
  default = "POSTGRES_USER"
}

packer {
  required_plugins {
    googlecompute = {
      version = ">= 1"
      source  = "github.com/hashicorp/googlecompute"
    }
  }
}

source "googlecompute" "example" {
  project_id          = "${var.PROJECT_ID}"
  source_image_family = "${var.SOURCE_IMAGE_FAMILY}"
  ssh_username        = "${var.SSH_USERNAME}"
  image_name          = "${lower(var.IMAGE_NAME)}-${formatdate("YYYYMMDDHHmmss", timestamp())}"
  image_family        = "${var.IMAGE_FAMILY}"
  zone                = "${var.ZONE}"
}

build {
  sources = ["source.googlecompute.example"]

  provisioner "shell" {
    inline = ["echo 'Hello, World!'"]
  }

  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/home/centos/webapp.zip"
  }

  provisioner "file" {
    source      = "webapp.service"
    destination = "/tmp/webapp.service"
  }

  provisioner "shell" {
    environment_vars = [
      "POSTGRES_DB=${var.POSTGRES_DB}",
      "POSTGRES_PASSWORD=${var.POSTGRES_PASSWORD}",
      "POSTGRES_USER=${var.POSTGRES_USER}",
    ]
    script = "postgres.sh"
  }

  provisioner "shell" {
    environment_vars = [
      "POSTGRES_DB=${var.POSTGRES_DB}",
      "POSTGRES_PASSWORD=${var.POSTGRES_PASSWORD}",
      "POSTGRES_USER=${var.POSTGRES_USER}",
    ]
    script = "script.sh"
  }
}

