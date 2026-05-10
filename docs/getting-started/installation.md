---
sidebar_position: 2
---

# Installation

Complete installation guide for all deployment scenarios.

## Deployment Options

| Method | Best for | Difficulty |
|--------|----------|------------|
| [Docker Compose](#docker-compose) | Most users, development, small teams | Easy |
| [Bare-Metal (Linux)](#bare-metal-linux) | Custom setups, advanced control | Medium |
| [Kubernetes](#kubernetes) | Enterprise, high availability, scaling | Hard |

---

## System Requirements

### Minimum

| Resource | Requirement |
|----------|-------------|
| CPU | 2 cores |
| RAM | 4 GB |
| Storage | 20 GB |
| OS | Linux, Windows, macOS |

### Recommended (Production)

| Resource | Requirement |
|----------|-------------|
| CPU | 4+ cores |
| RAM | 8 GB+ |
| Storage | 50 GB+ SSD |
| OS | Ubuntu 22.04+ or Debian 12+ |

### Required Software (Docker Compose)

- [Docker 24.0+](https://docs.docker.com/get-docker/)
- Docker Compose 2.20+ (included with Docker Desktop)

### Required Software (Bare-Metal)

- Java 25 (Temurin recommended)
- PostgreSQL 18
- Redis 8
- Qdrant 1.14
- Node.js 24+ (for frontend)
- Maven 3.9+

---

## Docker Compose

The fastest way to get SYNAPSE running. All services start with a single command.

### Step 1 — Clone the Repository

```bash
git clone https://github.com/FTMahringer/Synapse.git
cd Synapse
```

### Step 2 — Configure Environment

```bash
cp .env.example .env
```

Open `.env` and set at minimum:

```bash
# Required for production — leave defaults only for local development
POSTGRES_PASSWORD=change_me
JWT_SECRET=your_256_bit_secret_here
SECRETS_ENCRYPTION_KEY=your_32_byte_key_here
```

Generate secure values:

```bash
openssl rand -base64 32   # JWT_SECRET
openssl rand -hex 32      # SECRETS_ENCRYPTION_KEY
```

:::danger
Never use the default `.env` values in a production deployment. Change all passwords and secrets before starting services.
:::

### Step 3 — Start Services

```bash
cd installer/compose
docker compose up -d
```

First run downloads all images (may take a few minutes). Subsequent starts are fast.

### Step 4 — Verify All Services Are Healthy

```bash
# Check container status
docker compose ps

# Expected output: all containers "healthy" or "running"
```

Wait until the backend is ready (usually 30–60 seconds):

```bash
# Poll until healthy
until curl -sf http://localhost:8080/api/health | grep -q '"status":"UP"'; do
  echo "Waiting for backend..."
  sleep 3
done
echo "SYNAPSE is ready!"
```

### Step 5 — Access the Dashboard

Open your browser:

```
http://localhost:3000
```

Default credentials:

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin` |

:::warning
Change the default password immediately after first login: **Profile → Security → Change Password**
:::

### Step 6 — Configure Your First Provider

After login, go to **Settings → Providers** and add at least one AI model provider:

- **Anthropic**: Add your API key for Claude models
- **OpenAI**: Add your API key for GPT models
- **Ollama**: No API key needed — runs locally (see [Local Models](#local-models-ollama))

### Done

SYNAPSE is running. Continue to [Your First Agent](./first-agent.md) to create your first agent.

---

## Bare-Metal (Linux)

Manual installation on Linux without Docker. Gives full control over each service.

### Step 1 — Install Dependencies

**Java 25 (Temurin)**:

```bash
# Ubuntu/Debian
wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public | sudo apt-key add -
echo "deb https://packages.adoptium.net/artifactory/deb $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/adoptium.list
sudo apt update
sudo apt install temurin-25-jdk
java -version  # Verify: openjdk version "25"
```

**PostgreSQL 18**:

```bash
sudo apt install -y postgresql-18
sudo systemctl enable --now postgresql
```

**Redis 8**:

```bash
sudo apt install -y redis-server
sudo systemctl enable --now redis-server
```

**Qdrant 1.14**:

```bash
curl -L https://github.com/qdrant/qdrant/releases/download/v1.14.0/qdrant-x86_64-unknown-linux-gnu.tar.gz | tar xz
sudo mv qdrant /usr/local/bin/qdrant
```

**Node.js 24**:

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
```

**Maven 3.9+**:

```bash
sudo apt install -y maven
mvn -version  # Verify: Apache Maven 3.9+
```

### Step 2 — Set Up PostgreSQL

```bash
sudo -u postgres psql <<'SQL'
CREATE USER synapse WITH PASSWORD 'your_db_password';
CREATE DATABASE synapse OWNER synapse;
\q
SQL
```

### Step 3 — Clone and Build

```bash
git clone https://github.com/FTMahringer/Synapse.git
cd Synapse
```

**Build the backend**:

```bash
cd packages/core
mvn clean package -DskipTests
```

The JAR is produced at `target/synapse-core-*.jar`.

**Build the frontend**:

```bash
cd ../dashboard/frontend
npm install
npm run build
```

Static files are in `dist/`.

### Step 4 — Configure

Create `/etc/synapse/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/synapse
    username: synapse
    password: your_db_password
  data:
    redis:
      host: localhost
      port: 6379

synapse:
  jwt:
    secret: your_256_bit_jwt_secret
  secrets:
    encryption-key: your_32_byte_encryption_key
  vault:
    storage_path: /var/lib/synapse/vaults
```

### Step 5 — Run Migrations

Flyway runs automatically on first start. Ensure PostgreSQL is running and credentials are correct.

### Step 6 — Start Services

**Qdrant**:

```bash
qdrant &
```

**Backend**:

```bash
java -jar packages/core/target/synapse-core-*.jar \
  --spring.config.location=/etc/synapse/application.yml
```

**Frontend** (serve with Nginx or Node.js):

```bash
# Simple serve for testing
npx serve packages/dashboard/frontend/dist -l 3000
```

For production, use [Nginx as a reverse proxy](../deployment/reverse-proxy.md).

### Step 7 — Verify

```bash
curl http://localhost:8080/api/health
# Expected: {"status":"UP"}
```

---

## Kubernetes

Kubernetes is optional. Recommended only for:

- High availability requirements
- Horizontal scaling
- Enterprise environments with existing Kubernetes clusters

See [Deployment → Kubernetes](../deployment/kubernetes.md) for the full guide, including Helm chart usage and resource requirements.

---

## Local Models (Ollama)

Run AI models locally without sending data to external providers.

### With Docker Compose

```bash
# Start all services including Ollama
docker compose --profile local-models up -d

# Pull a model (example: Llama 3.2)
docker compose exec ollama ollama pull llama3.2

# Verify
docker compose exec ollama ollama list
```

### Bare-Metal

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull a model
ollama pull llama3.2
```

Then add Ollama as a provider in SYNAPSE: **Settings → Providers → Add Provider → Ollama**.

---

## Post-Installation Checklist

After any installation method:

- [ ] Changed default admin password
- [ ] Configured at least one AI model provider
- [ ] Generated and set secure JWT secret
- [ ] Generated and set secure encryption key
- [ ] Configured firewall (allow 80/443, block database ports externally)
- [ ] Set up reverse proxy with TLS for production (see [Reverse Proxy](../deployment/reverse-proxy.md))
- [ ] Configured automated backups (see [Backup & Restore](../deployment/backup-restore.md))
- [ ] Set up monitoring (see [Monitoring](../administration/monitoring.md))

---

## Troubleshooting

Common installation issues: [Deployment → Troubleshooting](../deployment/troubleshooting.md)

### Backend Won't Start

```bash
# Check logs
docker compose logs backend        # Docker Compose
journalctl -u synapse-backend      # systemd
```

Common causes:
- Database not ready yet (retry after 30s)
- Wrong `POSTGRES_PASSWORD` in `.env`
- Port 8080 already in use

### Database Connection Failed

```bash
# Test connection
psql postgresql://synapse:your_password@localhost:5432/synapse -c "SELECT 1;"

# Docker Compose: check Postgres health
docker compose exec postgres pg_isready -U synapse
```

### Port Already in Use

```bash
# Find what is using port 8080
lsof -i :8080          # macOS / Linux
netstat -ano | findstr :8080   # Windows

# Use a different port
BACKEND_PORT=8081 docker compose up -d
```
