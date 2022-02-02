# release download

Download the config manifest file for a release.

**Note:** This command is the same as the `release inspect` command for applications that are not packaged with Replicated.

## Usage
```bash
replicated release download SEQUENCE -d ./appyaml
```

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-d, --dest` | string  | Directory to which release manifests should be downloaded |
| `-h, --help`   |  |          Help for the admin-console |
| `--app string` | |   The app slug or app id used in all calls (default uses `$REPLICATED_APP` env variable) |
| `--token string` | |  The API token used to access your app in the Vendor API (default uses `$REPLICATED_API_TOKEN` env variable) |

## Examples
```bash
replicated release download 9 -d ./appyaml
  • Fetching Release 9 ✓
  • Writing files to ./appyaml
    • config-map.yaml
    • config.yaml
    • deployment.yaml
    • fluentd.yaml
    • nginx2.yaml
    • preflight.yaml
    • redis.yaml
    • replicated-app.yaml
    • service.yaml
    • support-bundle.yaml
```
