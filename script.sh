

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

ENV_FILE=".env"
sudo tee "$ENV_FILE" > /dev/null << EOF
POSTGRES_DB="$POSTGRES_DB"
POSTGRES_PASSWORD="$POSTGRES_PASSWORD"
POSTGRES_USER="$POSTGRES_USER"
EOF

echo "lavada code"
cat .env

echo "The .env file has been created with the PostgreSQL values."



sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service
ls /etc/systemd/system/
sudo dnf install nano -y
sudo cat /etc/systemd/system/webapp.service
sudo systemctl daemon-reload
sudo systemctl enable webapp
sudo systemctl start webapp

sudo echo $?

sleep 20
sudo systemctl status webapp

sudo echo $?
