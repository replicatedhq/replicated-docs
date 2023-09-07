# Conditionally Displaying Configuration Fields

This topic provides information about how to use Replicated template functions in the Config custom resource to conditionally show or hide configuration options for your application on the Replicated admin console **Config** page.

## Overview

The `when` property in the Config custom resource denotes configuration fields that are only displayed on the admin console **Config** page when a condition evaluates to true. When the statement in the `when` property evaluates to false, the field is not displayed. 

It can be useful to show or hide fields on the **Config** page so that your users are only provided the options that are relevant to them. This improves the installation experience by helping to reduce user error when configuring the application. For example, you can show or hide fields based on conditions such as:
* If the license grants access to a specific feature
* The number of users that the license permits
* If the user chooses to bring their own external database, rather than using an embedded database offered with your application

For more information about the syntax and requirements for the `when` property, see [when](/reference/custom-resource-config#when) in _Config_.

## Common Types of Conditional Statements

This section includes examples of common types of conditional statements that you can add to the `when` property to show or hide configuration fields. See:
* [License Fields](#license-fields)
* [User Selections](#user-selections)
* [Kubernetes Distributions](#kubernetes-distributions)

The examples in this section use Replicated template functions and Go functions to construct conditional statements. For more information about Replicated template functions, including a full list of available tempalte functions, see [About Template Functions](/reference/template-functions-about). For more information about the syntax of Go template functions, see [Functions](https://pkg.go.dev/text/template#hdr-Functions) in the Go documentation.

### License Fields

You can conditionally show and hide options on the **Config** screen for users depending on the values of fields in the customer's license file.

The equality check in the conditional statement of the when property must match exactly, without quotes.

```yaml
- name: example_group
  title: Example Config
  items:
  - name: config_option
    title: Config Option
    type: text
  - name: conditional_option
    title: Conditional Option for 100 Seats
    type: text
    when: '{{repl (LicenseFieldValue "newFeature") }}'
```

You can conditionally display config options based on integer values  

```yaml
- name: example_group
  title: Example Config
  items:
  - name: config_option
    title: Config Option
    type: text
  - name: conditional_option
    title: Conditional Option for 100 Seats
    type: text
    when: '{{repl ge (LicenseFieldValue "numSeats") "100" }}'
```

### User Selections

If the user provides input on the Config page that makes a `when` property evaluate to true, then the Config page updates immediately to display the previously hidden group or item.

```yaml
- name: database_settings_group
  title: Database Settings
  items:
  - name: db_type
    title: Database Type
    type: select_one
    default: external
    items:
    - name: external
      title: External
    - name: embedded
      title: Embedded DB
  - name: database_host
    title: Database Hostname
    type: text
    when: '{{repl (ConfigOptionEquals "db_type" "external")}}'
  - name: database_password
    title: Database Password
    type: password
    when: '{{repl (ConfigOptionEquals "db_type" "external")}}'
```

### Kubernetes Distributions

The Distribution and IsKurl template functions return the Kubernetes distribution of the cluster where KOTS is running and if the cluster was provisioned using Replicated kURL. It can be useful to show or hide fields related to the distribution of the user's cluster For more information, see [Distribution](/reference/template-functions-static-context#distribution) and [IsKurl](/reference/template-functions-static-context#iskurl) in _Static Context_.

The following example shows a field for configuring ingress that only displays if the cluster is _not_ provisioned by kURL. In this case, it is useful to prevent the user from attempting to  

```yaml
# Config custom resource

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

```yaml
# Config custom resource

spec:
  groups:
  - name: distribution_example
    title: Distribution-Specific Settings
    description: Configure settings
    items:
    - name: openshift_item
      title: Example OpenShift item 
      help_text: | 
        Example
      type: text
      required: true
      # display the field only if the Kubernetes distribution is OpenShift
      when: '{{repl eq (Distribution "openshift") }}'
    - name: gke_item
      title: Example GKE item 
      help_text: | 
        Example
      type: text
      required: true
      # display the field only if the Kubernetes distribution is GKE
      when: '{{repl eq (Distribution "gke") }}'  
      ...
    - name: aws_item
      title: Example AWS item 
      help_text: | 
        Example
      type: text
      required: true
      # display the field only if the Kubernetes distribution is AWS
      when: '{{repl eq (Distribution "aws") }}'  
```


## Combine Multiple Conditional Statements

You can combine different types of conditional statements in the `when` property to 

The following example shows how to combine a conditional statement that uses the IsKurl template function with a second conditional statement that uses the ConfigOptionEquals template function.

```yaml
# Config custom resource

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

The following example shows a `when` statement that evaluates to true when _one_ of the following are true:
* The user selects "external" for the "db_type" configuration option
* The user selects "no" for the "somefeature" configuration option

```yaml
- name: database_password
   title: Database Password
   type: password
   when: '{{repl (or (ConfigOptionEquals "db_type" "external") (ConfigOptionEquals "somefeature" "no") ) }}'
```