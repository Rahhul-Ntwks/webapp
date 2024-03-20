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
  provisioner "file" {
    source      = "webapp.path"
    destination = "/tmp/webapp.path"
  }
  provisioner "shell" {
    script = "script.sh"
  }
  provisioner "shell" {
    script = "install_ops_agent.sh"
  }


}

