# Architecture

SYNAPSE follows a modular, domain-driven architecture designed for scalability and maintainability.

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                  Vue 3 + TypeScript                          │
│                    (Port 5173)                               │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/WebSocket
┌────────────────────▼────────────────────────────────────────┐
│                      Backend API                             │
│              Spring Boot 4.0 + Java 25                       │
│                    (Port 8080)                               │
├──────────────────────────────────────────────────────────────┤
│  Agents  │  Conversations  │  Plugins  │  Tasks  │  Users   │
└─┬────┬───┴────┬──────┴─────┬──────┴────┬───┴─────┬────────┬─┘
  │    │        │            │           │         │        │
  │    │        │            │           │         │        │
┌─▼────▼────────▼────────────▼───────────▼─────────▼────────▼─┐
│                   Infrastructure Layer                       │
│  Security │ Events │ Logging │ Caching │ Monitoring        │
└───┬───────────┬────────────┬────────────┬────────────────┬──┘
    │           │            │            │                │
┌───▼───┐   ┌───▼────┐   ┌───▼──────┐  ┌─▼──────┐    ┌───▼───┐
│ PostgreSQL│ │ Redis  │   │  Qdrant  │  │ Provider│    │ Plugins│
│  (DB)  │   │ (Cache)│   │ (Vector) │  │  APIs   │    │ System │
└────────┘   └────────┘   └──────────┘  └─────────┘    └────────┘
```

## Package Structure

```
dev.synapse/
├── core/
│   ├── bootstrap/           # Application startup
│   ├── infrastructure/      # Cross-cutting concerns
│   └── common/              # Shared domain entities
├── agents/                  # Agent orchestration
├── conversation/            # Messaging & chat
├── tasks/                   # Task management
├── users/                   # User management & auth
├── providers/               # Model provider integrations
└── plugins/                 # Plugin lifecycle
```

## Technology Stack

### Backend
- **Language**: Java 25
- **Framework**: Spring Boot 4.0.0
- **Security**: Spring Security with JWT
- **Database**: PostgreSQL 16+ with Flyway
- **Caching**: Redis 7+
- **Vector Store**: Qdrant

### Frontend
- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **State**: Pinia
- **Build**: Vite
- **UI**: Custom component library

### Infrastructure
- **Container**: Docker & Docker Compose
- **Orchestration**: Kubernetes (optional)
- **Reverse Proxy**: Traefik / Nginx
- **Monitoring**: Prometheus + Grafana (planned v2.3.0)

## Design Principles

1. **Domain-Driven Design**: Clear domain boundaries
2. **Separation of Concerns**: Layered architecture
3. **Docker-First**: Containerized by default
4. **Self-Hosting Friendly**: Simple deployment
5. **API-First**: RESTful + WebSocket APIs
6. **Extensibility**: Plugin-based architecture

## Data Flow

### Conversation Flow
1. User sends message via WebSocket
2. Frontend transmits to backend
3. Backend retrieves agent configuration
4. Provider integration calls AI model
5. Response streamed back to frontend
6. Message persisted to PostgreSQL
7. Vector embedding stored in Qdrant

### Memory System
- Short-term: Redis cache
- Long-term: PostgreSQL
- Semantic: Qdrant vector store
