# Bundle Development Tutorial

Create a plugin bundle for related tools and workflows.

## Overview

This tutorial creates a **Developer Toolkit Bundle** that includes:
- Git integration plugin
- Code linter plugin
- Issue tracker plugin
- CI/CD integration plugin

## What is a Bundle?

A bundle is a curated collection of plugins designed to work together for a specific workflow or domain.

**Benefits:**
- One-command installation of related plugins
- Pre-configured settings optimized for the use case
- Tested plugin combinations
- Documented workflows

## Step 1: Bundle Structure

```bash
mkdir developer-toolkit-bundle
cd developer-toolkit-bundle

# Create structure
mkdir -p plugins tests docs
```

## Step 2: Bundle Metadata

**bundle.yaml:**
```yaml
name: developer-toolkit
version: 1.0.0
description: Essential tools for software development
author: SYNAPSE Team
license: MIT
repository: https://github.com/FTMahringer/Synapse-bundles

# Supported SYNAPSE versions
synapse_version: ">=2.0.0"

# Plugins included in this bundle
plugins:
  # Version constraints
  - name: git-integration
    version: "^1.0.0"
    required: true
  
  - name: code-linter
    version: ">=1.5.0,<2.0.0"
    required: true
  
  - name: github-issues
    version: "^1.0.0"
    required: false  # Optional plugin
  
  - name: ci-cd-integration
    version: "^2.0.0"
    required: true

# Pre-configured settings
configuration:
  git-integration:
    default_branch: main
    auto_commit: false
    commit_message_template: "feat: {summary}"
  
  code-linter:
    languages:
      - python
      - javascript
      - java
    auto_fix: false
    severity_threshold: warning
  
  github-issues:
    default_labels:
      - bug
      - enhancement
    auto_assign: true
  
  ci-cd-integration:
    providers:
      - github-actions
      - gitlab-ci
    auto_trigger: false

# Bundle-level dependencies
dependencies:
  system:
    - git>=2.0.0
  python:
    - requests>=2.31.0

# Permissions required by bundle
permissions:
  - network.http
  - filesystem.read
  - filesystem.write:/workspace
  - process.spawn

# Resource limits for entire bundle
limits:
  total_memory_mb: 1024
  total_cpu_percent: 75
```

## Step 3: Bundle Configuration

**config/presets.yaml:**
```yaml
# Preset configurations for different development environments

presets:
  beginner:
    description: Simplified configuration for beginners
    configuration:
      code-linter:
        auto_fix: true
        severity_threshold: error
      git-integration:
        auto_commit: false
  
  professional:
    description: Production-ready configuration
    configuration:
      code-linter:
        auto_fix: false
        severity_threshold: warning
        fail_on_error: true
      git-integration:
        auto_commit: false
        gpg_sign: true
      ci-cd-integration:
        auto_trigger: true
  
  team:
    description: Configuration for team collaboration
    configuration:
      github-issues:
        auto_assign: true
        notify_team: true
      git-integration:
        require_review: true
        protected_branches:
          - main
          - production
```

## Step 4: Bundle Installation Script

**install.sh:**
```bash
#!/bin/bash

set -e

echo "Installing Developer Toolkit Bundle..."

# Check SYNAPSE version
synapse version

# Install bundle
synapse bundle install .

# Select preset
echo "Select configuration preset:"
echo "1) Beginner"
echo "2) Professional"
echo "3) Team"
read -p "Choice (1-3): " choice

case $choice in
  1) preset="beginner" ;;
  2) preset="professional" ;;
  3) preset="team" ;;
  *) preset="professional" ;;
esac

# Apply preset
synapse bundle configure developer-toolkit --preset $preset

echo "Developer Toolkit Bundle installed successfully!"
echo "Run 'synapse bundle info developer-toolkit' for details."
```

## Step 5: Documentation

**README.md:**
````markdown
# Developer Toolkit Bundle

Essential tools for software development with SYNAPSE agents.

## Included Plugins

- **Git Integration**: Clone, commit, push, pull, branch management
- **Code Linter**: Multi-language code analysis and fixing
- **GitHub Issues**: Issue management and tracking
- **CI/CD Integration**: GitHub Actions and GitLab CI support

## Installation

```bash
synapse bundle install developer-toolkit
```

## Configuration Presets

### Beginner
- Automatic code fixing
- Simplified settings
- Error-level linting only

```bash
synapse bundle configure developer-toolkit --preset beginner
```

### Professional
- Production-ready configuration
- GPG commit signing
- Strict linting rules

```bash
synapse bundle configure developer-toolkit --preset professional
```

### Team
- Team collaboration features
- Code review requirements
- Automatic issue assignment

```bash
synapse bundle configure developer-toolkit --preset team
```

## Example Workflows

### Code Review

```
User: Review the changes in branch feature/new-ui
Agent: [Uses git-integration to fetch diff]
       [Uses code-linter to check code quality]
       Issues found:
       - 3 linting warnings in Header.tsx
       - Missing tests for UserService.java
```

### Create Issue from Bug

```
User: Create a GitHub issue for the login timeout bug
Agent: [Uses github-issues to create issue]
       Created issue #42: "Fix login timeout"
       URL: https://github.com/org/repo/issues/42
```

## Configuration

### Git Token

```bash
export GIT_TOKEN=your_token
```

### GitHub Token

```bash
export GITHUB_TOKEN=your_token
```

## License

MIT
````

## Step 6: Bundle Testing

**tests/test_bundle.py:**
```python
import pytest
from synapse.bundle import Bundle

def test_bundle_metadata():
    bundle = Bundle.load("bundle.yaml")
    
    assert bundle.name == "developer-toolkit"
    assert bundle.version == "1.0.0"
    assert len(bundle.plugins) == 4

def test_bundle_dependencies():
    bundle = Bundle.load("bundle.yaml")
    
    # Check required plugins
    required = [p for p in bundle.plugins if p.required]
    assert len(required) == 3
    
    # Check optional plugins
    optional = [p for p in bundle.plugins if not p.required]
    assert len(optional) == 1

def test_preset_loading():
    bundle = Bundle.load("bundle.yaml")
    presets = bundle.load_presets("config/presets.yaml")
    
    assert "beginner" in presets
    assert "professional" in presets
    assert "team" in presets

def test_preset_application():
    bundle = Bundle.load("bundle.yaml")
    bundle.apply_preset("professional")
    
    config = bundle.get_plugin_config("git-integration")
    assert config["gpg_sign"] == True
```

## Step 7: Publishing

### Community Repository

1. Fork https://github.com/FTMahringer/Synapse-plugins-community
2. Add bundle to `bundles/` directory
3. Submit pull request

### Official Repository

Official bundles are maintained by the SYNAPSE core team.

Contact the team if your bundle should be considered for official status.

## Bundle Best Practices

### Plugin Selection

✅ **Do:**
- Include complementary plugins
- Focus on specific workflow
- Keep bundle focused (5-10 plugins max)

❌ **Don't:**
- Mix unrelated plugins
- Include conflicting plugins
- Create "kitchen sink" bundles

### Configuration

✅ **Do:**
- Provide sensible defaults
- Include multiple presets
- Document all options
- Use environment variables for secrets

❌ **Don't:**
- Hardcode credentials
- Override user settings unexpectedly
- Make destructive changes by default

### Documentation

✅ **Do:**
- Include example workflows
- Document preset differences
- Provide troubleshooting guide
- Add migration guides for updates

❌ **Don't:**
- Assume knowledge of all plugins
- Skip installation instructions
- Forget to document prerequisites

## Advanced Bundle Features

### Conditional Plugins

Load plugins based on environment:

```yaml
plugins:
  - name: docker-integration
    version: "^1.0.0"
    condition: env.DOCKER_ENABLED == "true"
```

### Plugin Relationships

Define plugin dependencies:

```yaml
plugins:
  - name: kubernetes-integration
    version: "^2.0.0"
    requires:
      - docker-integration  # Must be installed first
```

### Post-Install Hooks

Run commands after installation:

```yaml
hooks:
  post_install:
    - "synapse plugin configure git-integration"
    - "echo 'Setup complete!'"
```

## See Also

- [Plugin Development Guide](/docs/plugins/development/getting-started)
- [Plugin Tutorial](/docs/plugins/development/plugin-tutorial)
- [Publishing Guide](/docs/plugins/development/publishing)
