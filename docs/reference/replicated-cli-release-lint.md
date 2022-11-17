import Help from "../partials/replicated-cli/_help.mdx"
import YamlDir from "../partials/replicated-cli/_yaml-dir.mdx"

# release lint

Lint a directory of application manifest files. For more information, see [Linter Rules](linter).

## Usage
```bash
replicated release lint --yaml-dir YAML_DIR [flags]
```

* _`YAML_DIR` corresponds to the root directory of the YAML application manifest files._
* _Returns exit code 1 when an error in linting is discovered. Otherwise, returns exit codse 0 (such as for info and warning messages)._

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <YamlDir/>
  <tr>
    <td><code>--fail-on</code></td>
    <td>string</td>
    <td>The minimum severity of a linting rule to cause a non-zero exit code. Supported values are <code>info</code>, <code>warn</code>, <code>error</code>, <code>none</code>. <strong>Default:</strong> Error</td>
  </tr>
  <Help/>
</table>

## Examples
```bash
replicated release lint --yaml-dir ./manifests --fail-on error
RULE                           TYPE    LINE    MESSAGE
config-spec                    warn            Missing config spec
replicas-1                     info    10      Found Replicas 1
container-resource-requests    info    27      Missing resource requests
```
