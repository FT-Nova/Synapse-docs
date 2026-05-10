# Plugin Development Tutorial

Complete guide to creating a production-ready SYNAPSE plugin.

## Overview

This tutorial creates a **GitHub Issues Plugin** that:
- Fetches GitHub issues
- Creates new issues
- Updates issue status
- Searches issues

## Step 1: Project Setup

```bash
mkdir github-issues-plugin
cd github-issues-plugin

# Create directory structure
mkdir -p src/github_issues tests docs
```

## Step 2: Plugin Metadata

**plugin.yaml:**
```yaml
name: github-issues
version: 1.0.0
description: Manage GitHub issues from SYNAPSE
author: Your Name
license: MIT
repository: https://github.com/yourusername/github-issues-plugin

synapse_version: ">=2.0.0"
runtime: python

entry_point: src.github_issues.GitHubIssuesPlugin

tools:
  - name: list_issues
    description: List issues in a GitHub repository
    parameters:
      - name: repo
        type: string
        required: true
        description: Repository in format owner/repo
      - name: state
        type: string
        required: false
        default: "open"
        description: Issue state (open, closed, all)
  
  - name: create_issue
    description: Create a new GitHub issue
    parameters:
      - name: repo
        type: string
        required: true
      - name: title
        type: string
        required: true
      - name: body
        type: string
        required: false

dependencies:
  python:
    - requests>=2.31.0
    - pydantic>=2.0.0

permissions:
  - network.http

configuration:
  - name: github_token
    type: string
    required: true
    description: GitHub personal access token
    secret: true

limits:
  memory_mb: 256
  cpu_percent: 50
  timeout_seconds: 30
```

## Step 3: Plugin Implementation

**src/github_issues/__init__.py:**
```python
from .plugin import GitHubIssuesPlugin

__version__ = "1.0.0"
__all__ = ["GitHubIssuesPlugin"]
```

**src/github_issues/plugin.py:**
```python
from typing import Dict, List, Optional
import requests
from synapse.plugin import Plugin, tool
from pydantic import BaseModel

class Issue(BaseModel):
    number: int
    title: str
    state: str
    created_at: str
    html_url: str

class GitHubIssuesPlugin(Plugin):
    """GitHub Issues integration for SYNAPSE"""
    
    def __init__(self, config: Dict):
        super().__init__(config)
        self.token = config.get("github_token")
        if not self.token:
            raise ValueError("github_token is required")
        
        self.base_url = "https://api.github.com"
        self.headers = {
            "Authorization": f"token {self.token}",
            "Accept": "application/vnd.github.v3+json"
        }
    
    @tool(
        name="list_issues",
        description="List issues in a GitHub repository"
    )
    def list_issues(
        self, 
        repo: str, 
        state: str = "open"
    ) -> List[Dict]:
        """
        List issues from a GitHub repository.
        
        Args:
            repo: Repository in format owner/repo
            state: Issue state (open, closed, all)
        
        Returns:
            List of issues
        """
        url = f"{self.base_url}/repos/{repo}/issues"
        params = {"state": state}
        
        response = requests.get(
            url, 
            headers=self.headers, 
            params=params,
            timeout=10
        )
        response.raise_for_status()
        
        issues = response.json()
        
        return [
            {
                "number": issue["number"],
                "title": issue["title"],
                "state": issue["state"],
                "created_at": issue["created_at"],
                "url": issue["html_url"]
            }
            for issue in issues
        ]
    
    @tool(
        name="create_issue",
        description="Create a new GitHub issue"
    )
    def create_issue(
        self,
        repo: str,
        title: str,
        body: Optional[str] = None
    ) -> Dict:
        """
        Create a new issue in a GitHub repository.
        
        Args:
            repo: Repository in format owner/repo
            title: Issue title
            body: Issue body (optional)
        
        Returns:
            Created issue details
        """
        url = f"{self.base_url}/repos/{repo}/issues"
        data = {
            "title": title,
            "body": body or ""
        }
        
        response = requests.post(
            url,
            headers=self.headers,
            json=data,
            timeout=10
        )
        response.raise_for_status()
        
        issue = response.json()
        
        return {
            "number": issue["number"],
            "title": issue["title"],
            "url": issue["html_url"],
            "created_at": issue["created_at"]
        }
```

## Step 4: Testing

**tests/test_plugin.py:**
```python
import pytest
from unittest.mock import Mock, patch
from src.github_issues import GitHubIssuesPlugin

@pytest.fixture
def plugin():
    config = {"github_token": "fake-token"}
    return GitHubIssuesPlugin(config)

@patch("requests.get")
def test_list_issues(mock_get, plugin):
    # Mock API response
    mock_response = Mock()
    mock_response.json.return_value = [
        {
            "number": 1,
            "title": "Test Issue",
            "state": "open",
            "created_at": "2024-01-01T00:00:00Z",
            "html_url": "https://github.com/owner/repo/issues/1"
        }
    ]
    mock_response.raise_for_status = Mock()
    mock_get.return_value = mock_response
    
    # Test
    issues = plugin.list_issues("owner/repo")
    
    assert len(issues) == 1
    assert issues[0]["number"] == 1
    assert issues[0]["title"] == "Test Issue"

@patch("requests.post")
def test_create_issue(mock_post, plugin):
    # Mock API response
    mock_response = Mock()
    mock_response.json.return_value = {
        "number": 123,
        "title": "New Issue",
        "html_url": "https://github.com/owner/repo/issues/123",
        "created_at": "2024-01-01T00:00:00Z"
    }
    mock_response.raise_for_status = Mock()
    mock_post.return_value = mock_response
    
    # Test
    issue = plugin.create_issue("owner/repo", "New Issue", "Issue body")
    
    assert issue["number"] == 123
    assert issue["title"] == "New Issue"
```

**requirements-dev.txt:**
```
pytest>=7.4.0
pytest-cov>=4.1.0
pytest-mock>=3.11.1
```

Run tests:
```bash
pip install -r requirements-dev.txt
pytest tests/ --cov=src
```

## Step 5: Documentation

**README.md:**
````markdown
# GitHub Issues Plugin

Manage GitHub issues directly from SYNAPSE agents.

## Installation

```bash
synapse plugin install github-issues
```

## Configuration

Configure your GitHub token:

```bash
export GITHUB_TOKEN=your_token_here
```

Or set in plugin configuration:

```yaml
plugins:
  github-issues:
    github_token: your_token_here
```

## Usage

### List Issues

```
Agent: List open issues in microsoft/vscode
```

### Create Issue

```
Agent: Create an issue in my-org/my-repo titled "Bug Report" with description "Application crashes on startup"
```

## Tools

- `list_issues`: List repository issues
- `create_issue`: Create new issue

## Permissions Required

- `network.http`: GitHub API access

## License

MIT
````

## Step 6: Package and Publish

```bash
# Validate plugin
synapse plugin validate .

# Run tests
pytest

# Package
synapse plugin package .

# Publish to community repository
git add .
git commit -m "Initial release"
git push origin main
```

See [Publishing Guide](/docs/plugins/development/publishing) for details.

## Advanced Topics

- [Error Handling](/docs/plugins/development/testing#error-handling)
- [Caching Results](/docs/plugins/development/testing#caching)
- [Configuration Management](/docs/plugins/development/testing#configuration)
- [Logging](/docs/plugins/development/testing#logging)
