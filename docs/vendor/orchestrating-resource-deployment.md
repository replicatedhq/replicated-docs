# Orchestrating Resource Deployment

Often, vendors need a way to control the manner in which Kubernetes resources are deployed. For example, some applications require that certain resources are deployed and in a ready state before other resources can be deployed.

To give the vendor more control over the deployment of Kubernetes resources, the app manager uses [annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) to allow for more fine-grained control over the order in which resources are deployed.

## App Manager Annotations

### Deployment Phases

#### Please Note

If a creation or deletion phase is not specified for a resource, it will be created or deleted as part of the default phase `'0'`. Phases can be any positive or negative integer ranging from `'-9999'` to `'9999'`.

`kots.io/creation-phase: '<integer>'`

When this annotation is present on a resource, the app manager will group the resource into the specified creation phase. The app manager deploys resources from each phase in order from lowest to highest.

`kots.io/deletion-phase: '<integer>'`

When this annotation is present on a resource, the app manager will group the resource into the specified deletion phase. The app manager deletes resources from each phase in order from lowest to highest.

**NOTE**: Kubernetes annotations cannot be integers and must be strings, so make sure to quote this.

#### Example

The following example will deploy the `CustomResourceDefinition` before the default creation phase and will delete it after the default deletion phase.

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

`kots.io/wait-for-ready: '<bool>'`

When this annotation is present on a resource and evaluates to `'true'`, the app manager will wait for the resource to be in a ready state before deploying any other resources. This leverages the same logic as application [status informers](/vendor/admin-console-display-app-status#about-status-informers) to determine if a resource is ready. If there is no existing status informer for a given resource type, the app manager will wait until the resource exists and is queryable from the Kubernetes API server.

**NOTE**: Kubernetes annotations cannot be booleans and must be strings, so make sure to quote this.

#### Example

The following example will cause the app manager to wait for the postgres `StatefulSet` to be ready before continuing to deploy other resources.

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

`kots.io/wait-for-properties: '<jsonpath>=<value>,<jsonpath>=<value>'`

When this annotation is present on a resource, the app manager will wait for one or more specified resource properties to match the desired values before continuing to deploy other resources. The value for this annotation is a comma-separated list of key-value pairs, where the key is a JSONPath specifying the path to the property and the value is the desired value for the property.

Use case: Waiting for a custom resource to exist is often not sufficient. This annotation allows the vendor to define what "ready" means.

#### Example

The following example will cause the app manager to wait for a custom resource to reach a desired state. In this case, it will wait until each of the three status properties have the desired values.

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

