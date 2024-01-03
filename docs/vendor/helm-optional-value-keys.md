# Manipulating Helm Chart Values with KOTS

This topic describes how to use the Replicated HelmChart custom resource to override or include values in the `values.yaml` file for a Helm chart deployed with Replicated KOTS.

## Overview

You can use the Replicated HelmChart custom resource `values` and `optionalValues` keys to override or include values in a Helm chart during installation or upgrade with KOTS.

The HelmChart custom resource `values` and `optionalValues` keys create a mapping between KOTS and the Helm chart `values.yaml` file. This mapping allows you to manipulate values in your Helm chart for KOTS installations without having to make any changes to the Helm chart itself. 

For more information about the syntax for these fields, see [`values`](/reference/custom-resource-helmchart-v2#values) and [`optionalValues`](/reference/custom-resource-helmchart-v2#optionalvalues) in _HelmChart v2_.

For a tutorial that shows how to override values in a sample Helm chart during installation with KOTS, see [Override Helm Chart Values with KOTS](/vendor/tutorial-config-setup).

## Override Existing Values

During installation or upgrade, KOTS uses the values in the HelmChart custom resource `values` key to override the values of any matching keys in the corresponding Helm chart `values.yaml` file.

You can use the HelmChart custom resource `values` key to set existing values in the Helm chart `values.yaml`

### Set a Value

You can set a value in your Helm chart `values.yaml` file with KOTS by creating a matching key in the HelmChart custom resource `values` field.

For example, the following Helm chart `values.yaml` file contains `postgresql.enabled`, which is set to `false`: 

```yaml
# Helm chart values.yaml
postgresql:
  enabled: false
```
The following HelmChart custom resource contains a mapping to `postgresql.enabled` in its `values` key:

```yaml
# Replicated HelmChart custom resource

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

The `values.postgresql.enabled` field in the HelmChart custom resource above uses the Replicated [ConfigOptionEquals](/reference/template-functions-config-context#configoptionequals) template function to evaluate the user's selection for a `postgres_type` configuration option. During installation or upgrade, the template function is rendered to `true` or `false`, and then KOTS overrides the matching `postgresql.enabled` value in the Helm chart `values.yaml` file accordingly.

### Delete a Default Key

If the Helm chart `values.yaml` contains a static value that must be deleted when deploying with KOTS, set the value to `"null"` (including the quotation marks) in the HelmChart custom resource. For example:

```yaml
# Replicated HelmChart custom resource

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

Typically, this situation happens when you are including a community chart as a dependency of your application Helm chart. As you cannot control how the community chart is built and structured, you might want to change some of the default behavior that the community chart does not easily expose.

For more information about using a `null` value to delete a key, see [Deleting a Default Key](https://helm.sh/docs/chart_template_guide/values_files/#deleting-a-default-key) in the Helm documentation.

## Include Optional Value Keys

Some use cases involve writing keys to a Helm chart `values.yaml` file only if there is a value to apply. For example, a customer might choose to include an optional application component in their deployment. In this case, it could be necessary to include values in the Helm chart for the configuration of the optional component.

To include optional value keys, you can use the HelmChart custom resource `optionalValues` key with a conditional `when` statement. This ensures that the optional values are only written to the Helm chart when the condition evaluates to true.

`optionalValues` also includes a `recursiveMerge` field that defines how to merge the dataset. For more information, see [How KOTS Merges the `values` and `optionalValues` datasets](#recursive-merge) below.

For example, in the Bitnami Wordpress [chart.yaml.](https://github.com/bitnami/charts/blob/main/bitnami/wordpress/Chart.yaml) file, there is a reference to `mariadb`. This reference is configured through the [values.yaml](https://github.com/bitnami/charts/blob/main/bitnami/wordpress/values.yaml#L1086) file:

```yaml
mariadb:
  ## @param mariadb.enabled Deploy a MariaDB server to satisfy the applications database requirements
  ## To use an external database set this to false and configure the `externalDatabase.*` parameters
  ##
  enabled: true
...
## External Database Configuration
## All of these values are only used if `mariadb.enabled=false`
##
externalDatabase:
  ## @param externalDatabase.host External Database server host
  ##
  host: localhost
  ## @param externalDatabase.port External Database server port
  ##
  port: 3306
  ## @param externalDatabase.user External Database username
  ##
  user: bn_wordpress
  ## @param externalDatabase.password External Database user password
  ##
  password: ""
  ## @param externalDatabase.database External Database database name
  ##
  database: bitnami_wordpress
```
If a user wants to configure an external database, you can enable this dynamically by adding an `optionalValues` section to the HelmChart custom resource:

```yaml
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: wordpress
spec:
  chart:
    name: wordpress
    chartVersion: 15.3.2

  releaseName: sample-release-1

  values:
    mariadb:
      enabled: repl{{ ConfigOptionEquals `mariadb_type` `embedded`}}

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

If a user selects a `mariadb_type` of `external`, then the HelmChart custom resource above results in the following `values.yaml`:

```yaml
mariadb:
  enabled: false
externalDatabase:
  host: "repl{{ ConfigOption `external_db_host`}}"
  user: "repl{{ ConfigOption `external_db_user`}}"
  password: "repl{{ ConfigOption `external_db_password`}}"
  database: "repl{{ ConfigOption `external_db_database`}}"
  port: "repl{{ ConfigOption `external_db_port`}}"
```
If the user selects a `mariadb_type` of `embedded`, then the HelmChart custom resource above results in the following `values.yaml`:

```yaml
mariadb:
  enabled: true
```

## How KOTS Merges the `values` and `optionalValues` Datasets {#recursive-merge}

The `optionalValues.recursiveMerge` boolean defines how KOTS merges the `values` and `optionalValues` datasets:
* When `optionalValues.recursiveMerge` is false, the top level keys in `optionalValues` override the top level keys in `values`.
* When `optionalValues.recursiveMerge` is true, all keys from `values` and `optionalValues` are included in the merged dataset. In the case of a conflict where there is a matching key in `optionalValues` and `values`, the merged dataset uses the value of the key from `optionalValues`.

KOTS uses the values from this merged dataset and from the Helm chart `values.yaml` file when deploying the application.

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

In this case, all keys from `values` and `optionalValues` are included in the merged dataset. Because both include `favorite.drink.cold`, the merged dataset uses `lemonade` from `optionalValues`.