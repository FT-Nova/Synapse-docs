# Community Plugin Bundles

Explore bundle collections created by the community.

## Overview

Community bundles are pre-configured plugin collections for specific workflows and industries.

## Plugin Bundle Repository

Browse and contribute bundles at:

**Repository**: https://github.com/FTMahringer/Synapse-plugins-community/tree/main/bundles

## Featured Community Bundles

:::info Coming Soon
Community bundles will be available once the plugin repository is public.
Contribute your bundle once the repository launches!
:::

## Installation

Install community bundles from the repository:

```bash
synapse bundle install --community bundle-name
```

Or install from a Git URL:

```bash
synapse bundle install --git https://github.com/username/my-bundle.git
```

## Creating a Bundle

Create a `bundle.yaml` file:

```yaml
name: my-bundle
version: 1.0.0
description: Description of what this bundle does
author: Your Name
license: MIT

# Required plugins
plugins:
  - plugin-1@^1.0.0
  - plugin-2@^2.0.0
  - plugin-3>=1.5.0,<2.0.0

# Optional: Pre-configured settings
configuration:
  plugin-1:
    setting: value
  plugin-2:
    api_key: env://PLUGIN2_API_KEY

# Optional: Dependencies on other bundles
bundles:
  - developer-toolkit@^1.0.0
```

## Contributing

See [Contributing Community Plugins](/docs/plugins/community/contributing) for guidelines.

Bundles follow the same review process as plugins.

## Quality Standards

Ensure your bundle:
- ✅ Has clear documentation
- ✅ Lists compatible plugin versions
- ✅ Includes usage examples
- ✅ Specifies purpose and target audience
- ✅ Works with latest SYNAPSE version
