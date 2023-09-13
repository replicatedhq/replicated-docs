# Templating Annotations

This topic describes how to use Replicated template functions to template annotations for resources and objects based on user-supplied values.

## Overview

It is common to need your users to be able to set custom annotations or labels on a resource or object deployed by your application. For example, one use case is allowing users to provide annotations to apply to a Service or Ingress object in public cloud environments.

You can support this by adding a field to the Replicated admin console **Config** page where users enter the required annotations or labels. Then, you can use Replicated template functions to template annotations in the target resources or objects based on these user-supplied values.

The following shows an example of a **Config** page that includes a field to collect user-supplied annotations for an ingress controller:

![Config page with custom annotations in a Ingress Annotations field](/images/config-map-annotations.png)

[View a larger version of this image](/images/config-map-annotations.png)

For more information about configuring the fields on the **Config** page, see [Creating and Editing Configuration Fields](/vendor/admin-console-customize-config-screen).

## Template Annotations in Manifest Files

The `kots.io/placeholder` annotation allows you to template annotations in the resources deployed by your application without breaking the base YAML or needing to include the annotation key.

This section includes examples of how to use the `kots.io/placeholder` annotation to template annotations in the manifest files in your releases.

```yaml
apiVersion: v1
kind: Ingress
metadata:
  name: myapp
  labels:
    app: myapp
  annotations:
    kots.io/placeholder: |-
      repl{{ ConfigOption "ingress_annotation" | nindent 4 }}
spec:      
...
```

When the application is deployed, the annotations in the resource is rendered with the user-supplied annotations from the corresponding field on the **Config** page. For example:

```yaml
apiVersion: v1
kind: Ingress
metadata:
  name: myapp
  labels:
    app: myapp
  annotations:
    key1: value1
    key2: value2
    key3: value3
spec:    
...  
```

## Template Annotations to Helm Chart Values

If you are deploying a Helm chart-based application with KOTS, you can map user-supplied values to the Helm chart `values.yaml` file using the Replicated HelmChart custom resource. 

For more information about mapping values from the HelmChart custom resource, see [values](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_.

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

### Conditionally Include and Exclude Annotations

You can use conditional statements to include or exclude optional annotations.

For example, the `kots.io/placeholder` field below includes a conditional statement that uses the ConfigOptionEquals template function to evaluate if a configuration field named `custom_annotation` is enabled:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ printf "my.custom/annotation.class: somevalue" | nindent 4 }}repl{{end}}
```

During installation, if the condition evaluates to true, it is replaced with the value of the desired annotation in the rendered YAML as shown below:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
    my.custom/annotation.class: somevalue
```

If the condition evaluates to false, the annotation does not appear in the final rendered YAML as shown below:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
```

You can also combine conditional statements with the ConfigOption template function:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ ConfigOption "annotation_class") | nindent 4 }}repl{{end}}
```