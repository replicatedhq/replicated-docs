# Examples

This topic provides examples of KOTS template function syntax for various common use cases.

## Compare Integer Values

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-sample
spec:
  groups:  
  - name: example_group
    title: Example Config
    items:
    - name: small
      title: Small (100 or Fewer Seats)
      type: text
      default: Default for small teams
      when: '{{repl le (atoi (LicenseFieldValue "numSeats")) 100 }}'
    - name: medium
      title: Medium (101-1000 Seats)
      type: text
      default: Default for medium teams
      when: '{{repl (and (ge (atoi (LicenseFieldValue "numSeats")) 101) (le (atoi (LicenseFieldValue "numSeats")) 1000)) }}'
    - name: large
      title: Large (More Than 1000 Seats)
      type: text
      default: Default for large teams
      when: '{{repl gt (atoi (LicenseFieldValue "numSeats")) 1000 }}'
```

## Conditional If Else Statements

Using if else statements with KOTS template functions is useful when you need different values to be rendered depending on a give condition. 

### Single Line

The following example shows if else statements used in the KOTS HelmChart custom resource `value` field to render different values depending on if the user selected a load balancer or ingress controller as their preferred ingress type for the application. 

```yaml
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: determined
spec:
  chart:
    name: determined
    chartVersion: 0.23.0
  values:
    services:
      determined:
        enabled: true
        appName: ["determined"]
        type: 'repl{{ if ConfigOptionEquals "determined_ingress_type" "load_balancer" }} LoadBalancer repl{{ else }}ClusterIP repl{{ end }}'
        annotations: repl{{ ConfigOption "determined_load_balancer_annotations" | nindent 10 }}
        ports:
          http:
            enabled: true
            port: repl{{ if ConfigOptionEquals "determined_ingress_type" "load_balancer" }} repl{{ ConfigOption "determined_load_balancer_port" }} repl{{ else }} 8081 repl{{ end }}
            protocol: HTTP
            targetPort: 8081
```

```yaml
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
    - name: determined_ingress_type
      title: Determined Ingress Type
      help_text: | 
        Select how traffic will ingress to the Determined appliction. The Ingress Controller option will create an Ingress object, 
        and Load Balancer will configure Determined's Kubernetes service to be of type LoadBalancer.
      type: select_one
      items:
      - name: ingress_controller
        title: Ingress Controller
      - name: load_balancer
        title: Load Balancer
      default: "ingress_controller"
      required: true
      when: 'repl{{ not IsKurl }}'
```

### Multi-Line

The following example demonstrates a multi-line if else statement that renders the hostname for a private image registry depending on if a local registry is used and if the local registry has a namespace.

Multi-line if else statements can be useful for longer or more complex if else statements, which are easier to read when split across multiple lines.


```yaml
replicated-sdk: >-
  {{repl if HasLocalRegistry -}}
    {{repl if LocalRegistryNamespace -}}
      {{repl LocalRegistryHost }}/{{repl LocalRegistryNamespace }}/replicated-sdk:v1.0.0-beta.12
    {{repl else -}}
      {{repl LocalRegistryHost }}/replicated-sdk:v1.0.0-beta.12
    {{repl end -}}
  {{repl else -}}
    docker.io/replicated/replicated-sdk:v1.0.0-beta.12
  {{repl end -}}
```   

## Conditional Statements with Ternary Operators

Ternary operators are useful for tempalting statements where different values should be rendered depending on a given condition. A common use case for this is when templating the hostnames and namespaces for local image registries based on user-supplied values. 

For example, if the user configured a local registry and used the namespace `example-namespace`, then the template function `'{{repl HasLocalRegistry | ternary LocalRegistryNamespace "my-org" }}/mariadb'` evaluates to `example-namespace/mariadb`. If the user did not configure a local registry, then the template function evaluates to `my-org/maridb`.

```yaml
# kots.io/v1beta2 HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  ...
  values:
    image:
      registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "proxy.replicated.com" }}'
      repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/my-app/quay.io/my-org" }}/nginx'
      tag: v1.0.1
```

The following examples shows a similar use case in which multiple ternary operators are used to render the hostname for a local registry depending if a local registry is used, and if a namespace was supplied for the local registry:

```yaml
{{repl LocalRegistryHost }}{{repl HasLocalRegistry | ternary ("/" + (LocalRegistryNamespace | default "")) "" }}{{repl HasLocalRegistry | ternary "" "/replicated" }}/replicated-sdk:v1.0.0-beta.12
```    

## Apply Indentation to Rendered Values

### kots.io/placeholder Annotations


```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-annotation
  annotations:
    kots.io/placeholder: |-
      repl{{ ConfigOption "ingress_annotation" | nindent 4 }}
```

### Custom Annotations for Resources Deployed with Helm

The following example shows a textarea input that allows a user to provide some custom Helm values.

```yaml
# KOTS HelmChart v2 custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: determined
spec:
  chart:
    name: determined
    chartVersion: 0.23.0
  values:
    ingresses:
      determined:
        enabled: repl{{ ConfigOptionEquals "determined_ingress_type" "ingress_controller" }}
        serviceName: determined
        annotations: repl{{ ConfigOption "determined_ingress_annotations" | nindent 10 }}
        hosts:
          - host: 'repl{{ ConfigOption "determined_ingress_host"}}'
            paths:
              - path: /
                pathType: Prefix
                service:
                  port: 8081
```

```yaml
# KOTS Config custom resource
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
    - name: determined_ingress_type
      title: Determined Ingress Type
      help_text: | 
        Select how traffic will ingress to the Determined appliction. The Ingress Controller option will create an Ingress object, 
        and Load Balancer will configure Determined's Kubernetes service to be of type LoadBalancer.
      type: select_one
      items:
      - name: ingress_controller
        title: Ingress Controller
      - name: load_balancer
        title: Load Balancer
      default: "ingress_controller"
      required: true
      when: 'repl{{ not IsKurl }}'
    - name: determined_ingress_host
      title: Determined Hostname
      help_text: Hostname which will be used to access Determined
      type: text
      default: "determined.example.com"
      required: true
      when: 'repl{{ and (not IsKurl) (ConfigOptionEquals "determined_ingress_type" "ingress_controller") }}'
    - name: determined_ingress_annotations
      type: textarea
      title: Ingress Annotations
      help_text: See your ingress controller’s documentation for the required annotations.
      when: 'repl{{ and (not IsKurl) (ConfigOptionEquals "determined_ingress_type" "ingress_controller") }}'
```

## Logical `and` Comparison

The following example shows how to create a conditional statement using a logical `and` operator that evaluates to true when two target config options are both enabled.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: test
data:
  option-1: '{{repl ConfigOptionEquals "option-1" "1"}}'
  option-2: '{{repl ConfigOptionEquals "option-2" "1"}}'
  when: '{{repl and (ConfigOptionEquals "option-1" "1") (ConfigOptionEquals "option-2" "1")}}'
```

```yaml
data:
  option-1: "true"
  license-field-1: "true"
  when: "true"
```

## Logical `and` Comparison with a Boolean Value

For more information about ParseBool, see [ParseBool](/reference/template-functions-static-context#parsebool).

The following example shows how to create a conditional statement using a logical `and` operator that evaluates to true when both the target license field value is present and the target config option is enabled.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: test
data:
  option-1: '{{repl ConfigOptionEquals "option-1" "0"}}'
  license-field-1: '{{repl LicenseFieldValue "license-field-1" }}'
  when: '{{repl and (LicenseFieldValue "license-field-1" | ParseBool) (ConfigOptionEquals "option-1" "0")}}'
```

```yaml
data:
  option-1: "true"
  license-field-1: "false"
  when: "false"
```

## Multi-Line Templating

```yaml
replicated-sdk: >-
  {{repl if HasLocalRegistry -}}
    {{repl if LocalRegistryNamespace -}}
      {{repl LocalRegistryHost }}/{{repl LocalRegistryNamespace }}/replicated-sdk:v1.0.0-beta.12
    {{repl else -}}
      {{repl LocalRegistryHost }}/replicated-sdk:v1.0.0-beta.12
    {{repl end -}}
  {{repl else -}}
    docker.io/replicated/replicated-sdk:v1.0.0-beta.12
  {{repl end -}}
``` 

## Print Formatted Data

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
      tls:
        enabled: repl{{ ConfigOptionEquals "determined_ingress_type" "ingress_controller" }}
        genSelfSignedCert: repl{{ ConfigOptionEquals "determined_ingress_tls_type" "self_signed" }}
        cert: repl{{ print `|`}}repl{{ ConfigOptionData `determined_ingress_tls_cert` | nindent 10 }}
        key: repl{{ print `|`}}repl{{ ConfigOptionData `determined_ingress_tls_key` | nindent 10 }}
```