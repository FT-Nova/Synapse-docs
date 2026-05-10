# Bare-Metal Installation

Install SYNAPSE directly on Linux, Windows, or macOS without Docker.

:::warning Production Use
Docker deployment is recommended for production. Bare-metal installation is ideal for:
- Development environments
- Resource-constrained systems
- Custom infrastructure setups
- Learning and experimentation
:::

## Prerequisites

### Common Requirements

- **Java 25** or later (GraalVM recommended)
- **Node.js 24** or later (for dashboard)
- **PostgreSQL 18** or later
- **Redis 8** or later
- **Qdrant 1.14** or later

### System Requirements

- **RAM**: Minimum 4GB, recommended 8GB+
- **Disk**: 10GB+ free space
- **CPU**: 2+ cores

---

## Linux Installation (Ubuntu/Debian)

### 1. Install Java 25

```bash
# Add Adoptium repository
wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | sudo tee /etc/apt/trusted.gpg.d/adoptium.asc
echo "deb https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | sudo tee /etc/apt/sources.list.d/adoptium.list

# Install OpenJDK 25
sudo apt-get update
sudo apt-get install temurin-25-jdk

# Verify
java -version
```

### 2. Install PostgreSQL 18

```bash
# Add PostgreSQL repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Install
sudo apt-get update
sudo apt-get install postgresql-18

# Create database and user
sudo -u postgres psql <<EOF
CREATE USER synapse WITH PASSWORD 'your_secure_password';
CREATE DATABASE synapse OWNER synapse;
GRANT ALL PRIVILEGES ON DATABASE synapse TO synapse;
EOF
```

### 3. Install Redis 8

```bash
# Add Redis repository
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

# Install
sudo apt-get update
sudo apt-get install redis

# Start
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

### 4. Install Qdrant

```bash
# Download Qdrant binary
wget https://github.com/qdrant/qdrant/releases/download/v1.14.1/qdrant-x86_64-unknown-linux-gnu.tar.gz
tar -xzf qdrant-x86_64-unknown-linux-gnu.tar.gz
sudo mv qdrant /usr/local/bin/

# Create systemd service
sudo tee /etc/systemd/system/qdrant.service > /dev/null <<EOF
[Unit]
Description=Qdrant Vector Database
After=network.target

[Service]
Type=simple
User=qdrant
WorkingDirectory=/var/lib/qdrant
ExecStart=/usr/local/bin/qdrant
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

# Create user and directory
sudo useradd -r -s /bin/false qdrant
sudo mkdir -p /var/lib/qdrant
sudo chown qdrant:qdrant /var/lib/qdrant

# Start
sudo systemctl daemon-reload
sudo systemctl enable qdrant
sudo systemctl start qdrant
```

### 5. Install Node.js 24

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
source ~/.bashrc

# Install Node.js 24
nvm install 24
nvm use 24
```

### 6. Clone and Build SYNAPSE

```bash
# Clone repository
git clone https://github.com/FTMahringer/Synapse.git
cd Synapse

# Build backend
cd packages/core
./mvnw clean package -DskipTests

# Build frontend
cd ../dashboard/frontend
npm install
npm run build
```

### 7. Configure Environment

Create `.env` in repository root:

```bash
# Application
APP_URL=http://localhost:8080
FRONTEND_URL=http://localhost:3000

# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/synapse
SPRING_DATASOURCE_USERNAME=synapse
SPRING_DATASOURCE_PASSWORD=your_secure_password

# Redis
SPRING_REDIS_HOST=localhost
SPRING_REDIS_PORT=6379

# Qdrant
QDRANT_HOST=localhost
QDRANT_PORT=6333

# Security
JWT_SECRET=$(openssl rand -base64 32)
SECRETS_ENCRYPTION_KEY=$(openssl rand -hex 32)

# Server
SERVER_PORT=8080
```

### 8. Run SYNAPSE

```bash
# Start backend
cd packages/core
java -jar target/synapse-core-2.0.0.jar &

# Start frontend (new terminal)
cd packages/dashboard/frontend
npm run preview &
```

---

## Windows Installation

### 1. Install Java, PostgreSQL, Redis, Qdrant, Node.js

Download and install from:
- **Java 25**: [Adoptium](https://adoptium.net/)
- **PostgreSQL 18**: [PostgreSQL.org](https://www.postgresql.org/download/windows/)
- **Redis**: Use [Memurai](https://www.memurai.com/) or WSL
- **Qdrant**: Download from [GitHub releases](https://github.com/qdrant/qdrant/releases)
- **Node.js 24**: [nodejs.org](https://nodejs.org/)

### 2. Build and Run

```powershell
git clone https://github.com/FTMahringer/Synapse.git
cd Synapse

# Build backend
cd packages\core
.\mvnw.cmd clean package -DskipTests

# Build frontend
cd ..\dashboard\frontend
npm install
npm run build

# Create .env file (see Linux section)

# Run
cd packages\core
java -jar target\synapse-core-2.0.0.jar
```

---

## macOS Installation

### Using Homebrew

```bash
# Install dependencies
brew install openjdk@25 postgresql@18 redis node@24
brew tap qdrant/qdrant && brew install qdrant

# Start services
brew services start postgresql@18
brew services start redis
brew services start qdrant

# Setup database
createuser -s synapse
createdb -O synapse synapse

# Clone and build (see Linux section)
```

---

## Verification

```bash
# Check PostgreSQL
psql -U synapse -h localhost -d synapse -c "SELECT version();"

# Check Redis
redis-cli ping

# Check Qdrant
curl http://localhost:6333/collections

# Check SYNAPSE
curl http://localhost:8080/api/health
```

---