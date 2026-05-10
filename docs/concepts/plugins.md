# Plugins

Plugins extend SYNAPSE agent capabilities with custom tools and integrations.

## What are Plugins?

Plugins provide agents with:
- **Tools**: Execute actions (web search, file operations, API calls)
- **Integrations**: Connect to external services (GitHub, Slack, databases)
- **Custom Logic**: Implement domain-specific behaviors

## Plugin Types

- **Official Plugins**: Maintained by the SYNAPSE core team
- **Community Plugins**: Created and maintained by the community
- **Bundles**: Pre-configured collections of related plugins

## Quick Example

```java
@Plugin(
    name = "weather",
    version = "1.0.0",
    description = "Get current weather information"
)
public class WeatherPlugin implements SynapsePlugin {
    
    @Tool(
        name = "get_weather",
        description = "Get weather for a location"
    )
    public ToolResult getWeather(
        @Parameter(name = "location") String location
    ) {
        // Implementation here
        WeatherData data = weatherService.getCurrentWeather(location);
        return ToolResult.success(data);
    }
}
```

:::tip Learn More
For complete plugin documentation, development guides, and the plugin catalog, see the **[Plugins](/docs/plugins/overview)** section.
:::


## Custom Plugin Development

### Plugin Structure

```java
@Plugin(
    name = "weather",
    version = "1.0.0",
    description = "Get current weather information"
)
public class WeatherPlugin implements SynapsePlugin {
    
    @Tool(
        name = "get_weather",
        description = "Get weather for a location"
    )
    public ToolResult getWeather(
        @Parameter(name = "location") String location
    ) {
        // Implementation
        return ToolResult.success(weatherData);
    }
}
```

### Plugin Metadata (plugin.yml)

```yaml
name: weather
version: 1.0.0
author: Your Name
description: Weather information plugin
homepage: https://github.com/yourorg/weather-plugin

synapse_version: ">=2.6.0"
runtime: java

main_class: dev.synapse.plugin.weather.WeatherPlugin

tools:
  - name: get_weather
    description: Get current weather for a location
    parameters:
      - name: location
        type: string
        required: true
        description: City name or coordinates

permissions:
  - network.http

limits:
  memory_mb: 256
  cpu_percent: 30
  timeout_seconds: 15
```

## Plugin Security

### Sandboxing
Plugins run in isolated environments with:
- Resource limits (CPU, memory)
- ClassLoader isolation
- Permission-based access control
- Timeout enforcement

### Permissions
Plugins declare required permissions in `plugin.yml`:
- `network.http` - HTTP/HTTPS requests
- `network.socket` - Raw socket access
- `filesystem.read` - Read files
- `filesystem.write:<path>` - Write to specific paths
- `database.read` - Read from database
- `database.write` - Write to database

### Validation
All plugins are validated before loading:
- Manifest validation
- Dependency scanning
- Signature verification (planned v2.6.0)
- Security auditing

## Plugin Development

### Template Repository

Start quickly with the official Java template:

📦 **https://github.com/FTMahringer/Synapse-Plugin-Template**

Features:
- ✅ Complete Gradle project structure
- ✅ Example plugin implementation
- ✅ Unit tests with JUnit 5 & AssertJ
- ✅ GitHub Actions CI/CD
- ✅ Plugin validation workflows

### Creating a Plugin

1. **Use GitHub template** - Click "Use this template"
2. **Configure plugin.yml** - Set name, version, metadata
3. **Implement SynapsePlugin** - Add your tools
4. **Write tests** - Test with JUnit 5
5. **Build JAR** - `./gradlew build`
6. **Submit** - Pull request to community repository

See [Getting Started Guide](/docs/plugins/development/getting-started) for details.

## Plugin Repositories

### Official Plugins
**Repository:** https://github.com/FTMahringer/Synapse-Plugins

Curated plugins maintained by the core team. Read-only for community.

### Community Plugins
**Repository:** https://github.com/FTMahringer/Synapse-Plugins-Community

Community-contributed plugins. Submit via Pull Request!

## Plugin Marketplace (Planned v2.6.0)

Future features:
- Discover community plugins
- Plugin ratings and reviews
- Automatic updates
- Versioning and compatibility checking
- Security verification

## Installing Plugins

### Via Dashboard
1. Navigate to Plugins
2. Browse available plugins
3. Click Install
4. Configure settings
5. Assign to agents

### Via API
```bash
POST /api/plugins/install
{
  "source": "marketplace",
  "pluginId": "weather-plugin"
}
```

## Best Practices

1. **Minimal Permissions**: Request only necessary access
2. **Error Handling**: Handle failures gracefully
3. **Documentation**: Clear action descriptions
4. **Testing**: Comprehensive test coverage
5. **Versioning**: Semantic versioning
