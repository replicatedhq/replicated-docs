import YamlDir from "../partials/replicated-cli/_yaml-dir.mdx"
import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# release update

Updates the YAML application manifests for a given release.

## Usage
```bash
replicated release update --yaml-dir YAML_DIR [Flags]
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td>`--chart`</td>
    <td>string</td>
    <td>Helm chart to create the release from. Cannot be used with the `--yaml`, `--yaml-file`, or `--yaml-dir` flags.</td>
  </tr>
  <YamlDir/>
</table>

## Global Flags

<GlobalFlags/>

## Examples

```bash
replicated release update 25 --yaml-dir ./manifests
Release 25 updated
```
