# Conditionally Including or Excluding Resources

This topic describes how to use Replicated KOTS annotations and Replicated template functions to include or exclude optional resources based on a conditional statement.

## Overview

Often, vendors need a way to optionally install resources depending on users' configuration choices. For example, a common use case is giving the user the choice to use an external database or an embedded database. In this scenario, when a user chooses to use their own external database, it is not desirable to deploy the embedded database resources (StatefulSet, Service, and so on).

## Helm Charts

This section includes strategies for conditionally deploying Helm charts for your application.

### Define Conditional Dependencies 

For Helm chart-based application installed with the Helm CLI or with Replicated KOTS, you can conditionally deploy subcharts. 

```yaml
# parentchart/Chart.yaml

dependencies:
  - name: subchart1
    repository: http://localhost:10191
    version: 0.1.0
    condition: subchart1.enabled,global.subchart1.enabled
    tags:
      - front-end
      - subchart1
  - name: subchart2
    repository: http://localhost:10191
    version: 0.1.0
    condition: subchart2.enabled,global.subchart2.enabled
```

```yaml
# parentchart/values.yaml

subchart1:
  enabled: true
```

See [Dependencies](https://helm.sh/docs/chart_best_practices/dependencies/) in the Helm documentation.

### (KOTS Only) Conditionally Exclude a Helm Chart with the `exclude` Field

By default, KOTS creates an instance of a Helm chart for every HelmChart custom resource manifest file in the upstream application manifests. However, you can configure your application so that KOTS excludes certain Helm charts based on a conditional statement. 

To create this conditional statement, you add a Replicated template function to an `exclude` field in the HelmChart custom resource file. For example, you can add a template function that evaluates to `true` or `false` depending on the user's selection for a configuration field on the Replicated admin console Config page.
KOTS renders the template function in the `exclude` field, and excludes the chart if the template function evaluates to `true`.

For all optional components, Replicated recommends that you add a configuration option to allow the user to optionally enable or disable the component.
This lets you support enterprises that want everything to run in the cluster and those that want to bring their own services for stateful components.

In the HelmChart custom resource, add a mapping to the `values` key so that it uses the password you created. Also, add an `exclude` field to specify that the Postgres Helm chart must only be included when the user selects the embedded Postgres option on the Config page:

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

## Standard Manifests

To include or exclude resources from your application deployment, you can use the `kots.io/exclude` or `kots.io/when` annotation on the resource. You can also set the value of the annotation to a conditional statement using Replicated template functions. For information about Replicated template functions, see [About Template Functions](/reference/template-functions-about) in _Template Functions_.

The `kots.io/exclude` and `kots.io/when` annotations have the following requirements:

* By default, if neither `kots.io/exclude` nor `kots.io/when` is present on a resource, the resource is included.

* Only one of the `kots.io/exclude` nor `kots.io/when` annotations can be present on a single resource. If both are present, the `kots.io/exclude` annotation is applied, and the `kots.io/when` annotation is ignored.

* The `kots.io/exclude` nor `kots.io/when` annotations must be written in quotes (for example, `"kots.io/exclude":`). This is because Kubernetes annotations cannot be booleans and must be strings. For more information about Kubernetes annotations, see [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes documentation. 

### Conditionally Exclude a Resource with `kots.io/exclude`

When the `kots.io/exclude: '<bool>'` annotation is present on a resource and evaluates to true, the resource is excluded from the deployment.

The following example excludes the Postgres `StatefulSet` when the user disables a `install_postgres` checkbox on the Replicated admin console **Config** page:

```yaml
apiVersion: apps/v1
kind: Statefulset
metadata:
  name: postgresql
  annotations:
    "kots.io/exclude": '{{repl ConfigOptionEquals "install_postgres" "0" }}'
  labels:
    app: postgresql
spec:
  selector:
    matchLabels:
      app: postgresql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: postgresql
    spec:
      containers:
      - name: postgresql
        image: "postgres:9.6"
        imagePullPolicy: ""
...
```

### Conditionally Include a Resource with `kots.io/when`

When the `kots.io/when: '<bool>'` annotation is present on a resource and evaluates to false, the resource is excluded from the deployment.

The following example excludes the postgres `StatefulSet` resource when the `install_postgres` checkbox is enabled:

```yaml
apiVersion: apps/v1
kind: Statefulset
metadata:
  name: postgresql
  annotations:
    "kots.io/when": '{{repl ConfigOptionEquals "install_postgres" "1" }}'
  labels:
    app: postgresql
spec:
  selector:
    matchLabels:
      app: postgresql
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: postgresql
    spec:
      containers:
      - name: postgresql
        image: "postgres:9.6"
        imagePullPolicy: ""
...
```
