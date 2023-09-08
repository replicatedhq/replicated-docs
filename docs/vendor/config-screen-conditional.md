# Using Conditional Statements in Configuration Fields

This topic describes how to use Replicated template functions in the Config custom resource to conditionally show or hide configuration options for your application on the Replicated admin console **Config** page.

## Overview

The `when` property in the Config custom resource denotes configuration fields that are displayed on the admin console **Config** page only when a condition evaluates to true. When the condition evaluates to false, the field is not displayed. 

It can be useful to show or hide fields on the **Config** page so that your users are only provided the options that are relevant to them. This helps to reduce user error when configuring the application.

You can show or hide configuration fields based on the user's environment, license entitlements, and preferences. For example, fields can be shown or hidden based on:
* The Kubernetes distribution of the cluster
* If the license includes a specific feature entitlement
* The number of users that the license permits
* If the user chooses to bring their own external database, rather than using an embedded database offered with the application

For more information about the `when` property of the Config custom resource, see [when](/reference/custom-resource-config#when) in _Config_.

## Types of Conditional Statements

This section includes examples of common types of conditional statements that you can add to the `when` property to show or hide configuration fields. The examples in this section use Replicated template functions and Go functions to construct conditional statements. 

For more information about Replicated template functions, including a full list of available template functions, see [About Template Functions](/reference/template-functions-about). For more information about the syntax of Go template functions, see the [Go documentation](https://pkg.go.dev/text/template).

### Kubernetes Distributions

The Distribution template function returns the Kubernetes distribution of the cluster where KOTS is running, such as GKE, OpenShift, or EKS. The IsKurl template function evaluates to true if the cluster was provisioned using Replicated kURL. It can be useful to show or hide fields related to the distribution of the user's cluster because different distributions often have unique configuration requirements.

#### IsKurl Template Function

The following example shows an ingress configuration field that displays on the **Config** page only when the cluster is _not_ provisioned by kURL. For kURL clusters, the user is _not_ shown the ingress configuration options and the cluster uses the ingress controller specified in the Kubernetes installer manifest.  

For more information, see [IsKurl](/reference/template-functions-static-context#iskurl) in _Static Context_.

```yaml
# Config custom resource
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-sample
spec:
  groups:
  - name: ingress_settings
    title: Ingress Settings
    description: Configure Ingress
    items:
    - name: ingress_type
      title: Ingress Type
      help_text: | 
        Select how traffic will ingress to the appliction. The Ingress Controller option will create an Ingress object, 
        and Load Balancer will configure the applicaiton's Kubernetes service to be of type LoadBalancer.
      type: select_one
      items:
      - name: ingress_controller
        title: Ingress Controller
      - name: load_balancer
        title: Load Balancer
      default: "ingress_controller"
      required: true
      # display the field only if KOTS is not running in a kURL cluster
      when: 'repl{{ not IsKurl }}'
      ...
```

#### Distribution Template Function

The following example shows conditional statements that use the Distribution template function to show or hide fields based on the distribution of the cluster.

For more information, including the possible return values of the Distribution template function, see [Distribution](/reference/template-functions-static-context#distribution) in _Static Context_.

```yaml
# Config custom resource
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-sample
spec:
  groups:
    - name: example_settings
      title: My Example Config
      description: Example fields for using Distribution template function
      items:
      - name: gke-description
        type: label
        title: "You are deploying to GKE"
        when: 'repl{{ eq Distribution "gke" }}'
      - name: kurl-description
        type: label
        title: "You are deploying to kURL"
        when: 'repl{{ eq Distribution "kurl" }}'
      - name: eks-description
        type: label
        title: "You are deploying to EKS"
        when: 'repl{{ eq Distribution "eks" }}'
      ...
```

![Config page with the text "You are deploying to GKE"](/images/config-example-distribution-gke.png)

### License Fields

You can conditionally show and hide options on the **Config** screen for users depending on the values of fields in the customer's license file.

The equality check in the conditional statement must match exactly, without quotes.

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-sample
spec:
  groups:
    - name: example_settings
      title: My Example Config
      description: Example fields for using LicenseFieldValue template function
      items:
      - name: new-feature
        type: label
        title: "You have the new feature entitlement"
        when: '{{repl (LicenseFieldValue "newFeature") }}'
```

The following example shows 

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
      title: Less Than 101 Seats
      type: text
      when: '{{repl lt (LicenseFieldValue "numSeats") "101" }}'
    - name: large
      title: Greater Than 100 Seats
      type: text
      when: '{{repl gt (LicenseFieldValue "numSeats") "100" }}'
```

### User Selections

The ConfigOptionEquals template function evaluates to true when the specified configuration option value is equal to the value that the user selects. This is useful when you want to show or hide a field or a group of fields based on a selection that the user makes. 

In the following example, the user can select the external or embedded database option. shows configuration fields that display on the **Config** page only when the user 

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-sample
spec:
  groups:  
  - name: database_settings_group
    title: Database Settings
    items:
    - name: db_type
      title: Database Type
      type: select_one
      default: external
      items:
      - name: external
        title: External Database
      - name: embedded
        title: Embedded Database
    - name: database_host
      title: Database Hostname
      type: text
      when: '{{repl (ConfigOptionEquals "db_type" "external")}}'
    - name: database_password
      title: Database Password
      type: password
      when: '{{repl (ConfigOptionEquals "db_type" "external")}}'
```

## Use Multiple Conditions

You can combine different types of template functions in the `when` property to create more complex conditional statements. 

The following example shows how to combine a conditional statement that uses the IsKurl template function with a second conditional statement that uses the ConfigOptionEquals template function.

```yaml
# Config custom resource
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-sample
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
    - name: determined_ingress_tls_type
      title: Determined Ingress TLS Type
      type: select_one
      items:
      - name: self_signed
        title: Self Signed (Generate Self Signed Certificate)
      - name: user_provided
        title: User Provided (Upload a TLS Certificate and Key Pair)
      required: true
      default: self_signed
      when: 'repl{{ and (not IsKurl) (ConfigOptionEquals "determined_ingress_type" "ingress_controller") }}'
    - name: determined_ingress_tls_cert
      title: Determined TLS Cert
      type: file
      when: '{{repl and (ConfigOptionEquals "determined_ingress_type" "ingress_controller") (ConfigOptionEquals "determined_ingress_tls_type" "user_provided") }}'
      required: true
    - name: determined_ingress_tls_key
      title: Determined TLS Key
      type: file
      when: '{{repl and (ConfigOptionEquals "determined_ingress_type" "ingress_controller") (ConfigOptionEquals "determined_ingress_tls_type" "user_provided") }}'
      required: true
    - name: determined_load_balancer_port
      title: Load Balancer Port
      help_text: Port which will be used to access Determined via the Load Balancer
      type: text
      default: "443"
      required: true
      when: 'repl{{ and (not IsKurl) (ConfigOptionEquals "determined_ingress_type" "load_balancer") }}'
    - name: determined_load_balancer_annotations
      type: textarea
      title: Load Balancer Annotations
      help_text: See your cloud provider’s documentation for the required annotations.
      when: 'repl{{ and (not IsKurl) (ConfigOptionEquals "determined_ingress_type" "load_balancer") }}'
```