# Example: Including Optional Helm Charts

This topic describes using optional Helm charts in your application. It also provides an example of how to configure the Replicated HelmChart custom resource to exclude optional Helm charts from your application when a given condition is met. 

## About Optional Helm Charts

By default, KOTS creates an instance of a Helm chart for every HelmChart custom resource manifest file in the upstream application manifests. However, you can configure your application so that KOTS excludes certain Helm charts based on a conditional statement. 

To create this conditional statement, you add a Replicated KOTS template function to an `exclude` field in the HelmChart custom resource file. For example, you can add a template function that evaluates to `true` or `false` depending on the user's selection for a configuration field on the KOTS Admin Console Config page.
KOTS renders the template function in the `exclude` field, and excludes the chart if the template function evaluates to `true`.

For all optional components, Replicated recommends that you add a configuration option to allow the user to optionally enable or disable the component.
This lets you support enterprises that want everything to run in the cluster and those that want to bring their own services for stateful components.

For more information about template functions, see [About Template Functions](/reference/template-functions-about).

## Example

This example uses an application that has a Postgres database.
The community-supported Postgres Helm chart is available at https://github.com/bitnami/charts/tree/main/bitnami/postgresql.

In this example, you create a configuration field on the Admin Console Config page that lets the user provide their own Postgres instance or use a Postgres service that is embedded with the application. Then, you configure the HelmChart custom resource in a release for an application in the Replicated Vendor Portal to conditionally exclude the optional Postgres component. 

### Step 1: Create the Configuration Fields

To start, define the Admin Console Config page that gives the user a choice of "Embedded Postgres" or "External Postgres", where "External Postgres" is user-supplied.

1. Log in to the [Vendor Portal](https://vendor.replicated.com). Create a new application for this example, or open an existing application. Then, click **Releases > Create release** to create a new release for the application.

1. In the Config custom resource manifest file in the release, add the following YAML to create the "Embedded Postgres" or "External Postgres" configuration options:

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
              type: radio
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

    The YAML above does the following:
    * Creates a field with "Embedded Postgres" or "External Postgres" radio buttons
    * Uses the Replicated RandomString template function to generate a unique default password for the embedded Postgres instance at installation time
    * Creates fields for the Postgres password and connection string, if the user selects the External Postgres option

    The following shows how this Config custom resource manifest file displays on the Admin Console Config page:

    ![Postgres Config Screen](/images/postgres-config-screen.gif)

### Step 2: Create a Secret for Postgres

The application has a few components that use Postgres, and they all mount the Postgres connection string from a single Secret. 

Define a Secret for Postgres that renders differently if the user selects the Embedded Postgres or External Postgres option:

1. In the release, create a Secret file and add the following YAML:

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: postgresql-secret
    stringData:
      uri: postgres://username:password@postgresql:5432/database?sslmode=disable
    ```   

1. Edit the `uri` field in the Secret to add a conditional statement that renders either a connection string to the embedded Postgres chart or to the user supplied instance:

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: postgresql-secret
    stringData:
      uri: repl{{ if ConfigOptionEquals "postgres_type" "embedded_postgres" }}postgres://myapplication:repl{{ ConfigOption "embedded_postgres_password" }}@postgres:5432/mydatabase?sslmode=disablerepl{{ else }}repl{{ ConfigOption "external_postgres_uri" }}repl{{ end }}
    ```

    As shown above, you must use a single line for the conditional statement. Optionally, you can use the Replicated Base64Encode function to pipe a string through. See [Base64Encode](/reference/template-functions-static-context#base64encode) in _Static Context_.

### Step 3: Add the Helm Chart

Next, package the Helm chart and add it to the release in the Vendor Portal:

1. Run the following commands to generate a `.tgz` package of the Helm chart:

    ```
    helm repo add bitnami https://charts.bitnami.com/bitnami
    helm fetch bitnami/postgresql
    ```

1. Drag and drop the `.tgz` file into the file tree of the release. The Vendor Portal automatically creates a new HelmChart custom resource named `postgresql.yaml`, which references the `.tgz` file you uploaded.

    For more information about adding Helm charts to a release in the Vendor Portal, see [Managing Releases with the Vendor Portal](releases-creating-releases).

### Step 4: Edit the HelmChart Custom Resource

Finally, edit the HelmChart custom resource:

1. In the HelmChart custom resource, add a mapping to the `values` key so that it uses the password you created. Also, add an `exclude` field to specify that the Postgres Helm chart must only be included when the user selects the embedded Postgres option on the Config page:

    ```yaml
    apiVersion: kots.io/v1beta2
    kind: HelmChart
    metadata:
      name: postgresql
    spec:
      exclude: 'repl{{ ConfigOptionEquals `postgres_type` `external_postgres` }}'
      chart:
        name: postgresql
        chartVersion: 12.1.7

      releaseName: samplechart-release-1
    
      # values are used in the customer environment, as a pre-render step
      # these values will be supplied to helm template
      values:
        auth:
          username: username
          password: "repl{{ ConfigOption `embedded_postgres_password` }}"
          database: mydatabase
    ```

1. Save and promote the release. Then, install the release in a development environment to test the embedded and external Postgres options. For more information, see [Installing in an Existing Cluster](/enterprise/installing-existing-cluster).
