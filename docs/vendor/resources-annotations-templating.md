# Templating Annotations

This topic describes how to use Replicated template functions to template annotations for resources and objects based on user-supplied values.

## Overview

It is common for users to need to set custom annotations on a resource or object deployed by your application. For example, you might need to allow your users to provide annotations to apply to a Service or Ingress object in public cloud environments.

For applications installed with Replicated KOTS, you can apply user-supplied annotations to resources or objects by first adding a field to the Replicated admin console **Config** page where users can enter one or more annotations. For information about how to add fields on the **Config** page, see [Creating and Editing Configuration Fields](/vendor/admin-console-customize-config-screen).

The following shows an example of a **Config** page that includes an **Ingress Annotations** field to collect user-supplied annotations for an ingress controller:

![Config page with custom annotations in a Ingress Annotations field](/images/config-map-annotations.png)

[View a larger version of this image](/images/config-map-annotations.png)

You can then map these user-supplied values from the **Config** page to resources and objects in your release using Replicated template functions. Replicated template functions are a set of custom template functions based on the Go text/template library that can be used to generate values specific to customer environments. The template functions in the Config context return user-supplied values on the **Config** page.

For more information about Replicated template functions in the Config text, see [Config Context](/reference/template-functions-config-context). For more information about the Go library, see [text/template](https://pkg.go.dev/text/template) in the Go documentation.

## About `kots.io/placeholder`

For applications installed with KOTS that use standard Kubernetes manifests, the `kots.io/placeholder` annotation allows you to template annotations in resources and objects without breaking the base YAML or needing to include the annotation key.

The `kots.io/placeholder` annotation uses the format `kots.io/placeholder 'bool' 'string'`. For example:

```yaml
# Application manifest file
...
  kots.io/placeholder: |-
    repl{{ ConfigOption "additional_annotations" | nindent 4 }}
```

For Helm chart-based applications installed with KOTS, Replicated recommends that you map user-supplied annotations to the Helm chart `values.yaml` file, rather than using `kots.io/placeholder`. This allows you to access user-supplied values in your Helm chart without needing to include Replicated template functions directly in the Helm chart templates.

## Annotation Templating Examples

This section includes common examples of mapping user-supplied annotations. It includes examples for mapping user-supplied annotations to standard manifest files and to Helm chart `values.yaml` files.

For additional examples of how to map values to Helm chart-based applications, see [Applications](https://github.com/replicatedhq/platform-examples/tree/main/applications) in the platform-examples repository in GitHub.

### Map User-Supplied Annotations to Helm Chart Values

This example demonstrates how to map user-supplied annotations from the **Config** page to a Helm chart `values.yaml `file. For information about accessing values from a `values.yaml` file, see [Values Files](https://helm.sh/docs/chart_template_guide/values_files/) in the Helm documentation.

The following Replicated HelmChart custom resource uses a ConfigOption template function in `values.services.myservice.annotations` field to render the user-supplied value in the `additional_annotations` configuration field:

```yaml
# HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: myapp
spec:
  values:
    services:
      myservice:
        annotations: repl{{ ConfigOption "additional_annotations" | nindent 10 }}
```

The `values.services.myservice.annotations` field in the HelmChart custom resource corresponds to a `services.myservice.annotations` field in the `value.yaml` file, as shown in the example below:

```yaml
# Helm chart values.yaml

services:
  myservice:
    annotations: placeholdervalue
```

During installation, the ConfigOption template function in the `values.services.myservice.annotations` field renders the user-supplied values from the `additional_annotations` configuration field. Then, KOTS merges with the rendered `values.services.myservice.annotations` field with the corresponding field in the `values.yaml` in the chart archive.

```yaml
# Rendered Helm chart values.yaml

services:
  myservice:
    annotations:
      key1: value1
      key2: value2
      key3: value3
spec:    
...  
```

For more information about mapping values to a Helm chart `values.yaml` file, see [Map Values to a Helm Chart](/vendor/config-screen-map-inputs#map-values-to-a-helm-chart) in _Mapping User-Supplied Values_.

### Map Multiple Annotations from a Single Configuration Field

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
    description: Configure Ingress
    items:
    - name: ingress_annotations
      type: textarea
      title: Ingress Annotations
      help_text: See your cloud provider’s documentation for the required annotations.
```

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{ ConfigOption "additional_annotations" | nindent 4 }}
```

```yaml
# Rendered Ingress object
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      key1: value1
      key2: value2
```

### Map Annotations from Multiple Configuration Fields

You can template user-supplied annotations from more than one configuration item.

For example, the following Ingress object includes ConfigOption template functions that render the user-supplied values for the `ingress_annotation` and `ingress_hostname` fields: 

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
```yaml
# Rendered Ingress object

apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      key1: value1
      my.custom/annotation.ingress.hostname: example.hostname.com
```

### Template Annotation Key and Map User-Supplied Value

It can be useful to map only a user-supplied value to an annotation rather than mapping a key value pair when you have a specific key that you want to use for the annotation.

For example, in the following Ingress object, `my.custom/annotation.ingress.hostname` is rendered as the key for the templated annotation and the user-supplied value for the `ingress_hostname` field on the **Config** page is rendered as the value:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{ printf "my.custom/annotation.ingress.hostname: %s" (ConfigOption "ingress_hostname") | nindent 4 }}
```

```yaml
# Rendered Ingress object

apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      my.custom/annotation.ingress.hostname: example.hostname.com
```

### Include Conditional Statements in Templated Annotations

You can include or exclude annotations from a resource or object based on a conditional statement. This is useful for ensuring that an annotation is only applied to resource or object when required.

For example, the following Ingress object includes an `annotations` field with the `kots.io/placeholder` annotation that renders `my.custom/annotation.class: somevalue` if the user enables a `custom_annotation` field on the **Config** page:

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

Alternatively, if the condition evaluates to false, the annotation does not appear in the rendered YAML:

```yaml
apiVersion: v1
kind: Ingress
metadata:
  name: myapp
  labels:
    app: myapp
  annotations:
    kots.io/placeholder: |-
spec:    
...  
```