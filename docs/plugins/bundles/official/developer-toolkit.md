# Developer Toolkit Bundle

Essential tools for software development with SYNAPSE agents.

## Overview

The Developer Toolkit Bundle provides a comprehensive set of plugins for software development workflows.

**Included Plugins:**
- **Git Integration**: Version control operations
- **Code Linter**: Multi-language code analysis
- **GitHub Issues**: Issue tracking and management
- **CI/CD Integration**: GitHub Actions and GitLab CI support

## Installation

```bash
synapse bundle install developer-toolkit
```

## Configuration Presets

### Beginner

Simplified configuration for new users:
- Automatic code fixing
- Error-level linting only
- Simplified Git operations

```bash
synapse bundle configure developer-toolkit --preset beginner
```

### Professional

Production-ready configuration:
- Strict linting rules
- GPG commit signing
- Code review requirements

```bash
synapse bundle configure developer-toolkit --preset professional
```

### Team

Team collaboration features:
- Automatic issue assignment
- Code review workflows
- Protected branch enforcement

```bash
synapse bundle configure developer-toolkit --preset team
```

## Example Workflows

### Code Review

```
User: Review changes in branch feature/new-ui
Agent: [Uses git-integration to fetch diff]
       [Uses code-linter to analyze code]
       
       Review Summary:
       - 3 linting warnings in Header.tsx
       - Missing tests for UserService.java
       - Suggested improvements in styling
```

### Create Issue from Bug

```
User: Create a GitHub issue for the login timeout bug
Agent: [Uses github-issues plugin]
       
       Created issue #42: "Fix login timeout"
       URL: https://github.com/org/repo/issues/42
       Labels: bug, priority-high
```

### CI/CD Status

```
User: Check CI status for main branch
Agent: [Uses ci-cd-integration]
       
       CI/CD Status:
       ✅ Build: Passed
       ✅ Tests: 247/247 passed
       ⚠️  Lint: 3 warnings
       ✅ Deploy: Deployed to staging
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

### Full Configuration

```yaml
bundles:
  developer-toolkit:
    git-integration:
      default_branch: main
      auto_commit: false
      gpg_sign: true
    
    code-linter:
      languages: [python, javascript, java]
      auto_fix: false
      severity_threshold: warning
    
    github-issues:
      default_labels: [bug, enhancement]
      auto_assign: true
    
    ci-cd-integration:
      providers: [github-actions, gitlab-ci]
      auto_trigger: false
```

## Included Plugins

### Git Integration

- Clone repositories
- Commit changes
- Create branches
- Push/pull
- Merge requests

### Code Linter

- Multi-language support
- Configurable rules
- Auto-fixing
- Custom rules

### GitHub Issues

- List issues
- Create issues
- Update status
- Search and filter

### CI/CD Integration

- Trigger builds
- Check status
- View logs
- Deploy management

## System Requirements

- Git 2.0+
- Python 3.11+ (for linter)
- Node.js 20+ (for JavaScript linting)

## License

MIT

## See Also

- [Plugin Bundles](/docs/plugins/bundles/official/overview)
- [Plugin Development](/docs/plugins/development/getting-started)
