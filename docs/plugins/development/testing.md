# Plugin Testing

Comprehensive guide to testing SYNAPSE plugins.

## Testing Strategy

### Test Levels

1. **Unit Tests**: Test individual tools in isolation
2. **Integration Tests**: Test plugin with SYNAPSE runtime
3. **End-to-End Tests**: Test complete agent workflows

## Unit Testing

### Python Example

```python
import pytest
from unittest.mock import Mock, patch
from my_plugin import MyPlugin

@pytest.fixture
def plugin():
    config = {"api_key": "test-key"}
    return MyPlugin(config)

def test_tool_basic(plugin):
    result = plugin.my_tool("input")
    assert result["status"] == "success"

def test_tool_validation(plugin):
    with pytest.raises(ValueError):
        plugin.my_tool("")  # Empty input should fail

@patch("requests.get")
def test_tool_with_mock(mock_get, plugin):
    mock_response = Mock()
    mock_response.json.return_value = {"data": "test"}
    mock_get.return_value = mock_response
    
    result = plugin.fetch_data()
    assert result["data"] == "test"
```

### Java Example

```java
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import static org.junit.jupiter.api.Assertions.*;

class MyPluginTest {
    
    @Test
    void testToolBasic() {
        MyPlugin plugin = new MyPlugin(config);
        Map<String, Object> result = plugin.myTool("input");
        assertEquals("success", result.get("status"));
    }
    
    @Test
    void testToolValidation() {
        MyPlugin plugin = new MyPlugin(config);
        assertThrows(IllegalArgumentException.class, () -> {
            plugin.myTool("");
        });
    }
}
```

## Integration Testing

Test plugin within SYNAPSE environment:

```python
from synapse.testing import PluginTestCase

class TestMyPluginIntegration(PluginTestCase):
    plugin_name = "my-plugin"
    
    def test_tool_execution(self):
        # Execute tool through plugin manager
        result = self.execute_tool("my_tool", {"input": "test"})
        self.assertEqual(result["status"], "success")
    
    def test_permissions(self):
        # Verify permission checks
        with self.assertRaises(PermissionError):
            self.execute_tool("restricted_tool", {})
    
    def test_resource_limits(self):
        # Verify resource constraints
        result = self.execute_tool("heavy_tool", {})
        self.assertLess(self.get_memory_usage(), 512 * 1024 * 1024)
```

## Test Coverage

### Measure Coverage

```bash
# Python
pytest --cov=src --cov-report=html tests/

# Java
mvn test jacoco:report
```

### Coverage Goals

- ✅ **80%+** statement coverage
- ✅ **70%+** branch coverage
- ✅ **100%** coverage for critical paths

## Testing Best Practices

### Test Organization

```
tests/
├── unit/
│   ├── test_tool_a.py
│   └── test_tool_b.py
├── integration/
│   ├── test_plugin_lifecycle.py
│   └── test_permissions.py
└── e2e/
    └── test_workflows.py
```

### Test Data

Store test fixtures separately:

```
tests/
├── fixtures/
│   ├── sample_response.json
│   ├── test_config.yaml
│   └── mock_data.csv
```

### Continuous Integration

**GitHub Actions (.github/workflows/test.yml):**
```yaml
name: Test Plugin

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install -r requirements-dev.txt
      
      - name: Run tests
        run: pytest --cov=src --cov-report=xml tests/
      
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          file: ./coverage.xml
```

## Common Test Scenarios

### Error Handling

```python
def test_network_error(plugin):
    with patch("requests.get") as mock_get:
        mock_get.side_effect = requests.RequestException("Network error")
        
        result = plugin.fetch_data()
        assert result["status"] == "error"
        assert "network" in result["message"].lower()
```

### Timeout Handling

```python
def test_timeout(plugin):
    with patch("requests.get") as mock_get:
        mock_get.side_effect = requests.Timeout()
        
        result = plugin.fetch_data()
        assert result["status"] == "timeout"
```

### Input Validation

```python
@pytest.mark.parametrize("invalid_input", [
    None,
    "",
    "   ",
    123,  # Wrong type
    {"wrong": "structure"}
])
def test_invalid_input(plugin, invalid_input):
    with pytest.raises(ValueError):
        plugin.process(invalid_input)
```

## Performance Testing

```python
import time

def test_performance(plugin):
    start = time.time()
    result = plugin.heavy_operation()
    duration = time.time() - start
    
    assert duration < 5.0  # Should complete in under 5 seconds
    assert result is not None
```

## Security Testing

```python
def test_sql_injection_prevention(plugin):
    malicious_input = "'; DROP TABLE users; --"
    result = plugin.query(malicious_input)
    # Should safely handle malicious input
    assert result["status"] == "success" or result["status"] == "validation_error"

def test_xss_prevention(plugin):
    malicious_input = "<script>alert('xss')</script>"
    result = plugin.format_output(malicious_input)
    assert "<script>" not in result
```
