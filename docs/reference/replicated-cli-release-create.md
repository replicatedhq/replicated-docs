import Help from "../partials/replicated-cli/_help.mdx"
import YamlDir from "../partials/replicated-cli/_yaml-dir.mdx"
import ChartYamlDirReqs from "../partials/replicated-cli/_chart-yaml-dir-reqs.mdx"

# release create

Create a new release using a collection of application manifest files or a Helm chart.

## Usage
```bash
replicated release create --yaml-dir YAML_DIR [flags]
```

```bash
replicated release create --chart HELM_CHART [flags]
```

:::note
Additional flags returned by `--help` that are not supported by Replicated are omitted from the table below.
:::

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
  <td><code>--yaml-dir</code></td>
  <td>path</td>
  <td><p>The local directory containing multiple YAML manifest files for a release. <strong>(Required)</strong></p><p><ChartYamlDirReqs/></p></td>
</tr>
  <tr>
    <td><code>--chart</code></td>
    <td>string</td>
    <td><p>The path to the Helm chart for a release.<strong>(Required)</strong></p><p><ChartYamlDirReqs/></p></td>
  </tr>
  <tr>
    <td><code>--promote</code></td>
    <td>string</td>
    <td>Channel name to promote this release to. Case sensitive.</td>
  </tr>
  <tr>
    <td><code>--ensure-channel</code></td>
    <td></td>
    <td>When used with <code>--promote channel</code>, creates the channel if it does not exist.</td>
  </tr>
  <tr>
    <td><code>--lint</code></td>
    <td></td>
    <td>Lint a manifest directory prior to creation of the release. For more information, see <a href="linter">Linter Rules</a>.</td>
  </tr>
  <tr>
    <td><code>--release-notes</code></td>
    <td>string</td>
    <td>When used with <code>--promote channel</code>, creates the release notes in markdown.</td>
  </tr>
  <tr>
    <td><code>--version</code></td>
    <td>string</td>
    <td><p>When used with <code>--promote channel</code>, sets the version label for the release in this channel.</p><p>If semantic versioning is enabled on the channel, then the version label must be a valid semantic version number. See <a href="/vendor/releases-about#semantic-versioning">Semantic Versioning</a> in <em>About Releases</em>.</p></td>
  </tr>
  <Help/>
</table>

## Examples

### `--yaml-dir`

```bash
replicated release create --yaml-dir ./manifests

  • Reading manifests from ./manifests ✓
  • Creating Release ✓
    • SEQUENCE: 58
```

### `--chart`

```bash
replicated release create --chart=my-chart-1.0.0.tgz

  • Reading chart from my-chart-1.0.0.tgz ✓
  • Creating Release ✓
    • SEQUENCE: 58
```

### `--promote`

```bash
replicated release create --yaml-dir manifests --promote Unstable

  • Reading manifests from manifests ✓
  • Creating Release ✓
    • SEQUENCE: 59
  • Promoting ✓
    • Channel Unstable successfully set to release 59
```

### `--ensure-channel`

```bash
replicated release create --yaml-dir ./manifests --promote my-new-channel --ensure-channel

  • Reading manifests from manifests ✓
  • Creating Release ✓
    • SEQUENCE: 60
  • Promoting ✓
    • Channel my-new-channel successfully set to release 60
```

### `--release-notes`

```bash
replicated release create --yaml-dir ./manifests --promote Unstable --ensure-channel --release-notes "CI Release"

  • Reading manifests from manifests ✓
  • Creating Release ✓
    • SEQUENCE: 61
  • Promoting ✓
    • Channel Unstable successfully set to release 61
```

### `--version`

```bash
replicated release create --yaml-dir ./manifests --promote Unstable --ensure-channel --release-notes "Beta Release" --version "1.2.3"

  • Reading manifests from manifests ✓
  • Creating Release ✓
    • SEQUENCE: 62
  • Promoting ✓
    • Channel Unstable successfully set to release 62
```
