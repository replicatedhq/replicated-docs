# Templating Annotations

This topic describes how to use Replicated template functions to template annotations for resources and objects based on user-supplied values.

## Overview

It is common to need your users to be able to set custom annotations or labels on a resource or object deployed by your application. For example, one use case is allowing users to provide annotations to apply to a Service or Ingress object in public cloud environments.

You can support this by adding a field to the Replicated admin console **Config** page where users enter the required annotations or labels. Then, you can use Replicated template functions to template annotations in the target resources or objects based on these user-supplied values.

The following shows an example of a **Config** page that includes a field to collect user-supplied annotations for an ingress controller:

![Config page with custom annotations in a Ingress Annotations field](/images/config-map-annotations.png)

[View a larger version of this image](/images/config-map-annotations.png)

For more information about configuring the fields on the **Config** page, see [Creating and Editing Configuration Fields](/vendor/admin-console-customize-config-screen).

## Map User-Supplied Annotations to Manifest Files

The `kots.io/placeholder` annotation allows you to template annotations in the resources deployed by your application without breaking the base YAML or needing to include the annotation key.

For information about how to use `kots.io/placeholder` with Replicated template functions to template annotations, see [Inject User-Supplied Annotations](#inject-user-supplied-annotations) and [Conditionally Include and Exclude Annotations](#conditionally-include-and-exclude-annotations) below.

### Inject User-Supplied Key and Value

In the following example, the ConfigOption template function

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

### Inject User-Supplied Value Only

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{ printf "my.custom/annotation.ingress.hostname: %s" (ConfigOption "ingress_hostname") | nindent 4 }}
```

### Inject Multiple Annotations

You can inject user-supplied annotations from more than one configuration item. In the example below, multiple user-supplied annotations are injected:

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

### Inject Multiple Annotations from Single Configuration Field

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

## Map User-Supplied Annotations to Helm Chart Values

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

## Conditionally Include and Exclude Annotations

You can use conditional statements with `kots.io/placeholder` to include or exclude optional annotations.

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

You can also combine conditional statements with the ConfigOption template function 

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ ConfigOption "annotation_class") | nindent 4 }}repl{{end}}
```