import WeightLimitation from "../partials/helm/_helm-cr-weight-limitation.mdx"

# Orchestrating Resource Deployment

This topic describes how to orchestrate the deployment order of resources deployed by your application. The information in this topic applies to Helm chart- and standard manifest-based applications deployed with Replicated KOTS.

## Overview

Many applications require that certain resources are deployed and in a ready state before other resources can be deployed. For applications deployed with KOTS, you can manage the order in which resources are deployed using the following methods:

* For Helm charts, set the `weight` property in the corresponding HelmChart custom resource. See [Helm Chart Deployment Order with `weight`](#weight).

* For standard manifests, add KOTS annotations to the resources. See [Standard Manifest Deployment Order with KOTS Annotations](#manifests).

## Helm Chart Deployment Order with `weight` {#weight}

You can configure the [`weight`](/reference/custom-resource-helmchart-v2#weight) property of the Replicated HelmChart custom resource to define the order in which the Helm charts in your release are installed.

KOTS directs Helm to install the Helm charts based on the value of `weight` in ascending order, deploying the chart with the lowest weight first. Any dependencies are installed along with the parent chart. For example, a chart with a `weight` of `-1` deploys before a chart with a `weight` of `0`. 

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

### Limitations

The `weight` field in the HelmChart custom resource has the following limitations:

* <WeightLimitation/>

* When installing a Helm chart-based application, KOTS always deploys standard Kubernetes manifests to the cluster _before_ deploying Helm charts. For example, if your release contains a Helm chart, a CRD, and a ConfigMap, then the CRD and ConfigMap resources are deployed before the Helm chart. The `weight` property does not allow Helm charts to be deployed before standard manifests.
  
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

When the `kots.io/wait-for-properties: '<jsonpath>=<value>,<jsonpath>=<value>'` annotation is present on a resource, KOTS waits for one or more specified resource properties to match the desired values before deploying other resources. This annotation is useful when the `kots.io/wait-for-ready` annotation, which waits for a resource to exist, is not sufficient.

The value for this annotation is a comma-separated list of key-value pairs, where the key is a JSONPath specifying the path to the property and the value is the desired value for the property. In the following example, KOTS waits for a resource to reach a desired state before deploying other resources. In this case, KOTS waits until each of the three status properties have the target values:

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