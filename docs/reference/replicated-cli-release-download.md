import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# release download

Download the config manifest file for a release.

**Note:** This command is the same as the `release inspect` command for applications that are not packaged with Replicated.

## Usage
```bash
replicated release download SEQUENCE -d ./appyaml
```

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td><code>-d, --dest</code></td>
    <td>string</td>
    <td>Directory where release manifests should be downloaded.</td>
  </tr>
</table>

## Global Flags

<GlobalFlags/>

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
