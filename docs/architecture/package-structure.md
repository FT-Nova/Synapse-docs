# Package Architecture

SYNAPSE v2.1.0 introduced a clean, domain-driven package architecture, moving from a monolithic core structure to clearly separated modules.

## Overview

```
dev/synapse/
├── core/
│   ├── SynapseApplication.java      # Main application entry point
│   ├── bootstrap/                   # Startup, health, migrations
│   ├── infrastructure/              # Cross-cutting concerns
│   ├── common/                      # Shared domain & repositories
│   └── dto/                         # Request/Response objects
│
├── agents/                          # Agent orchestration & teams
├── conversation/                    # Conversation lifecycle & messaging
├── tasks/                           # Task & project management
├── users/                           # User management & authentication
├── providers/                       # Model provider integrations
└── plugins/                         # Plugin lifecycle & store
```

## Module Responsibilities

### core/bootstrap
Application bootstrapping and health monitoring:
- `SynapseApplication.java` - Spring Boot entry point
- `HealthController.java` - `/api/health` endpoint
- `DatabaseMigrationRunner.java` - Flyway migration execution

### core/infrastructure
Cross-cutting technical concerns:
- **security/** - JWT, authentication, encryption
- **logging/** - Structured logging, system logs
- **event/** - Event publishing (Redis/in-memory)
- **exception/** - Global exception handling
- **config/** - Spring Boot configuration
- **metrics/** - Prometheus metrics (v2.1.1+)

### core/common
Shared domain entities and repository interfaces:
- **domain/** - JPA entities (Agent, Conversation, Task, etc.)
- **repository/** - Spring Data JPA repositories

All feature modules depend on this layer.

### core/dto
Request and response data transfer objects:
- API request payloads
- API response structures
- Clean separation from domain entities

### agents/
Agent orchestration, teams, and AI-firm system:
- `AgentController.java` - Agent management API
- `AgentService.java` - Agent lifecycle
- `AgentTeamService.java` - Team coordination
- `AgentDispatchService.java` - AI-firm routing

### conversation/
Conversation lifecycle and real-time messaging:
- `ConversationController.java` - Conversation API
- `ConversationService.java` - Conversation management
- `MessageService.java` - Message handling
- **realtime/** - WebSocket & SSE for live updates

### tasks/
Task and project management:
- `TaskController.java` - Task API
- `TaskService.java` - Task lifecycle

### users/
User management and authentication:
- `UserController.java` - User API
- `UserService.java` - User management

### providers/
Model provider integrations (Anthropic, OpenAI, Ollama):
- `ModelProviderController.java` - Provider management
- `ModelProviderService.java` - Provider abstraction
- **anthropic/** - Claude integration
- **openai/** - GPT integration
- **ollama/** - Local model integration

### plugins/
Plugin system and marketplace:
- `PluginController.java` - Plugin API
- `PluginService.java` - Plugin lifecycle
- `StoreController.java` - Marketplace API
- `BundleInstallService.java` - Plugin installation

## Component Scanning

Spring Boot automatically scans all packages:

```java
@SpringBootApplication(scanBasePackages = {
    "dev.synapse.core",
    "dev.synapse.agents",
    "dev.synapse.conversation",
    "dev.synapse.tasks",
    "dev.synapse.users",
    "dev.synapse.providers",
    "dev.synapse.plugins"
})
public class SynapseApplication { ... }
```

## Design Principles

### 1. Single Responsibility
Each module has one clear purpose:
- `agents/` = agent orchestration
- `conversation/` = messaging
- `tasks/` = task management

### 2. Dependency Direction
Dependencies flow inward to `core/common`:
```
agents → common/domain
conversation → common/repository
providers → common/domain
```

### 3. Clean Boundaries
No cross-module dependencies (except via `common`):
- ❌ `agents` → `conversation` (direct import)
- ✅ `agents` → `common` ← `conversation` (via shared layer)

### 4. Infrastructure Separation
Technical concerns isolated in `core/infrastructure`:
- Security, logging, events independent of business logic
- Can be replaced without affecting feature modules

## Benefits

### Maintainability
- **Clear ownership** - each module has defined boundaries
- **Easier onboarding** - new developers find code by domain, not layer
- **Reduced cognitive load** - work on one module at a time

### Scalability
- **Foundation for microservices** - modules can be extracted to separate services
- **Modular deployment** - deploy only changed modules
- **Team scaling** - different teams can own different modules

### Testability
- **Isolated testing** - test modules independently
- **Mocking simplified** - mock at module boundaries
- **Integration tests** - verify module interactions

## Migration from v1.x

If you have custom code extending SYNAPSE v1.x core packages:

### Old Package Structure (v1.x)
```
dev.synapse.core/
  ├── agents/
  ├── conversation/
  ├── plugin/
  ├── provider/
  ├── security/
  └── ...
```

### New Package Structure (v2.1+)
```
dev.synapse/
  ├── core/
  │   ├── infrastructure/security/
  │   └── common/
  ├── agents/
  ├── conversation/
  ├── plugins/
  └── providers/
```

### Update Your Imports

Replace:
```java
import dev.synapse.core.agents.*;
import dev.synapse.core.conversation.*;
import dev.synapse.core.plugin.*;
import dev.synapse.core.provider.*;
```

With:
```java
import dev.synapse.agents.*;
import dev.synapse.conversation.*;
import dev.synapse.plugins.*;
import dev.synapse.providers.*;
```

### Common Layer Access

Domain entities and repositories moved to `core/common`:

```java
// Old
import dev.synapse.core.domain.Agent;
import dev.synapse.core.repository.AgentRepository;

// New
import dev.synapse.core.common.domain.Agent;
import dev.synapse.core.common.repository.AgentRepository;
```

## Future Evolution

### v2.2.0 - Enhanced Plugin Architecture
- External plugin runtimes
- Language-agnostic plugin SDK
- Containerized plugin execution

### v3.0.0 - Microservices Option
Modules can be deployed as independent services:
- `synapse-agents-service`
- `synapse-conversation-service`
- `synapse-providers-service`

Communication via:
- gRPC for internal services
- REST for public APIs
- Redis Streams for events

## Related Documentation

- [Monitoring & Metrics](../operations/monitoring.md) - Observability infrastructure
- [Plugin Development](../guides/plugin-development.md) - Building plugins
- [API Reference](../api/reference.md) - REST API documentation
