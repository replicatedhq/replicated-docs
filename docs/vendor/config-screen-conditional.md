# Conditionally Displaying Configuration Fields

This topic provides information about how to use the Replicated template functions in the Replicated Config custom resource to conditionally show or hide configuration options for your application.

## Overview

The `when` property in the Config custom resource denotes configuration options that are only displayed on the admin console **Config** page when a condition evaluates to true. When the statement in the `when` property for a configuration option evaluates to false, the option is not displayed.

It can be useful to show or hide configuration options for different types of users, such as:
* Users that have access to a specific entitlement or feature
* Enterprise users versus smaller teams
* Users who want to bring their own database versus using an embedded database option

Conditionally showing and hiding configuration options ensures that users are only shown configuration options that are relevant to them, which improves the user experience of configuring and deploying your application.

For more information about the `when` property, including syntax, requirements, and limitations, see [when](/reference/custom-resource-config#when) in _Config_.

For more information about Go syntax, see [Functions](https://pkg.go.dev/text/template#hdr-Functions) in the Go documentation.

## License Field Conditional Statements

You can conditionally show and hide options on the **Config** screen for users depending on the values of fields in the customer's license file.

### Match a Value

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

### Integers

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

## User Selection Conditional Statements

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

## Kubernetes Distribution Conditional Statements

The Distribution and IsKurl template functions return the Kubernetes distribution of the cluster where KOTS is running and if the cluster was provisioned using Replicated kURL.

For more information, see [Distribution](/reference/template-functions-static-context#distribution) and [IsKurl](/reference/template-functions-static-context#iskurl) in _Static Context_.

## Combine Multiple Conditional Statements

You can combine different types of conditional statements in the `when` property to 

### And

The following example shows how to combine a conditional statement that uses the IsKurl template function with a second conditional statement that uses the ConfigOptionEquals template function.

```yaml
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

### Or

The following example shows a `when` statement that evaluates to true when _one_ of the following are true:
* The user selects "external" for the "db_type" configuration option
* The user selects "no" for the "somefeature" configuration option

```yaml
- name: database_password
   title: Database Password
   type: password
   when: '{{repl (or (ConfigOptionEquals "db_type" "external") (ConfigOptionEquals "somefeature" "no") ) }}'
```