#!/bin/bash
cd "$HOME" || exit 1
echo "Current directory initial: $(pwd)"
sudo -i
cd ..
cd ..
echo "updated directory : $(pwd)"
sudo dnf install -y postgresql-server
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql


sudo -u postgres createuser --superuser "${POSTGRES_USER}"
sudo -u postgres createdb "$POSTGRES_DB"
sudo -u postgres psql -c "ALTER USER "$POSTGRES_USER" WITH ENCRYPTED PASSWORD "$POSTGRES_PASSWORD";"
sudo -u postgres psql -c "ALTER DATABASE "$POSTGRES_DB" OWNER TO "$POSTGRES_USER";"


PG_DATA_DIR="/var/lib/pgsql/data"
NEW_AUTH_METHOD="md5"
echo "updated postgres directory : $(pwd)"
sudo cd "$PG_DATA_DIR" || exit 1

sudo sed -i "s/^host[[:space:]]\+all[[:space:]]\+all[[:space:]]\+127\.0\.0\.1\/32[[:space:]]\+ident$/host all all 127.0.0.1\/32 $NEW_AUTH_METHOD/" "$PG_DATA_DIR/pg_hba.conf"

sudo systemctl restart postgresql

