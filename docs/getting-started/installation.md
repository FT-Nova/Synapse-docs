# Installation

Comprehensive installation guide for all deployment scenarios.

## Deployment Options

SYNAPSE supports multiple deployment methods:

1. **Docker Compose** (recommended for most users)
2. **Bare-Metal** (Linux, Windows, macOS)
3. **Kubernetes** (optional, for enterprise deployments)

## System Requirements

### Minimum Requirements
- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 20GB
- **OS**: Linux, Windows, macOS

### Recommended Requirements
- **CPU**: 4+ cores
- **RAM**: 8GB+
- **Storage**: 50GB+ SSD
- **OS**: Linux (Ubuntu 22.04+, Debian 12+)

## Docker Compose Installation

See [Quick Start](./quick-start.md) for Docker Compose setup.

## Bare-Metal Installation

### Linux

```bash
# Install Java 25
# Install PostgreSQL 16
# Install Redis 7
# Install Qdrant

# Clone repository
git clone https://github.com/FTMahringer/Synapse.git
cd Synapse

# Build backend
cd packages/core
mvn clean package -DskipTests

# Build frontend
cd ../dashboard/frontend
npm install
npm run build

# Run migrations
# Start services
```

Full bare-metal guide: [Deployment → Bare-Metal](../deployment/bare-metal.md)

### Windows

(Documentation in progress)

### macOS

(Documentation in progress)

## Kubernetes Installation

Kubernetes deployment is optional and recommended for:
- High availability requirements
- Horizontal scaling needs
- Enterprise environments

See [Deployment → Kubernetes](../deployment/kubernetes.md)

## Post-Installation

After installation:

1. **Change default credentials**
2. **Configure API keys** for model providers
3. **Set up backups**
4. **Configure monitoring**
5. **Set up reverse proxy** (production)

## Troubleshooting

Common installation issues: [Deployment → Troubleshooting](../deployment/troubleshooting.md)
