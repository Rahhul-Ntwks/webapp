#!/bin/bash

sudo dnf install -y postgresql-server
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
