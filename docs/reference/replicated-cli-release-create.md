import Help from "../partials/replicated-cli/_help.mdx"
import YamlDir from "../partials/replicated-cli/_yaml-dir.mdx"

# release create

Create a new release using a collection of application manifest files.

## Usage
```bash
replicated release create --yaml-dir YAML_DIR [flags]
```

* _`YAML_DIR` corresponds to the root directory of the YAML application manifest files._
* _Additional flags returned by `--help` that are not supported in Replicated have been omitted from the list below_

<table>
  <tr>
    <th width="30%">Flag</th>
    <th width="20%">Type (if applicable)</th>
    <th width="50%">Description</th>
  </tr>
  <YamlDir/>
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
    <td>When used with <code>--promote channel</code>, sets the version label for the release in this channel.</td>
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
