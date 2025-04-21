# HelmChart v2

This topic describes the KOTS HelmChart v2 custom resource.

To deploy Helm charts, KOTS requires a unique HelmChart custom resource for each Helm chart `.tgz` archive in the release. You configure the HelmChart custom resource to provide the necessary instructions to KOTS for processing and preparing the chart for deployment. Additionally, the HelmChart custom resource creates a mapping between KOTS and your Helm chart to allow Helm values to be dynamically set during installation or upgrade.

For more information, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about).

## Example

The following is an example manifest file for the HelmChart v2 custom resource:

```yaml
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  # chart identifies a matching chart from a .tgz
  chart:
    name: samplechart
    chartVersion: 3.1.7
  
  releaseName: samplechart-release-1

  exclude: "repl{{ ConfigOptionEquals `include_chart` `include_chart_no`}}"

  # weight determines the order that charts are applied, with lower weights first.
  weight: 42

  # helmUpgradeFlags specifies additional flags to pass to the `helm upgrade` command.
  helmUpgradeFlags:
    - --skip-crds
    - --no-hooks
    - --timeout
    - 1200s
    - --history-max=15

  # values are used in the customer environment as a pre-render step
  # these values are supplied to helm template
  values:
    postgresql:
      enabled: repl{{ ConfigOptionEquals `postgres_type` `embedded_postgres`}}

  optionalValues:
  - when: "repl{{ ConfigOptionEquals `postgres_type` `external_postgres`}}"
    recursiveMerge: false
    values:
      postgresql:
        postgresqlDatabase: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_database`}}repl{{ end}}"
        postgresqlUsername: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_username`}}repl{{ end}}"
        postgresqlHost: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_host`}}repl{{ end}}"
        postgresqlPassword: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_password`}}repl{{ end}}"
        postgresqlPort: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_port`}}repl{{ end}}"
  # adds backup labels to postgresql if the license supports snapshots
  - when: "repl{{ LicenseFieldValue `isSnapshotSupported` }}"
    recursiveMerge: true
    values:
      postgresql:
        commonLabels:
          kots.io/backup: velero
          kots.io/app-slug: my-app
        podLabels:
          kots.io/backup: velero
          kots.io/app-slug: my-app  

  # namespace allows for a chart to be installed in an alternate namespace to
  # the default
  namespace: samplechart-namespace

  # builder values render the chart with all images and manifests.
  # builder is used to create `.airgap` packages and to support end users
  # who use private registries
  builder:
    postgresql:
      enabled: true
```

## chart

The `chart` key allows for a mapping between the data in this definition and the chart archive itself.
More than one `kind: HelmChart` can reference a single chart archive, if different settings are needed.

### chart.name

The name of the chart. This value must exactly match the `name` field from a `Chart.yaml` in a `.tgz` chart archive that is also included in the release. If the names do not match, then the installation can error or fail.

### chart.chartVersion

The version of the chart. This value must match the `version` field from a `Chart.yaml` in a `.tgz` chart archive that is also included in the release.

## releaseName

Specifies the release name to use when installing this instance of the Helm chart. Defaults to the chart name.

The release name must be unique across all charts deployed in the namespace. To deploy multiple instances of the same Helm chart in a release, you must add an additional HelmChart custom resource with a unique release name for each instance of the Helm chart.

Must be a valid Helm release name that matches regex `^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*


















# HelmChart v2

This topic describes the KOTS HelmChart v2 custom resource.

To deploy Helm charts, KOTS requires a unique HelmChart custom resource for each Helm chart `.tgz` archive in the release. You configure the HelmChart custom resource to provide the necessary instructions to KOTS for processing and preparing the chart for deployment. Additionally, the HelmChart custom resource creates a mapping between KOTS and your Helm chart to allow Helm values to be dynamically set during installation or upgrade.

For more information, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about).

## Example

The following is an example manifest file for the HelmChart v2 custom resource:

```yaml
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  # chart identifies a matching chart from a .tgz
  chart:
    name: samplechart
    chartVersion: 3.1.7
  
  releaseName: samplechart-release-1

  exclude: "repl{{ ConfigOptionEquals `include_chart` `include_chart_no`}}"

  # weight determines the order that charts are applied, with lower weights first.
  weight: 42

  # helmUpgradeFlags specifies additional flags to pass to the `helm upgrade` command.
  helmUpgradeFlags:
    - --skip-crds
    - --no-hooks
    - --timeout
    - 1200s
    - --history-max=15

  # values are used in the customer environment as a pre-render step
  # these values are supplied to helm template
  values:
    postgresql:
      enabled: repl{{ ConfigOptionEquals `postgres_type` `embedded_postgres`}}

  optionalValues:
  - when: "repl{{ ConfigOptionEquals `postgres_type` `external_postgres`}}"
    recursiveMerge: false
    values:
      postgresql:
        postgresqlDatabase: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_database`}}repl{{ end}}"
        postgresqlUsername: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_username`}}repl{{ end}}"
        postgresqlHost: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_host`}}repl{{ end}}"
        postgresqlPassword: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_password`}}repl{{ end}}"
        postgresqlPort: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_port`}}repl{{ end}}"
  # adds backup labels to postgresql if the license supports snapshots
  - when: "repl{{ LicenseFieldValue `isSnapshotSupported` }}"
    recursiveMerge: true
    values:
      postgresql:
        commonLabels:
          kots.io/backup: velero
          kots.io/app-slug: my-app
        podLabels:
          kots.io/backup: velero
          kots.io/app-slug: my-app  

  # namespace allows for a chart to be installed in an alternate namespace to
  # the default
  namespace: samplechart-namespace

  # builder values render the chart with all images and manifests.
  # builder is used to create `.airgap` packages and to support end users
  # who use private registries
  builder:
    postgresql:
      enabled: true
```

## chart

The `chart` key allows for a mapping between the data in this definition and the chart archive itself.
More than one `kind: HelmChart` can reference a single chart archive, if different settings are needed.

### chart.name

The name of the chart. This value must exactly match the `name` field from a `Chart.yaml` in a `.tgz` chart archive that is also included in the release. If the names do not match, then the installation can error or fail.

### chart.chartVersion

The version of the chart. This value must match the `version` field from a `Chart.yaml` in a `.tgz` chart archive that is also included in the release.

## releaseName

 and is no longer than 53 characters.

## weight

Determines the order in which KOTS applies the Helm chart. Charts are applied by weight in ascending order, with lower weights applied first. **Supported values:** Positive or negative integers. **Default:** `0`

In KOTS v1.99.0 and later, `weight` also determines the order in which charts are uninstalled. Charts are uninstalled by weight in descending order, with higher weights uninstalled first. For more information about uninstalling applications, see [remove](kots-cli-remove) in _KOTS CLI_.

For more information, see [Orchestrate Resource Deployment](/vendor/orchestrating-resource-deployment).

## helmUpgradeFlags

Specifies additional flags to pass to the `helm upgrade` command for charts. These flags are passed in addition to any flags Replicated KOTS passes by default. The values specified here take precedence if KOTS already passes the same flag. The `helmUpgradeFlags` attribute can be parsed by template functions. For more information about template functions, see [About template function contexts](template-functions-about).

KOTS uses `helm upgrade` for _all_ deployments of an application, not just upgrades, by specifying the `--install` flag. For non-boolean flags that require an additional argument, such as `--timeout 1200s`, you must use an equal sign (`=`) or specify the additional argument separately in the array. 

**Example:**

```yaml
helmUpgradeFlags:
  - --timeout
  - 1200s
  - --history-max=15
```

## exclude

The  attribute is a value for making optional charts. The `exclude` attribute can be parsed by template functions. 

When Replicated KOTS processes Helm charts, it excludes the entire chart if the output of the `exclude` field can be parsed as a boolean evaluating to `true`.

For more information about optional charts, template functions, and how KOTS processes Helm charts, see:

* [Optional Charts](/vendor/helm-optional-charts)
* [About Template Function Contexts](template-functions-about)
* [About Distributing Helm Charts with KOTS](/vendor/helm-native-about)

## values

The `values` key can be used to set or delete existing values in the Helm chart `values.yaml` file. Any values that you include in the `values` key must match values in the Helm chart `values.yaml`. For example, `spec.values.images.pullSecret` in the HelmChart custom resource matches `images.pullSecret` in the Helm chart `values.yaml`.

During installation or upgrade with KOTS, `values` is merged with the Helm chart `values.yaml` in the chart archive. Only include values in the `values` key that you want to set or delete.

For more information about using `values`, see [Setting Helm Chart Values with KOTS](/vendor/helm-optional-value-keys).

## optionalValues

The `optionalValues` key can be used to set values in the Helm chart `values.yaml` file when a given conditional statement evaluates to true. For example, if a customer chooses to include an optional application component in their deployment, it might be necessary to include Helm chart values related to the optional component.

`optionalValues` includes the following properties:

* `optionalValues.when`: Defines a conditional statement using KOTS template functions. If `optionalValues.when` evaluates to true, then the values specified in `optionalValues` are set.

* `optionalValues.recursiveMerge`: Defines how `optionalValues` is merged with `values`.

* `optionalValues.values`: An array of key-value pairs.

For more information about using `optionalValues`, see [Setting Helm Chart Values with KOTS](/vendor/helm-optional-value-keys).

### optionalValues.when

The `optionalValues.when` field defines a conditional statement that must evaluate to true for the given values to be set. Evaluation of the conditional in the `optionalValues.when` field is deferred until render time in the customer environment. 

Use KOTS template functions to write the `optionalValues.when` conditional statement. The following example shows a conditional statement for selecting a database option on the Admin Console configuration screen:

```yaml
optionalValues:
  - when: repl{{ ConfigOptionEquals "postgres_type" "external_postgres"}}
```

For more information about using KOTS template functions, see [About Template Functions](/reference/template-functions-about).

### optionalValues.recursiveMerge

The `optionalValues.recursiveMerge` boolean defines how KOTS merges `values` and `optionalValues`:

* When `optionalValues.recursiveMerge` is false, the top level keys in `optionalValues` override the top level keys in `values`. By default, `optionalValues.recursiveMerge` is set to false.

* When `optionalValues.recursiveMerge` is true, all keys from `values` and `optionalValues` are included. In the case of a conflict where there is a matching key in `optionalValues` and `values`, KOTS uses the value of the key from `optionalValues`.

**Default**: False

For an example of recursive and non-recursive merging, see [About Recursive Merge](/vendor/helm-optional-value-keys#recursive-merge).

## namespace

The `namespace` key specifies an alternative namespace where Replicated KOTS installs the Helm chart. **Default:** The Helm chart is installed in the same namespace as the Admin Console. The `namespace` attribute can be parsed by template functions. For more information about template functions, see [About template function contexts](template-functions-about).


If you specify a namespace in the HelmChart `namespace` field, you must also include the same namespace in the `additionalNamespaces` field of the Application custom resource manifest file. KOTS creates the namespaces listed in the `additionalNamespaces` field during installation. For more information, see [additionalNamespaces](custom-resource-application#additionalnamespaces) in the _Application_ reference.

## builder

The `builder` key is used to provide Helm values that are used during various stages of processing the Helm chart.

The `builder` key is required for the following use cases:

* To create an `.airgap` bundle for installations into air gap environments.

  In the `builder` key, you provide the minimum Helm values required to render the chart templates so that the output includes any images that must be included in the air gap bundle. The Vendor Portal uses these values to render the Helm chart templates when building the `.airgap` bundle for the release.

  For more information, see [Package Air Gap Bundles for Helm Charts](/vendor/helm-packaging-airgap-bundles).

* To support online installations that use a local private registry, the `builder` field renders the Helm chart with all of the necessary images so that KOTS knows where to pull the images.

  You cannot prevent customers from configuring a local private registry in the Admin Console. If you think any of your customers will use a local private registry, you should use the `builder` key. For more information, see [Configuring Local Image Registries](/enterprise/image-registry-settings).

The `builder` key has the following requirements and recommendations:
* Replicated recommends that you include only the minimum Helm values in the `builder` key that are required to template the Helm chart with the correct image tags.
* Use only static, or _hardcoded_, values in the `builder` key. You cannot use template functions in the `builder` key because values in the `builder` key are not rendered in a customer environment.
* Any `required` Helm values that need to be set to render the chart templates must have a value supplied in the `builder` key. For more information about the Helm `required` function, see [Using the 'required' function](https://helm.sh/docs/howto/charts_tips_and_tricks/#using-the-required-function) in the Helm documentation.

* Use the same `builder` configuration to support the use of local registries in both online and air gap installations. If you already configured the `builder` key to support air gap installations, then no additional configuration is required.

**Example:**

For example, a Helm chart might include a conditional PostgreSQL Deployment, as shown in the Helm template below:

```yaml
{{- if .Values.postgresql.enabled }}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgresql
  labels:
    app: postgresql
spec:
  selector:
    matchLabels:
      app: postgresql
  template:
    metadata:
      labels:
        app: postgresql
    spec:
      containers:
      - name: postgresql
        image: "postgres:10.17"
        ports:
        - name: postgresql
          containerPort: 80
# ...
{{- end }}
```

To ensure that the `postgresql` image is included in the air gap bundle for the release, the `postgresql.enabled` value is added to the `builder` key of the HelmChart custom resource and is hardcoded to `true`:

```yaml
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  values:
    postgresql:
      enabled: repl{{ ConfigOptionEquals "postgres_type" "embedded_postgres"}}
  builder:
    postgresql:
      enabled: true
```