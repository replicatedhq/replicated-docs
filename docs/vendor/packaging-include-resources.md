# Including Optional and Conditional Resources

This topic describes how to use Replicated KOTS annotations and Replicated template functions to include or exclude optional resources based on a conditional statement.

## About Including and Excluding Resources

Often, vendors need a way to optionally install resources depending on customers' configuration choices. A common example is giving the customer the choice to install a new database or use an existing database.

In this scenario, when a customer chooses to bring their own database, it is not desirable to deploy the optional database resources (StatefulSet, Service, etc.). This means that the customer-supplied configuration input values may result in optional Kubernetes manifests that should not be installed.

## KOTS Annotations

To support optional resource installation, KOTS uses annotations and template functions. For information about Kubernetes annotations, see [Annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/) in the Kubernetes documentation. For information about the Replicated template functions, see [About Template Functions](/reference/template-functions-about) in _Template Functions_.

You can use the KOTS `kots.io/exclude` and `kots.io/when` annotations to conditionally include or exclude resources.

By default, if neither `kots.io/exclude` nor `kots.io/when` is present on a resource, the resource is included.

Only one of the `kots.io/exclude` nor `kots.io/when` annotations can be present on a resource. If both are present, the `kots.io/exclude` annotation is applied, and the `kots.io/when` annotation is ignored.

### Exclude A Resource

`kots.io/exclude: '<bool>'`

When this annotation is present on a resource and evaluates to `'true'`, the resource will not be included in the `kustomization.yaml` file and will not be written to disk.

:::note
Kubernetes annotations cannot be booleans and must be strings, so make sure to quote this.
:::

#### Example

The following example does _not_ include the postgres `StatefulSet` if the user has _not_ selected the `install_postgres` checkbox.

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

When this annotation is present on a resource and evaluates to `'false'`, the resource is not included in the `kustomization.yaml` file and is not written to disk.

:::note
Kubernetes annotations cannot be booleans and must be strings, so make sure to quote this.
:::

#### Example

The following example _does_ include the postgres `StatefulSet` when the user has selected the `install_postgres` checkbox.

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


### Placeholder Annotation

`kots.io/placeholder '<bool>' '<string>'`

KOTS uses placeholder annotations as a way to use template logic to specify optional annotations without breaking the base YAML or needing to always include the annotation key.

One use case is providing custom Ingress annotations for a customer-provided Ingress controller.

Example:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ printf "my.custom/annotation.class: somevalue" | nindent 4 }}repl{{end}}
```

When the condition evaluates to `true`, it is replaced with the value of the desired annotation in the final rendered YAML:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
    my.custom/annotation.class: somevalue
```

When the condition evaluates to `false`, the annotation does not appear in the final rendered YAML:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
```

A config option value can be used as part of the annotation value, for example:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ printf "my.custom/annotation.class: %s" (ConfigOption "annotation_class") | nindent 4 }}repl{{end}}
```

You can specify multiple annotations using the same placeholder annotation:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ printf "my.custom/annotation.class: somevalue" | nindent 4 }}repl{{end}}
      repl{{if ConfigOptionEquals "enable_ingress" "1" }}repl{{ printf "my.custom/annotation.ingress.hostname: %s" (ConfigOption "ingress_hostname") | nindent 4 }}repl{{end}}
```

