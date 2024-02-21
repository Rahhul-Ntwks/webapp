variable "PROJECT_ID" {
  type    = string
  default = "project_id"
}
variable "SOURCE_IMAGE_FAMILY" {
  type    = string
  default = "source_image_family"
}
variable "SSH_USERNAME" {
  type    = string
  default = "ssh_username"
}
variable "IMAGE_NAME" {
  type    = string
  default = "image_name"
}
variable "IMAGE_FAMILY"{
  type = string
  default = "image_family"
}
variable "ZONE"{
  type = string
  default = "zone"
}
variable "CREDENTIALS_FILE"{
  type = string
  default = "credentials_file"
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
    image_name          = "${var.IMAGE_NAME}"
    image_family        = "${var.IMAGE_FAMILY}"
    zone                = "${var.ZONE}"
    credentials_file    = "${var.CREDENTIALS_FILE}"
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

