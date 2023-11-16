# Conditionally Including or Excluding Resources

This topic describes how to include or exclude optional application resources based on one or more conditional statements.

## Overview

Often, software vendors need a way to conditionally deploy resources for an application depending on users' configuration choices. For example, a common use case is giving the user the choice to use an external database or an embedded database. In this scenario, when a user chooses to use their own external database, it is not desirable to deploy the embedded database resources (StatefulSet, Service, and so on).

Replicated supports several methods for including or excluding resources for Helm chart- or standard manifest-based applications.

For applications installed with Replicated KOTS, Replicated template functions. For example, you can add a template function that evaluates to `true` or `false` depending on the user's selection for a configuration field on the Replicated admin console Config page. For information about Replicated template functions, see [About Template Functions](/reference/template-functions-about) in _Template Functions_.

## Include or Exclude Helm Charts

For Helm chart-based applications, you can conditionally deploy subcharts by defining conditional dependencies in the `Chart.yaml`, or by configuring the `exclude` field in the Replicated HelmChart custom resource. 

### Conditional Dependencies 

For Helm chart-based application installed with the Helm CLI or with Replicated KOTS, you can include conditional dependencies in your `Chart.yaml` to include or exclude subcharts based on a conditional statement.

For example, the `Chart.yaml` below lists `mysubchart` as a dependency. `mysubchart` is deployed only when the `mysubchart.enabled` value is true. 

```yaml
# parentchart/Chart.yaml

dependencies:
  - name: mysubchart
    repository: http://localhost:10191
    version: 0.1.0
    condition: mysubchart.enabled
```
Based on the `Chart.yaml` above, the following `values.yaml` would allow the `mysubchart` subchart to be deployed: 

```yaml
# parentchart/values.yaml

mysubchart:
  enabled: true
```

For more information about working with dependencies and defining conditional dependencies, see [Dependencies](https://helm.sh/docs/chart_best_practices/dependencies/) in the Helm documentation.

### (KOTS Only) HelmChart `exclude` Field

By default, KOTS creates an instance of a Helm chart for every HelmChart custom resource manifest file in the upstream application manifests. However, you can configure your application so that KOTS excludes certain Helm charts based on a conditional statement. 

KOTS renders the template function in the `exclude` field, and excludes the chart if the template function evaluates to `true`.

The following example shows an `exclude` field that specifies that a Postgres Helm chart must be excluded from the deployment if the user choose to use their own external Postgres instance:

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
```

## Include or Exclude Resources Defined by Standard Manifests

To include or exclude resources from your application deployment, you can use the `kots.io/exclude` or `kots.io/when` annotation on the resource.

### Requirements

The `kots.io/exclude` and `kots.io/when` annotations have the following requirements:

* By default, if neither `kots.io/exclude` nor `kots.io/when` is present on a resource, the resource is included.

* Only one of the `kots.io/exclude` nor `kots.io/when` annotations can be present on a single resource. If both are present, the `kots.io/exclude` annotation is applied, and the `kots.io/when` annotation is ignored.

* The `kots.io/exclude` nor `kots.io/when` annotations must be written in quotes (for example, `"kots.io/exclude":`). This is because Kubernetes annotations cannot be booleans and must be strings. For more information about Kubernetes annotations, see [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes documentation. 

### `kots.io/exclude`

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

### `kots.io/when`

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
