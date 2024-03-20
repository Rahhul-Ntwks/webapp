#!/bin/bash

# Install Ops Agent (replace this with your actual installation steps)
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
sudo cp  /home/csye6225/webapp/logger.yaml /etc/google-cloud-ops-agent/config.yaml

sudo mkdir -p /etc/google/auth
sudo mv /tmp/monitorauth.json /etc/google/auth/application_default_credentials.json
sudo chown root:root /etc/google/auth/application_default_credentials.json
sudo chmod 0400 /etc/google/auth/application_default_credentials.json
echo 'DefaultEnvironment=\"GOOGLE_APPLICATION_CREDENTIALS=/etc/google/auth/application_default_credentials.json\"' | sudo tee -a /etc/systemd/system.conf
sudo systemctl daemon-reload

sudo systemctl restart google-cloud-ops-agent

