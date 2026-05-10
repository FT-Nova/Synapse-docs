# Plugin Development

Learn how to create custom plugins to extend SYNAPSE with new capabilities.

:::tip Prerequisites
- Basic programming knowledge (Python, JavaScript, or Java)
- Understanding of SYNAPSE [architecture](../concepts/architecture.md)
- SYNAPSE development environment ([setup guide](../development/environment-setup.md))
:::

## Plugin System Overview

The SYNAPSE plugin system is the primary extension mechanism. Every external connection is a plugin:
- Messaging platforms (Telegram, Discord, Slack)
- AI model providers (OpenAI, Anthropic, Ollama)
- Tools and capabilities (web search, code execution)
- External context servers (MCP protocol)

:::info Key Principle
Plugins are self-contained. The core runtime never needs modification to add new capabilities.
:::

## Plugin Types

### 1. Channel Plugins

Connect external communication platforms to the SYNAPSE message bus.

**Responsibilities:**
- Listen for inbound events (webhook, WebSocket, polling)
- Normalize events to `ChannelEvent` objects
- Publish to `stream:channel.inbound` Redis stream
- Format and deliver outbound `ChannelResponse` objects

**Examples:** Telegram, Discord, Slack, XMPP, Matrix, email (IMAP/SMTP)

**Lifecycle Hooks:**
- `on_message`: When inbound event arrives
- `on_send`: Before outbound message delivery

### 2. Model Plugins

Wrap AI model providers or local model servers.

**Responsibilities:**
- Accept `ModelRequest` (system prompt, messages, parameters)
- Forward to provider API or local endpoint
- Stream or return `ModelResponse`

**Examples:** OpenAI, Anthropic, Mistral, Ollama, LM Studio, vLLM

**Lifecycle Hooks:**
- `on_request`: Before sending to provider
- `on_response`: When provider reply received

### 3. Skill Plugins

Expose callable capabilities that agents can invoke.

**Responsibilities:**
- Register skill definitions (name, description, schema)
- Execute capability when called
- Return typed result

**Examples:** Web search, code execution, file operations, HTTP fetch, calendar, database query

**Lifecycle Hooks:**
- `on_start`: When plugin loaded
- `on_stop`: When plugin deactivated

### 4. MCP Plugins

Integrate Model Context Protocol servers.

**Responsibilities:**
- Wrap MCP server process or endpoint
- Expose MCP tools/resources/prompts as SYNAPSE capabilities
- Manage connection lifecycle

**Examples:** Filesystem MCP, browser MCP, database MCP

**Lifecycle Hooks:**
- `on_start`: When MCP server launched
- `on_stop`: When server shut down

## Creating Your First Plugin

### Project Structure

```
my-weather-plugin/
├── manifest.yml          # Plugin metadata (required)
├── main.py              # Entry point
├── requirements.txt     # Python dependencies
├── README.md           # Documentation
└── tests/              # Tests
    └── test_weather.py
```

### manifest.yml

Every plugin must have a `manifest.yml`:

```yaml
# ── Identity ──────────────────────────────────────────
id: "com.example.weather"
name: "Weather Plugin"
version: "1.0.0"
description: "Get current weather information for any location"
author: "Your Name <you@example.com>"
homepage: "https://github.com/yourname/weather-plugin"
license: "MIT"

# ── Type ──────────────────────────────────────────────
type: skill

# ── Compatibility ─────────────────────────────────────
synapse_version: ">=2.0.0 <3.0.0"

# ── Entry Point ───────────────────────────────────────
entrypoint: "main.py"
runtime: "python3.11"

# ── Permissions ───────────────────────────────────────
permissions:
  - network.outbound  # Required for API calls

# ── Dependencies ──────────────────────────────────────
dependencies:
  python:
    - requests>=2.31.0
    - pydantic>=2.0.0

# ── Configuration ─────────────────────────────────────
config_schema:
  api_key:
    type: string
    required: true
    secret: true
    description: "Weather API key"
  
  default_units:
    type: string
    required: false
    default: "metric"
    enum: ["metric", "imperial"]
    description: "Default temperature units"
```

### Plugin Implementation (Python)

````python
from synapse_plugin_sdk import SynapsePlugin, skill, Parameter, PluginResult
import requests
from typing import Dict, Any


class WeatherPlugin(SynapsePlugin):
    """Weather information plugin for SYNAPSE."""
    
    def on_start(self):
        """Called when plugin is loaded."""
        self.api_key = self.config.get("api_key")
        self.default_units = self.config.get("default_units", "metric")
        self.log.info(f"Weather plugin started with {self.default_units} units")
    
    def on_stop(self):
        """Called when plugin is deactivated."""
        self.log.info("Weather plugin stopped")
    
    @skill(
        name="get_weather",
        description="Get current weather for a location"
    )
    def get_weather(
        self,
        location: str = Parameter(description="City name or coordinates"),
        units: str = Parameter(
            description="Temperature units",
            default=None,
            enum=["metric", "imperial"]
        )
    ) -> PluginResult:
        """Fetch current weather data."""
        
        units = units or self.default_units
        
        try:
            url = f"https://api.weatherapi.com/v1/current.json"
            params = {
                "key": self.api_key,
                "q": location,
                "units": units
            }
            
            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            weather_info = {
                "location": data["location"]["name"],
                "country": data["location"]["country"],
                "temperature": data["current"]["temp_c"],
                "condition": data["current"]["condition"]["text"],
                "humidity": data["current"]["humidity"],
                "wind_kph": data["current"]["wind_kph"]
            }
            
            return PluginResult.success(
                data=weather_info,
                message=f"Weather in {location}: {weather_info['condition']}, {weather_info['temperature']}°C"
            )
            
        except requests.RequestException as e:
            self.log.error(f"Weather API error: {e}")
            return PluginResult.error(
                message=f"Failed to fetch weather: {str(e)}",
                error_code="API_ERROR"
            )
        except Exception as e:
            self.log.error(f"Unexpected error: {e}")
            return PluginResult.error(
                message="Internal plugin error",
                error_code="INTERNAL_ERROR"
            )
    
    @skill(
        name="get_forecast",
        description="Get weather forecast for multiple days"
    )
    def get_forecast(
        self,
        location: str = Parameter(description="City name or coordinates"),
        days: int = Parameter(description="Number of days (1-7)", default=3)
    ) -> PluginResult:
        """Fetch weather forecast."""
        
        if days < 1 or days > 7:
            return PluginResult.error(
                message="Days must be between 1 and 7",
                error_code="INVALID_PARAMETER"
            )
        
        # Implementation...
        return PluginResult.success(data={"forecast": "..."})


# Required: Export plugin class
plugin = WeatherPlugin
````

### Plugin Implementation (Java)

```java
package dev.synapse.plugins.weather;

import dev.synapse.plugin.api.*;
import dev.synapse.plugin.api.annotations.*;
import java.util.Map;

@Plugin(
    name = "weather",
    version = "1.0.0",
    description = "Get current weather information"
)
public class WeatherPlugin implements SynapsePlugin {
    
    private String apiKey;
    private String defaultUnits;
    
    @Override
    public void onStart(PluginContext context) {
        this.apiKey = context.getConfig().getString("api_key");
        this.defaultUnits = context.getConfig()
            .getString("default_units", "metric");
        
        context.getLogger().info(
            "Weather plugin started with {} units", defaultUnits
        );
    }
    
    @Override
    public void onStop(PluginContext context) {
        context.getLogger().info("Weather plugin stopped");
    }
    
    @PluginAction(
        name = "get_weather",
        description = "Get current weather for a location"
    )
    public PluginResult getWeather(
        @Parameter(
            name = "location",
            description = "City name or coordinates",
            required = true
        ) String location,
        
        @Parameter(
            name = "units",
            description = "Temperature units"
        ) String units
    ) {
        units = units != null ? units : defaultUnits;
        
        try {
            // API call implementation
            Map<String, Object> weatherData = fetchWeatherData(location, units);
            
            return PluginResult.success()
                .data(weatherData)
                .message(String.format(
                    "Weather in %s: %s, %s°C",
                    location,
                    weatherData.get("condition"),
                    weatherData.get("temperature")
                ))
                .build();
                
        } catch (Exception e) {
            return PluginResult.error()
                .message("Failed to fetch weather: " + e.getMessage())
                .errorCode("API_ERROR")
                .build();
        }
    }
}
```

## Testing Your Plugin

### Unit Tests

```python
import pytest
from my_weather_plugin.main import WeatherPlugin


@pytest.fixture
def plugin():
    """Create plugin instance for testing."""
    plugin = WeatherPlugin()
    plugin.config = {
        "api_key": "test_key",
        "default_units": "metric"
    }
    plugin.on_start()
    return plugin


def test_get_weather_success(plugin, requests_mock):
    """Test successful weather fetch."""
    requests_mock.get(
        "https://api.weatherapi.com/v1/current.json",
        json={
            "location": {"name": "London", "country": "UK"},
            "current": {
                "temp_c": 15.0,
                "condition": {"text": "Partly cloudy"},
                "humidity": 65,
                "wind_kph": 15.0
            }
        }
    )
    
    result = plugin.get_weather(location="London")
    
    assert result.success
    assert result.data["location"] == "London"
    assert result.data["temperature"] == 15.0


def test_get_weather_api_error(plugin, requests_mock):
    """Test API error handling."""
    requests_mock.get(
        "https://api.weatherapi.com/v1/current.json",
        status_code=500
    )
    
    result = plugin.get_weather(location="Invalid")
    
    assert not result.success
    assert result.error_code == "API_ERROR"
```

### Integration Tests

Test within SYNAPSE environment:

```bash
# Install plugin in dev mode
synapse plugins install --dev ./my-weather-plugin

# Test via CLI
synapse chat
> @weather get_weather location="London"

# Check logs
synapse logs --plugin weather
```

## Publishing Your Plugin

### 1. Package Plugin

```bash
# Create distributable package
cd my-weather-plugin
tar -czf weather-plugin-1.0.0.tar.gz \
  manifest.yml main.py requirements.txt README.md
```

### 2. Submit to Store (Planned v2.7.0)

```bash
# Submit to SYNAPSE plugin marketplace
synapse store submit weather-plugin-1.0.0.tar.gz
```

### 3. Documentation

Include comprehensive README:

```markdown
# Weather Plugin

Get current weather and forecasts in SYNAPSE.

## Installation

\`\`\`bash
synapse plugins install weather
\`\`\`

## Configuration

\`\`\`yaml
api_key: "your-weather-api-key"
default_units: "metric"  # or "imperial"
\`\`\`

## Usage

\`\`\`
@weather get_weather location="London"
@weather get_forecast location="Paris" days=5
\`\`\`

## Skills

- **get_weather**: Get current weather
- **get_forecast**: Get multi-day forecast
```

## Best Practices

:::tip Plugin Design
1. **Single Responsibility**: One plugin, one purpose
2. **Error Handling**: Graceful failure with clear messages
3. **Logging**: Use plugin logger, not print()
4. **Configuration**: Externalize all settings
5. **Permissions**: Request minimum necessary
6. **Documentation**: Clear skill descriptions for agents
7. **Testing**: Comprehensive unit and integration tests
8. **Versioning**: Follow semantic versioning
:::

## Security Considerations

### Sandboxing

Plugins run with resource limits:
- **CPU**: Configurable quota
- **Memory**: Maximum allocation
- **Network**: Restricted by permissions
- **Filesystem**: Isolated to plugin directory
- **Timeout**: Configurable execution limit

### Permissions Model

Only declared permissions are granted:

```yaml
permissions:
  - network.outbound    # HTTP requests
  - filesystem.read     # Read files
  - database.read       # Query database
  - agents.message      # Inject messages
```

:::danger Security Warning
Never hardcode secrets in plugin code. Always use configuration with `secret: true`.
:::

## Plugin SDK Reference

### SynapsePlugin Class

Base class for all plugins:

```python
class SynapsePlugin:
    config: Dict[str, Any]      # Plugin configuration
    log: Logger                 # Plugin logger
    context: PluginContext      # Runtime context
    
    def on_start(self) -> None:
        """Called when plugin loads."""
    
    def on_stop(self) -> None:
        """Called when plugin unloads."""
```

### PluginResult Class

Return value for skill calls:

```python
class PluginResult:
    success: bool
    data: Dict[str, Any]
    message: str
    error_code: Optional[str]
    
    @classmethod
    def success(cls, data: Dict, message: str) -> PluginResult:
        """Create success result."""
    
    @classmethod
    def error(cls, message: str, error_code: str) -> PluginResult:
        """Create error result."""
```