packer {
  required_plugins {
    googlecompute = {
      version = ">= 1"
      source  = "github.com/hashicorp/googlecompute"
    }
  }
}

source "googlecompute" "example" {
    project_id          = "dev-project-414806"
    source_image_family = "centos-stream-8"
    ssh_username        = "centos"
    image_name          = "dev-packer"
    image_family        = "devpackerfamily"
    zone                = "us-central1-a"
}

build {
    sources = ["source.googlecompute.example"]

    provisioner "shell" {
      inline = ["echo 'Hello, World!'"]
    }

    provisioner "shell" {
      script = "script.sh"
    }

    provisioner "shell" {
      script = "postgres.sh"
    }
}

