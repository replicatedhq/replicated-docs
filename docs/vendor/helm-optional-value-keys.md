# Configuring Optional Value Keys

> This topic applies to both native Helm and Replicated Helm installations.

The Helm chart `values.yaml` file is not a static mapping in an application.
It is possible to either remove or include values when certain conditions are met.

## Remove Values

If the Helm chart `values.yaml` contains a static value that must be removed when deploying using the Replicated app manager, set the value to `"null"` (including the quotation marks) in the HelmChart custom resource manifest file.

Typically this situation happens when you are including a community chart as a dependency in your own chart. You cannot control how the community chart is built and structured, and you might want to change some of the default behavior that the community chart does not easily expose. For example, Kubernetes only supports one livenessProbe handler. You can set a default livenessProbe handler to `"null"` and enable your preferred handler. For more information, see [Deleting a Default Key](https://helm.sh/docs/chart_template_guide/values_files/#deleting-a-default-key) in the Helm documentation.

## Include Values

Some advanced use cases involve writing values to a values file only if there is a value to apply. For example, if a customer has the option to configure a different value than the default value in your file, such as setting the database option they want to use. You can include an optional value key so that your application can dynamically include it based on a `when` condition.

Additionally, Helm charts such as Postgres do not treat an empty value (`""`) in the same way as if the key were missing from the chart. This can be necessary for applications packaged as a Helm chart that include a reference to another chart in the `requirements.yaml`.

For example, in the [requirements.yaml](https://github.com/helm/charts/blob/e64112e0913db99227926b49fa0ae59158c9c9d9/stable/sentry/requirements.yaml) of the [Sentry](https://github.com/helm/charts/tree/master/stable/sentry) chart, there is a reference to postgres. This is configured through the [Sentry chart values.yaml](https://github.com/helm/charts/blob/e64112e0913db99227926b49fa0ae59158c9c9d9/stable/sentry/values.yaml#L192):

```yaml
# PostgreSQL chart configs
postgresql:
  enabled: false
  # postgresqlUsername: postgres
  # postgresqlDatabase: sentry
  # service:
  #   port: 5432
```

When the postgres chart is deployed, the existence of the database key sets the value.  

The way the Sentry chart is written, it uses the value in `postgresql.postgresDatabase` unless it is *missing*. For more information, see the [workers-deployment.yaml](https://github.com/helm/charts/blob/e64112e0913db99227926b49fa0ae59158c9c9d9/stable/sentry/templates/workers-deployment.yaml#L80) implementation.

To make this work reliably, you must be able to dynamically add and remove the `postgresDatabase` key from the `values.yaml` so that it is only present if the user selects `embedded_postgres`.

If the user selects external postgres, you want the Sentry `workers-deployment.yaml` to receive the value that the user provided.

To enable this use case, instead of modifying the render logic in the Helm chart, you can add an `optionalValues` section to the `kind: HelmChart`.

The `optionalValues` section includes a `when` condition that instructs the app manager how to determine if these keys should be merged. It also includes a `recursiveMerge` field that defines how to merge the dataset.

**Example: HelmChart custom resource**

```yaml
apiVersion: kots.io/v1beta1
kind: HelmChart
metadata:
  name: sentry
spec:
  # chart identifies a matching chart from a .tgz
  chart:
    name: sentry
    chartVersion: 3.1.7

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
          postgresqlDatabase: "repl{{ ConfigOption `external_postgres_database`}}"
          postgresqlUsername: "repl{{ ConfigOption `external_postgres_username`}}"
          postgresqlHost: "repl{{ ConfigOption `external_postgres_host`}}"
          postgresqlPassword: "repl{{ ConfigOption `external_postgres_password`}}"
          postgresqlPort: "repl{{ ConfigOption `external_postgres_port`}}"

  # builder values provide a way to render the chart with all images
  # and manifests. this is used in replicated to create airgap packages
  builder:
    postgresql:
      enabled: true
```

The HelmChart YAML above results in the following `values.yaml` if a user selects `external_postgres`:

```yaml
postgresql:
  enabled: false
  postgresqlDatabase: "repl{{ ConfigOption `external_postgres_database`}}"
  postgresqlUsername: "repl{{ ConfigOption `external_postgres_username`}}"
  postgresqlHost: "repl{{ ConfigOption `external_postgres_host`}}"
  postgresqlPassword: "repl{{ ConfigOption `external_postgres_password`}}"
  postgresqlPort: "repl{{ ConfigOption `external_postgres_port`}}"
```

The HelmChart YAML results in the following `values.yaml` if the user selects `embedded_postgres`:

```yaml
postgresql:
  enabled: true
```
For more information about the `optionalValues` property, including details about the `when` and `recursiveMerge` fields, see [optionalValues](/reference/custom-resource-helmchart#optionalvalues) in _HelmChart_.


## Bitnami Example##

For example, in the Bitnami Wordpress[charts.yaml.](https://github.com/bitnami/charts/blob/main/bitnami/wordpress/Chart.yaml) chart, there is a reference to mariadb. This is configured through the [values.yaml](https://github.com/bitnami/charts/blob/main/bitnami/wordpress/values.yaml#L1086):

```yaml
mariadb:
  ## @param mariadb.enabled Deploy a MariaDB server to satisfy the applications database requirements
  ## To use an external database set this to false and configure the `externalDatabase.*` parameters
  ##
  enabled: true
  ## @param mariadb.architecture MariaDB architecture. Allowed values: `standalone` or `replication`
  ##
  architecture: standalone
  ## MariaDB Authentication parameters
  ## @param mariadb.auth.rootPassword MariaDB root password
  ## @param mariadb.auth.database MariaDB custom database
  ## @param mariadb.auth.username MariaDB custom user name
  ## @param mariadb.auth.password MariaDB custom user password
  auth:
    rootPassword: ""
    database: bitnami_wordpress
    username: bn_wordpress
    password: ""
```
If a user wants to configure an external database, you can enable this dynamically through your deployment by adding an `optionalValues` section to the `kind: HelmChart` custom resource, instead of attempting to modify the render logic in the Helm chart.

The `optionalValues` section includes a `when` condition that instructs the app manager how to determine if these keys should be merged. It also includes a `recursiveMerge` field that defines how to merge the dataset.

According the the Bitnami Readme, these are the values that must be set to use an external DB, including the port=3306. Not sure how to reflect this in the HelmChart below:

```yaml
mariadb.enabled=false
externalDatabase.host=myexternalhost
externalDatabase.user=myuser
externalDatabase.password=mypassword
externalDatabase.database=mydatabase
externalDatabase.port=3306
```

apiVersion: kots.io/v1beta1
kind: HelmChart
metadata:
  name: bitnami wordpress
spec:
  # chart identifies a matching chart from a .tgz
  chart:
    name: bitnami wordpress
    chartVersion: 15.3.2

  # values are used in the customer environment, as a pre-render step
  # these values will be supplied to helm template
  values:
    mariadb:
      enabled: repl{{ ConfigOptionEquals `mariadb_type` `externalDatabase`}}

  optionalValues:
    - when: "repl{{ ConfigOptionEquals `mariadb_type` `externalDatabase`}}"
      recursiveMerge: false
      values:
        mariadb:
          externalDatabase.host: "repl{{ ConfigOption `external_mariadb_host`}}"
          externalDatabase.user: "repl{{ ConfigOption `external_mariadb_user`}}"
          externalDatabase.password: "repl{{ ConfigOption `external_mariadb_password`}}"
          externalDatabase.database: "repl{{ ConfigOption `external_mariadb_database`}}"

  # builder values provide a way to render the chart with all images
  # and manifests. this is used in replicated to create airgap packages
  builder:
    mariadb:
      enabled: true

According the the Bitnami Readme, these are the values that must be set to use an external DB, including the port=3306. Not sure how to reflect this in the HelmChart below:

```yaml
mariadb.enabled=false
externalDatabase.host=myexternalhost
externalDatabase.user=myuser
externalDatabase.password=mypassword
externalDatabase.database=mydatabase
externalDatabase.port=3306
```

