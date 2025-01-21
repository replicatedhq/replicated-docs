import GlobalFlags from "../partials/replicated-cli/_global-flags.mdx"

# release download

Download application manifests for a release to a specified directory.

:::note
For application releases that do not support installation a Replicated installer (Replicated Embedded Cluster, Replicated KOTS, Replicated kURL), `release download` is equivalent to the [`release inspect`](replicated-cli-release-inspect) command.
:::

## Usage
```bash
replicated release download SEQUENCE --dest ./DIRECTORY_NAME
```
Where `SEQUENCE` is the sequence number for the target release.

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

## Example

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
