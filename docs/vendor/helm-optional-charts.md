# Optional charts

> This topic applies to both native Helm and Replicated Helm installations.

Charts can be optionally included in an application. By default, an instance of a Helm chart is created for every `apiVersion: kots.io/v1beta` and `kind: HelmChart` that's found in the upstream application manifests.

To make a chart optional, add a [template-parsable](template-functions-about) `exclude` attribute to the `kind: HelmChart` document.
When downloading, the Replicated app manager will render this field and exclude the entire chart if the output of this field can be parsed as a boolean evaluating to `true`.

If this value is not provided, the chart will be included.

## Example
For an example, let's use an example application that has a Postgres database.
The current community supported Postgres Helm chart is available at https://github.com/helm/charts/tree/master/stable/postgresql.
For this example, we want to let the user provide their own Postgres instance (outside of the application), or use an embedded, simple Postgres service for demos and simple installations.


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

Let's edit this to add a conditional statement, rendering either a connection string to the embedded postgres chart, or the user supplied instance, as needed.
The logic for this can be thought of as:

```shell
## NOTE: This must be all on one line in your application, but it's displayed here on multiple lines for readability.
## Continue reading to see how this is combined into a single line
repl{{ if ConfigOptionEquals "postgres_type" "embedded_postgres" }}
  postgres://myapplication:repl{{ ConfigOption "embedded_postgres_password" }}@postgres:5432/mydatabase?sslmode=disable
repl{{ else }}
  repl{{ ConfigOption "external_postgres_uri" }}
repl{{ end }}
```

But we need to write it all on a single line.
For readability, we are using the `stringData` field of the Kubernetes Secret object, which allows us to not base64 encode the value.
Replicated has a Base64Encode function available that you can pipe a string through, if desired.

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

```shell
helm repo update
helm fetch stable/postgresl
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
    chartVersion: 8.1.2

  # values are used in the customer environment, as a pre-render step
  # these values will be supplied to helm template
  values:
    postgresqlUsername: username
    postgreslPassword: "repl{{ ConfigOption `embedded_postgres_password` }}"
    postgresqlDatabase: mydatabase

  # builder values provide a way to render the chart with all images
  # and manifests. this is used in replicated to create airgap packages
  builder: {}
```
