# Official Plugins

Official SYNAPSE plugins maintained by the core team.

## Overview

Official plugins are:
- ✅ **Tested**: Comprehensive test coverage
- ✅ **Supported**: Guaranteed compatibility with SYNAPSE releases
- ✅ **Secure**: Audited for security vulnerabilities
- ✅ **Documented**: Complete documentation and examples

## Available Plugins

### Web Search
Search the internet for current information.

**Install:**
```bash
synapse plugin install web-search
```

[Learn more →](/docs/plugins/official/web-search)

### File Operations
Read, write, and manage files.

**Install:**
```bash
synapse plugin install file-operations
```

[Learn more →](/docs/plugins/official/file-operations)

### Code Execution
Run code in sandboxed environments (Python, JavaScript, Java, etc.).

**Install:**
```bash
synapse plugin install code-execution
```

[Learn more →](/docs/plugins/official/code-execution)

### API Client
Make HTTP requests to external APIs with authentication support.

**Install:**
```bash
synapse plugin install api-client
```

[Learn more →](/docs/plugins/official/api-client)

## Installation

All official plugins are pre-installed with SYNAPSE but must be enabled per agent.

### Enable for Agent

**Via UI:**
1. Navigate to Agent Settings
2. Go to Plugins tab
3. Enable desired plugins

**Via API:**
```bash
curl -X PATCH http://localhost:8080/api/agents/{agent_id} \
  -H "Content-Type: application/json" \
  -d '{
    "plugins": ["web-search", "file-operations", "code-execution"]
  }'
```

## Updates

Official plugins are updated with SYNAPSE releases. Check release notes for changes.
