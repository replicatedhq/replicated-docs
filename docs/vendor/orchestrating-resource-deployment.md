# Orchestrating Resource Deployment

Vendors often need to control the how Kubernetes resources are deployed. For example, some applications require that certain resources are deployed in a Ready state before other resources can be deployed.

To give you more control over the deployment of Kubernetes resources, Replicated KOTS uses annotations to allow for more fine-grained control over the order in which resources are deployed.

## KOTS Annotations

The following sections describe how KOTS uses annotations to control resource deployment. For more information about annotations, see [annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes documentation.

### Deployment Phases

If a creation or deletion phase is not specified for a resource, the resource is created or deleted as part of the default phase `'0'`. Phases can be any positive or negative integer ranging from `'-9999'` to `'9999'`.

#### `kots.io/creation-phase: '<integer>'`

When this annotation is present on a resource, KOTS groups the resource into the specified creation phase. KOTS deploys each phase in order from lowest to highest. Resources within the same phase are deployed in the same order that Helm installs resources. For more information, see [Using Helm](https://helm.sh/docs/intro/using_helm/#:~:text=Helm%20installs%20resources%20in%20the,order) in the Helm documentation.

#### `kots.io/deletion-phase: '<integer>'`

When this annotation is present on a resource, KOTS groups the resource into the specified deletion phase. KOTS deletes each phase in order from lowest to highest. Resources within the same phase are deleted in the reverse order from which they were created.

:::note
Kubernetes annotations cannot be integers and must be strings, so make sure to quote the integer in the annotation.
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

When this annotation is present on a resource and evaluates to `'true'`, KOTS waits for the resource to be in a Ready state before deploying any other resources. This leverages the same logic as application status informers to determine if a resource is ready. If there is no existing status informer for a given resource type, KOTS waits until the resource exists and is queryable from the Kubernetes API server. For more information about status informers, see [Displaying Application Status](/vendor/admin-console-display-app-status#about-status-informers).

:::note
Kubernetes annotations cannot be booleans and must be strings, so make sure to quote this.
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


### Wait for Resource Properites

#### `kots.io/wait-for-properties: '<jsonpath>=<value>,<jsonpath>=<value>'`

When this annotation is present on a resource, KOTS waits for one or more specified resource properties to match the desired values before continuing to deploy other resources. The value for this annotation is a comma-separated list of key-value pairs, where the key is a JSONPath specifying the path to the property and the value is the desired value for the property.

This annotation can be useful when waiting for a custom resource to exist is not sufficient. This annotation lets you define what _ready_ means.

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

