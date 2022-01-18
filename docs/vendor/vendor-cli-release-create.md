# release create

Create a new release using a collection of YAML application manifests.

## Usage
```bash
replicated release create --yaml-dir YAML_DIR [flags]
```

* _`YAML_DIR` corresponds to the root directory of the YAML application manifest files._
* _Additional flags returned by `--help` that are not supported in KOTS have been omitted from the list below_

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `--yaml-dir` | path | The directory containing multiple yamls for a Kots release. (**required**) |
| `--promote` | string |    Channel name to promote this release to (**case sensitive**)|
| `--ensure-channel` |  |    When used with --promote _channel_, will create the channel if it doesn't exist |
| `--release-notes` | string |  When used with --promote _channel_, sets the **markdown** release notes |
| `--version` string | When used with --promote _channel_, sets the version label for the release in this channel |
| `-h, --help`   |  |          Help for the admin-console |

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
