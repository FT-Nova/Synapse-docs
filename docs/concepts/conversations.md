# Conversations

Conversations are the primary interface for interacting with agents in SYNAPSE.

## Conversation Lifecycle

1. **Creation**: User initiates conversation with agent
2. **Messaging**: Bidirectional message exchange
3. **Context Management**: Conversation history maintained
4. **Persistence**: All messages stored in database
5. **Archival**: Old conversations archived

## Real-Time Communication

SYNAPSE uses **WebSocket** for real-time messaging:
- Low-latency bidirectional communication
- Streaming responses from AI models
- Typing indicators and presence
- Live collaboration features

## Message Types

### User Messages
Text input from human users.

### Agent Messages
Responses from AI agents.

### System Messages
Platform notifications and events.

### Tool Messages
Plugin execution results.

## Conversation Context

Each conversation maintains:
- **Message History**: All past messages
- **Active Participants**: Users and agents
- **Metadata**: Created, updated timestamps
- **Settings**: Configuration overrides

## Features

### Streaming Responses
AI responses streamed token-by-token for better UX.

### Multi-Agent Conversations
Multiple agents can participate in the same conversation.

### Rich Content
Support for:
- Text formatting (Markdown)
- Code blocks with syntax highlighting
- Images and attachments (planned)
- Interactive elements (planned)

## Managing Conversations

### Via Dashboard
- View all conversations
- Search and filter
- Export conversation history
- Delete conversations

### Via API
```bash
# Create conversation
POST /api/conversations
{
  "agentId": "agent-123",
  "title": "New Conversation"
}

# Send message
POST /api/conversations/{id}/messages
{
  "content": "Hello, agent!"
}

# Get history
GET /api/conversations/{id}/messages
```

## Best Practices

1. **Meaningful Titles**: Name conversations descriptively
2. **Context Pruning**: Archive old conversations
3. **Export Important Data**: Back up critical conversations
4. **Clear Instructions**: Provide context in initial messages
