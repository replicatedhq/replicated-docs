# Including Optional and Conditional Resources

This topic describes how to use Replicated KOTS annotations and Replicated template functions to include or exclude optional resources based on a conditional statement.

## About Including and Excluding Resources

Often, vendors need a way to optionally install resources depending on users' configuration choices. A common example is giving the user the choice to use an external or an embedded database. In this scenario, when a user chooses to use their own external database, it is not desirable to deploy the embedded database resources (StatefulSet, Service, and so on).

To conditionally include or exclude optional resources, you can use the `kots.io/exclude` and `kots.io/when` annotations. Additionally, you can use Replicated template functions to create conditional statements .

For information about Replicated template functions, see [About Template Functions](/reference/template-functions-about) in _Template Functions_.

## Requirements

The `kots.io/exclude` nor `kots.io/when` annotations have the following requirements:

* By default, if neither `kots.io/exclude` nor `kots.io/when` is present on a resource, the resource is included.

* Only one of the `kots.io/exclude` nor `kots.io/when` annotations can be present on a single resource. If both are present, the `kots.io/exclude` annotation is applied, and the `kots.io/when` annotation is ignored.

* The `kots.io/exclude` nor `kots.io/when` annotations must be written in quotes (for example, `"kots.io/exclude":`). This is because Kubernetes annotations cannot be booleans and must be strings. For more information about Kubernetes annotations, see [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes documentation. 

## Conditionally Exclude A Resource

When the `kots.io/exclude: '<bool>'` annotation is present on a resource and evaluates to true, the resource is excluded from the deployment.

The following example excludes the postgres `StatefulSet` when the `install_postgres` checkbox is disabled:

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

## Conditionally Include A Resource

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