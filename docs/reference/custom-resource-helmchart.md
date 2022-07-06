# HelmChart

A HelmChart custom resource enables the Replicated app manager to process and deploy Helm charts as part of an application. The app manager can process Helm charts using the Replicated Helm installation for existing applications. You can also use a native Helm installation for new applications. For more information, see [Helm Overview](../vendor/helm-overview).

HelmChart custom resources are required for the app manager to deploy Helm charts. HelmChart custom resources are not required if only raw Kubernetes manifests are deployed.

The HelmChart custom resource manifest file references a required `.tgz` export of the Helm chart resources and provides the necessary instructions for processing and preparing the chart for deployment.

By default, the HelmChart custom resource uses the Replicated Helm installation, which uses the app manager to render and deploy Helm charts. For new installations, you can set `useHelmInstall: true` in the manifest to use the native Helm installation.

**Deploying multiple instance of the same chart**:
You must add an additional HelmChart custom resource with a unique [release name](/reference/custom-resource-helmchart#chartreleasename) for each instance of the chart that is to be deployed as part of the application. However, only one `.tgz` of the chart needs to be included in the release.

The following is an example manifest file for the HelmChart custom resource:

```yaml
apiVersion: kots.io/v1beta1
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

  # helmVersion identifies the Helm Version used to render the chart. Default is v2.
  helmVersion: v2

  # useHelmInstall identifies whether this Helm chart will use the
  # Replicated Helm installation (false) or native Helm installation (true). Default is false.
  # Native Helm installations are only available for Helm v3 charts.
  useHelmInstall: true

  # weight determines the order that charts with "useHelmInstall: true" are applied, with lower weights first.
  weight: 42

  # helmUpgradeFlags specifies additional flags to be passed to the `helm upgrade` CLI command.
  # The "--install, -i" flag is already specified by KOTS in order to install the helm chart if it's not already installed.
  # Flag values must be preceded by a `=` or written on a new line.
  helmUpgradeFlags:
    - --skip-crds
    - --no-hooks
    - --timeout
    - 1200s
    - --history-max=15

  # values are used in the customer environment, as a pre-render step
  # these values will be supplied to helm template
  values:
    postgresql:
      enabled: repl{{ ConfigOptionEquals `postgres_type` `embedded_postgres`}}

  optionalValues:
    - when: "repl{{ ConfigOptionEquals `postgres_type` `external_postgres`}}"
      values:
        postgresql:
          postgresqlDatabase: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_database`}}repl{{ end}}"
          postgresqlUsername: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_username`}}repl{{ end}}"
          postgresqlHost: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_host`}}repl{{ end}}"
          postgresqlPassword: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_password`}}repl{{ end}}"
          postgresqlPort: "repl{{ if ConfigOptionEquals `postgres_type` `external_postgres`}}repl{{ ConfigOption `external_postgres_port`}}repl{{ end}}"

  # namespace allows for a chart to be installed in an alternate namespace to
  # the default
  namespace: samplechart-namespace

  # builder values provide a way to render the chart with all images
  # and manifests. this is used in Replicated to create `.airgap` packages
  builder:
    postgresql:
      enabled: true
```

## chart

The `chart` key allows for a mapping between the data in this definition and the chart archive itself.
More than one `kind: HelmChart` can reference a single chart archive, if different settings are needed.

### `chart.name`
The name of the chart.
This must match the `name` field from a `Chart.yaml` in a `.tgz` chart archive that's also included in the release.

### `chart.chartVersion`
The version of the chart.
This must match the `version` field from a `Chart.yaml` in a `.tgz` chart archive that's also included in the release.

### `chart.releaseName`

> Introduced in Replicated app manager 1.73.0

Specifies the release name to be used when installing this instance of the Helm chart.
Defaults to the chart name.
The release name must be unique across all charts deployed in the namespace.
Specifying a unique release name allows you to deploy multiple instances of the same Helm chart.
Must be a valid Helm release name that matches regex `^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$` and is no longer than 53 characters.

## helmVersion

Identifies the Helm Version used to render the chart.
Acceptable values are `v2` or `v3`. `v2` is the default when no value is specified.

## useHelmInstall

Identifies whether this Helm chart will use the Replicated Helm installation (false) or native Helm installation (true).
Default is false.
Native Helm installations are only available for Helm v3 charts.

## weight

Determines the order to apply charts that have `useHelmInstall: true`. Charts are applied by weight in ascending order, with lower weights applied first.
Acceptable values are positive and negative integers, with a default value of 0.

For more information, see [Defining Installation Order for Native Helm Charts](../vendor/helm-native-helm-install-order).

## helmUpgradeFlags

Can be used to specify additional flags to be passed to the `helm upgrade` CLI command.
The "--install, -i" flag is already specified by KOTS in order to install the helm chart if it's not already installed.
Flag values must be preceded by a `=` or written on a new line. For example:

```yaml
helmUpgradeFlags:
  - --timeout
  - 1200s
  - --history-max=15
```

## values

The `values` key allows for values to be changed in the chart. It also can create a mapping between the Replicated admin console configuration screen and the values. For more information about the configuration screen, see [Customizing the configuration screen](../vendor/admin-console-customize-config-screen).

This makes it possible to use the configuration screen in the admin console to control the Helm `values.yaml` file.

The keys below `values` should map exactly to the keys in your `values.yaml`.
Only include the keys that you wish to change. These are merged with the `values.yaml` in the chart archive.

To exclude a value that's set in the `values.yaml`, set it equal to the string `"null"` (with quotes), in this section.
For more options, see [Helm pull request](https://github.com/helm/helm/pull/2648).

## exclude

The  attribute is a value for making [optional charts](../vendor/helm-optional-charts). The `exclude` attribute can be parsed by template functions. For more information about template functions, see [About template function contexts](template-functions-about).

When the app manager processes Helm charts, it excludes the entire chart if the output of the `exclude` field can be parsed as a boolean evaluating to `true`.

For more information about how the app manager processes Helm charts, see [Helm processing](../vendor/helm-processing).

## optionalValues

The `optionalValues` array is provided for advanced use cases to make value overrides completely optional.
Not all charts treat `""` and missing as the same value.
If it's required to only optionally have a value set, and an empty string does not provide the same functionality as "not set", then use the values here.

For more information, see [HelmChart optionalValues](../vendor/helm-optional-value-keys).

### `optionalValues[].when`

The `when` field in `optionalValues` provides a string-based method that is evaluated by template functions. The `when` field defers evaluation of the conditional to render time in the customer environment. For more information about template functions, see [About template function contexts](template-functions-about).

## namespace

The `namespace` key allows for a chart to be installed in an alternate namespace.
If left blank, the namespace will default to the one into which the admin console is installed.
If an alternate namespace is specified, it is required that the namespace exist or is included in the manifest file for the HelmChart custom resource.

## builder

The `builder` key allows for defaults that will be set when the app manager is creating air gapped packages.
This is an opportunity to ensure that all YAML and images are rendered "on" so they are included.
