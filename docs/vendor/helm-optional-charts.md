# Including Optional Charts

> This topic applies to both the Native Helm and Replicated KOTS deployment methods.

By default, the app manager creates an instance of a Helm chart for every HelmChart custom resource manifest file in the upstream application manifests. However, you can configure your application so that the app manager excludes certain Helm charts based on a conditional statement. 

To create this conditional statement, add a Replicated template function to an `exclude` field in the HelmChart custom resource file. For example, you can add a template function that evaluates to `true` or `false` depending on the user's selection for a configuration field on the admin console Config page.
The Replicated app manager renders the template function in the `exclude` field, and excludes the chart if the template function evaluates to `true`.

For more information about template functions, see [About Template Functions](/reference/template-functions-about).

## Example
For an example, let's use an application that has a Postgres database.
The current community supported Postgres Helm chart is available at https://github.com/bitnami/charts/tree/main/bitnami/postgresql.
For this example, we want to let the user provide their own Postgres instance (outside of the application), or use an embedded, simple Postgres service for demos and simple installations.

For any optional components, Replicated recommends that you add a configuration option to allow the user to optionally enable or disable the component.
Some enterprises will want everything running in the cluster, while others will want to bring their own services for stateful components.

### Config

To start, let's define the config screen that will give the user a choice of "Embedded Postgres" or "External Postgres", where external is user supplied.
The YAML below does this, by creating a `select_one` (radio button) option, and two fields.
We don't want every installation to have the same default password for the embedded postgres instance, so this will be generated at installation time.
But if the user selects the External Postgres option, we should show an edit box for them to supply a valid Postgres connection string.

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: example-application
spec:
  groups:
    - name: database
      title: Database
      description: Database Options
      items:
        - name: postgres_type
          type: select_one
          title: Postgres
          default: embedded_postgres
          items:
            - name: embedded_postgres
              title: Embedded Postgres
            - name: external_postgres
              title: External Postgres
        - name: embedded_postgres_password
          type: password
          value: "{{repl RandomString 32}}"
          hidden: true
        - name: external_postgres_uri
          type: text
          title: External Postgres Connection String
          help_text: Connection string for a Postgres 10.x server
          when: '{{repl ConfigOptionEquals "postgres_type" "external_postgres"}}'
```

The config screen will look like this:

![Postgres Config Screen](/images/postgres-config-screen.gif)


### Application

Our application has a few components that use Postgres, and they all mount the Postgres connection string from a single secret. This secret is defined as:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: postgresql-secret
stringData:
  uri: postgres://username:password@postgresql:5432/database?sslmode=disable
```

You can edit this to add a conditional statement, rendering either a connection string to the embedded postgres chart, or the user supplied instance, as needed.

You must use a single line for the conditional statement, shown in the following example with the `stringData` field of the Kubernetes Secret object. Optionally, you can use the Replicated Base64Encode function to pipe a string through.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: postgresql-secret
stringData:
  uri: repl{{ if ConfigOptionEquals "postgres_type" "embedded_postgres" }}postgres://myapplication:repl{{ ConfigOption "embedded_postgres_password" }}@postgres:5432/mydatabase?sslmode=disablerepl{{ else }}repl{{ ConfigOption "external_postgres_uri" }}repl{{ end }}
```


### Chart

Next, we can take the Helm chart and upload it to our application.

```
helm repo add bitnami https://charts.bitnami.com/bitnami
helm fetch bitnami/postgresql
```

After dropping this file into the file tree in the [vendor portal](https://vendor.replicated.com), a new file named `postgresql.yaml` is created.
This will be already set to to reference the `.tgz` file you uploaded.
Let's add a mapping to the `values` key so that it uses the password we've created and also we should add an `exclude` attribute to the chart to specify that it should only be included when the user has selected embedded postgres.

```yaml
apiVersion: kots.io/v1beta1
kind: HelmChart
metadata:
  name: postgresql
spec:
  exclude: 'repl{{ ConfigOptionEquals `postgres_type` `external_postgres` }}'
  # chart identifies a matching chart from a .tgz
  chart:
    name: postgresql
    chartVersion: 12.1.7

  # helmVersion identifies the Helm Version used to render the Chart. Default is v2.
  helmVersion: v3

  # useHelmInstall identifies whether this Helm chart will use the
  # Replicated Helm installation (false) or native Helm installation (true). Default is false.
  # Native Helm installations are only available for Helm v3 charts.
  useHelmInstall: true
  
  # values are used in the customer environment, as a pre-render step
  # these values will be supplied to helm template
  values:
    auth:
      username: username
      password: "repl{{ ConfigOption `embedded_postgres_password` }}"
      database: mydatabase

  # builder values provide a way to render the chart with all images
  # and manifests. this is used in replicated to create airgap packages
  builder: {}
```
