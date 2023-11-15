import HooksLimitation from "../partials/helm/_hooks-limitation.mdx"
import WeightLimitation from "../partials/helm/_helm-cr-weight-limitation.mdx"
import HookWeightsLimitation from "../partials/helm/_hook-weights-limitation.mdx"

# Orchestrating Resource Deployment

Vendors often need to control the how Kubernetes resources are deployed. For example, some applications require that certain resources are deployed in a Ready state before other resources can be deployed.

## Resource Deployment Order in KOTS Installations

When installing a Helm chart-based application, KOTS always deploys standard Kubernetes manifests to the cluster _before_ deploying Helm charts. For example, if your release contains a Helm chart, a CRD, and a ConfigMap, then the CRD and ConfigMap resources are deployed before the Helm chart. 

This allows you to control the deployment order of your application resources by either defining the resources as standard manifests or as Helm charts. Additionally, you can manage the order in which resources are deployed using the following methods:

* Add KOTS annotations to standard manifests to specify their deployment order. For example, you can add a `wait-for-properties` annotation to a resource so that KOTS waits for a given property to reach a target value before deploying other resources. For more information, see [Orchestrating Resource Deployment](/vendor/orchestrating-resource-deployment).

* Use the `weight` property in the HelmChart custom resource to specify the deployment order of any Helm charts and subcharts. For more information, see [`weight`](/reference/custom-resource-helmchart-v2#weight) in _HelmChart v2_.

## Set Helm Chart Deployment Order with `weight` Property

You can add a `weight` property to the Replicated HelmChart custom resource to define the order the charts are installed. See [weight](/reference/custom-resource-helmchart-v2#weight) in _HelmChart v2_.

This is useful if you have multiple HelmChart custom resources in your application, and it is important that the resources referenced in one or more Helm charts are deployed before one or more other Helm charts.

Assigning a `weight` also helps you avoid relying on Helm dependencies and subcharts to define a chart installation order with KOTS. For example, when you include hooks in your Helm charts, Helm waits for certain hooks to complete before continuing.

KOTS directs Helm to install the Helm charts in your application based on the value of `weight` in ascending order, deploying the chart with the lowest weight first. For example, a chart with a `weight` of `-1` deploys before a chart with a `weight` of `0`.

The value for the `weight` property can be any negative or positive integer or `0`. By default, when you do not provide a `weight` for a Helm chart, the `weight` is `0`.

### Limitations

The `weight` field in the HelmChart custom resource has the following limitations:

* <WeightLimitation/>

* <HooksLimitation/>

* <HookWeightsLimitation/>

### Subcharts and Dependencies

When you add a `weight` property to HelmChart custom resources in your application, KOTS instructs Helm to install any dependencies, including subcharts, along with the parent chart.

For example, if you have two Helm charts in your application, one with a `weight` of `-1` and one with a `weight` of `0`, then Helm installs the chart with a `weight` of `-1` first, including any subcharts and dependencies listed in the `dependencies` field for that chart.

If you do not add a `weight` to Helm charts in your application, you can still use dependencies and subcharts to define installation order constraints during application deployment.

For more information about using Helm dependencies, see [Chart Dependencies](https://helm.sh/docs/topics/charts/#chart-dependencies) in the Helm documentation.

### Hooks

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

## Set Standard Manifest Deployment Order with KOTS Annotations

To give you more control over the deployment of Kubernetes resources, Replicated KOTS uses annotations to allow for more fine-grained control over the order in which resources are deployed.

The following sections describe how KOTS uses annotations to control resource deployment. For more information about annotations, see [annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes documentation.

### Deployment Phases

If a creation or deletion phase is not specified for a resource, the resource is created or deleted as part of the default phase `'0'`. Phases can be any positive or negative integer ranging from `'-9999'` to `'9999'`.

#### `kots.io/creation-phase: '<integer>'`

When this annotation is present on a resource, KOTS groups the resource into the specified creation phase. KOTS deploys each phase in order from lowest to highest. Resources within the same phase are deployed in the same order that Helm installs resources. For more information, see [Using Helm](https://helm.sh/docs/intro/using_helm/#:~:text=Helm%20installs%20resources%20in%20the,order) in the Helm documentation.

#### `kots.io/deletion-phase: '<integer>'`

When this annotation is present on a resource, KOTS groups the resource into the specified deletion phase. KOTS deletes each phase in order from lowest to highest. Resources within the same phase are deleted in the reverse order from which they were created.

:::note
You must quote the integer in the annotation because Kubernetes annotations must be strings.
:::

#### Example

The following example deploys the `CustomResourceDefinition` before the default creation phase and deletes the resource after the default deletion phase.

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

### Wait for a Resource to be Ready

#### `kots.io/wait-for-ready: '<bool>'`

When this annotation is present on a resource and evaluates to `'true'`, KOTS waits for the resource to be in a Ready state before deploying any other resources. This leverages the same logic as application status informers to determine if a resource is ready. If there is no existing status informer for a given resource type, KOTS waits until the resource exists and is queryable from the Kubernetes API server. For more information about status informers, see [Adding Resource Status Informers](/vendor/admin-console-display-app-status).

:::note
You must quote the boolean in the annotation because Kubernetes annotations must be strings.
:::

#### Example

The following example causes KOTS to wait for the Postgres `StatefulSet` to be ready before continuing to deploy other resources.

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


### Wait for Resource Properties

#### `kots.io/wait-for-properties: '<jsonpath>=<value>,<jsonpath>=<value>'`

When this annotation is present on a resource, KOTS waits for one or more specified resource properties to match the desired values before continuing to deploy other resources. The value for this annotation is a comma-separated list of key-value pairs, where the key is a JSONPath specifying the path to the property and the value is the desired value for the property.

This annotation can be useful when waiting for a custom resource to exist is not sufficient. This annotation lets you define what Ready means.

#### Example

The following example causes KOTS to wait for a custom resource to reach a desired state. In this case, KOTS waits until each of the three status properties have the desired values.

```
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

