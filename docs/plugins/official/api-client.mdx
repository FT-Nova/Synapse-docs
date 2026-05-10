# API Client Plugin

Make HTTP requests to external APIs with authentication support.

## Overview

The API Client plugin enables agents to interact with REST APIs, webhooks, and web services.

**Features:**
- HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Authentication (API keys, OAuth, Basic Auth)
- Request/response transformation
- Error handling and retries
- Rate limiting

## Installation

Pre-installed with SYNAPSE. Enable for your agent:

```bash
synapse agent update my-agent --enable-plugin api-client
```

## Tools

### `http_request`

Make an HTTP request.

**Parameters:**
- `url` (string, required): Request URL
- `method` (string, optional): HTTP method (default: GET)
- `headers` (object, optional): Request headers
- `body` (string/object, optional): Request body
- `auth` (object, optional): Authentication config

**Returns:**
```json
{
  "status_code": 200,
  "headers": {...},
  "body": {...},
  "response_time_ms": 234
}
```

## Usage Examples

### GET Request

```
User: Get user data from the API
Agent: [uses http_request]
       {
         "url": "https://api.example.com/users/123",
         "method": "GET",
         "headers": {
           "Authorization": "Bearer token"
         }
       }
```

### POST Request

```
User: Create a new user
Agent: [uses http_request]
       {
         "url": "https://api.example.com/users",
         "method": "POST",
         "body": {
           "name": "Alice",
           "email": "alice@example.com"
         }
       }
```

## Authentication

### API Key

```json
{
  "auth": {
    "type": "api_key",
    "key": "your_api_key",
    "header": "X-API-Key"
  }
}
```

### Bearer Token

```json
{
  "auth": {
    "type": "bearer",
    "token": "your_token"
  }
}
```

### Basic Auth

```json
{
  "auth": {
    "type": "basic",
    "username": "user",
    "password": "pass"
  }
}
```
