# Including Optional Value Keys

> This topic applies to both native Helm and Replicated Helm installations.

The Helm chart `values.yaml` file is not a static mapping in an application.
It is possible to either remove or include values when certain conditions are met.

## Remove Values

If the Helm chart `values.yaml` contains a static value that must be removed when deploying using the Replicated app manager, set the value to `"null"` (including the quotation marks) in the HelmChart custom resource manifest file.

For more information, see [Deleting a Default Key](https://helm.sh/docs/chart_template_guide/values_files/#deleting-a-default-key) in the Helm documentation.

## Include Values

Some advanced use cases involve writing values to a values file only if there is a value to apply.

Helm charts such as Postgres do not treat an empty value (`""`) in the same way as if the key were missing from the chart. This can be necessary for applications packaged as a Helm chart that include a reference to another chart in the `requirements.yaml`.

For example, in the [requirements.yaml](https://github.com/helm/charts/blob/e64112e0913db99227926b49fa0ae59158c9c9d9/stable/sentry/requirements.yaml) of the [Sentry](https://github.com/helm/charts/tree/master/stable/sentry) chart, there is a reference to postgres. This is configured through the [Sentry chart values.yaml](https://github.com/helm/charts/blob/e64112e0913db99227926b49fa0ae59158c9c9d9/stable/sentry/values.yaml#L192):

```yaml
# PostgreSQL chart configs
postgresql:
  enabled: false
  # postgresqlUsername: kong
  # postgresqlDatabase: kong
  # service:
  #   port: 5432
```

When the postgres chart is deployed, the existence of the database key sets the value.  

The way the Sentry chart is written, it uses the value in `postgresql.postgresDatabase` unless it is *missing*. For more information, see the [workers-deployment.yaml](https://github.com/helm/charts/blob/e64112e0913db99227926b49fa0ae59158c9c9d9/stable/sentry/templates/workers-deployment.yaml#L80) implementation.

In order to make this work reliably, we need to be able to dynamically add and remove the `postgresDatabase` key from the `values.yaml` so that it is only present if the user selects `embedded_postgres`.

If the user selects external postgres, we want the Sentry `workers-deployment.yaml` to receive the value that the user provided.

To enable this, instead of attempting to modify the render logic in the Helm chart, you can add an `optionalValues` section to the `kind: HelmChart`.

The `optionalValues` section includes a `when` condition that instructs the app manager how to determine if these keys should be merged. It also includes a `recursiveMerge` field that defines how to merge the dataset.

For example, using the Sentry helm chart:

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

The above YAML will result in the following `values.yaml` if the user selects `external_postgres`:

```yaml
postgresql:
  enabled: false
  postgresqlDatabase: "repl{{ ConfigOption `external_postgres_database`}}"
  postgresqlUsername: "repl{{ ConfigOption `external_postgres_username`}}"
  postgresqlHost: "repl{{ ConfigOption `external_postgres_host`}}"
  postgresqlPassword: "repl{{ ConfigOption `external_postgres_password`}}"
  postgresqlPort: "repl{{ ConfigOption `external_postgres_port`}}"
```

And the following `values.yaml` if the user selects `embedded_postgres`:

```yaml
postgresql:
  enabled: true
```
For more information about the `optionalValues` property, including details about the `when` and `recursiveMerge` fields, see [optionalValues](../reference/custom-resource-helmchart#optionalvalues) in _HelmChart_.
