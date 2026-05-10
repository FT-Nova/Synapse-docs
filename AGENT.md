# SYNAPSE Documentation - Agent Workflow Rules

This document defines the development workflow, versioning philosophy, and documentation standards for the **SYNAPSE Documentation** repository.

:::info Independent Versioning
The SYNAPSE Documentation repository uses **its own versioning system** independent of the main SYNAPSE application. Documentation starts at `v0.0.1-dev` and follows its own release cycle.
:::

---

## Version Numbering Philosophy

### Documentation Versioning

The documentation uses semantic versioning **independent** of the main SYNAPSE application:

```
v<MAJOR>.<MINOR>.<PATCH>-dev
```

**Examples:**
- `v0.0.1-dev` - First documentation iteration (setup)
- `v0.0.2-dev` - Second documentation iteration (content migration)
- `v0.1.0` - First minor documentation release
- `v1.0.0` - First major documentation release (production-ready)

### When to Increment

- **MAJOR** (`v1.0.0` → `v2.0.0`): Major documentation restructure or platform change
- **MINOR** (`v0.1.0` → `v0.2.0`): New major documentation section complete
- **PATCH** (`v0.0.1-dev` → `v0.0.2-dev`): Development iterations, content updates

### Documentation Milestones

Documentation releases typically align with SYNAPSE milestones but use separate version numbers:

| SYNAPSE Version | Docs Version | Description |
|-----------------|--------------|-------------|
| v2.1.0 | v0.1.0 | Initial documentation platform |
| v2.4.0 | v0.2.0 | Advanced features documented |
| v3.0.0 | v1.0.0 | Production-ready documentation |

---

## Git Workflow Rules

### 1. Always Commit After Changes

After every documentation update:

```bash
git add -A
git commit -m "docs: Description of changes"
```

**Commit message format:**
```
<type>(<scope>): <description>

[optional body]

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

**Types:**
- `docs:` - Documentation content updates
- `feat:` - New documentation sections or features
- `fix:` - Documentation corrections or fixes
- `style:` - Formatting, layout, CSS changes
- `chore:` - Build config, dependencies, tooling

**Examples:**
```bash
git commit -m "docs: Add deployment guide for Docker Compose"
git commit -m "feat: Add Mermaid diagram support"
git commit -m "fix: Correct environment variable defaults"
```

### 2. Always Tag Development Versions

After every commit for a development version:

```bash
git tag -a v0.0.x-dev -m "Detailed description"
```

**Tag message should include:**
- What documentation was added/updated
- What features were documented
- Any breaking changes to doc structure

### 3. Always Push Immediately

```bash
git push origin main --tags
```

**Push after:**
- Every commit
- Every tag

### 4. Create Pre-Release for Every Development Version

```bash
gh release create v0.0.x-dev \
  --repo FTMahringer/Synapse-docs \
  --title "v0.0.x-dev: Title" \
  --notes "Release notes" \
  --prerelease
```

**Pre-releases are for:**
- `v0.0.x-dev` versions
- Work-in-progress documentation
- Preview builds

### 5. Create Release for Minor/Major Versions

```bash
gh release create v0.x.0 \
  --repo FTMahringer/Synapse-docs \
  --title "v0.x.0: Title" \
  --notes "Release notes"
  # NO --prerelease flag
```

**Full releases are for:**
- `v0.x.0` versions (minor releases)
- `vx.0.0` versions (major releases)
- Production-ready documentation milestones

---

## Documentation Update Workflow

### For Every Development Version (v0.0.x-dev)

1. **Update/Create Documentation**
   - Write or update markdown files
   - Add diagrams, examples, guides
   - Update navigation in `sidebars.ts`

2. **Test Locally**
   ```bash
   npm run start  # Preview changes
   npm run build  # Verify build works
   ```

3. **Commit Changes**
   ```bash
   git add -A
   git commit -m "docs: Description

   Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
   ```

4. **Tag Version**
   ```bash
   git tag -a v0.0.x-dev -m "Detailed description of updates"
   ```

5. **Push to GitHub**
   ```bash
   git push origin main --tags
   ```

6. **Create Pre-Release**
   ```bash
   gh release create v0.0.x-dev \
     --repo FTMahringer/Synapse-docs \
     --title "v0.0.x-dev: Title" \
     --notes "Detailed release notes" \
     --prerelease
   ```

### For Minor Releases (v0.x.0)

1. **Complete All Planned Content**
   - Ensure all documentation for milestone is complete
   - Review for accuracy and completeness
   - Test all code examples

2. **Create RELEASE_NOTES**
   - Create `RELEASE_NOTES_V0.x.0.md` in repository root
   - Summarize all changes since last minor release
   - Include screenshots, examples, highlights

3. **Update README** (if needed)
   - Update installation instructions
   - Update feature list
   - Update links

4. **Commit, Tag, Push**
   ```bash
   git add -A
   git commit -m "docs: Release v0.x.0"
   git tag -a v0.x.0 -m "Release notes"
   git push origin main --tags
   ```

5. **Create Release** (NOT pre-release)
   ```bash
   gh release create v0.x.0 \
     --repo FTMahringer/Synapse-docs \
     --title "v0.x.0: Documentation Release Title" \
     --notes-file RELEASE_NOTES_V0.x.0.md
   ```

6. **Deploy to GitHub Pages**
   - Docusaurus should auto-deploy via GitHub Actions
   - Verify at https://ftmahringer.github.io/Synapse/

---

## Documentation Quality Standards

### Every Documentation Page Must Have

- ✅ **Clear title** and introduction
- ✅ **Table of contents** (auto-generated by Docusaurus)
- ✅ **Code examples** with syntax highlighting
- ✅ **Admonitions** for warnings, tips, important notes
- ✅ **Visual aids** (diagrams, screenshots) where helpful
- ✅ **Troubleshooting** section (if applicable)
- ✅ **Next steps** or related documentation links

### Documentation Best Practices

- **Use Docusaurus admonitions** for important information:
  ```markdown
  :::tip
  This is helpful advice
  :::
  
  :::warning
  This is a warning
  :::
  
  :::danger
  This is critical information
  :::
  ```

- **Include Mermaid diagrams** for complex concepts:
  ```markdown
  ```mermaid
  graph TD
    A[Start] --> B[Process]
  ```
  ```

- **Provide complete examples** that users can copy-paste
- **Test all code examples** before committing
- **Keep examples up-to-date** with latest SYNAPSE version
- **Use consistent formatting** across all documentation

### File Naming Conventions

- Use kebab-case: `docker-compose.md`, `environment-variables.md`
- Be descriptive: `plugin-development.md` not `plugins.md`
- Group related docs in folders: `deployment/`, `api/`, `guides/`

---

## Changelog Management

### CHANGELOG.md

The documentation repository should have its own `CHANGELOG.md`:

```markdown
## [v0.0.3-dev] - 2026-05-10

### Documentation
- Added deployment guides
- Added troubleshooting guide
- Added backup procedures

### Added
- Mermaid diagram support
- Admonitions for warnings/tips
```

**Update CHANGELOG.md:**
- With every development version
- Before every release
- Include all significant changes

---

## Relationship with Main SYNAPSE Repository

### Documentation Tracks SYNAPSE Features

- Documentation should be updated when SYNAPSE features change
- Major SYNAPSE releases may trigger documentation releases
- Documentation can release independently for improvements

### Cross-Repository References

Main SYNAPSE repository can reference docs versions:

```markdown
**Documentation**: https://ftmahringer.github.io/Synapse/
**Docs Version**: v0.1.0
**Docs Repository**: https://github.com/FTMahringer/Synapse-docs
```

But docs use **independent version numbers**.

---

## GitHub Pages Deployment

### Automatic Deployment

Docusaurus is configured for GitHub Pages deployment:

```yaml
# docusaurus.config.ts
url: 'https://ftmahringer.github.io',
baseUrl: '/Synapse/',
organizationName: 'FTMahringer',
projectName: 'Synapse',
```

### Deployment Workflow

1. **Automatic on push to main:**
   - GitHub Actions builds Docusaurus
   - Deploys to `gh-pages` branch
   - Available at https://ftmahringer.github.io/Synapse/

2. **Manual deployment:**
   ```bash
   npm run deploy
   ```

### Versioned Documentation

For major SYNAPSE versions, create versioned docs:

```bash
npm run docusaurus docs:version 1.0
```

This creates immutable documentation for that version.

---

## Quick Reference

### Standard Development Workflow

```bash
# 1. Update documentation
nano docs/deployment/new-guide.md

# 2. Test locally
npm run start

# 3. Build and verify
npm run build

# 4. Commit
git add -A
git commit -m "docs: Add new deployment guide

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

# 5. Tag
git tag -a v0.0.4-dev -m "v0.0.4-dev: New deployment guide"

# 6. Push
git push origin main --tags

# 7. Release
gh release create v0.0.4-dev \
  --repo FTMahringer/Synapse-docs \
  --title "v0.0.4-dev: New Deployment Guide" \
  --notes "Added comprehensive deployment guide for XYZ" \
  --prerelease
```

---

## Summary

- ✅ Documentation uses **independent versioning** (starts at v0.0.1-dev)
- ✅ Always commit → tag → push → release for every version
- ✅ Use pre-releases for `v0.0.x-dev` versions
- ✅ Use full releases for `v0.x.0` and `vx.0.0` versions
- ✅ Maintain high documentation quality standards
- ✅ Test all examples before committing
- ✅ Update CHANGELOG.md with every version
- ✅ Documentation deploys automatically to GitHub Pages

**Documentation lives independently but tracks SYNAPSE features!**
