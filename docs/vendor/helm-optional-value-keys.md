# Configuring Optional Value Keys

> This topic applies to both native Helm and Replicated Helm installations.

The Helm chart `values.yaml` file is not a static mapping in an application.
It is possible to either remove or include values when certain conditions are met.

## Remove Values

If the Helm chart `values.yaml` contains a static value that must be removed when deploying using the Replicated app manager, set the value to `"null"` (including the quotation marks) in the HelmChart custom resource manifest file.

Typically this situation happens when you are including a community chart as a dependency in your own chart. You cannot control how the community chart is built and structured, and you might want to change some of the default behavior that the community chart does not easily expose. For more information, see [Deleting a Default Key](https://helm.sh/docs/chart_template_guide/values_files/#deleting-a-default-key) in the Helm documentation.

## Include Values

Some advanced use cases involve writing values to a values file only if there is a value to apply. For example, if a customer has the option to configure a different value than the default value in your file, such as setting the database option they want to use. You can include an optional value key so that your application can dynamically include it based on a `when` condition.

**Example**

For example, in the Bitnami Wordpress [chart.yaml.](https://github.com/bitnami/charts/blob/main/bitnami/wordpress/Chart.yaml) chart, there is a reference to `mariadb`. This is configured through the [values.yaml](https://github.com/bitnami/charts/blob/main/bitnami/wordpress/values.yaml#L1086):

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
If a user wants to configure an external database, you can enable this dynamically through your deployment by adding an `optionalValues` section to the `kind: HelmChart` custom resource, instead of attempting to modify the render logic in the Helm chart.

The `optionalValues` section includes a `when` condition that instructs the app manager how to determine if these keys should be merged. It also includes a `recursiveMerge` field that defines how to merge the dataset.

For example, the HelmChart custom resource can be configured as follows:

```
apiVersion: kots.io/v1beta1
kind: HelmChart
metadata:
  name: wordpress
spec:
  # chart identifies a matching chart from a .tgz
  chart:
    name: wordpress
    chartVersion: 15.3.2

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

```
mariadb:
  enabled: true
```

For more information about the `optionalValues` property, including details about the `when` and `recursiveMerge` fields, see [`optionalValues`](https://docs.replicated.com/reference/custom-resource-helmchart#optionalvalues) in _HelmChart_.