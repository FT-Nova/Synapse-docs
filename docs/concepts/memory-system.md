# Memory System

SYNAPSE implements a multi-tiered memory system for agents to maintain context and knowledge.

## Memory Tiers

### 1. Short-Term Memory (Redis)
**Purpose**: Immediate conversation context

- Active conversation state
- Recent message buffer
- Temporary user preferences
- Session data

**TTL**: Configurable, typically 1-24 hours

### 2. Long-Term Memory (PostgreSQL)
**Purpose**: Persistent conversation history

- All messages and conversations
- User profiles and preferences
- Agent configurations
- Task and project data

**Retention**: Indefinite (configurable)

### 3. Semantic Memory (Qdrant)
**Purpose**: Knowledge retrieval

- Vector embeddings of conversations
- Semantic search capabilities
- Context-aware memory recall
- Cross-conversation knowledge

**Indexing**: Automatic background processing

## How Memory Works

### Conversation Flow
1. User sends message
2. System retrieves relevant semantic memory from Qdrant
3. Combines with recent conversation history from Redis
4. Sends context to AI model
5. Stores response in PostgreSQL
6. Updates vector embeddings in Qdrant

### Memory Retrieval
Agents access memory through:
- **Recency**: Most recent messages
- **Relevance**: Semantic similarity search
- **Importance**: Weighted by significance

## Configuration

### Memory Depth
Controls how much history is sent to the AI model:

```yaml
memory:
  shortTermWindow: 20    # Recent messages
  semanticResults: 5     # Relevant past memories
  maxTokens: 4000        # Total context tokens
```

### Vector Embeddings
Automatic embedding generation for semantic search:

```yaml
embeddings:
  provider: openai       # or local model
  model: text-embedding-3-small
  batchSize: 100
  updateInterval: 5m
```

## Memory Management

### Pruning Strategies
- **Time-based**: Remove old conversations
- **Size-based**: Limit total memory size
- **Importance-based**: Keep significant memories

### Export and Backup
Export conversation memories:

```bash
# Via API
GET /api/memory/export?agentId=agent-123

# Via CLI
synapse-cli memory export --agent agent-123 --format json
```

## Privacy and Security

- User data isolated per tenant
- Encryption at rest (database)
- Encryption in transit (TLS)
- Configurable retention policies
- GDPR-compliant data deletion

## Advanced Features (Planned)

- **Memory Summarization** (v2.5.0): Compress old conversations
- **Cross-Agent Memory** (v2.5.0): Shared team knowledge
- **Memory Tagging** (v2.5.0): Organize memories by topic
- **Selective Forgetting** (v2.6.0): Delete specific memories
