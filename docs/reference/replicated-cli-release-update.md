import Help from "../partials/replicated-cli/_help.mdx"
import App from "../partials/replicated-cli/_app.mdx"
import Token from "../partials/replicated-cli/_token.mdx"
import YamlDir from "../partials/replicated-cli/_yaml-dir.mdx"

# release update

Updates the YAML application manifests for a given release.

## Usage
```bash
replicated release update --yaml-dir YAML_DIR [Flags]
```

* _`YAML_DIR` corresponds to the root directory of the YAML application manifest files._
* _Additional flags returned by `--help` that are not supported in KOTS have been omitted from the list below_

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <YamlDir/>
  <Help/>
  <App/>
  <Token/>
</table>

## Examples
```bash
replicated release update 25 --yaml-dir ./manifests
Release 25 updated
```
