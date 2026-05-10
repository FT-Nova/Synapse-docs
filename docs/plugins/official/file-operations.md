# File Operations Plugin

Read, write, and manage files in SYNAPSE agents.

## Overview

The File Operations plugin provides secure file system access for agents.

**Capabilities:**
- Read files
- Write files
- List directories
- Search files
- File metadata
- Archive operations (zip, tar)

## Installation

Pre-installed with SYNAPSE. Enable for your agent:

```bash
synapse agent update my-agent --enable-plugin file-operations
```

## Configuration

```yaml
plugins:
  file-operations:
    base_path: /workspace  # Root directory for operations
    max_file_size_mb: 100
    allowed_extensions:
      - .txt
      - .md
      - .json
      - .yaml
      - .csv
    forbidden_paths:
      - /etc
      - /sys
      - /proc
```

## Tools

### `read_file`

Read file contents.

**Parameters:**
- `path` (string, required): File path relative to base_path
- `encoding` (string, optional): Text encoding (default: utf-8)

**Returns:**
```json
{
  "path": "/workspace/document.txt",
  "content": "File contents...",
  "size_bytes": 1024,
  "encoding": "utf-8"
}
```

### `write_file`

Write content to file.

**Parameters:**
- `path` (string, required): File path
- `content` (string, required): Content to write
- `overwrite` (boolean, optional): Overwrite if exists (default: false)

**Returns:**
```json
{
  "path": "/workspace/output.txt",
  "size_bytes": 512,
  "created": true
}
```

### `list_directory`

List directory contents.

**Parameters:**
- `path` (string, required): Directory path
- `recursive` (boolean, optional): Recursive listing (default: false)

**Returns:**
```json
{
  "path": "/workspace",
  "files": [
    {
      "name": "document.txt",
      "type": "file",
      "size_bytes": 1024,
      "modified": "2024-01-01T12:00:00Z"
    }
  ]
}
```

### `search_files`

Search for files by name or content.

**Parameters:**
- `pattern` (string, required): Search pattern (glob or regex)
- `content_search` (string, optional): Search file contents
- `recursive` (boolean, optional): Search subdirectories

### `create_archive`

Create zip or tar archive.

**Parameters:**
- `files` (array, required): Files to include
- `output_path` (string, required): Archive filename
- `format` (string, optional): zip or tar.gz (default: zip)

### `extract_archive`

Extract archive contents.

**Parameters:**
- `archive_path` (string, required): Archive file
- `output_dir` (string, optional): Extraction directory

## Usage Examples

### Read Configuration File

```
User: Read the config file
Agent: [uses read_file with path="config.yaml"]
       Configuration loaded:
       - database: postgres
       - port: 5432
```

### Save Results

```
User: Save the analysis results to report.json
Agent: [uses write_file]
       Results saved to /workspace/report.json (2.5 KB)
```

### List Project Files

```
User: List all Python files in the project
Agent: [uses search_files with pattern="**/*.py"]
       Found 42 Python files:
       - src/main.py
       - src/utils.py
       ...
```

## Permissions

- `filesystem.read`: Read access
- `filesystem.write:/workspace`: Write to workspace directory

## Security

### Path Validation

All paths are validated to prevent:
- Directory traversal (`../../../etc/passwd`)
- Absolute paths outside base_path
- Symbolic link following
- Access to system directories

### File Size Limits

- Single file: 100 MB (configurable)
- Total workspace: 10 GB (configurable)

### Extension Filtering

Only allowed extensions can be read/written (configurable).

## Troubleshooting

### Permission Denied

- Check base_path configuration
- Verify file permissions
- Check forbidden_paths list

### File Too Large

- Increase max_file_size_mb
- Process file in chunks
- Use streaming for large files

## See Also

- [Code Execution Plugin](/docs/plugins/official/code-execution)
- [Security Best Practices](/docs/administration/security)
