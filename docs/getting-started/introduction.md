# Introduction to SYNAPSE

**SYNAPSE** is an open-source AI agent platform designed for teams, self-hosting, and production deployments.

## What is SYNAPSE?

SYNAPSE provides a modular, extensible infrastructure for building and managing AI agents:

- 🤖 **Multi-Agent Orchestration**: Create, manage, and coordinate multiple AI agents
- 💬 **Conversation Management**: Rich conversational interface with memory and context
- 🔌 **Plugin System**: Extensible architecture for custom capabilities
- 👥 **Team Collaboration**: Multi-user support with team-based workflows
- 🐳 **Docker-First**: Simple deployment with Docker Compose or Kubernetes
- 🏠 **Self-Hosted**: Full control over your data and infrastructure

## Philosophy

SYNAPSE follows a **Docker-first, self-hosting-friendly** deployment model similar to:
- OpenClaw
- Langfuse
- Open WebUI
- Supabase self-hosting
- GitLab self-managed

**Key principles:**
- Simple single-node deployments for homelab and small teams
- Optional distributed infrastructure for enterprises
- Bare-metal and VM-friendly
- Kubernetes as an advanced option, not a requirement

## Technology Stack

- **Backend**: Java 25, Spring Boot 4.0.0
- **Frontend**: Vue 3, TypeScript
- **Database**: PostgreSQL with Flyway migrations
- **Cache**: Redis
- **Vector Store**: Qdrant
- **Container**: Docker Compose, optional Kubernetes

## Use Cases

- **Homelab AI Infrastructure**: Run your own AI agents with full privacy
- **Team AI Platform**: Collaborative AI workspace for development teams
- **Research Platform**: Experiment with multi-agent systems
- **Production Deployments**: Scale with distributed infrastructure

## Next Steps

- [Quick Start](./quick-start.md) - Get SYNAPSE running in 5 minutes
- [Installation](./installation.md) - Detailed installation guide
- [First Agent](./first-agent.md) - Create your first AI agent
