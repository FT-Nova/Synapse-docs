# Agents

Agents are the core abstraction in SYNAPSE - autonomous AI entities with specific roles and capabilities.

## What is an Agent?

An agent in SYNAPSE represents:
- A configured AI model (GPT-4, Claude, Llama, etc.)
- A system prompt defining behavior and personality
- Memory and conversation context
- Available tools and plugins
- Team membership and collaboration settings

## Agent Types

### Single Agents
Independent agents operating autonomously.

**Use cases:**
- Customer support bot
- Code review assistant
- Documentation writer

### Agent Teams
Multiple agents collaborating on complex tasks.

**Use cases:**
- Software development team (PM, developer, QA)
- Research team (researcher, analyst, writer)
- Creative team (ideation, design, copywriting)

## Agent Configuration

### Basic Properties
- **Name**: Human-readable identifier
- **Description**: Purpose and capabilities
- **System Prompt**: Behavior and personality
- **Model**: Provider and model selection
- **Temperature**: Response creativity (0.0-1.0)

### Advanced Settings
- **Max Tokens**: Response length limit
- **Memory Depth**: Context window size
- **Plugins**: Available tools and capabilities
- **Team Role**: Position in agent teams

## Memory and Context

Agents maintain:
- **Conversation History**: Recent messages
- **Long-Term Memory**: Semantic knowledge base
- **Task Context**: Current objectives
- **Team Context**: Collaboration state

## Creating Agents

### Via Dashboard
1. Navigate to Agents
2. Click "Create Agent"
3. Configure settings
4. Save and activate

### Via API
```bash
POST /api/agents
{
  "name": "Code Reviewer",
  "description": "Reviews code for best practices",
  "systemPrompt": "You are an expert code reviewer...",
  "modelProvider": "openai",
  "model": "gpt-4",
  "temperature": 0.3
}
```

## Best Practices

1. **Clear System Prompts**: Define role and boundaries
2. **Appropriate Models**: Match model to task complexity
3. **Temperature Tuning**: Lower for factual, higher for creative
4. **Memory Management**: Configure appropriate context depth
5. **Plugin Selection**: Add only necessary capabilities

## Next Steps

- [Conversations](./conversations.md)
- [Memory System](./memory-system.md)
- [Team Collaboration](../guides/team-collaboration.md)
- [Agent Management](../guides/agent-management.md)
