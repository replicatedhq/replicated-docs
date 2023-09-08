# Using Conditional Statements in Configuration Fields

This topic describes how to use Replicated template functions in the Config custom resource to conditionally show or hide configuration options for your application on the Replicated admin console **Config** page.

## Overview

The `when` property in the Config custom resource denotes configuration fields that are displayed on the admin console **Config** page only when a condition evaluates to true. When the condition evaluates to false, the field is not displayed. It can be useful to show or hide fields so that your users are only provided the options that are relevant to them. This helps to reduce user error when configuring your application.

You can show or hide configuration fields based on the user's environment, license entitlements, and preferences. For example, conditional statements in the `when` property can be used to evaluate:
* The Kubernetes distribution of the cluster
* If the license includes a specific feature entitlement
* The number of users that the license permits
* If the user chooses to bring their own external database, rather than using an embedded database offered with the application

You can construct conditional statements in the `when` property using Replicated template functions. Replicated template functions are a set of custom template functions based on the Go text/template library that can be used to generate values specific to customer environments. For more information about Replicated template functions, including a full list of available template functions, see [About Template Functions](/reference/template-functions-about).

For more information about the Config custom resource and the `when` property, see [when](/reference/custom-resource-config#when) in _Config_.

## Conditional Statement Examples

This section includes examples of common types of `when` property conditional statements that use Replicated template functions. 

### Cluster Distribution Check

The Distribution template function returns the Kubernetes distribution of the cluster where Replicated KOTS is running. It can be useful to show or hide fields depending on the distribution of the user's cluster because different distributions often have unique configuration requirements. For more information about the Distribution template function, see [Distribution](/reference/template-functions-static-context#distribution) in _Static Context_.

In the following example, the conditional statements in the `when` properties evaluate to true only when the distribution of the cluster matches the specified distribution:

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
      - name: gke_distribution
        type: label
        title: "You are deploying to GKE"
        when: 'repl{{ eq Distribution "gke" }}'
      - name: kurl_distribution
        type: label
        title: "You are deploying to kURL"
        when: 'repl{{ eq Distribution "kurl" }}'
      - name: eks_distribution
        type: label
        title: "You are deploying to EKS"
        when: 'repl{{ eq Distribution "eks" }}'
      ...
```

The following image shows how only the `gke_distribution` item is displayed on the **Config** page when KOTS is running in a GKE cluster:

![Config page with the text "You are deploying to GKE"](/images/config-example-distribution-gke.png)

[View a larger version of this image](/images/config-example-distribution-gke.png)

### kURL Cluster Check

The IsKurl template function evaluates to true if the cluster was provisioned by Replicated kURL. This allows you to show or hide fields depending on if the cluster was provisioned by kURL. For more information, see [IsKurl](/reference/template-functions-static-context#iskurl) in _Static Context_.

In the following example, the `when` property of the `not_kurl` group evaluates to true when the cluster is not provisioned by kURL:

```yaml
# Config custom resource
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-sample
spec:
  groups:
    - name: all_distributions
      title: Example Group
      description: This group always displays.
      items:
      - name: example_item
        title: This item always displays.
        type: text
    - name: not_kurl
      title: Non-kURL Cluster Group
      description: This group displays only if the cluster is not provisioned by kURL.
      when: 'repl{{ not IsKurl }}'
      items:
      - name: example_item_non_kurl
        title: The cluster is not provisioned by kURL.
        type: label
```

As shown in the image below, both the `all_distributions` and `non_kurl` groups are displayed on the **Config** page when KOTS is _not_ running in a kURL cluster:

![Config page displays both groups from the example](/images/config-example-iskurl-false.png)

[View a larger version of this image](/images/config-example-iskurl-false.png)

However, when KOTS is running in a kURL cluster, only `all_distributions` is displayed, as shown below:

![Config page displaying only the first group from the example](/images/config-example-iskurl-true.png)

[View a larger version of this image](/images/config-example-iskurl-true.png)

### License Field Value Equality Check

The LicenseFieldValue template function returns the value of a specified field from the license used to install. For more information, see [LicenseFieldValue](/reference/template-functions-license-context#licensefieldvalue) in _License Context_.

In the following example, the `when` property of the `new_feature` item evaluates to true only when the user's license contains a `newFeature` field that is set to `true`: 

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
      - name: new_feature
        type: label
        title: "You have the new feature entitlement"
        when: '{{repl (LicenseFieldValue "newFeature") }}'
```

As shown in the image below, the **Config** page displays the `new_feature` item when the user's license contains `newFeature: true`:

![Config page displaying the text "You have the new feature entitlement"](/images/config-example-newfeature.png)

[View a larger version of this image](/images/config-example-newfeature.png)

### License Field Value Integer Comparison

You can use the LicenseFieldValue template function to evaluate integer values from a license. 

The following example shows how to evaluate integer values from a license:

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

As shown in the image below, if the user's license contains `numSeats: 150`, then the `medium` item is displayed on the **Config** page:

![Config page displaying the Medium (101-1000 Seats) item](/images/config-example-numseats.png)

[View a larger version of this image](/images/config-example-numseats.png)

### User-Supplied Value Equality Check

The ConfigOptionEquals template function evaluates to true when the specified configuration option value is equal to the value that the user selects. This is useful when you want to show or hide a field or a group of fields based on a selection that the user makes. For more information, see [ConfigOptionEquals](/reference/template-functions-license-context#configoptionequals) in _Config Context_. 

In the following example, the user can select the external or embedded database option. The configuration fields relevant to each option are displayed only when the user selects the option:

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

## Include Multiple Conditions in the `when` Property

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

As shown in the image below, the configuration fields that are specific to the ingress controller options display only when the user selects the ingress controller option and KOTS is not running in a kURL cluster:

![Config page displaying the ingress controller options](/images/config-example-ingress-controller.png)

[View a larger version of this image](/images/config-example-ingress-controller.png)

Similarly, the options relevant to the load balancer option display when the user selects that option:

![Config page displaying the load balancer options](/images/config-example-ingress-load-balancer.png)

[View a larger version of this image](/images/config-example-ingress-load-balancer.png)