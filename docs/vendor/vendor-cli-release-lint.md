# release lint

Lint a directory of YAML application manifests

## Usage
```bash
replicated release lint --yaml-dir YAML_DIR [flags]
```

* _`YAML_DIR` corresponds to the root directory of the YAML application manifest files._
* _Returns exit code 1 when an error in linting is discovered. Otherwise, returns exit codse 0 (such as for info and warning messages)._

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `--yaml-dir` | path | The directory containing yaml application manifests for a Kots release. (**required**) |
| `--fail-on` | string | The minimum severity of a linting rule to cause a non-zero exit code. Supported values are [info, warn, error, none]. (default is error) |
| `-h, --help`   |  |          Help for the admin-console |

## Examples
```bash
replicated release lint --yaml-dir ./manifests --fail-on error
RULE                           TYPE    LINE    MESSAGE
config-spec                    warn            Missing config spec
replicas-1                     info    10      Found Replicas 1
container-resource-requests    info    27      Missing resource requests
```
