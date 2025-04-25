# Set Helm Values with KOTS

This topic describes how to use the Replicated KOTS HelmChart custom resource to set and delete values in `values.yaml` files for Helm charts deployed with Replicated KOTS.

For a tutorial that demonstrates how to set Helm values in a sample Helm chart using the KOTS HelmChart custom resource, see [Tutorial: Set Helm Chart Values with KOTS](/vendor/tutorial-config-setup).

## Overview

The KOTS HelmChart custom resource [`values`](/reference/custom-resource-helmchart-v2#values) and [`optionalValues`](/reference/custom-resource-helmchart-v2#optionalvalues) keys create a mapping between KOTS and the `values.yaml` file for the corresponding Helm chart. This allows you to set or delete Helm values during installation or upgrade with KOTS, without having to make any changes to the Helm chart itself.

You can create this mapping by adding a value under `values` or `optionalValues` that uses the exact same key name as a value in the corresponding Helm chart `values.yaml` file. During installation or upgrade, KOTS sets the Helm chart `values.yaml` file with any matching values from the `values` or `optionalValues` keys.

The `values` and `optionalValues` keys also support the use of Replicated KOTS template functions. When you use KOTS template functions in the `values` and `optionalValues` keys, KOTS renders the template functions and then sets any matching values in the corresponding Helm chart `values.yaml` with the rendered values. For more information, see [About Template Functions](/reference/template-functions-about).

Common use cases for the HelmChart custom resource `values` and `optionalValues` keys include:
* Setting Helm values based on user-supplied values from the KOTS Admin Console configuration page
* Setting values based on the user's unique license entitlements
* Conditionally setting values when a given condition is met
* Deleting a default value key from the `values.yaml` file that should not be included for KOTS installations

For more information about the syntax for these fields, see [`values`](/reference/custom-resource-helmchart-v2#values) and [`optionalValues`](/reference/custom-resource-helmchart-v2#optionalvalues) in _HelmChart v2_.

## Set Values

This section describes how to use KOTS template functions or static values in the HelmChart custom resource `values` key to set existing Helm values.

### Using a Static Value

You can use static values in the HelmChart custom resource `values` key when a given Helm value must be set the same for all KOTS installations. This allows you to set values for KOTS installations only, without affecting values for any installations that use the Helm CLI.

For example, the following Helm chart `values.yaml` file contains `kotsOnlyValue.enabled`, which is set to `false` by default: 

```yaml
# Helm chart values.yaml
kotsOnlyValue:
  enabled: false
```

The following HelmChart custom resource contains a mapping to `kotsOnlyValue.enabled` in its `values` key, which is set to `true`:

```yaml
# KOTS HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  
  releaseName: samplechart-release-1

  values:
    kotsOnlyValue:
      enabled: true
```

During installation or upgrade with KOTS, KOTS sets `kotsOnlyValue.enabled` in the Helm chart `values.yaml` file to `true` so that the KOTS-only value is enabled for the installation. For installations that use the Helm CLI instead of KOTS, `kotsOnlyValue.enabled` remains `false`.

### Using KOTS Template Functions

You can use KOTS template functions in the HelmChart custom resource `values` key to set Helm values with the rendered template functions. For more information, see [About Template Functions](/reference/template-functions-about).

<Tabs>
  <TabItem value="config" label="Config Context Example" default>
  Using KOTS template functions in the [Config](/reference/template-functions-config-context) context allows you to set Helm values based on user-supplied values from the KOTS Admin Console configuration page.

For example, the following Helm chart `values.yaml` file contains `postgresql.enabled`, which is set to `false`: 

```yaml
# Helm chart values.yaml
postgresql:
  enabled: false
```
The following HelmChart custom resource contains a mapping to `postgresql.enabled` in its `values` key:

```yaml
# KOTS HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  
  releaseName: samplechart-release-1

  values:
    postgresql:
      enabled: repl{{ ConfigOptionEquals `postgres_type` `embedded_postgres`}}
```

The `values.postgresql.enabled` field in the HelmChart custom resource above uses the Replicated [ConfigOptionEquals](/reference/template-functions-config-context#configoptionequals) template function to evaluate the user's selection for a `postgres_type` configuration option.

During installation or upgrade, the template function is rendered to true or false based on the user's selction. Then, KOTS sets the matching `postgresql.enabled` value in the Helm chart `values.yaml` file accordingly.
  </TabItem>
  <TabItem value="license" label="License Context Example" default>
  Using KOTS template functions in the [License](/reference/template-functions-license-context) context allows you to set Helm values based on the unique license file used for installation or upgrade.

For example, the following HelmChart custom resource uses the Replicated [LiencseFieldValue](/reference/template-functions-license-context#licensefieldvalue) template function to evaluate if the license has the boolean `newFeatureEntitlement` field set to `true`:

```yaml
# KOTS HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  
  releaseName: samplechart-release-1

  values:
    newFeature:
      enabled: repl{{ LicenseFieldValue "newFeatureEntitlement" }}
```

During installation or upgrade, the LicenseFieldValue template function is rendered based on the user's license. Then, KOTS sets the matching `newFeature.enabled` value in the Helm chart `values.yaml` file accordingly.
  </TabItem>
</Tabs> 

## Conditionally Set Values

The `optionalValues` key can be used to set values in the Helm chart `values.yaml` file when a given conditional statement evaluates to true. For example, if a customer chooses to include an optional application component in their deployment, it might be necessary to include Helm chart values related to the optional component.

`optionalValues` includes the following properties:

* `optionalValues.when`: Defines a conditional statement using KOTS template functions. If `optionalValues.when` evaluates to true, then the values specified in `optionalValues` are set.

* `optionalValues.recursiveMerge`: Defines how `optionalValues` is merged with `values`.

* `optionalValues.values`: An array of key-value pairs.

For example, the following HelmChart custom resource uses the `optionalValues` key and the [ConfigOptionEquals](/reference/template-functions-config-context#configoptionequals) template function to set user-supplied values for an external MariaDB database:

```yaml
# KOTS HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: wordpress
spec:
  chart:
    name: wordpress
    chartVersion: 15.3.2

  releaseName: sample-release-1

  optionalValues:
    - when: "repl{{ ConfigOptionEquals `mariadb_type` `external`}}"
      recursiveMerge: false
      values:
        externalDatabase:
          host: "repl{{ ConfigOption `external_db_host`}}"
          user: "repl{{ ConfigOption `external_db_user`}}"
          password: "repl{{ ConfigOption `external_db_password`}}"
          database: "repl{{ ConfigOption `external_db_database`}}"
          port: "repl{{ ConfigOption `external_ db_port`}}"
```

During installation, KOTS renders the template functions and sets the `externalDatabase` values in the HelmChart `values.yaml` file only when the user selects the `external` option for `mariadb_type` on the Admin Console configuration page.

### About Recursive Merge for optionalValues {#recursive-merge}

The `optionalValues.recursiveMerge` boolean defines how KOTS merges `values` and `optionalValues`:

* When `optionalValues.recursiveMerge` is false, the top level keys in `optionalValues` override the top level keys in `values`. By default, `optionalValues.recursiveMerge` is set to false.

* When `optionalValues.recursiveMerge` is true, all keys from `values` and `optionalValues` are included. In the case of a conflict where there is a matching key in `optionalValues` and `values`, KOTS uses the value of the key from `optionalValues`.

For example, the following HelmChart custom resource has both `values` and `optionalValues`:

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

When `recursiveMerge` is set to `false`, the ConfigMap for the deployed application includes the following key value pairs:

```yaml
favorite_day: null
favorite_dessert: pie
favorite_drink_cold: lemonade
favorite_drink_hot: coffee
```

In this case, the top level keys in `optionalValues` override the top level keys in `values`.

KOTS then uses the values from the Helm chart `values.yaml` to populate the remaining fields in the ConfigMap: `favorite_day`, `favorite_dessert`, and `favorite_drink_hot`.

When `recursiveMerge` is set to `true`, the ConfigMap for the deployed application includes the following key value pairs:

```yaml
favorite_day: saturday
favorite_dessert: ice cream
favorite_drink_cold: lemonade
favorite_drink_hot: tea
```

In this case, all keys from `values` and `optionalValues` are merged. Because both include `favorite.drink.cold`, KOTS uses `lemonade` from `optionalValues`.

## Delete a Default Key

If the Helm chart `values.yaml` contains a static value that must be deleted when deploying with KOTS, you can set the value to `"null"` (including the quotation marks) in the `values` key of the HelmChart custom resource.

A common use case for deleting default value keys is when you include a community Helm chart as a dependency. Because you cannot control how the community chart is built and structured, you might want to change some of the default behavior.

For example, the following HelmChart custom resource sets an `exampleKey` value to `"null"` when the chart is deployed with KOTS:

```yaml
# KOTS HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  
  releaseName: samplechart-release-1

  values:
    exampleKey: "null"
```

For more information about using a `null` value to delete a key, see [Deleting a Default Key](https://helm.sh/docs/chart_template_guide/values_files/#deleting-a-default-key) in the Helm documentation.