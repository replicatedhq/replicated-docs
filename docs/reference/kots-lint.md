# KOTS Lint Rules

This topic describes the rules for the KOTS lint service. The KOTS lint service lints the manifest files for applications packaged with Replicated to ensure that there are no YAML syntax errors, that all required manifest files are present in the release, and more.

The KOTS lint service runs automatically against releases that you create in the Replicated vendor portal, and displays any error or warning messages in the vendor portal UI.

To use the KOTS lint service to lint your application manifest files, you can run the replicated CLI `replicated release lint` command against the root directory of your application manifest files. You can also use the `--lint` flag when you create a release with the `replicated release create` command. For more information, see [release lint](/reference/replicated-cli-release-lint) and [release create](/reference/replicated-cli-release-create) in the _replicated CLI_ section.

### missing-kind-field

Require “kind” field in all files.

Level: “error”

Applies to all files.

Example of **correct** yaml for this rule:

```yaml
kind: Config
```


### missing-api-version-field

Require “apiVersion” field in all files.

Level: “error”

Applies to all files.

Example of **correct** yaml for this rule:

```yaml
apiVersion: kots.io/v1beta1
```


### preflight-spec

Require a Preflight spec.

Level: “warn”

Accepted `apiVersion`:
- `troubleshoot.replicated.com/v1beta1`
- `troubleshoot.sh/v1beta2`

Accepted `kind`:
- `Preflight`

Example of **matching** yaml for this rule:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Preflight
```


### config-spec

Require a Config spec.

Level: “warn”

Accepted `apiVersion`:
- `kots.io/v1beta1`

Accepted `kind`:
- `Config`

Example of **matching** yaml for this rule:

```yaml
apiVersion: kots.io/v1beta1
kind: Config
```


### troubleshoot-spec

Require a Troubleshoot spec.

Level: “warn”

Accepted `apiVersion`:
- `troubleshoot.replicated.com/v1beta1`
- `troubleshoot.sh/v1beta2`

Accepted `kind`:
- `Collector`
- `SupportBundle`

Example of **matching** yaml for this rule:

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: Collector
```


### application-spec

Require an Application spec.

Level: “warn”

Accepted `apiVersion`:
- `kots.io/v1beta1`

Accepted `kind`:
- `Application`

Example of **matching** yaml for this rule:

```yaml
apiVersion: kots.io/v1beta1
kind: Application
```


### application-icon

Require an Application icon.

Level: “warn”

Applies to `apiVersion`:
- `kots.io/v1beta1`

Applies to `kind`:
- `Application`

Example of **correct** yaml for this rule:

```yaml
apiVersion: kots.io/v1beta1
kind: Application
spec:
  icon: https://example.com/app-icon.png
```


### application-statusInformers

Require Application statusInformers.

Level: “warn”

Applies to `apiVersion`:
- `kots.io/v1beta1`

Applies to `kind`:
- `Application`

Example of **correct** yaml for this rule:

```yaml
apiVersion: kots.io/v1beta1
kind: Application
spec:
  statusInformers:
    - deployment/example-nginx
```


### invalid-target-kots-version

Require Application targetKotsVersion to be [valid semver](https://semver.org/).

Optionally accepts a `v` prefix, so both `1.0.0` and `v1.0.0` are valid.

Level: “error”

Applies to `apiVersion`:
- `kots.io/v1beta1`

Applies to `kind`:
- `Application`

Example of **correct** yaml for this rule:

```yaml
apiVersion: kots.io/v1beta1
kind: Application
spec:
  targetKotsVersion: 1.0.0
```


### invalid-min-kots-version

Require Application minKotsVersion to be [valid semver](https://semver.org/).

Optionally accepts a `v` prefix, so both `1.0.0` and `v1.0.0` are valid.

Level: “error”

Applies to `apiVersion`:
- `kots.io/v1beta1`

Applies to `kind`:
- `Application`

Example of **correct** yaml for this rule:

```yaml
apiVersion: kots.io/v1beta1
kind: Application
spec:
  minKotsVersion: 1.0.0
```


### invalid-kubernetes-installer

Enforce valid Kubernetes installer addon versions.

Add-ons included in the Kubernetes installer must pin specific versions rather than 'latest' or x-ranges (1.2.x).

Level: “error”

Applies to `apiVersion`:
 - `cluster.kurl.sh/v1beta1`
 - `kurl.sh/v1beta1`

Applies to `kind`:
 - `Installer`

Example of **correct** yaml for this rule:

```yaml
apiVersion: cluster.kurl.sh/v1beta1
kind: Installer
spec:
  kubernetes:
      version: 1.24.5
```

Example of **incorrect** yaml for this rule:

```yaml
apiVersion: cluster.kurl.sh/v1beta1
kind: Installer
spec:
  kubernetes:
      version: 1.24.x
  ekco:
      version: latest
```


### deprecated-kubernetes-installer-version

Disallow using deprecated Kubernetes installer `apiVersion`.

`kurl.sh/v1beta1` is deprecated, use `cluster.kurl.sh/v1beta1` instead.

Level: “warn”

Applies to `apiVersion`:
 - `kurl.sh/v1beta1`

Applies to `kind`:
 - `Installer`

Example of **correct** yaml for this rule:

```yaml
apiVersion: cluster.kurl.sh/v1beta1
kind: Installer
```

Example of **incorrect** yaml for this rule:

```yaml
apiVersion: kurl.sh/v1beta1
kind: Installer
```


### duplicate-kots-kind

Disallow duplicate KOTS kinds.

A release can only include one of each kind of resource. This rule disallows inclusion of more than
one file with:
- the same `kind` and `apiVersion`
- `kind: Troubleshoot` and any Troubleshoot `apiVersion`
- `kind: Installer` and any Installer `apiVersion`

Level: “error”

Applies to all files.


### invalid-helm-release-name

Enforce valid `releaseName` on HelmChart CRD.

`spec.chart.releaseName` should:
- begin and end with a lowercase letter or number
- contain only lowercase letters, numbers, periods, and hyphens (`-`)
- have a lowercase letter or number between any two symbols (periods or hypens)

Level: “warn”

Applies to `apiVersion`:
 - `kots.io/v1beta1`

Applies to `kind`:
 - `HelmChart`

Example of **correct** yaml for this rule:

```yaml
apiVersion: kots.io/v1beta1
kind: HelmChart
spec:
  chart:
    releaseName: samplechart-release-1
```


### duplicate-helm-release-name

Enforce unique `releaseName` across all HelmChart CRDs.

Level: “error"

Applies to `apiVersion`:
 - `kots.io/v1beta1`

Applies to `kind`:
 - `HelmChart`


### replicas-1

Notify if any spec has `replicas` set to `1`.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  replicas: 1
```


### privileged

Notify if any spec has `privileged` set to `true`.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  privileged: true
```


### allow-privilege-escalation

Notify if any spec has `allowPrivilegeEscalation` set to `true`.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  allowPrivilegeEscalation: true
```


### container-image-latest-tag

Notify if any spec has a container image tag appended with `:latest`.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  containers:
    - image: nginx:latest
```


### container-image-local-image-name

Disallow a spec having a container image tag that includes "LocalImageName".

Level: "error"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  containers:
    - image: LocalImageName
```


### container-resources

Notify if a spec container has no `resources` field.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  containers:
    - name: nginx
      # note the lack of a resources field
```


### container-resource-limits

Notify if a spec container has no `resources.limits` field.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  containers:
    - name: nginx
      resources:
        requests:
          memory: '32Mi'
          cpu: '100m'
        # note the lack of a limit field
```


### container-resource-requests

Notify if a spec container has no `resources.requests` field.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  containers:
    - name: nginx
      resources:
        limits:
          memory: '256Mi'
          cpu: '500m'
        # note the lack of a requests field
```


### resource-limits-cpu

Notify if a spec container has no `resources.limits.cpu` field.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  containers:
    - name: nginx
      resources:
        limits:
          memory: '256Mi'
          # note the lack of a cpu field
```


### resource-limits-memory

Notify if a spec container has no `resources.limits.memory` field.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  containers:
    - name: nginx
      resources:
        limits:
          cpu: '500m'
          # note the lack of a memory field
```


### resource-requests-cpu

Notify if a spec container has no `resources.requests.cpu` field.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  containers:
    - name: nginx
      resources:
        requests:
          memory: '32Mi'
          # note the lack of a memory field
```


### resource-requests-memory

Notify if a spec container has no `resources.requests.memory` field.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  containers:
    - name: nginx
      resources:
        requests:
          cpu: '100m'
          # note the lack of a memory field
```


### volumes-host-paths

Notify if a spec volume has defined a `hostPath`.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  volumes:
    - hostPath:
      path: /data
```

### volume-docker-sock

Notify if a spec volume has `hostPath` set to `/var/run/docker.sock`.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
spec:
  volumes:
    - hostPath:
      path: /var/run/docker.sock
```


### hardcoded-namespace

Notify if any file has a `metadata.namespace` set to a static value.

We strongly recommended not specifying a namespace to allow maximum flexibility when deploying into end user environments.

Level: "info"

Applies to all files.

Related docs:
- [Managing Application Namespaces](/vendor/namespaces)

Example of **matching** yaml for this rule:

```yaml
metadata:
  name: spline-reticulator
  namespace: graphviz-pro
```


### may-contain-secrets

Notify if any file may contain secrets.

Level: "info"

Applies to all files.

Example of **matching** yaml for this rule:

```yaml
data:
    ENV_VAR_1: "y2X4hPiAKn0Pbo24/i5nlInNpvrL/HJhlSCueq9csamAN8g5y1QUjQnNL7btQ=="
```


### config-option-invalid-type

Enforce valid types for Config items.

Level: "error"

Applies to all files.

Related docs:
- [Config Item types](/reference/custom-resource-config#available-item-types)

Example of **correct** yaml for this rule:

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

Example of **incorrect** yaml for this rule:

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
```

### repeat-option-missing-template

Disallow repeating Config item with undefined `item.templates`.

Level: "error"

Applies to all files.

Related docs:
- [Repeatable Item Template Targets](/reference/custom-resource-config#template-targets)

Example of **correct** yaml for this rule:

```yaml
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
```


### repeat-option-missing-valuesByGroup

Disallow repeating Config item with undefined `item.valuesByGroup`.

Level: "error"

Applies to all files.

Related docs:
- [Repeatable Items](/reference/custom-resource-config#repeatable-items)

Example of **correct** yaml for this rule:

```yaml
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
```


### repeat-option-malformed-yamlpath

Enforce ConfigOption `yamlPath` ending with square brackets denoting index position.

Level: "error"

Applies to all files.

Related docs:
- [Repeatable Item Template Targets](/reference/custom-resource-config#template-targets)

Example of **correct** yaml for this rule:

```yaml
spec:
  groups:
    - name: ports
      items:
      - name: service_port
        yamlPath: 'spec.ports[0]'
```


### config-option-password-type

Require ConfigOption items with names including `password`, `secret`, or `token` to have `type` set to `password`.

Level: "warn"

Applies to all files.

Example of **correct** yaml for this rule:

```yaml
spec:
  groups:
    - name: ports
      items:
      - name: my_secret
        type: password
```


### config-option-not-found

Require all used `ConfigOption`s to be defined in `Config` yaml.

Level: "warn"

Applies to all files.


### config-option-is-circular

Enforce `ConfigOption`s do not reference themselves.

Level: "error"

Applies to `apiVersion`:
 - `kots.io/v1beta1`

Applies to `kind`:
 - `Config`

Example of **incorrect** yaml for this rule:

```yaml
spec:
  groups:
  - name: example_settings
    items:
    - name: example_default_value
      type: text
      value: repl{{ ConfigOption "example_default_value" }}
```


### config-option-not-repeatable

Enforce sub-templated `ConfigOption` must be repeatable.

Level: "error"

Applies to all files.


### config-option-when-is-invalid

Enforce valid `ConfigOption.when`.

Level: "error"

Applies to `apiVersion`:
 - `kots.io/v1beta1`

Applies to `kind`:
 - `Config`

Related docs:
- [Config Properties - `when`](/reference/custom-resource-config#when)
