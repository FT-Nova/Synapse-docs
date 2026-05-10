# Getting Started with Plugin Development

Create your first SYNAPSE plugin in minutes.

## Prerequisites

- SYNAPSE v2.0.0 or later
- Python 3.11+ or Java 21+
- Basic understanding of SYNAPSE concepts

## Quick Start

### 1. Create Plugin Directory

```bash
mkdir my-plugin
cd my-plugin
```

### 2. Create Plugin Metadata

**plugin.yaml:**
```yaml
name: my-plugin
version: 1.0.0
description: My first SYNAPSE plugin
author: Your Name
license: MIT

synapse_version: ">=2.0.0"
runtime: python

entry_point: src.my_plugin.MyPlugin

tools:
  - name: greet
    description: Greet a user by name
    parameters:
      - name: name
        type: string
        required: true

permissions:
  - none

limits:
  memory_mb: 128
  cpu_percent: 25
  timeout_seconds: 10
```

### 3. Create Plugin Code

**src/my_plugin.py:**
```python
from synapse.plugin import Plugin, tool

class MyPlugin(Plugin):
    """My first SYNAPSE plugin"""
    
    @tool(
        name="greet",
        description="Greet a user by name",
        parameters={
            "name": {"type": "string", "required": True}
        }
    )
    def greet(self, name: str) -> str:
        """Greet a user"""
        return f"Hello, {name}! Welcome to SYNAPSE!"
```

### 4. Test Your Plugin

**tests/test_my_plugin.py:**
```python
import pytest
from src.my_plugin import MyPlugin

def test_greet():
    plugin = MyPlugin()
    result = plugin.greet("Alice")
    assert result == "Hello, Alice! Welcome to SYNAPSE!"
    assert "Alice" in result
```

Run tests:
```bash
pytest tests/
```

### 5. Install Locally

```bash
synapse plugin install --dev .
```

### 6. Use in Agent

Enable the plugin for an agent via UI or API.

Test it:
```
User: Greet me as Bob
Agent: [uses greet tool with name="Bob"]
        Hello, Bob! Welcome to SYNAPSE!
```

## Plugin Examples

Browse example plugins:
- **Python**: https://github.com/FTMahringer/Synapse-plugin-examples
- **Java**: https://github.com/FTMahringer/Synapse-plugin-examples-java

## Development Tools

### Plugin CLI

```bash
# Create plugin from template
synapse plugin create my-plugin --template python

# Validate plugin
synapse plugin validate .

# Test plugin
synapse plugin test .

# Package plugin
synapse plugin package .
```

### Hot Reload

Enable hot reload during development:

```bash
synapse dev --watch-plugins ./my-plugin
```

Changes are automatically reloaded without restarting SYNAPSE.
