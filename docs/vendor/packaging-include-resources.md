# Including Optional and Conditional Resources

Often, vendors need a way to optionally install resources depending on customers configuration choices. A common example is giving the customer the choice to install a new database or use an existing database.

In this scenario, when a customer chooses to bring their own database, it is not desirable to deploy the optional database resources (StatefulSet, Service, etc.). This means that the customer-supplied configuration input values may result in optional Kubernetes manifests that should not be installed.

To provide optional resource installation, the app manager uses [annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) and [template functions](../reference/template-functions-about) to conditionally include or exclude resources.

## App Manager Annotations

### Placeholder Annotation

`kots.io/placeholder '<bool>' '<string>'`

The app manager uses placeholder annotations as a way to provide an annotation that may not appear in the final rendered YAML.

Use case: Providing custom Ingress annotations for a customer-provided Ingress controller.

Example:

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ printf "my.custom/annotation.class: somevalue" | nindent 4 }}repl{{end}}
```

When the condition evaluates to `true`, it is replaced with the value of the desired annotation in the final rendered YAML:

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
    my.custom/annotation.class: somevalue
```

When the condition evaluates to `false`, the annotation does not appear in the final rendered YAML:

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
```

A config option value can be used as part of the annotation value, for example:

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ printf "my.custom/annotation.class: %s" (ConfigOption "annotation_class") | nindent 4 }}repl{{end}}
```

You can specify multiple annotations using the same placeholder annotation:

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ printf "my.custom/annotation.class: somevalue" | nindent 4 }}repl{{end}}
      repl{{if ConfigOptionEquals "enable_ingress" "1" }}repl{{ printf "my.custom/annotation.ingress.hostname: %s" (ConfigOption "ingress_hostname") | nindent 4 }}repl{{end}}
```

#### Please Note

By default, if neither `kots.io/exclude` nor `kots.io/when` annotations are present on a resource, the resource will be included.

Only one of the following annotations can be present on a resource. If both are present, the `kots.io/exclude` annotation will be applied, and the `kots.io/when` annotation will be ignored.

### Exclude A Resource

`kots.io/exclude: '<bool>'`

When this annotation is present on a resource and evaluates to `'true'`, the resource will not be included in the `kustomization.yaml` file and will not be written to disk.

**NOTE**: Kubernetes annotations cannot be booleans and must be strings, so make sure to quote this.

#### Example

The following example WILL NOT include the postgres `StatefulSet` when the user has not selected the `install_postgres` checkbox.

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

### Include A Resource
`kots.io/when: '<bool>'`

When this annotation is present on a resource and evaluates to `'false'`, the resource will not be included in the `kustomization.yaml` file and will not be written to disk.

**NOTE**: Kubernetes annotations cannot be booleans and must be strings, so make sure to quote this.

#### Example

The following example WILL include the postgres `StatefulSet` when the user has selected the `install_postgres` checkbox.

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
