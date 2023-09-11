# Templating Resource Annotations

This topic describes how to use Replicated template functions to template resource annotations based on user-supplied values.

## Overview

You can configure the Replicated admin console **Config** page to allow your users to provide custom annotations for resources deployed by your application. You can then use the Replicated ConfigOption template function to update the annotations in the resources based on the user-supplied values. 

One common use case for templating resource annotations is to allow users to provide custom Ingress annotations for a user-provided ingress controller.

KOTS uses placeholder annotations as a way to use template logic to specify optional annotations without breaking the base YAML or needing to always include the annotation key.

`kots.io/placeholder '<bool>' '<string>'`

## Map Annotations from the Config Page

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

## Map Multiple Annotations from a Single `textarea` Field

The [textarea](/reference/custom-resource-config#textarea) item type in the Config custom resource supports multi-line text input. 

You can map multiple annotations from a single `textarea` item as part of the annotation value in the resource.

**Example:**

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{ ConfigOption "additional_annotations" | nindent 4 }}
```

You can also specify multiple annotations using the same placeholder annotation:

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