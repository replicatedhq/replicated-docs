# Templating Resource Annotations

This topic describes how to use Replicated template functions to template resource annotations based on user-supplied values.

## Overview

You can configure the Replicated admin console **Config** page to allow your users to provide custom annotations for resources deployed by your application. You can then use the Replicated ConfigOption template function to update the annotations in the resources based on the user-supplied values. 

One common use case for templating resource annotations is to allow users to provide custom Ingress annotations for a user-provided ingress controller.

KOTS uses placeholder annotations as a way to use template logic to specify optional annotations without breaking the base YAML or needing to always include the annotation key.

`kots.io/placeholder '<bool>' '<string>'`

## Map Annotations from the Config Page

A config option value can be used as part of the annotation value, for example:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{if ConfigOptionEquals "custom_annotation" "1" }}repl{{ ConfigOption "annotation_class") | nindent 4 }}repl{{end}}
```

The Config custom resource [textarea](/reference/custom-resource-config#textarea) item type supports multi-line text input. From a single `textarea` item, you can collect and map multiple annotations to a resource.

For example, the following Config custom resource includes an item named `ingress_annotations` to collect custom annotations for a user-supplied ingress controller:

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-example
spec:
  groups:
  - name: ingress_settings
    title: Ingress Settings
    description: Configure Ingress
    items:
    - name: ingress_type
      title: Ingress Type
      help_text: | 
        Select how traffic will ingress to the appliction.
      type: select_one
      items:
      - name: ingress_controller
        title: Ingress Controller
      - name: load_balancer
        title: Load Balancer
      default: "ingress_controller"
      required: true
      when: 'repl{{ not IsKurl }}'
    - name: ingress_host
      title:Hostname
      help_text: Hostnameused to access the application
      type: text
      default: "hostname.example.com"
      required: true
      when: 'repl{{ ConfigOptionEquals "ingress_type" "ingress_controller" }'
    - name: ingress_annotations
      type: textarea
      title: Ingress Annotations
      help_text: See your ingress controller’s documentation for the required annotations.
      when: 'repl{{ ConfigOptionEquals "ingress_type" "ingress_controller" }}'
      ...
```

The user can provide one or more custom annotations in the `ingress_annotations` field from the admin console **Config** page, as shown in the image below:

![Config page with example custom annotations in a Ingress Annotations field](/images/config-map-annotations.png)

[View a larger version of this image](/images/config-map-annotations.png)

To map the user-supplied annotations, you can use the ConfigOption template function in the target resource:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
  labels:
    app: nginx
  annotations:
    kots.io/placeholder: |-
      repl{{ ConfigOption "ingress_annotations" | nindent 4 }}
spec:
  type: ClusterIP
  ports:
    - port: 80
  selector:
    app: nginx
```

Using the same placeholder annotation, you can also specify annotations from multiple configuration items:

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

### Use Conditional Statements

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

