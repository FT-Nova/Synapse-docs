# Kubernetes Deployment (Optional)

Deploy SYNAPSE on Kubernetes for advanced orchestration and scaling.

:::info Docker-First Philosophy
Kubernetes is **optional** for SYNAPSE. Docker Compose is the recommended deployment method for most users.

Use Kubernetes only if you:
- Already operate a Kubernetes cluster
- Need multi-node high availability
- Require enterprise-grade orchestration
- Want advanced scaling and resource management
:::

## Prerequisites

- **Kubernetes cluster** (1.28+) with kubectl access
- **Helm 3** (optional, for Helm chart installation)
- **Storage class** for persistent volumes
- **Ingress controller** (Traefik or Nginx recommended)

---

## Quick Start with Manifests

### 1. Create Namespace

```bash
kubectl create namespace synapse
```

### 2. Create Secrets

```bash
kubectl create secret generic synapse-secrets \
  --from-literal=postgres-password=$(openssl rand -base64 32) \
  --from-literal=jwt-secret=$(openssl rand -base64 32) \
  --from-literal=secrets-encryption-key=$(openssl rand -hex 32) \
  -n synapse
```

### 3. Deploy PostgreSQL

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: synapse
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:18
        env:
        - name: POSTGRES_DB
          value: synapse
        - name: POSTGRES_USER
          value: synapse
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: synapse-secrets
              key: postgres-password
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: postgres-data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 20Gi
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: synapse
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
```

### 4. Deploy Redis

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: synapse
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:8
        ports:
        - containerPort: 6379
---
apiVersion: v1
kind: Service
metadata:
  name: redis
  namespace: synapse
spec:
  selector:
    app: redis
  ports:
  - port: 6379
```

### 5. Deploy Qdrant

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: qdrant
  namespace: synapse
spec:
  serviceName: qdrant
  replicas: 1
  selector:
    matchLabels:
      app: qdrant
  template:
    metadata:
      labels:
        app: qdrant
    spec:
      containers:
      - name: qdrant
        image: qdrant/qdrant:v1.14.1
        ports:
        - containerPort: 6333
        volumeMounts:
        - name: qdrant-data
          mountPath: /qdrant/storage
  volumeClaimTemplates:
  - metadata:
      name: qdrant-data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
---
apiVersion: v1
kind: Service
metadata:
  name: qdrant
  namespace: synapse
spec:
  selector:
    app: qdrant
  ports:
  - port: 6333
```

### 6. Deploy SYNAPSE Backend

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: synapse-backend
  namespace: synapse
spec:
  replicas: 3
  selector:
    matchLabels:
      app: synapse-backend
  template:
    metadata:
      labels:
        app: synapse-backend
    spec:
      containers:
      - name: backend
        image: ftmahringer/synapse-backend:2.0.0
        env:
        - name: SPRING_DATASOURCE_URL
          value: jdbc:postgresql://postgres:5432/synapse
        - name: SPRING_DATASOURCE_USERNAME
          value: synapse
        - name: SPRING_DATASOURCE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: synapse-secrets
              key: postgres-password
        - name: SPRING_REDIS_HOST
          value: redis
        - name: QDRANT_HOST
          value: qdrant
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: synapse-secrets
              key: jwt-secret
        ports:
        - containerPort: 8080
        livenessProbe:
          httpGet:
            path: /api/health
            port: 8080
          initialDelaySeconds: 30
        readinessProbe:
          httpGet:
            path: /api/health
            port: 8080
          initialDelaySeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: synapse-backend
  namespace: synapse
spec:
  selector:
    app: synapse-backend
  ports:
  - port: 8080
```

### 7. Deploy Dashboard

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: synapse-dashboard
  namespace: synapse
spec:
  replicas: 2
  selector:
    matchLabels:
      app: synapse-dashboard
  template:
    metadata:
      labels:
        app: synapse-dashboard
    spec:
      containers:
      - name: dashboard
        image: ftmahringer/synapse-dashboard:2.0.0
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: synapse-dashboard
  namespace: synapse
spec:
  selector:
    app: synapse-dashboard
  ports:
  - port: 80
```

### 8. Create Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: synapse
  namespace: synapse
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: traefik
  tls:
  - hosts:
    - synapse.yourdomain.com
    secretName: synapse-tls
  rules:
  - host: synapse.yourdomain.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: synapse-backend
            port:
              number: 8080
      - path: /
        pathType: Prefix
        backend:
          service:
            name: synapse-dashboard
            port:
              number: 80
```

---

## Scaling

### Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: synapse-backend-hpa
  namespace: synapse
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: synapse-backend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

---

## Next Steps

- [Docker Compose Deployment](./docker-compose.md) (Recommended)
- [Reverse Proxy Setup](./reverse-proxy.md)
- [Backup & Restore](./backup-restore.md)

