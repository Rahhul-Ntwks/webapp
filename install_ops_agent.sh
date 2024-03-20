#!/bin/bash

# Install Ops Agent (replace this with your actual installation steps)
curl -sSO https://dl.google.com/cloudagents/add-monitoring-agent-repo.sh
bash add-monitoring-agent-repo.sh --also-install

cp  /home/csye6225/webapp/logger.yaml /etc/google-cloud-ops-agent/config.yaml
sudo systemctl restart google-cloud-ops-agent
