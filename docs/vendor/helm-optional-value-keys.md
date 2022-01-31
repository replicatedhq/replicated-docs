# Optional value keys

> This topic applies to both native Helm and Replicated Helm installations.

The `values.yaml` is not a static mapping in an application.
It's possible to either remove or include value when certain conditions are met.

## Removing values

If the `values.yaml` contains a static value that should be removed when deploying using the Replicated app manager, add this value to the `<chart-name.yaml>` file, setting the value equal to the string `"null"` (with the quotes).
For more information about this syntax, see the [Helm feature](https://github.com/helm/helm/pull/2648).

## Including values

Some advanced cases involve writing values to a values file only if there's a value to apply.
Helm charts like Postgres will not treat an empty value (`""`) the same as the key being missing from the chart.

This is sometimes needed for applications packaged as a Helm chart that include a reference to another chart in the `requirements.yaml`.

For example, let's look at the [Sentry](https://github.com/helm/charts/tree/master/stable/sentry) chart.
In the [requirements.yaml](https://github.com/helm/charts/blob/e64112e0913db99227926b49fa0ae59158c9c9d9/stable/sentry/requirements.yaml), there's a reference to postgres.
And this is configured through the [Sentry chart values.yaml](https://github.com/helm/charts/blob/e64112e0913db99227926b49fa0ae59158c9c9d9/stable/sentry/values.yaml#L192):

```yaml
# PostgreSQL chart configs
postgresql:
  enabled: false
  # postgresqlUsername: kong
  # postgresqlDatabase: kong
  # service:
  #   port: 5432
```

 When the postgres chart is deployed, the existence of the database key will set the value.  
 The way the Sentry chart is written, it will use the value in `postgresql.postgresDatabase` unless it's *missing*. For more information, see the [workers-deployment.yaml](https://github.com/helm/charts/blob/e64112e0913db99227926b49fa0ae59158c9c9d9/stable/sentry/templates/workers-deployment.yaml#L80) implementation.

 In order to make this work reliably, we need to be able to dynamically add and remove the `postgresDatabase` key from the `values.yaml`, where it's only present if the user has selected `embedded_postgres`.
 If the user selects external postgres, we want the Sentry `workers-deployment.yaml` to receive the value that the user provided.

To enable this, you can add an `optionalValues` section to the `kind: HelmChart`, and include a `when` condition to instruct the app manager how to determine if these keys should be merged.

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

The above YAML will result in the following `values.yaml` if the user has selected `external_postgres`:

```yaml
postgresql:
  enabled: false
  postgresqlDatabase: "repl{{ ConfigOption `external_postgres_database`}}"
  postgresqlUsername: "repl{{ ConfigOption `external_postgres_username`}}"
  postgresqlHost: "repl{{ ConfigOption `external_postgres_host`}}"
  postgresqlPassword: "repl{{ ConfigOption `external_postgres_password`}}"
  postgresqlPort: "repl{{ ConfigOption `external_postgres_port`}}"
```

And the following `values.yaml` if the user has selected `embedded_postgres`:

```yaml
postgresql:
  enabled: true
```
> Starting in app manager v1.38.0, a new opt-in feature is introduced where values and optionalValues are recursively merged if the dataset is recursive in nature. A new flag "recursiveMerge" flag is introduced. If the flag is set to True, values and optionalValues are merged if they are mutually exclusive. If the optionalValue key mataches with the values key, optionalValue takes precedence. By default, the flag is set to False.

**Note:** This could also be done by modifying the render logic in the Helm chart, but that's not always an easy option.
