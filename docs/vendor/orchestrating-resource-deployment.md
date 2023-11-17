import HooksLimitation from "../partials/helm/_hooks-limitation.mdx"
import WeightLimitation from "../partials/helm/_helm-cr-weight-limitation.mdx"
import HookWeightsLimitation from "../partials/helm/_hook-weights-limitation.mdx"

# Orchestrating Resource Deployment

This topic describes how to orchestrate the deployment order of resources deployed by your application. The information in this topic applies to Helm chart- and standard manifest-based applications deployed with Replicated KOTS.

## Overview

Many applications require that certain resources are deployed and in a Ready state before other resources can be deployed. 

You can manage the order in which resources are deployed using the following methods:

* For Helm charts and subcharts, use the `weight` property in the corresponding HelmChart custom resource. See [Helm Chart Deployment Order with `weight`](#weight).

* For standard manifests, add KOTS annotations to the resources. See [Standard Manifest Deployment Order with KOTS Annotations](#manifests).

## Helm Chart Deployment Order with `weight` {#weight}

You can configure the [`weight`](/reference/custom-resource-helmchart-v2#weight) property of the Replicated HelmChart custom resource to define the order in which the Helm charts in your release are installed.

KOTS directs Helm to install the Helm charts based on the value of `weight` in ascending order, deploying the chart with the lowest weight first. For example, a chart with a `weight` of `-1` deploys before a chart with a `weight` of `0`.

The value for the `weight` property can be any negative or positive integer or `0`. By default, when you do not provide a `weight` for a Helm chart, the `weight` is `0`.

Assigning a `weight` helps you avoid relying on Helm dependencies and subcharts to define a chart installation order with KOTS. For example, when you include hooks in your Helm charts, Helm waits for certain hooks to complete before continuing.

For example:

```yaml
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  releaseName: samplechart-release-1
  # weight determines the order that charts are applied, with lower weights first.
  weight: 4
```

### `weight` with Subcharts and Dependencies

When you add a `weight` property to HelmChart custom resources in your application, KOTS instructs Helm to install any dependencies, including subcharts, along with the parent chart.

For example, if you have two Helm charts in your application, one with a `weight` of `-1` and one with a `weight` of `0`, then Helm installs the chart with a `weight` of `-1` first, including any subcharts and dependencies listed in the `dependencies` field for that chart.

If you do not add a `weight` to Helm charts in your application, you can still use dependencies and subcharts to define installation order constraints during application deployment.

For more information about using Helm dependencies, see [Chart Dependencies](https://helm.sh/docs/topics/charts/#chart-dependencies) in the Helm documentation.

### `weight` with Hooks

Helm hooks enable more control over when Helm installs the resources in your Helm charts. This is useful if you want to bundle actions as part of a release. For example, you can build in a database backup as part of the upgrade process while ensuring that the backup occurs prior to upgrading the rest of the resources.

KOTS supports using some Helm hooks with Helm charts. If you use hooks in your Helm charts, you can use the `weight` property to further manage the installation order of resources. For example, if you include a pre-install hook in Helm chart A that requires a resource from Helm chart B, you can add a lower `weight` to chart B to ensure that Replicated KOTS directs Helm to install chart B before chart A.

The following hooks are supported:
  * `pre-install`: Executes after resources are rendered but before any resources are installed.
  * `post-install`: Executes after resources are installed.
  * `pre-upgrade`: Executes after resources are rendered but before any resources are upgraded.
  * `post-upgrade`: Executes after resources are upgraded.
  * `pre-delete`: Executes before any resources are deleted.
  * `post-delete`: Executes after resources are deleted.

<HooksLimitation/>

For more information about Helm hooks and weights, see the [Chart Hooks](https://helm.sh/docs/topics/charts_hooks/) in the Helm documentation.

### Limitations

The `weight` field in the HelmChart custom resource has the following limitations:

* <WeightLimitation/>

* <HooksLimitation/>

* <HookWeightsLimitation/>

* When installing a Helm chart-based application, KOTS always deploys standard Kubernetes manifests to the cluster _before_ deploying Helm charts. For example, if your release contains a Helm chart, a CRD, and a ConfigMap, then the CRD and ConfigMap resources are deployed before the Helm chart.

  The `weight` property does not allow Helm charts to be deployed before standard manifests. For any resources that must be deployed before any Helm charts, Replicated recommends that you define those resources as standard manifests.

## Standard Manifest Deployment Order with KOTS Annotations {#manifests}

You can use the KOTS annotations descirbed in this section to control the order in which standard manifests are deployed.

### Requirement

You must quote the boolean or integer values in annotations because Kubernetes annotations must be strings. For more information about working with annotations in Kubernetes resources, see [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes documentation.

### `kots.io/creation-phase` 

When the `kots.io/creation-phase: '<integer>'` annotation is present on a resource, KOTS groups the resource into the specified creation phase. KOTS deploys each phase in order from lowest to highest. Phases can be any positive or negative integer ranging from `'-9999'` to `'9999'`.

Resources in the same phase are deployed in the same order that Helm installs resources. To view the order in which KOTS deploys resources of the same phase, see [Helm installs resources in the following order](https://helm.sh/docs/intro/using_helm/#:~:text=Helm%20installs%20resources%20in%20the,order) in the Helm documentation.

The following example deploys the `CustomResourceDefinition` before the default creation phase:

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: myresources.example.com
  annotations:
    kots.io/creation-phase: "-1"
...
```

### `kots.io/deletion-phase`

When the `kots.io/deletion-phase: '<integer>'` annotation is present on a resource, KOTS groups the resource into the specified deletion phase. KOTS deletes each phase in order from lowest to highest. Resources within the same phase are deleted in the reverse order from which they were created. Phases can be any positive or negative integer ranging from `'-9999'` to `'9999'`.

The following example deploys the `CustomResourceDefinition` before the default creation phase and deletes the resource after the default deletion phase:

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: myresources.example.com
  annotations:
    kots.io/creation-phase: "-1"
    kots.io/deletion-phase: "1"
...
```
### `kots.io/wait-for-ready`

When the `kots.io/wait-for-ready: '<bool>'` annotation is present on a resource and evaluates to `'true'`, KOTS waits for the resource to be in a Ready state before deploying any other resources. To determine if a resource is ready, KOTS uses any status informers that were created for the resource type. If there is no existing status informer for the given resource type, then KOTS waits until the resource exists and is queryable from the Kubernetes API server. For more information about status informers, see [Adding Resource Status Informers](/vendor/admin-console-display-app-status).

In the following example, KOTS waits for the Postgres `StatefulSet` to be ready before continuing to deploy other resources:

```yaml
apiVersion: apps/v1
kind: Statefulset
metadata:
  name: postgresql
  annotations:
    kots.io/wait-for-ready: 'true'
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

### `kots.io/wait-for-properties`

When the `kots.io/wait-for-properties: '<jsonpath>=<value>,<jsonpath>=<value>'` annotation is present on a resource, KOTS waits for one or more specified resource properties to match the desired values before deploying other resources. The value for this annotation is a comma-separated list of key-value pairs, where the key is a JSONPath specifying the path to the property and the value is the desired value for the property.

This annotation is useful when waiting for a custom resource to exist (as with `kots.io/wait-for-ready`) is not sufficient.

In the following example, KOTS waits for a custom resource to reach a desired state before deploying other resources. In this case, KOTS waits until each of the three status properties have the target values:

```yaml
kind: MyResource
metadata:
  name: my-resource
  annotations:
    kots.io/wait-for-properties: '.status.tasks.extract=true,.status.tasks.transform=true,.status.tasks.load=true'
...
status:
  tasks:
    extract: false
    transform: false
    load: false
```