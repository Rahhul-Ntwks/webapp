

sudo dnf remove nsolid nodejs -y
sudo dnf clean all

sudo dnf install -y gcc-c++ make 
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash - 
sudo dnf install nodejs npm --allowerasing -y

node -v
npm -v

sudo dnf install curl zip unzip -y

sudo groupadd -r csye6225 || true
sudo useradd -r -g csye6225 -s /usr/sbin/nologin csye6225 || true


sudo mkdir -p /home/csye6225/webapp
sudo chmod -R 755 /home/csye6225
sudo chown -R csye6225:csye6225 /home/csye6225
sudo cp /home/centos/webapp.zip /home/csye6225/webapp/webapp.zip
cd /home/csye6225/webapp
sudo unzip webapp.zip
cd webapp

sudo ls -ltrah
sudo npm ci
sudo npm install --save

sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service
sudo mv /tmp/webapp.path /etc/systemd/system/webapp.path
ls /etc/systemd/system/
sudo dnf install nano -y
sudo cat /etc/systemd/system/webapp.service
sudo systemctl daemon-reload
sudo systemctl enable webapp.path
sudo systemctl start webapp.path

sudo echo $?

sleep 20
sudo systemctl status webapp

sudo echo $?
