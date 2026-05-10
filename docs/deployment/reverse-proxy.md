# Reverse Proxy Setup

Configure a reverse proxy for SYNAPSE to enable HTTPS, load balancing, and professional domain access.

:::tip Recommended Setup
**Traefik** for advanced/automatic features or **Nginx Proxy Manager** for simple homelab setups.
:::

## Why Use a Reverse Proxy?

Benefits:
- ✅ **HTTPS/TLS**: Automatic SSL certificate management
- ✅ **Custom Domain**: `synapse.yourdomain.com` instead of `IP:3000`
- ✅ **Load Balancing**: Distribute traffic across multiple backend instances
- ✅ **Security**: Hide internal network topology
- ✅ **Centralized Access**: Single entry point for all services

## Option 1: Traefik (Recommended for Production)

Traefik is a modern, Docker-native reverse proxy with automatic service discovery and Let's Encrypt integration.

### Why Traefik?

- 🔄 Automatic service discovery from Docker labels
- 🔒 Automatic HTTPS with Let's Encrypt
- 📊 Built-in dashboard and metrics
- 🏢 Enterprise-ready features

### Docker Compose Setup

Create `docker-compose.traefik.yml`:

```yaml
version: '3.8'

services:
  traefik:
    image: traefik:v3.0
    command:
      # API and dashboard
      - --api.dashboard=true
      - --api.insecure=false  # Secure dashboard
      
      # Docker provider
      - --providers.docker=true
      - --providers.docker.exposedbydefault=false
      - --providers.docker.network=web
      
      # Entrypoints
      - --entrypoints.web.address=:80
      - --entrypoints.websecure.address=:443
      
      # HTTPS redirect
      - --entrypoints.web.http.redirections.entryPoint.to=websecure
      - --entrypoints.web.http.redirections.entryPoint.scheme=https
      
      # Let's Encrypt
      - --certificatesresolvers.letsencrypt.acme.email=your@email.com
      - --certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json
      - --certificatesresolvers.letsencrypt.acme.tlschallenge=true
    
    ports:
      - "80:80"
      - "443:443"
    
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - traefik-letsencrypt:/letsencrypt
    
    networks:
      - web
    
    labels:
      # Dashboard
      - "traefik.enable=true"
      - "traefik.http.routers.dashboard.rule=Host(`traefik.yourdomain.com`)"
      - "traefik.http.routers.dashboard.service=api@internal"
      - "traefik.http.routers.dashboard.entrypoints=websecure"
      - "traefik.http.routers.dashboard.tls.certresolver=letsencrypt"
      
      # Basic auth for dashboard
      - "traefik.http.routers.dashboard.middlewares=dashboard-auth"
      - "traefik.http.middlewares.dashboard-auth.basicauth.users=admin:$$apr1$$..."
  
  dashboard:
    build:
      context: ../../packages/dashboard/frontend
    networks:
      - web
      - synapse
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.dashboard-app.rule=Host(`synapse.yourdomain.com`)"
      - "traefik.http.routers.dashboard-app.entrypoints=websecure"
      - "traefik.http.routers.dashboard-app.tls.certresolver=letsencrypt"
      - "traefik.http.services.dashboard-app.loadbalancer.server.port=80"
      - "traefik.docker.network=web"
  
  backend:
    build:
      context: ../../packages/core
    networks:
      - web
      - synapse
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.backend-api.rule=Host(`synapse.yourdomain.com`) && PathPrefix(`/api`)"
      - "traefik.http.routers.backend-api.entrypoints=websecure"
      - "traefik.http.routers.backend-api.tls.certresolver=letsencrypt"
      - "traefik.http.services.backend-api.loadbalancer.server.port=8080"
      - "traefik.docker.network=web"

networks:
  web:
    external: true
  synapse:
    internal: true

volumes:
  traefik-letsencrypt:
```

### Setup Steps

1. **Create external network:**
   ```bash
   docker network create web
   ```

2. **Generate BasicAuth password** for Traefik dashboard:
   ```bash
   # Install htpasswd
   sudo apt-get install apache2-utils  # Debian/Ubuntu
   
   # Generate password
   echo $(htpasswd -nb admin your_password)
   ```
   
   Replace `$$apr1$$...` in compose file with output.

3. **Update DNS:**
   Point `synapse.yourdomain.com` and `traefik.yourdomain.com` to your server IP.

4. **Start Traefik:**
   ```bash
   docker-compose -f docker-compose.traefik.yml up -d
   ```

5. **Verify:**
   - Dashboard: `https://synapse.yourdomain.com`
   - Traefik dashboard: `https://traefik.yourdomain.com`
   - Backend API: `https://synapse.yourdomain.com/api/health`

### Load Balancing

Scale backend with Traefik load balancing:

```bash
docker-compose up -d --scale backend=3
```

Traefik automatically distributes traffic across all backend instances.

---

## Option 2: Nginx Proxy Manager (Homelab-Friendly)

Nginx Proxy Manager provides a simple web UI for managing reverse proxy configurations.

### Why Nginx Proxy Manager?

- 🖱️ Web-based GUI (no config files)
- 🔒 Free Let's Encrypt certificates
- 🏠 Perfect for homelab setups
- 📱 User-friendly interface

### Docker Compose Setup

Create `docker-compose.npm.yml`:

```yaml
version: '3.8'

services:
  nginx-proxy-manager:
    image: jc21/nginx-proxy-manager:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "81:81"  # Admin interface
    volumes:
      - npm-data:/data
      - npm-letsencrypt:/etc/letsencrypt
    networks:
      - web

networks:
  web:
    external: true

volumes:
  npm-data:
  npm-letsencrypt:
```

### Setup Steps

1. **Start Nginx Proxy Manager:**
   ```bash
   docker-compose -f docker-compose.npm.yml up -d
   ```

2. **Access admin interface:**
   ```
   http://your-server-ip:81
   ```
   
   Default credentials:
   - Email: `admin@example.com`
   - Password: `changeme`

3. **Configure proxy host:**
   
   **Dashboard:**
   - Domain: `synapse.yourdomain.com`
   - Scheme: `http`
   - Forward Hostname/IP: `dashboard` (or your server IP)
   - Forward Port: `3000`
   - Enable "Block Common Exploits"
   - Enable "WebSockets Support"
   
   **SSL Certificate:**
   - Request new SSL certificate
   - Select "Let's Encrypt"
   - Force SSL: ✅
   - HTTP/2: ✅

4. **Configure API proxy:**
   
   **Backend API:**
   - Domain: `api.synapse.yourdomain.com`
   - Forward Hostname/IP: `backend`
   - Forward Port: `8080`
   - Advanced → Custom Nginx Configuration:
     ```nginx
     location /ws {
         proxy_pass http://backend:8080;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection "upgrade";
     }
     ```

---

## Option 3: Nginx (Manual Configuration)

For full control, configure Nginx manually.

### Installation

```bash
# Debian/Ubuntu
sudo apt-get update
sudo apt-get install nginx certbot python3-certbot-nginx
```

### Configuration

Create `/etc/nginx/sites-available/synapse`:

```nginx
# HTTP → HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name synapse.yourdomain.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name synapse.yourdomain.com;
    
    # SSL certificates (managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/synapse.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/synapse.yourdomain.com/privkey.pem;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Backend API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # WebSocket
    location /ws {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Enable and Test

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/synapse /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Obtain SSL certificate
sudo certbot --nginx -d synapse.yourdomain.com
```

---

## Security Best Practices

### SSL/TLS Configuration

**Modern SSL configuration:**

```nginx
# Mozilla Modern configuration
ssl_protocols TLSv1.3;
ssl_prefer_server_ciphers off;

# OCSP stapling
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /etc/letsencrypt/live/synapse.yourdomain.com/chain.pem;

# Session cache
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_session_tickets off;
```

### Rate Limiting

**Nginx:**

```nginx
# Define rate limit zone
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

# Apply to API
location /api {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://localhost:8080;
}
```

### Firewall

```bash
# Allow HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Block direct access to backend
sudo ufw deny 8080/tcp

# Enable firewall
sudo ufw enable
```

---

## Troubleshooting

### 502 Bad Gateway

**Cause**: Backend not accessible

**Solution**:
```bash
# Check backend is running
docker-compose ps backend

# Check backend health
curl http://localhost:8080/api/health

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### WebSocket Connection Failed

**Cause**: Missing Upgrade headers

**Solution**: Ensure Nginx config includes:
```nginx
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
```

### Certificate Not Renewing

**Cause**: Port 80 blocked or wrong webroot

**Solution**:
```bash
# Test renewal
sudo certbot renew --dry-run

# Check auto-renewal timer
sudo systemctl status certbot.timer
```

---

## Monitoring

### Traefik Metrics

Access Traefik dashboard:
```
https://traefik.yourdomain.com/dashboard/
```

### Nginx Access Logs

```bash
# Monitor access
sudo tail -f /var/log/nginx/access.log

# Count requests per IP
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr
```

---

## Next Steps

- [SSL/TLS Certificates](https://letsencrypt.org/getting-started/)
- [Security Hardening](../administration/security.md)
- [Monitoring Setup](../administration/monitoring.md)
- [Backup Configuration](./backup-restore.md)

