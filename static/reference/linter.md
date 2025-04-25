# Linter Rules

This topic describes the release linter and the linter rules.

## Overview

The linter checks the manifest files in Replicated KOTS releases to ensure that there are no YAML syntax errors, that all required manifest files are present in the release to support installation with KOTS, and more.

The linter runs automatically against KOTS releases that you create in the Replicated vendor portal, and displays any error or warning messages in the vendor portal UI.

To lint manifest files from the command line, you can run the Replicated CLI `replicated release lint` command against the root directory of your application manifest files. You can also use the `--lint` flag when you create a release with the `replicated release create` command. For more information, see [release lint](/reference/replicated-cli-release-lint) and [release create](/reference/replicated-cli-release-create) in the _Replicated CLI_ section.

## Linter Rules

This section lists the linter rules and the default rule levels (Info, Warn, Error). You can customize the default rule levels in the Replicated LinterConfig custom resource.
For more information, see [LintConfig](custom-resource-lintconfig).

### allow-privilege-escalation

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if any manifest file has <code>allowPrivilegeEscalation</code> set to <code>true</code>.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  allowPrivilegeEscalation: true
```</td>
  </tr>
</table>

### application-icon

<table>
  <tr>
    <th>Description</th>
    <td>
      Requires an application icon.
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Warn</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
      Files with <code>kind: Application</code> and <code>apiVersion: kots.io/v1beta1</code>.
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of correct YAML for this rule:</p>```yaml
apiVersion: kots.io/v1beta1
kind: Application
spec:
  icon: https://example.com/app-icon.png
```</td>
  </tr>
</table>

### application-spec

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Requires an Application custom resource manifest file.</p>
      <p>Accepted value for <code>kind</code>: <code>Application</code></p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Warn</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
apiVersion: kots.io/v1beta1
kind: Application
```</td>
  </tr>
</table>

### application-statusInformers

<table>
  <tr>
    <th>Description</th>
    <td>
      Requires <code>statusInformers</code>.
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Warn</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
      Files with <code>kind: Application</code> and <code>apiVersion: kots.io/v1beta1</code>.
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of correct YAML for this rule:</p>```yaml
apiVersion: kots.io/v1beta1
kind: Application
spec:
  statusInformers:
    - deployment/example-nginx
```</td>
  </tr>
</table>

### config-option-invalid-type

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Enforces valid types for Config items.</p>
      <p>For more information, see <a href="/reference/custom-resource-config#items">Items</a> in <em>Config</em>.</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td>**Correct**:

```yaml
spec:
  groups:
  - name: authentication
    title: Authentication
    description: Configure application authentication below.
    - name: group_title
      title: Group Title
      items:
      - name: http_enabled
        title: HTTP Enabled
        type: bool # bool is a valid type
```

**Incorrect**::

```yaml
spec:
  groups:
  - name: authentication
    title: Authentication
    description: Configure application authentication below.
    - name: group_title
      title: Group Title
      items:
      - name: http_enabled
        title: HTTP Enabled
        type: unknown_type # unknown_type is not a valid type
```</td>
  </tr>
</table>

### config-option-is-circular

<table>
  <tr>
    <th>Description</th>
    <td>Enforces that all ConfigOption items do not reference themselves.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
      Files with <code>kind: Config</code> and <code>apiVersion: kots.io/v1beta1</code>.
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td> **Incorrect**:

```yaml
spec:
  groups:
  - name: example_settings
    items:
    - name: example_default_value
      type: text
      value: repl{{ ConfigOption "example_default_value" }}
``` </td>
  </tr>
</table>


### config-option-not-found

<table>
  <tr>
    <th>Description</th>
    <td>
      Requires all ConfigOption items to be defined in the <code>Config</code> custom resource manifest file.
  </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Warn</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
</table>


### config-option-not-repeatable

<table>
  <tr>
    <th>Description</th>
    <td>
      Enforces that sub-templated ConfigOption items must be repeatable.
  </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
</table>

### config-option-password-type

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Requires ConfigOption items with any of the following names to have <code>type</code> set to <code>password</code>:</p>
      <ul>
        <li><code>password</code></li>
        <li><code>secret</code></li>
        <li><code>token</code></li>
      </ul>
  </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Warn</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of correct YAML for this rule:</p>```yaml
spec:
  groups:
    - name: ports
      items:
      - name: my_secret
        type: password
```</td>
  </tr>
</table>

### config-option-when-is-invalid

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Enforces valid <code>ConfigOption.when</code>.</p>
      <p>For more information, see <a href="/reference/custom-resource-config#when">when</a> in <em>Config</em>.</p>
  </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>Files with <code>kind: Config</code> and <code>apiVersion: kots.io/v1beta1</code>.</td>
  </tr>
</table>

### config-option-invalid-regex-validator

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Enforces valid <a href="https://github.com/google/re2/wiki/Syntax">RE2 regular expressions</a> pattern when regex validation is present.</p>
      <p>For more information, see <a href="/reference/custom-resource-config#validation">Validation</a> in <em>Config</em>.</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>Files with <code>kind: Config</code> and <code>apiVersion: kots.io/v1beta1</code>.</td>
  </tr>
  <tr>
    <th>Example</th>
    <td>**Correct**:

```yaml
spec:
  groups:
  - name: authentication
    title: Authentication
    description: Configure application authentication below.
    - name: jwt_file
      title: jwt_file
      type: file
      validation:
        regex:
          pattern: "^[A-Za-z0-9-_]+.[A-Za-z0-9-_]+.[A-Za-z0-9-_]*$" // valid RE2 regular expression
          message: "JWT is invalid"
```

**Incorrect**:

```yaml
spec:
  groups:
  - name: authentication
    title: Authentication
    description: Configure application authentication below.
    - name: jwt_file
      title: jwt_file
      type: file
      validation:
        regex:
          pattern: "^/path/([A-Za-z0-9-_]+.[A-Za-z0-9-_]+.[A-Za-z0-9-_]*$" // invalid RE2 regular expression
          message: "JWT is invalid"
```</td>
  </tr>
</table>

### config-option-regex-validator-invalid-type

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Enforces valid item type when regex validation is present.</p>
      <p>Item type should be <code>text</code>|<code>textarea</code>|<code>password</code>|<code>file</code></p>
      <p>For more information, see <a href="/reference/custom-resource-config#validation">Validation</a> in <em>Config</em>.</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>Files with <code>kind: Config</code> and <code>apiVersion: kots.io/v1beta1</code>.</td>
  </tr>
  <tr>
    <th>Example</th>
    <td>**Correct**:

```yaml
spec:
  groups:
  - name: authentication
    title: Authentication
    description: Configure application authentication below.
    - name: jwt_file
      title: jwt_file
      type: file // valid item type
      validation:
        regex:
          pattern: "^[A-Za-z0-9-_]+.[A-Za-z0-9-_]+.[A-Za-z0-9-_]*$"
          message: "JWT is invalid"
```

**Incorrect**:

```yaml
spec:
  groups:
  - name: authentication
    title: Authentication
    description: Configure application authentication below.
    - name: jwt_file
      title: jwt_file
      type: bool // invalid item type
      validation:
        regex:
          pattern: "^[A-Za-z0-9-_]+.[A-Za-z0-9-_]+.[A-Za-z0-9-_]*$"
          message: "JWT is invalid"
```</td>
  </tr>
</table>

### config-spec

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Requires a Config custom resource manifest file.</p>
      <p>Accepted value for <code>kind</code>: <code>Config</code></p>
      <p>Accepted value for <code>apiVersion</code>: <code>kots.io/v1beta1</code></p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Warn</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
apiVersion: kots.io/v1beta1
kind: Config
```</td>
  </tr>
</table>

### container-image-latest-tag

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if any manifest file has a container image tag appended with
    <code>:latest</code>.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  containers:
    - image: nginx:latest
```</td>
  </tr>
</table>

### container-image-local-image-name

<table>
  <tr>
    <th>Description</th>
    <td>Disallows any manifest file having a container image tag that includes <code>LocalImageName</code>.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  containers:
    - image: LocalImageName
```</td>
  </tr>
</table>

### container-resource-limits

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if a <code>spec.container</code> has no <code>resources.limits</code> field.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  containers:
    - name: nginx
      resources:
        requests:
          memory: '32Mi'
          cpu: '100m'
        # note the lack of a limit field
```</td>
  </tr>
</table>


### container-resource-requests

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if a <code>spec.container</code> has no <code>resources.requests</code> field.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  containers:
    - name: nginx
      resources:
        limits:
          memory: '256Mi'
          cpu: '500m'
        # note the lack of a requests field
```</td>
  </tr>
</table>

### container-resources

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if a manifest file has no <code>resources</code> field.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  containers:
    - name: nginx
      # note the lack of a resources field
```</td>
  </tr>
</table>

### deprecated-kubernetes-installer-version

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Disallows using the deprecated kURL installer <code>apiVersion</code>.</p>
      <p><code>kurl.sh/v1beta1</code> is deprecated. Use <code>cluster.kurl.sh/v1beta1</code> instead.</p>
      </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Warn</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
    Files with <code>kind: Installer</code> and <code>apiVersion: kurl.sh/v1beta1</code>.
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td>**Correct**:

```yaml
apiVersion: cluster.kurl.sh/v1beta1
kind: Installer
```

**Incorrect**:

```yaml
apiVersion: kurl.sh/v1beta1
kind: Installer
```</td>
  </tr>
</table>

### duplicate-helm-release-name

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Enforces unique <code>spec.chart.releaseName</code> across all HelmChart custom resource manifest files.</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
    Files with <code>kind: HelmChart</code> and <code>apiVersion: kots.io/v1beta1</code>.
    </td>
  </tr>
</table>

### duplicate-kots-kind

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Disallows duplicate Replicated custom resources.
      A release can only include one of each <code>kind</code> of custom resource.</p>
      <p>This rule disallows inclusion of more than one file with:</p>
        <ul>
          <li>The same <code>kind</code> and <code>apiVersion</code></li>
          <li><code>kind: Troubleshoot</code> and any Troubleshoot <code>apiVersion</code></li>
          <li><code>kind: Installer</code> and any Installer <code>apiVersion</code></li>
        </ul>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
    All files
    </td>
  </tr>
</table>

### hardcoded-namespace

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Notifies if any manifest file has a <code>metadata.namespace</code> set
       to a static field.</p>
      <p>Replicated strongly recommends not specifying a namespace to allow
       for flexibility when deploying into end user environments.</p>
      <p>For more information, see <a href="/vendor/namespaces">Managing Application Namespaces</a>.</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
metadata:
  name: spline-reticulator
  namespace: graphviz-pro
```</td>
  </tr>
</table>

### helm-archive-missing

<table>
  <tr>
    <th>Description</th>
    <td><p>Requires that a <code>*.tar.gz</code> file is present that matches what is in the HelmChart custom resource manifest file.</p></td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
    Releases with a HelmChart custom resource manifest file containing <code>kind: HelmChart</code> and <code>apiVersion: kots.io/v1beta1</code>.
    </td>
  </tr>
</table>

### helm-chart-missing

<table>
  <tr>
    <th>Description</th>
    <td><p>Enforces that a HelmChart custom resource manifest file with <code>kind: HelmChart</code> is present if there is a <code>*.tar.gz</code> archive present.</p></td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
    Releases with a <code>*.tar.gz</code> archive file present.
    </td>
  </tr>
</table>

### invalid-helm-release-name

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Enforces valid <code>spec.chart.releaseName</code> in the HelmChart custom resource manifest file.</p>
      <p><code>spec.chart.releaseName</code> must meet the following requirements:</p>
      <ul>
        <li>Begin and end with a lowercase letter or number</li>
        <li>Contain only lowercase letters, numbers, periods, and hyphens (<code>-</code>)</li>
        <li>Contain a lowercase letter or number between any two symbols (periods or hyphens)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Warn</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
    Files with <code>kind: HelmChart</code> and <code>apiVersion: kots.io/v1beta1</code>.
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of correct YAML for this rule:</p>```yaml
apiVersion: kots.io/v1beta1
kind: HelmChart
spec:
  chart:
    releaseName: samplechart-release-1
```</td>
  </tr>
</table>

### invalid-kubernetes-installer

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Enforces valid Replicated kURL add-on versions.</p>
      <p>kURL add-ons included in the kURL installer must pin specific versions rather than <code>latest</code> or x-ranges (1.2.x).</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
    <p>Files with <code>kind: Installer</code> and one of the following values for <code>apiVersion</code>:</p>
    <ul>
      <li><code>cluster.kurl.sh/v1beta1</code></li>
      <li><code>kurl.sh/v1beta1</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td>**Correct**:

```yaml
apiVersion: cluster.kurl.sh/v1beta1
kind: Installer
spec:
  kubernetes:
      version: 1.24.5
```

**Incorrect**:

```yaml
apiVersion: cluster.kurl.sh/v1beta1
kind: Installer
spec:
  kubernetes:
      version: 1.24.x
  ekco:
      version: latest
```</td>
  </tr>
</table>

### invalid-min-kots-version

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Requires <code>minKotsVersion</code> in the Application custom resource to use valid Semantic Versioning.
      See <a href="https://semver.org/">Semantic Versioning 2.0.0</a>.</p>
      <p>Accepts a <code>v</code> as an optional prefix, so both <code>1.0.0</code> and <code>v1.0.0</code> are valid.</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
      Files with <code>kind: Application</code> and <code>apiVersion: kots.io/v1beta1</code>.
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of correct YAML for this rule:</p>```yaml
apiVersion: kots.io/v1beta1
kind: Application
spec:
  minKotsVersion: 1.0.0
```</td>
  </tr>
</table>

### invalid-rendered-yaml

<table>
  <tr>
    <th>Description</th>
    <td><p>Enforces valid YAML after rendering the manifests using the Config spec.</p></td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
      YAML files
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td>**Example Helm Chart**:
```yaml
apiVersion: kots.io/v1beta1
kind: HelmChart
metadata:
  name: nginx-chart
spec:
  chart:
    name: nginx-chart
    chartVersion: 0.1.0
  helmVersion: v3
  useHelmInstall: true
  builder: {}
  values:
    image: repl{{ ConfigOption `nginx_image`}}
```

**Correct Config**:
```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: nginx-config
spec:
  groups:
    - name: nginx-deployment-config
      title: nginx deployment config
      items:
        - name: nginx_image
          title: image
          type: text
          default: "nginx"
```

**Resulting Rendered Helm Chart**:
```yaml
apiVersion: kots.io/v1beta1
kind: HelmChart
metadata:
  name: nginx-chart
spec:
  chart:
    name: nginx-chart
    chartVersion: 0.1.0
  helmVersion: v3
  useHelmInstall: true
  builder: {}
  values:
    image: nginx
```
**Incorrect Config**:
```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: nginx-config
spec:
  groups:
    - name: nginx-deployment-config
      items:
        - name: nginx_image
          title: image
          type: text
          default: "***HIDDEN***"
```

**Resulting Lint Error**:
```json
{
  "lintExpressions": [
    {
      "rule": "invalid-rendered-yaml",
      "type": "error",
      "message": "yaml: did not find expected alphabetic or numeric character: image: ***HIDDEN***",
      "path": "nginx-chart.yaml",
      "positions": null
    }
  ],
  "isLintingComplete": false
}
```
**Incorrectly Rendered Helm Chart**:
```yaml
apiVersion: kots.io/v1beta1
kind: HelmChart
metadata:
  name: nginx-chart
spec:
  chart:
    name: nginx-chart
    chartVersion: 0.1.0
  helmVersion: v3
  useHelmInstall: true
  builder: {}
  values:
    image: ***HIDDEN***
```</td>
  </tr>
</table>

### invalid-target-kots-version

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Requires <code>targetKotsVersion</code> in the Application custom resource to use valid Semantic Versioning.
      See <a href="https://semver.org/">Semantic Versioning 2.0.0</a>.</p>
      <p>Accepts a <code>v</code> as an optional prefix, so both <code>1.0.0</code> and <code>v1.0.0</code> are valid.</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
      Files with <code>kind: Application</code> and <code>apiVersion: kots.io/v1beta1</code>
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of correct YAML for this rule:</p>```yaml
apiVersion: kots.io/v1beta1
kind: Application
spec:
  targetKotsVersion: 1.0.0
```</td>
  </tr>
</table>

### invalid-type

<table>
  <tr>
    <th>Description</th>
    <td><p>Requires that the value of a property matches that property's expected type.</p></td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
      All files
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td>**Correct**:

```yaml
ports:
  - serviceName: "example"
    servicePort: 80
```

**Incorrect**:

```yaml
ports:
  - serviceName: "example"
    servicePort: "80"
```</td>
  </tr>
</table>

### invalid-yaml

<table>
  <tr>
    <th>Description</th>
    <td><p>Enforces valid YAML.</p></td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
      YAML files
    </td>
  </tr>
  <tr>
    <th>Example</th>
    <td>**Correct**:

```yaml
spec:
  kubernetes:
    version: 1.24.5
```

**Incorrect**:

```yaml
spec:
  kubernetes: version 1.24.x
```</td>
  </tr>
</table>

### may-contain-secrets

<table>
  <tr>
    <th>Description</th>
    <td> Notifies if any manifest file may contain secrets.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
data:
    ENV_VAR_1: "y2X4hPiAKn0Pbo24/i5nlInNpvrL/HJhlSCueq9csamAN8g5y1QUjQnNL7btQ=="
```</td>
  </tr>
</table>

### missing-api-version-field

<table>
  <tr>
    <th>Description</th>
    <td>Requires the <code>apiVersion:</code> field in all files.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of correct YAML for this rule:</p>```yaml
apiVersion: kots.io/v1beta1
```</td>
  </tr>
</table>

### missing-kind-field

<table>
  <tr>
    <th>Description</th>
    <td>Requires the <code>kind:</code> field in all files.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of correct YAML for this rule:</p>```yaml
kind: Config
```</td>
  </tr>
</table>

### nonexistent-status-informer-object

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Requires that each <code>statusInformers</code> entry references an existing Kubernetes workload.</p>
      <p>The linter cannot evaluate <code>statusInformers</code> for Helm-managed resources because it does not template Helm charts during analysis.</p>
      <p>If you configure status informers for Helm-managed resources, you can ignore <code>nonexistent-status-informer-object</code> warnings for those workloads. To disable <code>nonexistent-status-informer-object</code> warnings, change the level for this rule to <code>info</code> or <code>off</code> in the LintConfig custom resource manifest file. See <a href="custom-resource-lintconfig">LintConfig</a> in <em>Custom Resources</em>.</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Warning</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>
      <p>Compares <code>statusInformer</code> values in files with <code>kind: Application</code> and <code>apiVersion: kots.io/v1beta1</code> to all manifests in the release.</p>
    </td>
  </tr>
</table>

### preflight-spec

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Requires a Preflight custom resource manifest file with:</p>
      <p><code>kind: Preflight</code></p>
      <p>and one of the following:</p>
      <ul>
        <li><code>apiVersion: troubleshoot.replicated.com/v1beta1</code></li>
        <li><code>apiVersion: troubleshoot.sh/v1beta2</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Warn</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
```</td>
  </tr>
</table>

### privileged

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if any manifest file has <code>privileged</code> set to <code>true</code>.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  privileged: true
```</td>
  </tr>
</table>

### repeat-option-malformed-yamlpath

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Enforces ConfigOption <code>yamlPath</code> ending with square brackets denoting index position.</p>
      <p>For more information, see <a href="/reference/custom-resource-config#template-targets">Repeatable Item Template Targets</a> in <em>Config</em>.</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of correct YAML for this rule:</p>```yaml
spec:
  groups:
    - name: ports
      items:
      - name: service_port
        yamlPath: 'spec.ports[0]'
```</td>
  </tr>
</table>

### repeat-option-missing-template

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Disallows repeating Config item with undefined <code>item.templates</code>.</p>
      <p>For more information, see <a href="/reference/custom-resource-config#template-targets">Repeatable Item Template Targets</a> in <em>Config</em>.</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of correct YAML for this rule:</p>```yaml
spec:
  groups:
    - name: ports
      items:
      - name: service_port
        title: Service Port
        type: text
        repeatable: true
        templates:
        - apiVersion: v1
          kind: Service
          name: my-service
          namespace: my-app
          yamlPath: 'spec.ports[0]'
        - apiVersion: v1
          kind: Service
          name: my-service
          namespace: my-app
```</td>
  </tr>
</table>


### repeat-option-missing-valuesByGroup

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Disallows repeating Config item with undefined <code>item.valuesByGroup</code>.</p>
      <p>For more information, see <a href="/reference/custom-resource-config#repeatable-items">Repeatable Items</a> in <em>Config</em>.</p>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Error</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of correct YAML for this rule:</p>```yaml
spec:
  groups:
    - name: ports
      items:
      - name: service_port
        title: Service Port
        type: text
        repeatable: true
        valuesByGroup:
          ports:
            port-default-1: "80"
```</td>
  </tr>
</table>

### replicas-1

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if any manifest file has <code>replicas</code> set to <code>1</code>.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  replicas: 1
```</td>
  </tr>
</table>

### resource-limits-cpu

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if a <code>spec.container</code> has no <code>resources.limits.cpu</code> field.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  containers:
    - name: nginx
      resources:
        limits:
          memory: '256Mi'
          # note the lack of a cpu field
```</td>
  </tr>
</table>

### resource-limits-memory

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if a <code>spec.container</code> has no <code>resources.limits.memory</code> field.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  containers:
    - name: nginx
      resources:
        limits:
          cpu: '500m'
          # note the lack of a memory field
```</td>
  </tr>
</table>

### resource-requests-cpu

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if a <code>spec.container</code> has no <code>resources.requests.cpu</code> field.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  containers:
    - name: nginx
      resources:
        requests:
          memory: '32Mi'
          # note the lack of a cpu field
```</td>
  </tr>
</table>

### resource-requests-memory

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if a <code>spec.container</code> has no <code>resources.requests.memory</code> field.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  containers:
    - name: nginx
      resources:
        requests:
          cpu: '100m'
          # note the lack of a memory field
```</td>
  </tr>
</table>

### troubleshoot-spec

<table>
  <tr>
    <th>Description</th>
    <td>
      <p>Requires a Troubleshoot manifest file.</p>
      <p>Accepted values for <code>kind</code>:</p>
      <ul>
        <li><code>Collector</code></li>
        <li><code>SupportBundle</code></li>
      </ul>
      <p>Accepted values for <code>apiVersion</code>:</p>
      <ul>
        <li><code>troubleshoot.replicated.com/v1beta1</code></li>
        <li><code>troubleshoot.sh/v1beta2</code></li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Warn</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
```</td>
  </tr>
</table>

### volume-docker-sock

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if a <code>spec.volumes</code> has <code>hostPath</code>
    set to <code>/var/run/docker.sock</code>.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  volumes:
    - hostPath:
      path: /var/run/docker.sock
```</td>
  </tr>
</table>

### volumes-host-paths

<table>
  <tr>
    <th>Description</th>
    <td>Notifies if a <code>spec.volumes</code> has defined a <code>hostPath</code>.</td>
  </tr>
  <tr>
    <th>Level</th>
    <td>Info</td>
  </tr>
  <tr>
    <th>Applies To</th>
    <td>All files</td>
  </tr>
  <tr>
    <th>Example</th>
    <td><p>Example of matching YAML for this rule:</p>```yaml
spec:
  volumes:
    - hostPath:
      path: /data
```</td>
  </tr>
</table>