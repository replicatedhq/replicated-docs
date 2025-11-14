# .replicated File Reference (Alpha)

:::important
The `.replicated` configuration file is Alpha and its functionality is subject to change. For access to this feature, reach out to your Replicated account representative.
:::

This topic describes all supported fields in the `.replicated` configuration file. It also provides examples of `.replicated` configuration files.

## Application Fields

### `appId` (string, optional)
Your Replicated application ID. You can find this in the Vendor Portal at vendor.replicated.com.

### `appSlug` (string, optional)
Your Replicated application slug. This is the human-readable identifier for your app (more commonly used than `appId`).

**Example:**
```yaml
appSlug: "my-application"
```

## Release Configuration

### `promoteToChannelIds` (array of strings, optional)
List of channel IDs to automatically promote releases to when using `replicated release create`.

### `promoteToChannelNames` (array of strings, optional)
List of channel names to automatically promote releases to. More convenient than using IDs.

**Example:**
```yaml
promoteToChannelNames: ["beta", "stable"]
```

### `releaseLabel` (string, optional)
Template string for release labels. Supports Go template syntax.

**Example:**
```yaml
releaseLabel: "v{{.Semver}}"
```

## Resource Configuration

### `charts` (array of objects, optional)
Helm charts to include in releases and lint operations.

**Fields:**
- `path` (string, required): Path or glob pattern to chart directory (e.g., `./chart` or `./charts/*`). For more information, see [About Path Resolution](#about-path-resolution).
- `chartVersion` (string, optional): Override the chart version
- `appVersion` (string, optional): Override the app version

**Example:**
```yaml
charts:
  - path: "./helm-chart"
  - path: "./charts/app-*"    # Glob patterns supported
    chartVersion: "1.2.3"
```

### `preflights` (array of objects, optional)
Preflight check specifications to validate before installation.

**Fields:**
- `path` (string, required): Path or glob pattern to preflight spec files. For more information, see [About Path Resolution](#about-path-resolution).
- `valuesPath` (string, optional but recommended): Path to Helm chart directory for template rendering. Required for v1beta3 preflights that use templating.

**Example:**
```yaml
preflights:
  - path: "./preflights/preflight.yaml"
    valuesPath: "./helm-chart"  # Chart directory for rendering templates
  - path: "./preflights/**/*.yaml"  # Glob pattern
    valuesPath: "./helm-chart"
```

### `manifests` (array of strings, optional)
Glob patterns for Kubernetes manifest files, including support bundle specs. These are searched for support bundle specifications during linting.

**Example:**
```yaml
manifests:
  - "./manifests/**/*.yaml"
  - "./support-bundles/**"
```

## Linting Configuration

### `repl-lint` (object, optional)
Configuration for the linting subsystem.

**Fields:**
- `version` (integer): Configuration version (currently `1`)
- `linters` (object): Enable/disable specific linters
- `tools` (map): Tool versions to use

**Example:**
```yaml
repl-lint:
  version: 1
  linters:
    helm:
      disabled: false          # Enable Helm linting
    preflight:
      disabled: false          # Enable preflight linting
    support-bundle:
      disabled: false          # Enable support bundle linting
    embedded-cluster:
      disabled: true           # Disable embedded cluster linting
    kots:
      disabled: true           # Disable KOTS linting
  tools:
    helm: "3.14.4"             # Specific version
    preflight: "latest"        # Use latest version
    support-bundle: "0.123.9"
```

## Linter Configuration

Each linter under `repl-lint.linters` supports:
- `disabled` (boolean): Set to `true` to disable the linter, `false` or omit to enable

**Available linters:**
- `helm`: Validates Helm chart syntax and best practices
- `preflight`: Validates preflight specification syntax
- `support-bundle`: Validates support bundle specification syntax
- `embedded-cluster`: Validates embedded cluster configurations (disabled by default)
- `kots`: Validates KOTS manifests (disabled by default)

## Tool Versions

The `tools` map specifies which versions of linting tools to use:

- `helm`: Helm CLI version for chart validation
- `preflight`: Preflight CLI version for preflight spec validation
- `support-bundle`: Support Bundle CLI version for support bundle validation

**Version formats:**
- `"latest"`: Automatically fetch the latest stable version from GitHub
- Semantic version: Specific version (e.g., `"3.14.4"`, `"v0.123.9"`)

**Example:**
```yaml
tools:
  helm: "latest"              # Always use latest Helm
  preflight: "0.123.9"        # Pin preflight to specific version
  support-bundle: "latest"
```

## About Path Resolution

### Relative Paths
All paths in the configuration file are resolved relative to the directory containing the `.replicated` file. This ensures commands work correctly regardless of where they are invoked.

### Glob Patterns
Paths support glob patterns for flexible resource discovery:
- `*`: Matches any characters except `/`
- `**`: Matches any characters including `/` (recursive)
- `?`: Matches any single character
- `[abc]`: Matches any character in brackets
- `{a,b}`: Matches any of the comma-separated patterns

**Examples:**
```yaml
charts:
  - path: "./charts/*"           # All immediate subdirectories
  - path: "./services/**/chart"  # Any chart directory under services

preflights:
  - path: "./checks/**/*.yaml"   # All YAML files recursively

manifests:
  - "./*/manifests/**"           # Manifests in any top-level directory
```

## Examples

### All Fields

```yaml
# Application identification
appId: ""                      # Your application ID (optional)
appSlug: ""                    # Your application slug (optional, more commonly used)

# Automatic promotion channels
promoteToChannelIds: []        # List of channel IDs to promote to
promoteToChannelNames: []      # List of channel names to promote to (e.g., ["beta", "stable"])

# Helm charts
charts:
  - path: "./helm-chart"       # Path or glob pattern to chart directory
    chartVersion: ""           # Override chart version (optional)
    appVersion: ""             # Override app version (optional)

# Preflight checks
preflights:
  - path: "./preflights/**"    # Path or glob pattern to preflight specs
    valuesPath: "./helm-chart" # Path to helm chart for template rendering (required for v1beta3 preflights)

# Kubernetes manifests and support bundles
manifests: ["./support-bundles/**"]  # Glob patterns for manifest files

# Release labeling
releaseLabel: ""               # Label pattern for releases (e.g., "v{{.Semver}}")

# Linting configuration
repl-lint:
  version: 1
  linters:
    helm:
      disabled: false          # Enable/disable Helm linting
    preflight:
      disabled: false          # Enable/disable preflight linting
    support-bundle:
      disabled: false          # Enable/disable support bundle linting
  tools:
    helm: "latest"             # Helm version (semantic version or "latest")
    preflight: "latest"        # Preflight version (semantic version or "latest")
    support-bundle: "latest"   # Support bundle version (semantic version or "latest")
```

### Single-Chart

```yaml
appSlug: "my-application"

charts:
  - path: "./chart"

manifests:
  - "./manifests/**/*.yaml"

repl-lint:
  version: 1
  linters:
    helm:
      disabled: false
  tools:
    helm: "latest"
```

### Multi-Chart with Preflights

```yaml
appSlug: "complex-app"
promoteToChannelNames: ["beta"]

charts:
  - path: "./charts/frontend"
  - path: "./charts/backend"
  - path: "./charts/database"

preflights:
  - path: "./preflights/infrastructure.yaml"
    valuesPath: "./charts/backend"
  - path: "./preflights/networking.yaml"
    valuesPath: "./charts/frontend"

manifests:
  - "./support-bundles/**"

repl-lint:
  version: 1
  linters:
    helm:
      disabled: false
    preflight:
      disabled: false
    support-bundle:
      disabled: false
  tools:
    helm: "3.14.4"
    preflight: "latest"
    support-bundle: "latest"
```

### Monorepo Service Configuration

```yaml
# Parent .replicated at monorepo root
appSlug: "enterprise-platform"
promoteToChannelNames: ["stable"]

repl-lint:
  version: 1
  linters:
    helm:
      disabled: false
    preflight:
      disabled: false
  tools:
    helm: "latest"
    preflight: "latest"
```

```yaml
# Child .replicated in services/auth/
charts:
  - path: "./chart"

preflights:
  - path: "./preflights/*.yaml"
    valuesPath: "./chart"
```

### Minimal Configuration

```yaml
# Minimal config - relies on auto-detection
appSlug: "simple-app"
```