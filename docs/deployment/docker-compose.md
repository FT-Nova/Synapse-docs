# Docker Compose Deployment

Deploy SYNAPSE with Docker Compose for development and production environments.

:::tip Recommended Deployment
Docker Compose is the **recommended deployment method** for most SYNAPSE installations. It's simple, reliable, and production-ready.
:::

## Overview

SYNAPSE Docker Compose deployment includes:
- **PostgreSQL 18**: Primary database
- **Redis 8**: Caching and message bus
- **Qdrant 1.14**: Vector embeddings store
- **Backend**: Spring Boot application (Java 25)
- **Dashboard**: Vue 3 frontend
- **Ollama** (optional): Local AI models

## Quick Start (Development)

### Prerequisites

- Docker 24.0+ ([install](https://docs.docker.com/get-docker/))
- Docker Compose 2.20+ (included with Docker Desktop)
- 4GB RAM minimum, 8GB recommended
- Ports available: 3000, 5432, 6333, 6379, 8080

### 1. Clone Repository

```bash
git clone https://github.com/FTMahringer/Synapse.git
cd Synapse
```

### 2. Start Services

```bash
cd installer/compose
docker-compose up -d
```

This starts all services with development defaults.

### 3. Verify Deployment

```bash
# Check service status
docker-compose ps

# Check logs
docker-compose logs -f backend

# Test backend health
curl http://localhost:8080/api/health
```

### 4. Access Dashboard

Open your browser to:
```
http://localhost:3000
```

Default credentials:
- **Username**: `admin`
- **Password**: `admin`

:::danger Change Defaults
Immediately change the default password after first login!
:::

### 5. Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes data)
docker-compose down -v
```

## Production Deployment

### Prerequisites

- Dedicated server or VM (Linux recommended)
- Docker 24.0+ and Docker Compose 2.20+
- Minimum 8GB RAM, 50GB storage
- Domain name (optional, for HTTPS)
- Firewall configured

### 1. Prepare Environment

Create production environment file:

```bash
cp .env.example .env
```

Edit `.env` with production values:

```bash
# ── System Configuration ──────────────────────────────
SYSTEM_NAME=SYNAPSE
SYNAPSE_VERSION=v2.0.0

# ── Database ──────────────────────────────────────────
POSTGRES_DB=synapse
POSTGRES_USER=synapse
POSTGRES_PASSWORD=YOUR_STRONG_PASSWORD_HERE

# ── Security ──────────────────────────────────────────
JWT_SECRET=YOUR_256_BIT_SECRET_KEY_HERE
SECRETS_ENCRYPTION_KEY=YOUR_32_BYTE_ENCRYPTION_KEY_HERE

# ── Features ──────────────────────────────────────────
ECHO_ENABLED=true
```

:::danger Security Warning
Generate cryptographically secure secrets:

```bash
# JWT Secret (256 bits = 32 bytes)
openssl rand -base64 32

# Encryption Key (32 bytes)
openssl rand -hex 32
```
:::

### 2. Use Production Compose File

```bash
cd installer/compose
docker-compose -f docker-compose.prod.yml up -d
```

Key differences from development:
- **Restart policies**: `unless-stopped` for automatic recovery
- **No port exposure**: Database ports not exposed to host
- **Networks**: Isolated Docker network
- **Persistence**: AOF enabled for Redis
- **Required secrets**: Fails if not provided

### 3. Production Checklist

Before going live:

- [ ] Changed default passwords
- [ ] Generated secure JWT secret
- [ ] Generated secure encryption key
- [ ] Configured firewall (allow 80, 443, optionally 3000)
- [ ] Set up reverse proxy (Traefik or Nginx)
- [ ] Configured TLS/SSL certificates
- [ ] Set up backup automation
- [ ] Configured monitoring
- [ ] Tested disaster recovery
- [ ] Documented configuration

### 4. Health Checks

All services include health checks:

```bash
# Check health status
docker-compose -f docker-compose.prod.yml ps

# Service-specific health checks
docker-compose exec postgres pg_isready
docker-compose exec redis redis-cli ping
docker-compose exec backend curl -f http://localhost:8080/api/health
```

## Configuration

### Environment Variables

See [Environment Variables Reference](./environment-variables.md) for complete list.

**Essential variables:**

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `POSTGRES_PASSWORD` | Database password | `synapse_dev_password` | Production |
| `JWT_SECRET` | JWT signing key | Development default | Production |
| `SECRETS_ENCRYPTION_KEY` | Secrets encryption | Development default | Production |
| `SYSTEM_NAME` | System display name | `SYNAPSE` | No |
| `SYNAPSE_VERSION` | Version tag | `v1.0.0` | No |

### Resource Limits

Add resource limits for production:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 2G
        reservations:
          cpus: '1.0'
          memory: 1G
```

### Persistent Volumes

Data is stored in Docker volumes:

```bash
# List volumes
docker volume ls | grep synapse

# Inspect volume
docker volume inspect synapse-prod_postgres18-data

# Backup volume
docker run --rm \
  -v synapse-prod_postgres18-data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/postgres-backup.tar.gz -C /data .
```

## Using Local Models (Ollama)

Enable local AI models with Ollama:

```bash
# Start with Ollama profile
docker-compose --profile local-models up -d

# Pull a model
docker-compose exec ollama ollama pull llama3.2

# List models
docker-compose exec ollama ollama list
```

Configure agent to use Ollama:

```yaml
# agents/my-agent/config.yml
model:
  provider: ollama
  model: llama3.2
  endpoint: http://ollama:11434
```

## Networking

### Development Mode

Ports exposed to host:
- `3000`: Dashboard (frontend)
- `5432`: PostgreSQL
- `6333`: Qdrant
- `6379`: Redis
- `8080`: Backend API
- `11434`: Ollama (if enabled)

### Production Mode

Only essential ports exposed:
- `3000`: Dashboard (should be behind reverse proxy)

Database ports isolated in `synapse` Docker network.

### Custom Network Configuration

```yaml
networks:
  synapse:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16
```

## Scaling

### Horizontal Scaling

Scale backend replicas:

```bash
docker-compose up -d --scale backend=3
```

:::warning Load Balancer Required
Multiple backend instances require a load balancer (Traefik, Nginx, HAProxy).
:::

### Vertical Scaling

Increase resources per service:

```yaml
services:
  postgres:
    deploy:
      resources:
        limits:
          memory: 8G
```

## Upgrading

### Minor Version Upgrade

```bash
# Pull latest images
docker-compose pull

# Recreate containers
docker-compose up -d

# Check logs
docker-compose logs -f
```

### Major Version Upgrade

Follow migration guide: [Administration → Upgrades](../administration/upgrades.md)

## Troubleshooting

### Services Won't Start

```bash
# Check logs
docker-compose logs

# Check specific service
docker-compose logs backend

# Restart single service
docker-compose restart backend
```

### Database Connection Failed

```bash
# Check PostgreSQL health
docker-compose exec postgres pg_isready -U synapse

# Check connection from backend
docker-compose exec backend nc -zv postgres 5432

# Reset database (DELETES DATA!)
docker-compose down -v
docker-compose up -d
```

### Out of Memory

```bash
# Check resource usage
docker stats

# Increase Docker memory limit (Docker Desktop: Settings → Resources)

# Add memory limits to services
```

### Port Already in Use

```bash
# Find process using port
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Use different ports
BACKEND_PORT=8081 docker-compose up -d
```

### Slow Performance

1. **Check resource limits**: Ensure adequate CPU/RAM
2. **Enable caching**: Verify Redis is running
3. **Optimize database**: Run `VACUUM ANALYZE` on PostgreSQL
4. **Check logs**: Look for slow queries

See [Deployment → Troubleshooting](./troubleshooting.md) for more issues.

## Monitoring

### Basic Monitoring

```bash
# Watch logs
docker-compose logs -f --tail=100

# Resource usage
docker stats

# Service health
docker-compose ps
```

### Advanced Monitoring

See [Administration → Monitoring](../administration/monitoring.md) for:
- Prometheus + Grafana setup
- Application metrics
- Alert configuration

## Backup and Restore

### Manual Backup

```bash
# Backup PostgreSQL
docker-compose exec -T postgres pg_dump -U synapse synapse > backup.sql

# Backup all volumes
./scripts/backup.sh  # (Coming soon)
```

### Manual Restore

```bash
# Restore PostgreSQL
cat backup.sql | docker-compose exec -T postgres psql -U synapse synapse
```

See [Deployment → Backup & Restore](./backup-restore.md) for automated backup.

## Security Hardening

1. **Use secrets management**: HashiCorp Vault, Docker secrets
2. **Enable TLS**: Between services if possible
3. **Restrict network access**: Firewall rules
4. **Regular updates**: Keep images updated
5. **Audit logs**: Enable and monitor

See [Administration → Security](../administration/security.md).

## Production Architecture

Recommended production setup:

```
Internet
    │
    └─→ Reverse Proxy (Traefik/Nginx)
            │ (TLS termination)
            ├─→ Dashboard (load balanced)
            └─→ Backend API (load balanced)
                    │
                    ├─→ PostgreSQL (single or HA)
                    ├─→ Redis (single or Sentinel)
                    └─→ Qdrant (single or cluster)
```