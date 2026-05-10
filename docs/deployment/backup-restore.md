# Backup & Restore

Comprehensive guide for backing up and restoring SYNAPSE data.

:::danger Data Loss Prevention
Always maintain regular backups before:
- Major version upgrades
- Configuration changes
- System maintenance
- Infrastructure migrations
:::

## What to Back Up

SYNAPSE data is stored in three primary locations:

| Component | Data | Priority | Backup Method |
|-----------|------|----------|---------------|
| **PostgreSQL** | Conversations, users, agents, teams, settings | 🔴 Critical | pg_dump |
| **Redis** | Sessions, cache, message queue | 🟡 Medium | RDB/AOF dumps |
| **Qdrant** | Vector embeddings, memory search | 🔴 Critical | Snapshots |
| **File System** | Agent configs, plugins, store files | 🟠 High | Volume backup |
| **Environment** | Configuration, secrets | 🔴 Critical | .env files |

---

## Quick Backup (All Services)

### Backup Script

Create `backup.sh`:

```bash
#!/bin/bash
set -e

BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Creating SYNAPSE backup in $BACKUP_DIR"

# 1. PostgreSQL
echo "🗄️  Backing up PostgreSQL..."
docker-compose exec -T postgres pg_dumpall -U synapse | gzip > "$BACKUP_DIR/postgres.sql.gz"

# 2. Qdrant snapshots
echo "🔍 Backing up Qdrant..."
docker-compose exec -T qdrant \
  curl -X POST http://localhost:6333/collections/conversations/snapshots
docker-compose exec -T qdrant \
  tar -czf - /qdrant/snapshots > "$BACKUP_DIR/qdrant-snapshots.tar.gz"

# 3. Redis persistence files
echo "💾 Backing up Redis..."
docker-compose exec -T redis redis-cli BGSAVE
sleep 2
docker-compose exec -T redis cat /data/dump.rdb > "$BACKUP_DIR/redis-dump.rdb"

# 4. File system (agents, plugins, store)
echo "📁 Backing up volumes..."
docker run --rm \
  -v synapse_agents:/agents \
  -v synapse_plugins:/plugins \
  -v synapse_store:/store \
  -v $(pwd)/$BACKUP_DIR:/backup \
  busybox tar -czf /backup/volumes.tar.gz /agents /plugins /store

# 5. Configuration
echo "⚙️  Backing up configuration..."
cp .env "$BACKUP_DIR/env.backup"
cp docker-compose.yml "$BACKUP_DIR/docker-compose.yml.backup"

echo "✅ Backup complete: $BACKUP_DIR"
echo "📊 Backup size: $(du -sh $BACKUP_DIR | cut -f1)"

# Optional: Create checksum
cd "$BACKUP_DIR"
sha256sum * > checksums.txt
```

Make executable:
```bash
chmod +x backup.sh
```

### Run Backup

```bash
./backup.sh
```

**Output:**
```
📦 Creating SYNAPSE backup in ./backups/20260510_143022
🗄️  Backing up PostgreSQL...
🔍 Backing up Qdrant...
💾 Backing up Redis...
📁 Backing up volumes...
⚙️  Backing up configuration...
✅ Backup complete: ./backups/20260510_143022
📊 Backup size: 1.2G
```

---

## PostgreSQL Backup & Restore

### Full Database Backup

```bash
# All databases
docker-compose exec -T postgres pg_dumpall -U synapse | gzip > postgres-backup.sql.gz

# Single database (faster)
docker-compose exec -T postgres pg_dump -U synapse synapse | gzip > synapse-db-backup.sql.gz

# Schema only (for testing)
docker-compose exec -T postgres pg_dump -U synapse --schema-only synapse > schema-only.sql
```

### Restore from Backup

```bash
# Stop application
docker-compose stop backend

# Restore all databases
gunzip < postgres-backup.sql.gz | docker-compose exec -T postgres psql -U synapse

# Restore single database
gunzip < synapse-db-backup.sql.gz | docker-compose exec -T postgres psql -U synapse -d synapse

# Restart application
docker-compose start backend
```

---

## Qdrant Backup & Restore

### Create Snapshot

```bash
# Create snapshot for collection
docker-compose exec qdrant curl -X POST \
  http://localhost:6333/collections/conversations/snapshots

# Download snapshot
SNAPSHOT_NAME="conversations-2026-05-10-14-30-22.snapshot"
docker-compose exec qdrant cat "/qdrant/snapshots/$SNAPSHOT_NAME" > qdrant-backup.snapshot
```

### Restore Snapshot

```bash
# Upload snapshot
cat qdrant-backup.snapshot | docker-compose exec -T qdrant \
  tee /qdrant/snapshots/restore.snapshot > /dev/null

# Restore collection
docker-compose exec qdrant curl -X PUT \
  "http://localhost:6333/collections/conversations/snapshots/restore.snapshot?priority=snapshot"
```

---

## Redis Backup & Restore

### Save Current State

```bash
# Trigger save
docker-compose exec redis redis-cli BGSAVE

# Copy dump file
docker-compose exec redis cat /data/dump.rdb > redis-backup.rdb
```

### Restore from Dump

```bash
# Stop Redis
docker-compose stop redis

# Replace dump file
cat redis-backup.rdb | docker-compose exec -T redis tee /data/dump.rdb > /dev/null

# Start Redis
docker-compose start redis
```

---

## Automated Backups

### Cron Job (Linux)

```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * cd /path/to/synapse && ./backup.sh >> /var/log/synapse-backup.log 2>&1
```

### systemd Timer (Linux)

Create `/etc/systemd/system/synapse-backup.service`:

```ini
[Unit]
Description=SYNAPSE Backup Service
After=docker.service

[Service]
Type=oneshot
User=your-user
WorkingDirectory=/path/to/synapse
ExecStart=/path/to/synapse/backup.sh
```

Create `/etc/systemd/system/synapse-backup.timer`:

```ini
[Unit]
Description=SYNAPSE Backup Timer

[Timer]
OnCalendar=daily
OnCalendar=02:00

[Install]
WantedBy=timers.target
```

Enable:
```bash
sudo systemctl enable synapse-backup.timer
sudo systemctl start synapse-backup.timer
```

---

## Disaster Recovery

### Complete System Restore

```bash
#!/bin/bash
# restore.sh
set -e

BACKUP_DIR=$1

# Stop services
docker-compose down

# Restore configuration
cp "$BACKUP_DIR/env.backup" .env

# Start databases
docker-compose up -d postgres redis qdrant
sleep 10

# Restore PostgreSQL
gunzip < "$BACKUP_DIR/postgres.sql.gz" | docker-compose exec -T postgres psql -U synapse

# Restore volumes
docker run --rm \
  -v synapse_agents:/agents \
  -v synapse_plugins:/plugins \
  -v synapse_store:/store \
  -v $(pwd)/$BACKUP_DIR:/backup \
  busybox tar -xzf /backup/volumes.tar.gz

# Start all services
docker-compose up -d
```

---

## Next Steps

- [Monitoring Setup](../administration/monitoring.md)
- [Security Hardening](../administration/security.md)
- [Troubleshooting](./troubleshooting.md)

