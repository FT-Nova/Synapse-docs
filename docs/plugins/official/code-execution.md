# Code Execution Plugin

Execute code in sandboxed environments.

## Overview

The Code Execution plugin allows agents to run code safely in isolated environments.

**Supported Languages:**
- Python 3.11+
- JavaScript (Node.js 20+)
- Java 21+
- Bash/Shell
- Ruby
- Go

## Installation

Pre-installed with SYNAPSE. Enable for your agent:

```bash
synapse agent update my-agent --enable-plugin code-execution
```

## Configuration

```yaml
plugins:
  code-execution:
    timeout_seconds: 30
    max_memory_mb: 512
    max_cpu_percent: 75
    network_access: false  # Disable network by default
    persistent_environment: false  # Start fresh each time
```

## Tools

### `execute_code`

Execute code in a sandboxed environment.

**Parameters:**
- `code` (string, required): Code to execute
- `language` (string, required): Programming language
- `stdin` (string, optional): Standard input
- `files` (object, optional): Additional files needed

**Returns:**
```json
{
  "stdout": "Hello, World!\n",
  "stderr": "",
  "exit_code": 0,
  "execution_time_ms": 125,
  "language": "python"
}
```

## Usage Examples

### Python Script

````
User: Write a Python script to calculate fibonacci numbers
Agent: [uses execute_code]
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print([fibonacci(i) for i in range(10)])
```

Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
````

### JavaScript Analysis

````
User: Parse this JSON and extract names
Agent: [uses execute_code with language="javascript"]
```javascript
const data = require('./data.json');
const names = data.users.map(u => u.name);
console.log(names.join(', '));
```
````

## Sandbox Security

### Isolation Features

- ✅ Separate process space
- ✅ Limited filesystem access
- ✅ Network isolation (optional)
- ✅ Resource limits (CPU, memory, time)
- ✅ Restricted system calls

### Disabled by Default

- System calls (fork, exec)
- Raw socket access
- Device access
- Kernel module loading

## Permissions

- `process.spawn`: Required for code execution
- `network.http`: Only if network_access enabled

## Resource Limits

Per execution:
- **Memory**: 512 MB (configurable)
- **CPU**: 75% of one core (configurable)
- **Time**: 30 seconds (configurable)
- **Disk**: 100 MB temporary storage

## Language-Specific Features

### Python

- Pre-installed packages: numpy, pandas, requests, beautifulsoup4
- Custom packages via requirements.txt
- Virtual environment per execution

### JavaScript

- Node.js 20 LTS
- NPM packages available
- ES modules supported

### Java

- JDK 21
- Maven dependencies supported
- Class compilation and execution

## Error Handling

Common errors and solutions:

### Timeout

```json
{
  "error": "execution_timeout",
  "message": "Code execution exceeded 30 seconds"
}
```

**Solution**: Optimize code or increase timeout.

### Memory Limit

```json
{
  "error": "memory_exceeded",
  "message": "Process exceeded 512 MB memory limit"
}
```

**Solution**: Reduce memory usage or increase limit.

### Compilation Error

```json
{
  "stderr": "SyntaxError: invalid syntax",
  "exit_code": 1
}
```

**Solution**: Fix syntax errors in code.

## Best Practices

### Security

- ✅ Always use sandbox (never disable)
- ✅ Minimize execution time limits
- ✅ Disable network unless required
- ✅ Review code before execution
- ✅ Log all executions

### Performance

- ✅ Cache compiled code
- ✅ Reuse environments when possible
- ✅ Limit output size
- ✅ Set appropriate timeouts

## Advanced Usage

### Multi-File Execution

```json
{
  "code": "import utils; utils.process()",
  "language": "python",
  "files": {
    "utils.py": "def process(): print('Processing...')"
  }
}
```

### With Dependencies

```json
{
  "code": "import requests; print(requests.__version__)",
  "language": "python",
  "dependencies": {
    "python": ["requests>=2.31.0"]
  }
}
```
