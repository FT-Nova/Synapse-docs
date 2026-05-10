# Official Plugin Bundles

Pre-configured collections of official plugins for common workflows.

## Overview

Plugin bundles provide:
- 🎯 **Curated Collections**: Carefully selected plugins that work well together
- ⚡ **Quick Setup**: Install multiple plugins with one command
- 🔧 **Pre-Configured**: Optimized settings for specific use cases
- 📚 **Documented Workflows**: Complete guides and examples

## Available Bundles

### Developer Toolkit

Essential tools for software development.

**Included Plugins:**
- Git integration
- Code analysis and linting
- CI/CD tools
- Issue tracking
- Code review tools

**Install:**
```bash
synapse bundle install developer-toolkit
```

[Learn more →](/docs/plugins/bundles/official/developer-toolkit)

### Data Science Bundle

Tools for data analysis, visualization, and machine learning.

**Included Plugins:**
- Data processing tools
- Visualization libraries
- ML model integration
- Jupyter integration
- Statistical analysis

**Install:**
```bash
synapse bundle install data-science
```

:::info Coming Soon
This bundle is planned for v2.4.0.
:::

### DevOps Bundle

Infrastructure management and deployment tools.

**Included Plugins:**
- Docker/Kubernetes management
- Cloud provider APIs (AWS, Azure, GCP)
- Monitoring and alerting
- Configuration management
- Log analysis

**Install:**
```bash
synapse bundle install devops
```

:::info Coming Soon
This bundle is planned for v2.8.0.
:::

## Bundle Management

### Install Bundle

```bash
# Install all plugins in bundle
synapse bundle install bundle-name

# Install with specific version
synapse bundle install bundle-name@1.0.0

# Preview what will be installed
synapse bundle info bundle-name
```

### Update Bundle

```bash
# Update all plugins in bundle
synapse bundle update bundle-name

# Update to specific version
synapse bundle update bundle-name@2.0.0
```

### Remove Bundle

```bash
# Remove all bundle plugins
synapse bundle remove bundle-name

# Keep plugins installed by other bundles
synapse bundle remove bundle-name --keep-shared
```

## Creating Custom Bundles

You can create custom bundles for your organization:

**bundle.yaml:**
```yaml
name: my-team-bundle
version: 1.0.0
description: Our team's standard plugin set

plugins:
  - web-search@^1.0.0
  - file-operations@^1.0.0
  - git-integration@^1.5.0
  - slack-notifier@^2.0.0

configuration:
  git-integration:
    default_branch: main
    auto_commit: false
  
  slack-notifier:
    webhook_url: env://SLACK_WEBHOOK
```

**Install custom bundle:**
```bash
synapse bundle install --file ./bundle.yaml
```
