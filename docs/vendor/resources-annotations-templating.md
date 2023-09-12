# Templating Annotations

This topic describes how to use Replicated template functions and the `kots.io/placeholder` annotation to template resource annotations based on user-supplied values.

## Overview

You can configure the Replicated admin console **Config** page to allow users to provide custom annotations for resources deployed by your application. You can then template resource annotations based on these user-supplied values. One common use case for templating annotations is to allow users to provide custom annotations for their desired ingress controller, as shown in the image below:

![Config page with custom annotations in a Ingress Annotations field](/images/config-map-annotations.png)

[View a larger version of this image](/images/config-map-annotations.png)

For more information about collecting user-supplied values from the **Config** page, see [Creating and Editing Configuration Fields](/vendor/admin-console-customize-config-screen).

To template annotations in resources deployed by your application, you can include the `kots.io/placeholder` annotation on the resource. The `kots.io/placeholder` annotation allows you to template logic without breaking the base YAML or needing to include the annotation key.

## Inject User-Supplied Annotations

To map user-supplied annotations to resources deployed by your application, you can use the Replicated ConfigOption template function in the target resource.

### User-Supplied Key and Value

In the following example, the ConfigOption 

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

### User-Supplied Value Only

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "enable_ingress" "1" }}repl{{ printf "my.custom/annotation.ingress.hostname: %s" (ConfigOption "ingress_hostname") | nindent 4 }}repl{{end}}
```

### Multiple Annotations

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

### Multiple Annotations from Single Configuration Field

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