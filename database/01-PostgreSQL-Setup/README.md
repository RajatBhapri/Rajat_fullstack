sudo apt update
sudo apt install postgresql postgresql-contrib -y

sudo systemctl status postgresql

sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user

sudo -i -u postgres

# Open psql CLI

psql -d taskapp_dev

-- Create a new database
CREATE DATABASE taskapp_dev;

-- Optionally create a new user
CREATE USER taskuser WITH PASSWORD 'secret';

-- Give user privileges
GRANT ALL PRIVILEGES ON DATABASE taskapp_dev TO taskuser;

-- Verify
\l

-- Exit
\q

sudo -i -u postgres
psql -d taskapp_dev
