# HelmChart

A HelmChart custom resource enables the Replicated app manager to process and deploy Helm charts as part of an application. The app manager can process Helm charts using the Replicated Helm installation for existing applications. You can also use a native Helm installation for new applications or newly added Helm charts. For more information, see [Helm Overview](/vendor/helm-overview).

HelmChart custom resources are required for the app manager to deploy Helm charts. HelmChart custom resources are not required if only raw Kubernetes manifests are deployed.

The HelmChart custom resource manifest file references a required `.tgz` export of the Helm chart resources and provides the necessary instructions for processing and preparing the chart for deployment.

By default, the HelmChart custom resource uses the Replicated Helm installation, which uses the app manager to render and deploy Helm charts. For new installations, you can set `useHelmInstall: true` in the manifest to use the native Helm installation.

**Deploying multiple instances of the same chart**:
You must add an additional HelmChart custom resource with a unique [release name](custom-resource-helmchart#chartreleasename) for each instance of the chart that is to be deployed as part of the application. However, only one `.tgz` of the chart needs to be included in the release.

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

  # helmVersion identifies the Helm Version used to render the chart. Default is v3.
  helmVersion: v3

  # useHelmInstall identifies whether this Helm chart will use the
  # Replicated Helm installation (false) or native Helm installation (true). Default is false.
  # Native Helm installations are only available for Helm v3 charts.
  useHelmInstall: true

  # weight determines the order that charts with "useHelmInstall: true" are applied, with lower weights first.
  weight: 42

  # helmUpgradeFlags specifies additional flags to pass to the `helm upgrade` command.
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
      recursiveMerge: false
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

### chart.name
The name of the chart.
This must match the `name` field from a `Chart.yaml` in a `.tgz` chart archive that's also included in the release.

### chart.chartVersion
The version of the chart.
This must match the `version` field from a `Chart.yaml` in a `.tgz` chart archive that's also included in the release.

### chart.releaseName

> Introduced in Replicated app manager v1.73.0

Specifies the release name to be used when installing this instance of the Helm chart.
Defaults to the chart name.
The release name must be unique across all charts deployed in the namespace.
Specifying a unique release name allows you to deploy multiple instances of the same Helm chart.
Must be a valid Helm release name that matches regex `^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$` and is no longer than 53 characters.

## helmVersion

Identifies the Helm Version used to render the chart.
Acceptable values are `v2` or `v3`. `v3` is the default when no value is specified.

## useHelmInstall

Identifies whether this Helm chart will use the Replicated Helm installation (`false`) or native Helm installation (`true`).
Default is `false`.
It is recommended that you set this to `true`, because native Helm is preferred and Replicated Helm will be removed at some point.
Native Helm installations always deploy using Helm v3.

## weight

Determines the order to apply charts that have `useHelmInstall: true`. Charts are applied by weight in ascending order, with lower weights applied first.
Acceptable values are positive and negative integers, with a default value of 0.

For more information, see [Defining Installation Order for Native Helm Charts](../vendor/helm-native-helm-install-order).

## helmUpgradeFlags

:::note
`helmUpgradeFlags` is available in the app manager v1.75.0 and later.
:::

Specifies additional flags to pass to the `helm upgrade` command for charts that have `useHelmInstall: true`. These flags are passed in addition to any flags the app manager passes by default. The values specified here take precedence if the app manager already passes the same flag.

The app manager uses `helm upgrade` for all deployments of an application (not just upgrades) by specifying the `--install` flag.
For non-boolean flags that require an additional argument, such as `--timeout 1200s`, you must use an equals sign or specify the additional argument separately in the array. For example:

```yaml
helmUpgradeFlags:
  - --timeout
  - 1200s
  - --history-max=15
```

## values

The `values` key allows for values to be changed in the chart. It also can create a mapping between the Replicated admin console configuration screen and the values. This mapping makes it possible to use the configuration screen in the admin console to control the Helm `values.yaml` file.

For more information about the configuration screen, see [About the Configuration Screen](../vendor/config-screen-about).

The keys below `values` must map exactly to the keys in your `values.yaml`.
Only include the keys below `values` that you want to change. These are merged with the `values.yaml` in the chart archive.

To exclude a value that is set in the Helm chart `values.yaml`, set the value equal to the string `"null"` (with quotes) in the `values` section of the HelmChart custom resource.

For more options, see the [Allow deletion of a previous values file key](https://github.com/helm/helm/pull/2648) pull request in the Helm repository in GitHub.

## exclude

The  attribute is a value for making [optional charts](../vendor/helm-optional-charts). The `exclude` attribute can be parsed by template functions. For more information about template functions, see [About template function contexts](template-functions-about).

When the app manager processes Helm charts, it excludes the entire chart if the output of the `exclude` field can be parsed as a boolean evaluating to `true`.

For more information about how the app manager processes Helm charts, see [Helm processing](../vendor/helm-processing).

## optionalValues

The `optionalValues` array supports advanced use cases where value overwrites must be dependent on a given condition evaluating to true.

Not all Helm charts treat `""` and missing as the same value. If you need to have a value set that is always optional, and an empty string does not provide the same functionality as "not set", use the `optionalValues` key.

For more information about using `optionalValues`, see [Including Optional Value Keys](../vendor/helm-optional-value-keys).

### optionalValues[].when

The `when` field in `optionalValues` provides a string-based method that is evaluated by template functions. The `when` field defers evaluation of the conditional to render time in the customer environment.

To write the `when` conditional statement, use template functions. For example, in the `samplechart` HelmChart custom resource above, the `when` field includes a conditional statement that evaluates to `true` if the user selects the `external_postgres` option on the admin console configuration screen:

```yaml
optionalValues:
  - when: "repl{{ ConfigOptionEquals `postgres_type` `external_postgres`}}"
```  

For more information about the syntax for template functions, see [About Template Function Contexts](template-functions-about).

### optionalValues[].recursiveMerge

:::note
`recursiveMerge` is available in the app manager v1.38.0 and later.
:::

The `recursiveMerge` boolean defines how the app manager merges the `values` and `optionalValues` datasets when the conditional statement in the `when` field is true.

The admin console uses the values from this merged dataset and from the Helm chart `values.yaml` file when deploying the application.         

The following table describes how `values` and `optionalValues` are merged based on the value of the `recursiveMerge` boolean:

<table>
  <tr>
    <th width="30%">Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>false</code> (Default)</td>
    <td><p>The <code>values</code> and <code>optionalValues</code> fields from the HelmChart custom resource manifest are <em>not</em> merged recursively.</p>
    <p>The top level keys in <code>optionalValues</code> overwrite the top level keys in <code>values</code>.</p>
    </td>
  </tr>
  <tr>
    <td><code>true</code></td>    
    <td><p>The <code>values</code> and <code>optionalValues</code> fields from the HelmChart custom resource manifest are merged recursively.</p>
    <p>All keys from <code>values</code> and <code>optionalValues</code> are included in the merged dataset.</p>
    <p>In the case of a conflict where there is a matching key in <code>optionalValues</code> and <code>values</code>, the merged dataset uses the value of the key from <code>optionalValues</code>.</p>
    </td>
  </tr>
</table>

For example, a HelmChart custom resource manifest file defines the following datasets in the `values` and `optionalValues` fields:

```yaml
values:
  favorite:
    drink:
      hot: tea
      cold: soda
    dessert: ice cream
    day: saturday

optionalValues:
  - when: '{{repl ConfigOptionEquals "example_config_option" "1" }}'
    recursiveMerge: false
    values:
      example_config_option:
        enabled: true
      favorite:
        drink:
          cold: lemonade
```

The `values.yaml` file for the associated Helm chart defines the following key value pairs:

```yaml
favorite:
  drink:
    hot: coffee
    cold: soda
  dessert: pie
```
The `templates/configmap.yaml` file for the Helm chart maps these values to the following fields:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: test-configmap
data:
  favorite_day: {{ .Values.favorite.day }}
  favorite_dessert: {{ .Values.favorite.dessert }}
  favorite_drink_cold: {{ .Values.favorite.drink.cold }}
  favorite_drink_hot: {{ .Values.favorite.drink.hot }}
```

When `recursiveMerge` is set to `false` in the HelmChart custom resource manifest file, the ConfigMap for the deployed application includes the following key value pairs:

```yaml
favorite_day: null
favorite_dessert: pie
favorite_drink_cold: lemonade
favorite_drink_hot: coffee
```

In this case, the top level keys in `optionalValues` overwrite the top level keys in `values`.

Then, the admin console uses the values from the Helm chart `values.yaml` to populate the remaining fields in the ConfigMap: `favorite_day`, `favorite_dessert`, and `favorite_drink_hot`.

When `recursiveMerge` is set to `true`, the ConfigMap for the deployed application includes the following key value pairs:

```yaml
favorite_day: saturday
favorite_dessert: ice cream
favorite_drink_cold: lemonade
favorite_drink_hot: tea
```

In this case, all keys from `values` and `optionalValues` are included in the merged dataset. Both include `favorite:` > `drink:` > `cold:`, so the merged dataset uses `lemonade` from `optionalValues`.

## namespace

The `namespace` key specifies an alternative namespace where the app manager installs the Helm chart. By default, if no alternative namespace is provided, then the Helm chart is installed in the same namespace as the admin console.

If you specify a namespace in the HelmChart `namespace` field, you must also include the same namespace in the `additionalNamespaces` field of the Application custom resource manifest file. The app manager creates the namespaces listed in the `additionalNamespaces` field during installation. For more information, see [additionalNamespaces](custom-resource-application#additionalnamespaces) in _Application_.

## builder

To create an `.airgap` bundle for a release that uses Helm charts, the Replicated vendor portal renders templates of the Helm charts with `helm template`. The `builder` key specifies the values from the Helm chart `values.yaml` file that the vendor portal uses to create the `.airgap` bundle.

The `builder` key has the following requirements and recommendations:
* Replicated recommends that you include only the minimum Helm values in the `builder` key that are required to template the Helm chart with the correct image tags.
* Use only static, or _hardcoded_, values in the `builder` key. You cannot use template functions in the `builder` key because values in the `builder` key are not rendered in a customer environment.
* Any Helm values entries that are required for rendering Helm chart templates must have a value supplied in the `builder` key. For more information about the Helm `required` function, see [Using the 'required' function](https://helm.sh/docs/howto/charts_tips_and_tricks/#using-the-required-function).

**Example**

The following example demonstrates how to add a conditional `postgresql` resource to the `builder` key.

`postgresql` is defined as a conditional resource in the `values` key of the HelmChart custom resource:

```yaml
  values:
    postgresql:
      enabled: repl{{ ConfigOptionEquals `postgres_type` `embedded_postgres`}}
```
As shown above, `postgresql` is included only when the user selects the `embedded_postgres` option.

To ensure the vendor portal includes this conditional `postgresql` resource in `.airgap` bundles, add the same `postgresql` value to the `builder` key with `enabled` set to `true`:

```yaml
  builder:
    postgresql:
      enabled: true
```
