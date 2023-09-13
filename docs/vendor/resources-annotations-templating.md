# Templating Annotations

This topic describes how to use Replicated template functions to template annotations for resources and objects based on user-supplied values.

## Overview

It is common for your users to need to set custom annotations on a resource or object deployed by your application. For example, you might need to allow your users to provide annotations to apply to a Service or Ingress object in public cloud environments.

For applications installed with Replicated KOTS, you can apply user-supplied annotations to resources or objects by first adding a field to the Replicated admin console **Config** page where users can enter one or more annotations. For information about how to add fields on the **Config** page, see [Creating and Editing Configuration Fields](/vendor/admin-console-customize-config-screen).

The following shows an example of a **Config** page that includes an **Ingress Annotations** field to collect user-supplied annotations for an ingress controller:

![Config page with custom annotations in a Ingress Annotations field](/images/config-map-annotations.png)

[View a larger version of this image](/images/config-map-annotations.png)

You can then map these user-supplied values from the **Config** page to resources and objects in your release using Replicated template functions in the Config context.

Replicated template functions are a set of custom template functions based on the Go text/template library that can be used to generate values specific to customer environments. The template functions in the Config context return user-supplied values on the **Config** page.

For more information about Replicated template functions in the Config text, see [Config Context](/reference/template-functions-config-context). For more information about the Go library, see [text/template](https://pkg.go.dev/text/template) in the Go documentation.

### About `kots.io/placeholder` {#manifest}

For applications installed with KOTS that use standard Kubernetes manifests, the `kots.io/placeholder` annotation allows you to template annotations in resources and objects without breaking the base YAML or needing to include the annotation key.

:::note
For Helm chart-based applications installed with KOTS, Replicated recommends that you map user-supplied annotations to the Helm chart `values.yaml` file, rather than using `kots.io/placeholder`. This allows you to access user-supplied values in your Helm chart without needing to include Replicated template functions directly in the Helm chart templates.

For more information, see [About Mapping User-Supplied Annotations to Helm Charts](#helm) below.
:::

The `kots.io/placeholder` annotation uses the format `kots.io/placeholder 'bool' 'string'`. For example:

```yaml
# Application manifest file
...
  kots.io/placeholder: |-
    repl{{ ConfigOption "additional_annotations" | nindent 4 }}
```

For examples of how to use `kots.io/placeholder` with Replicated template functions to map user-supplied annotations to resources and objects, see [Examples](#examples) below.

### About Mapping User-Supplied Annotations to Helm Charts {#helm}

For Helm chart-based applications that are installed with KOTS, you can map user-supplied annotations to the Helm chart `values.yaml` file using the Replicated HelmChart custom resource. For more information about mapping values from the HelmChart custom resource, see [values](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_.

For example, 

```yaml
# Config custom resource

apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config
spec:
  groups:
  - name: ingress_settings
    title: Ingress Settings
    description: Configure Ingress for Determined
    items:
    - name: determined_load_balancer_annotations
      type: textarea
      title: Load Balancer Annotations
      help_text: See your cloud provider’s documentation for the required annotations.
      when: 'repl{{ and (not IsKurl) (ConfigOptionEquals "determined_ingress_type" "load_balancer") }}'
```

```yaml
# HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: myapp
spec:
  values:
    services:
      determined:
        enabled: true
        appName: ["myapp"]
        annotations: repl{{ ConfigOption "load_balancer_annotations" | nindent 10 }}
```

```yaml
# Helm chart values.yaml
services:
  determined:
    enabled: true
    appName: ["myapp"]
    annotations: placeholdervalue
```

When the application is deployed, the annotations are rendered with the user-supplied values:

```yaml
# Helm chart values.yaml
services:
  determined:
    enabled: true
    appName: ["myapp"]
    annotations:
      key1: value1
      key2: value2
      key3: value3
spec:    
...  
```

## Examples

This section includes common examples of mapping user-supplied annotations to both manifest files and to Helm chart `values.yaml` files.

For additional examples of mapping values to Helm chart-based applications, see [Applications](https://github.com/replicatedhq/platform-examples/tree/main/applications) in the platform-examples repository in GitHub.

### Map User-Supplied Key and Value

It can be useful to map both 

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{ ConfigOption "additional_annotations" | nindent 4 }}
```

### Map User-Supplied Value Only

It can be useful to map only a user-supplied value to an annotation rather than mapping a key value pair when you have a specific key that you want to use for the annotation.

In the following example, `my.custom/annotation.ingress.hostname` is rendered as the key for the annotation and the user-supplied value for the `ingress_hostname` field on the **Config** page is rendered as the value.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{ printf "my.custom/annotation.ingress.hostname: %s" (ConfigOption "ingress_hostname") | nindent 4 }}
```

### Map Values from Multiple Configuration Fields

You can template user-supplied annotations from more than one configuration item, as shown in the example below:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{ ConfigOption "ingress_annotation" | nindent 4 }}
      repl{{ printf "my.custom/annotation.ingress.hostname: %s" (ConfigOption "ingress_hostname") | nindent 4 }}
```

### Map Multiple Annotations from Single Configuration Field

The Config custom resource `textarea` item type supports multi-line text input. From a single `textarea` item, you can collect and map multiple annotations to a resource.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{ ConfigOption "additional_annotations" | nindent 4 }}
```

### Conditionally Include or Exclude Annotations

You can include or exclude annotations from a resource or object based on a conditional statement. This is useful for ensuring that an annotation is only applied to resource or object when required.

#### ConfigOptionEquals

The following Ingress object includes an `annotations` field with the `kots.io/placeholder` annotation that renders `my.custom/annotation.class: somevalue` if the user enables a `custom_annotation` field on the **Config** page:

```yaml
# Ingress object in the release

apiVersion: v1
kind: Ingress
metadata:
  name: myapp
  labels:
    app: myapp
annotations:
  kots.io/placeholder: |-
    repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ printf "my.custom/annotation.class: somevalue" | nindent 4 }}repl{{end}}
spec:
...    
```

If the user enables the `custom_annotation` configuration field, then the template function is rendered as shown below:

```yaml
# Rendered Ingress object

apiVersion: v1
kind: Ingress
metadata:
  name: myapp
  labels:
    app: myapp
  annotations:
    kots.io/placeholder: |-
    my.custom/annotation.class: somevalue
spec:    
...  
```

#### ConfigOptionEquals and ConfigOption

For example, the `kots.io/placeholder` field below includes a conditional statement that uses the ConfigOptionEquals template function to evaluate if a configuration field named `custom_annotation` is enabled:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ ConfigOption "annotation_class") | nindent 4 }}repl{{end}}
```

During installation, if the condition evaluates to true, it is replaced with the value of the user-supplied annotation in the rendered YAML, as shown below:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
    my.custom/annotation.class: somevalue
```

Alternatively, the condition evaluates to false, the annotation does not appear in the final rendered YAML:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
```