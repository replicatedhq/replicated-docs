# Conditionally Include or Exclude Resources

This topic describes how to use Replicated `kots.io` annotations to explicitly include or exclude application resources from deployments based on one or more conditions.

## Overview

Software vendors often need a way to conditionally deploy one or more application resources. One common use case is giving the user the choice to use an external database or an embedded database. In this scenario, when a user chooses to use their own external database, it is not desirable to deploy the embedded database resources.

Another common use case is needing to explicitly include or exclude a resource from a customer deployment depending on if they install with the Helm CLI or with a Replicated installer. For example, some vendors provide additional services when the user deploys with a Replicated installer like Embedded Cluster, but do not want those services included when users deploy with the Helm CLI.

For applications distributed with Replicated, there are options for explicitly including and excluding entire Helm charts, resources within a Helm chart's templates, and resources defined by standalone Kubernetes manifests.

## Include or Exclude Helm Charts

This section describes methods for including or excluding Helm charts and resources within a chart's templates.

### Helm Optional Dependencies 

Helm supports adding a `condition` field to dependencies in the Helm chart `Chart.yaml` file to include subcharts based on one or more boolean values evaluating to true.

For more information about working with dependencies and defining optional dependencies for Helm charts, see [Dependencies](https://helm.sh/docs/chart_best_practices/dependencies/) in the Helm documentation.

### HelmChart `exclude` Field

For Helm chart applications installed with a Replicated installer (Embedded Cluster, KOTS, kURL), you can exclude certain Helm charts from deployment using the HelmChart custom resource [`exclude`](/reference/custom-resource-helmchart#exclude) field. When the `exclude` field is set to a conditional statement, the chart is excluded if the condition evaluates to `true`.

The following example uses the `exclude` field and the Replicated [ConfigOptionEquals](/reference/template-functions-config-context#configoptionequals) template function to exclude a postgresql Helm chart when the `external_postgres` option is selected on the Replicated Admin Console **Config** page:

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

### `kots.io/installer-only` Annotation {#installer-only}

You can use the `kots.io/installer-only` annotation to prevent an entire Helm chart or one or more resoures in a Helm chart's templates from being deployed in installations with the Helm CLI. Charts or resources with `kots.io/installer-only: "true"` are deployed _only_ when installing with a Replicated installer (Embedded Cluster, KOTS, and kURL).

The `kots.io/installer-only` annotation does the following:
- Excludes the chart (or the resource in a chart's templates) from the Helm CLI installation and update instructions in the Enterprise Portal and Vendor Portal. For more information about how users can view these instructions in the Enterprise Portal, see [View Insall and Update Instructions](/vendor/enterprise-portal-use#view-install-and-update-instructions) in _Log In To and Use the Enterprise Portal_.
- Excludes the chart (or the resource in a chart's templates) from Security Center reports for Helm CLI installations. For more information about the Security Center, see [About the Security Center (Alpha)](/vendor/security-center-about).

This annotation is useful for charts that are required for Replicated installer-based deployments but should not be visible or deployed when customers install with the Helm CLI.

:::note
Any Kubernetes resources in your releases that are not part of a Helm chart are never included in Helm CLI installations. You do not need to add this annotation to standalone manifests.
:::

#### Exclude an Entire Helm Chart from Helm CLI Installations

You can add `kots.io/installer-only` to a Replicated [HelmChart](/reference/custom-resource-helmchart) custom resource to prevent the associated Helm chart from being deployed in Helm CLI installations.

**Example:**

```yaml
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: installers-only-chart
  annotations:
    kots.io/installer-only: "true"
spec:
  chart:
    name: installers-only-chart
    chartVersion: 1.0.0
```

:::note
HelmChart custom resources are never deployed by Helm CLI. The annotation controls whether the chart they reference is included in Helm CLI installation and update instructions.
:::

#### Exclude Resources Inside a Chart's Templates from Helm CLI Installations

You can add `kots.io/installer-only` to a Kubernetes resource in a Helm chart's templates directory to prevent the resource from being deployed in Helm CLI installations.

**Example:**

The following example shows a Kubernetes Job inside a Helm chart's templates that should only run during Replicated installer deployments:

```yaml
# example-chart/templates/preflight-job.yaml

apiVersion: batch/v1
kind: Job
metadata:
  name: {{ .Release.Name }}-preflight
  annotations:
    kots.io/installer-only: "true"
spec:
  template:
    spec:
      containers:
      - name: preflight-checks
        image: replicated/preflight:latest
        command: ["/bin/sh"]
        args: ["-c", "echo Running installer-specific preflight checks"]
      restartPolicy: Never
```

## Include or Exclude Kubernetes Manifests

You can use the `kots.io/exclude` or `kots.io/when` annotations to include or exclude standalone Kubernetes manifests that are not part of a Helm chart. By default, if neither `kots.io/exclude` nor `kots.io/when` is present on a resource, the resource is included.

These annotations accept a boolean value. To create a conditional statement that evaluates to true or false, you can use Replicated template functions. For more information about working with Replicated template functions, see [About Replicated Template Functions](/reference/template-functions-about).

### Requirements

The `kots.io/exclude` and `kots.io/when` annotations have the following requirements:

* Only one of the `kots.io/exclude` nor `kots.io/when` annotations can be present on a single resource. If both are present, the `kots.io/exclude` annotation is applied, and the `kots.io/when` annotation is ignored.

* The values of the `kots.io/exclude` and `kots.io/when` annotations must be wrapped in quotes. This is because Kubernetes annotations must be strings. For more information about working with Kubernetes annotations, see [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes documentation. 

### `kots.io/exclude`

When the `kots.io/exclude: '<bool>'` annotation is present on a resource and evaluates to true, the resource is excluded from the deployment.

The following example uses the `kots.io/exclude` annotation and the [ConfigOptionEquals](/reference/template-functions-config-context#configoptionequals) template function to exclude the postgresql `StatefulSet` when an `install_postgres` checkbox on the Admin Console **Config** page is disabled:

```yaml
apiVersion: apps/v1
kind: Statefulset
metadata:
  name: postgresql
  annotations:
    kots.io/exclude: '{{repl ConfigOptionEquals "install_postgres" "0" }}'
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

When the `kots.io/when: '<bool>'` annotation is present on a resource and evaluates to true, the resource is included in the deployment.

The following example uses the `kots.io/when` annotation and the [ConfigOptionEquals](/reference/template-functions-config-context#configoptionequals) template function to include the postgresql `StatefulSet` resource when the `install_postgres` checkbox on the Admin Console **Config** page is enabled:

```yaml
apiVersion: apps/v1
kind: Statefulset
metadata:
  name: postgresql
  annotations:
    kots.io/when: '{{repl ConfigOptionEquals "install_postgres" "1" }}'
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