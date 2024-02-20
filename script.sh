#!/bin/bash
sudo dnf update

sudo dnf install -y gcc-c++ make 
curl -sL https://rpm.nodesource.com/setup_20.x | sudo -E bash - 

sudo dnf install nodejs npm -y

node -v
npm -v

sudo dnf install curl zip unzip -y

sudo groupadd -r csye6225 || true

sudo useradd -r -g csye6225 -s /usr/sbin/nologin csye6225 || true

sudo mkdir -p /home/csye6225/webapp

sudo cp /home/centos/webapp.zip /home/csye6225/webapp/webapp.zip

cd /home/csye6225/webapp

sudo unzip webapp.zip

cd webapp

sudo ls -ltrah



sudo npm ci
sudo npm install --save

sudo chmod -R 740 /home/csye6225
sudo chown -R csye6225:csye6225 /home/csye6225/webapp
sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service
sudo systemctl daemon-reload
sudo systemctl enable webapp
sudo systemctl start webapp
sudo echo $?
sleep 20
sudo systemctl status webapp
sudo echo $?
