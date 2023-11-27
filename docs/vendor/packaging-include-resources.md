# Conditionally Including or Excluding Resources

This topic describes how to include or exclude optional application resources based on one or more conditional statements. The information in this topic applies to Helm chart- and standard manifest-based applications.

## Overview

Software vendors often need a way to conditionally deploy resources for an application depending on users' configuration choices. For example, a common use case is giving the user the choice to use an external database or an embedded database. In this scenario, when a user chooses to use their own external database, it is not desirable to deploy the embedded database resources.

### About Replicated Template Functions

For applications deployed with KOTS, Replicated template functions are available for creating the conditional statements that control which optional resources are deployed for a given user. Replicated template functions can be used in standard manifest files such as Replicated custom resources or Kubernetes resources like StatefulSets, Secrets, and Services.

For example, the Replicated ConfigOptionEquals template functions returns true if the specified configuration option value is equal to a supplied value. This is useful for creating conditional statements that include or exclude a resource based on a user's application configuration choices.

For more information about the available Replicated template functions, see [About Template Functions](/reference/template-functions-about).

## Include or Exclude Helm Charts

This section describes methods for including or excluding Helm charts from your application deployment.

### Optional Dependencies 

For Helm chart-based applications installed with the Helm CLI or with Replicated KOTS, you can add a `condition` field to dependencies in your `Chart.yaml` to include subcharts based on one or more boolean values evaluating to true.

The `condition` field can be set to one or more YAML paths delimited by commas. If the path exists in the `values.yaml` file for the parent Helm chart and resolves to a boolean value, then the subchart is included or excluded based on that boolean value.

For example, the `Chart.yaml` below lists `mysubchart` as a dependency. `mysubchart` is deployed only when the `mysubchart.enabled` value from the Helm chart `values.yaml` file is true: 

```yaml
# parentchart/Chart.yaml

dependencies:
  - name: mysubchart
    repository: http://localhost:10191
    version: 0.1.0
    condition: mysubchart.enabled
```

For more information about working with dependencies and defining conditional dependencies for Helm charts, see [Dependencies](https://helm.sh/docs/chart_best_practices/dependencies/) in the Helm documentation.

### HelmChart `exclude` Field

For Helm chart-based applications installed with KOTS, you can configure KOTS to exclude certain Helm charts from deployment using the HelmChart custom resource [`exclude`](/reference/custom-resource-helmchart#exclude) field. When the `exclude` field is set to a conditional statement, KOTS excludes the chart if the condition evaluates to `true`.

The following example uses the `exclude` field and the ConfigOptionEquals template function to exclude a postgresql Helm chart when the `external_postgres` option is selected on the Replicated admin console **Config** page:

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

## Include or Exclude Standard Manifests

For standard manifest-based applications installed with KOTS, you can use the `kots.io/exclude` or `kots.io/when` annotations to include or exclude resources based on a conditional statement.

By default, if neither `kots.io/exclude` nor `kots.io/when` is present on a resource, the resource is included.

### Requirements

The `kots.io/exclude` and `kots.io/when` annotations have the following requirements:

* Only one of the `kots.io/exclude` nor `kots.io/when` annotations can be present on a single resource. If both are present, the `kots.io/exclude` annotation is applied, and the `kots.io/when` annotation is ignored.

* The `kots.io/exclude` and `kots.io/when` annotations must be written in quotes (for example, `"kots.io/exclude":`). This is because Kubernetes annotations must be strings. For more information about working with Kubernetes annotations, see [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes documentation. 

### `kots.io/exclude`

When the `kots.io/exclude: '<bool>'` annotation is present on a resource and evaluates to true, the resource is excluded from the deployment.

The following example uses the `kots.io/exclude` annotation and the ConfigOptionEquals template function to exclude the postgresql `StatefulSet` when an `install_postgres` checkbox on the admin console **Config** page is disabled:

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

The following example uses the `kots.io/when` annotation and the ConfigOptionEquals template function to exclude the postgresql `StatefulSet` resource when the `install_postgres` checkbox on the admin console **Config** page is disabled:

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