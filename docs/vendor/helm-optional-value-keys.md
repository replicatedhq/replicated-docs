# Configuring Optional Value Keys

The Helm chart `values.yaml` file is not a static mapping in an application.
It is possible to either override values or include values when certain conditions are met using the Replicated HelmChart custom resource.

## Override Values

If the Helm chart `values.yaml` contains a static value that must be overridden when deploying using the Replicated KOTS, set the value to `"null"` (including the quotation marks) in the HelmChart custom resource.

Typically this situation happens when you are including a community chart as a dependency in your own chart. You cannot control how the community chart is built and structured, and you might want to change some of the default behavior that the community chart does not easily expose. For more information, see [Deleting a Default Key](https://helm.sh/docs/chart_template_guide/values_files/#deleting-a-default-key) in the Helm documentation.

## Include Values

Some advanced use cases involve writing values to a values file only if there is a value to apply. For example, if a customer has the option to configure a different value than the default value in your file, such as setting the database option they want to use. You can include an optional value key so that your application can dynamically include it based on a `when` condition. 

For more information about the `optionalValues` property, see [`optionalValues`](/reference/custom-resource-helmchart-v2#optionalvalues) in _HelmChart v2 (Beta)_.

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
If a user wants to configure an external database, you can enable this dynamically through your deployment by adding an `optionalValues` section to the HelmChart custom resource, instead of attempting to modify the render logic in the Helm chart.

The `optionalValues` section includes a `when` condition that instructs KOTS how to determine if these keys should be merged. It also includes a `recursiveMerge` field that defines how to merge the dataset.

For example, the HelmChart custom resource can be configured as follows:

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

  # values are used in the customer environment, as a pre-render step
  # these values will be supplied to helm template
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


  # builder values provide a way to render the chart with all images
  # and manifests. this is used in replicated to create airgap packages
  builder:
    mariadb:
      enabled: true
```
The HelmChart YAML above results in the following `values.yaml` if a user selects a `mariadb_type` of `external`:

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
The HelmChart YAML above results in the following `values.yaml` if the user selects a `mariadb_type` of `embedded`:

```yaml
mariadb:
  enabled: true
```

## Example: Recursive Merge

The `recursiveMerge` boolean defines how Replicated KOTS merges the values and `optionalValues` datasets when the conditional statement in the `when` field is `true`.

Then, the admin console uses the values from this merged dataset and from the Helm chart `values.yaml` file when deploying the application.

For more information about the `recursiveMerge` field, see [`optionalValues`](https://docs.replicated.com/reference/custom-resource-helmchart#optionalvalues) in the _HelmChart_ reference.

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

When `recursiveMerge` is set to `false` in the HelmChart custom resource, the ConfigMap for the deployed application includes the following key value pairs:

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