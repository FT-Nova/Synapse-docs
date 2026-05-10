# Create Your First Agent

Learn how to create and interact with your first AI agent in SYNAPSE.

## Step 1: Access the Dashboard

Navigate to your SYNAPSE instance:
```
http://localhost:5173
```

Log in with your credentials.

## Step 2: Configure Model Provider

Before creating an agent, configure an AI model provider:

1. Go to **Settings** → **Model Providers**
2. Add a provider (OpenAI, Anthropic, Ollama, etc.)
3. Enter your API key or connection details
4. Save configuration

## Step 3: Create an Agent

1. Navigate to **Agents** in the sidebar
2. Click **Create New Agent**
3. Fill in the details:
   - **Name**: `My First Agent`
   - **Description**: `A helpful AI assistant`
   - **Model**: Select your configured model
   - **System Prompt**: Define the agent's behavior

Example system prompt:
```
You are a helpful AI assistant. Answer questions clearly and concisely.
Be friendly and professional.
```

4. Click **Create Agent**

## Step 4: Start a Conversation

1. Click on your newly created agent
2. Start chatting in the conversation interface
3. Try asking:
   - "Hello! Who are you?"
   - "What can you help me with?"
   - "Explain what SYNAPSE is."

## Step 5: Explore Features

Try these features:

- **Memory**: Agents remember conversation context
- **Plugins**: Add capabilities to your agent
- **Teams**: Create agent teams for collaboration
- **Export**: Save conversation history

## Next Steps

- [Learn about agent concepts](../concepts/agents.md)
- [Configure agent teams](../guides/team-collaboration.md)
- [Develop custom plugins](../guides/plugin-development.md)
- [Explore the API](../api/overview.md)
