#!/bin/bash
set -e


DB_HOST="${DB_HOST}"
DB_USERNAME="${DB_USERNAME}"
DB_PASSWORD="${DB_PASSWORD}"
DB_NAME="${DB_NAME}"

sudo dnf install -y postgresql


psql -h "${DB_HOST}" -U "${DB_USERNAME}" -d "${DB_NAME}" -c "SELECT version();"

echo "Connection to Cloud SQL instance successful."
