# release update

Updates the YAML application manifests for a given release.

## Usage
```bash
replicated release update --yaml-dir YAML_DIR [Flags]
```

* _`YAML_DIR` corresponds to the root directory of the YAML application manifest files._
* _Additional flags returned by `--help` that are not supported in KOTS have been omitted from the list below_

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `--yaml-dir` | path | The directory containing multiple yamls for a release. (**required**) |
| `-h, --help`   |  |          Help for the command |
| `--app string` | |   The app slug or app id used in all calls (default uses `$REPLICATED_APP` env variable) |
| `--token string` | |  The API token used to access your app in the Vendor API (default uses `$REPLICATED_API_TOKEN` env variable) |

## Examples
```bash
replicated release update 25 --yaml-dir ./manifests
Release 25 updated
```
