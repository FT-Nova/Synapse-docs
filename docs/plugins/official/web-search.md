# Web Search Plugin

Search the web for current information.

## Overview

The Web Search plugin enables agents to search the internet for up-to-date information using multiple search providers.

**Providers Supported:**
- Google Search
- Bing Search
- DuckDuckGo
- SearXNG (self-hosted)

## Installation

Pre-installed with SYNAPSE. Enable for your agent:

```bash
synapse agent update my-agent --enable-plugin web-search
```

## Configuration

### API Keys

**Google Search:**
```bash
export GOOGLE_SEARCH_API_KEY=your_key
export GOOGLE_SEARCH_CX=your_cx
```

**Bing Search:**
```bash
export BING_SEARCH_API_KEY=your_key
```

**DuckDuckGo:**
No API key required (default).

### Plugin Configuration

```yaml
plugins:
  web-search:
    provider: duckduckgo  # google, bing, duckduckgo, searxng
    max_results: 10
    safe_search: true
    timeout_seconds: 15
```

## Tools

### `web_search`

Search the web for information.

**Parameters:**
- `query` (string, required): Search query
- `num_results` (number, optional): Number of results (default: 5, max: 20)
- `time_range` (string, optional): Time filter (day, week, month, year)

**Example:**
```json
{
  "query": "latest SYNAPSE AI features",
  "num_results": 5,
  "time_range": "month"
}
```

**Returns:**
```json
{
  "results": [
    {
      "title": "SYNAPSE v2.0 Released",
      "url": "https://example.com/synapse-v2",
      "snippet": "SYNAPSE 2.0 introduces new agent capabilities...",
      "published_date": "2024-01-15"
    }
  ],
  "query": "latest SYNAPSE AI features",
  "total_results": 5
}
```

### `get_webpage_content`

Fetch and extract content from a webpage.

**Parameters:**
- `url` (string, required): Webpage URL
- `extract_text_only` (boolean, optional): Remove HTML (default: true)

**Returns:**
```json
{
  "url": "https://example.com/page",
  "title": "Page Title",
  "content": "Extracted text content...",
  "metadata": {
    "author": "Author Name",
    "published_date": "2024-01-01"
  }
}
```

## Usage Examples

### Basic Search

```
User: What's the weather in Paris?
Agent: [uses web_search with query="weather Paris"]
       Current weather in Paris: 18°C, partly cloudy...
```

### Recent News

```
User: Find recent news about AI regulations
Agent: [uses web_search with time_range="week"]
       Recent articles about AI regulations:
       1. EU AI Act Implementation...
       2. New US Guidelines...
```

### Content Extraction

```
User: Summarize this article: https://example.com/article
Agent: [uses get_webpage_content]
       [extracts and summarizes content]
```

## Permissions

- `network.http`: Required for web requests

## Resource Limits

- Memory: 256 MB
- CPU: 50%
- Timeout: 15 seconds per search

## Privacy

- Search queries are not logged by SYNAPSE
- Respect search provider privacy policies
- Use `safe_search: true` in production

## Troubleshooting

### Rate Limiting

If experiencing rate limits:
1. Reduce search frequency
2. Use different provider
3. Implement caching
4. Use self-hosted SearXNG

### Slow Searches

- Enable result caching
- Reduce `num_results`
- Use CDN-backed providers

## See Also

- [Plugin Overview](/docs/plugins/overview)
- [API Client Plugin](/docs/plugins/official/api-client)
