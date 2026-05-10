# Environment Variables

Complete reference for SYNAPSE environment variables.

:::info Configuration Method
SYNAPSE is configured primarily through environment variables. Create a `.env` file in your deployment directory or set variables in your container orchestration platform.
:::

## Core System Variables

### SYSTEM_NAME

**Description**: Display name for your SYNAPSE instance

**Type**: String

**Default**: `SYNAPSE`

**Example**:
```bash
SYSTEM_NAME="My AI Platform"
```

**Used in**: Dashboard header, logs, notifications

---

### SYNAPSE_VERSION

**Description**: Version tag for tracking deployments

**Type**: String (semver)

**Default**: `v1.0.0`

**Example**:
```bash
SYNAPSE_VERSION=v2.0.0
```

**Used in**: System metadata, API responses, logs

---

### SERVER_PORT

**Description**: Port for backend API server

**Type**: Integer

**Default**: `8080`

**Example**:
```bash
SERVER_PORT=8080
```

**Range**: 1024-65535

---

## Database Configuration

### SPRING_DATASOURCE_URL

**Description**: PostgreSQL connection URL

**Type**: JDBC URL

**Required**: Yes

**Example**:
```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/synapse
```

**Format**:
```
jdbc:postgresql://<host>:<port>/<database>
```

---

### SPRING_DATASOURCE_USERNAME

**Description**: PostgreSQL username

**Type**: String

**Required**: Yes

**Example**:
```bash
SPRING_DATASOURCE_USERNAME=synapse
```

---

### SPRING_DATASOURCE_PASSWORD

**Description**: PostgreSQL password

**Type**: String (secret)

**Required**: Yes

**Example**:
```bash
SPRING_DATASOURCE_PASSWORD=your_secure_password
```

:::danger Production Requirement
Use a strong, randomly generated password in production.
:::

---

### POSTGRES_DB

**Description**: PostgreSQL database name (Docker Compose only)

**Type**: String

**Default**: `synapse`

**Example**:
```bash
POSTGRES_DB=synapse
```

---

### POSTGRES_USER

**Description**: PostgreSQL user (Docker Compose only)

**Type**: String

**Default**: `synapse`

**Example**:
```bash
POSTGRES_USER=synapse
```

---

## Redis Configuration

### REDIS_HOST

**Description**: Redis server hostname

**Type**: String

**Default**: `localhost`

**Example**:
```bash
REDIS_HOST=redis
```

---

### REDIS_PORT

**Description**: Redis server port

**Type**: Integer

**Default**: `6379`

**Example**:
```bash
REDIS_PORT=6379
```

---

### REDIS_PASSWORD

**Description**: Redis authentication password

**Type**: String (secret)

**Required**: Only if Redis auth enabled

**Example**:
```bash
REDIS_PASSWORD=your_redis_password
```

---

### REDIS_DATABASE

**Description**: Redis database number

**Type**: Integer

**Default**: `0`

**Example**:
```bash
REDIS_DATABASE=0
```

**Range**: 0-15

---

## Qdrant Configuration

### QDRANT_HOST

**Description**: Qdrant server hostname

**Type**: String

**Default**: `localhost`

**Example**:
```bash
QDRANT_HOST=qdrant
```

---

### QDRANT_PORT

**Description**: Qdrant gRPC port

**Type**: Integer

**Default**: `6334`

**Example**:
```bash
QDRANT_PORT=6334
```

---

### QDRANT_API_KEY

**Description**: Qdrant API authentication key

**Type**: String (secret)

**Required**: Only if Qdrant auth enabled

**Example**:
```bash
QDRANT_API_KEY=your_qdrant_api_key
```

---

## Security Variables

### JWT_SECRET

**Description**: Secret key for JWT token signing

**Type**: String (secret, min 256 bits)

**Required**: **YES** (production)

**Example**:
```bash
JWT_SECRET=your_256_bit_secret_key_here
```

**Generate**:
```bash
openssl rand -base64 32
```

:::danger Critical Security
- **Never** commit to version control
- **Must** be at least 256 bits (32 bytes)
- **Change** immediately if compromised
- **Rotate** periodically (requires re-issuing all tokens)
:::

---

### SECRETS_ENCRYPTION_KEY

**Description**: Key for encrypting sensitive data at rest

**Type**: String (secret, 32 bytes hex)

**Required**: **YES** (production)

**Example**:
```bash
SECRETS_ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

**Generate**:
```bash
openssl rand -hex 32
```

:::warning Encryption Key
- Used to encrypt API keys, passwords, tokens stored in database
- **Cannot** be changed without re-encrypting all secrets
- **Must** be backed up securely
- Loss = permanent data loss
:::

---

### CORS_ALLOWED_ORIGINS

**Description**: Allowed CORS origins for API

**Type**: Comma-separated URLs

**Default**: `*` (development only!)

**Example**:
```bash
CORS_ALLOWED_ORIGINS=https://app.example.com,https://admin.example.com
```

:::tip Production Security
Always specify explicit origins in production. Never use `*`.
:::

---

## Agent Configuration

### SYNAPSE_AGENTS_PATH

**Description**: Path to agents directory

**Type**: Filesystem path

**Default**: `/app/agents` (Docker), `./agents` (bare-metal)

**Example**:
```bash
SYNAPSE_AGENTS_PATH=/opt/synapse/agents
```

---

### ECHO_ENABLED

**Description**: Enable ECHO debug agent

**Type**: Boolean

**Default**: `true` (development), `false` (production)

**Example**:
```bash
ECHO_ENABLED=false
```

**Purpose**: ECHO is a diagnostic agent for testing.

---

## Store Configuration

### SYNAPSE_STORE_REGISTRY_PATH

**Description**: Path to store registry file

**Type**: Filesystem path

**Default**: `/app/store/registry.yml`

**Example**:
```bash
SYNAPSE_STORE_REGISTRY_PATH=/opt/synapse/store/registry.yml
```

---

### SYNAPSE_STORE_ENABLED

**Description**: Enable plugin store functionality

**Type**: Boolean

**Default**: `true`

**Example**:
```bash
SYNAPSE_STORE_ENABLED=true
```

---

## Logging Configuration

### LOGGING_LEVEL_ROOT

**Description**: Root logging level

**Type**: Log level

**Default**: `INFO`

**Example**:
```bash
LOGGING_LEVEL_ROOT=INFO
```

**Values**: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`

---

### LOGGING_LEVEL_DEV_SYNAPSE

**Description**: SYNAPSE application logging level

**Type**: Log level

**Default**: `INFO`

**Example**:
```bash
LOGGING_LEVEL_DEV_SYNAPSE=DEBUG
```

---

### LOGGING_FILE_NAME

**Description**: Log file path

**Type**: Filesystem path

**Default**: Not set (console only)

**Example**:
```bash
LOGGING_FILE_NAME=/var/log/synapse/application.log
```

---

## Performance & Tuning

### SPRING_JPA_PROPERTIES_HIBERNATE_JDBC_BATCH_SIZE

**Description**: JDBC batch size for inserts

**Type**: Integer

**Default**: `20`

**Example**:
```bash
SPRING_JPA_PROPERTIES_HIBERNATE_JDBC_BATCH_SIZE=50
```

---

### SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE

**Description**: Maximum database connection pool size

**Type**: Integer

**Default**: `20`

**Example**:
```bash
SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE=50
```

**Recommendation**: 
- Small deployment: 10-20
- Medium deployment: 20-50
- Large deployment: 50-100

---

### SPRING_DATASOURCE_HIKARI_MINIMUM_IDLE

**Description**: Minimum idle connections in pool

**Type**: Integer

**Default**: `5`

**Example**:
```bash
SPRING_DATASOURCE_HIKARI_MINIMUM_IDLE=10
```

---

## Model Provider Configuration

### OPENAI_API_KEY

**Description**: OpenAI API key

**Type**: String (secret)

**Required**: Only if using OpenAI models

**Example**:
```bash
OPENAI_API_KEY=sk-proj-...
```

---

### ANTHROPIC_API_KEY

**Description**: Anthropic API key

**Type**: String (secret)

**Required**: Only if using Anthropic models

**Example**:
```bash
ANTHROPIC_API_KEY=sk-ant-...
```

---

### OLLAMA_BASE_URL

**Description**: Ollama server URL

**Type**: URL

**Default**: `http://localhost:11434`

**Example**:
```bash
OLLAMA_BASE_URL=http://ollama:11434
```

---

## Feature Flags

### SPRING_PROFILES_ACTIVE

**Description**: Active Spring profiles

**Type**: Comma-separated strings

**Default**: `default`

**Example**:
```bash
SPRING_PROFILES_ACTIVE=production,monitoring
```

**Common profiles**:
- `development`: Development mode
- `production`: Production mode
- `monitoring`: Enable metrics
- `local-models`: Enable Ollama

---

## Example Configuration Files

### Development (.env.development)

```bash
# System
SYSTEM_NAME=SYNAPSE Development
SYNAPSE_VERSION=v2.0.0-dev

# Database
POSTGRES_DB=synapse_dev
POSTGRES_USER=synapse
POSTGRES_PASSWORD=dev_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Security (Development only!)
JWT_SECRET=dev_secret_key_not_for_production
SECRETS_ENCRYPTION_KEY=dev_key_32_bytes_change_me_now!!

# Logging
LOGGING_LEVEL_DEV_SYNAPSE=DEBUG
ECHO_ENABLED=true
```

### Production (.env.production)

```bash
# System
SYSTEM_NAME=SYNAPSE Production
SYNAPSE_VERSION=v2.0.0

# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/synapse
SPRING_DATASOURCE_USERNAME=synapse
SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=${REDIS_PASSWORD}

# Security
JWT_SECRET=${JWT_SECRET}
SECRETS_ENCRYPTION_KEY=${SECRETS_ENCRYPTION_KEY}

# CORS
CORS_ALLOWED_ORIGINS=https://synapse.example.com

# Performance
SPRING_DATASOURCE_HIKARI_MAXIMUM_POOL_SIZE=50
SPRING_DATASOURCE_HIKARI_MINIMUM_IDLE=10

# Logging
LOGGING_LEVEL_ROOT=WARN
LOGGING_LEVEL_DEV_SYNAPSE=INFO
LOGGING_FILE_NAME=/var/log/synapse/application.log

# Features
ECHO_ENABLED=false
SPRING_PROFILES_ACTIVE=production
```

## Secrets Management

:::tip Best Practice
Use a secrets management solution in production:
:::

### Docker Secrets

```yaml
services:
  backend:
    secrets:
      - jwt_secret
      - db_password
    environment:
      JWT_SECRET_FILE: /run/secrets/jwt_secret
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password

secrets:
  jwt_secret:
    external: true
  db_password:
    external: true
```

### HashiCorp Vault

```bash
# Store secret
vault kv put secret/synapse/jwt_secret value="your_secret"

# Retrieve in startup script
export JWT_SECRET=$(vault kv get -field=value secret/synapse/jwt_secret)
```

### Kubernetes Secrets

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: synapse-secrets
type: Opaque
data:
  jwt-secret: <base64-encoded>
  db-password: <base64-encoded>
```

## Validation

### Required Variables Check

```bash
#!/bin/bash
# validate-env.sh

required_vars=(
  "SPRING_DATASOURCE_URL"
  "SPRING_DATASOURCE_USERNAME"
  "SPRING_DATASOURCE_PASSWORD"
  "JWT_SECRET"
  "SECRETS_ENCRYPTION_KEY"
)

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "ERROR: $var is not set"
    exit 1
  fi
done

echo "✓ All required variables set"
```

## Troubleshooting

### Environment Not Loading

```bash
# Check if .env file exists
ls -la .env

# Verify Docker Compose loads .env
docker-compose config

# Check environment in running container
docker-compose exec backend env | grep SYNAPSE
```

### Secret Too Short

```
Error: JWT_SECRET must be at least 256 bits
```

**Solution**: Generate proper secret:
```bash
openssl rand -base64 32
```

### Variable Not Applied

1. Restart services after changing `.env`
2. Check for typos in variable names
3. Verify no spaces around `=` in `.env`

## Next Steps

- [Docker Compose Deployment](./docker-compose.md)
- [Bare-Metal Installation](./bare-metal.md)
- [Security Guide](../administration/security.md)
- [Configuration Guide](../administration/configuration.md)

