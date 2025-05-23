# About Template Functions

This topic describes Replicated KOTS template functions, including information about use cases, template function contexts, syntax.

## Overview

For Kubernetes manifest files for applications deployed by Replicated KOTS, Replicated provides a set of custom template functions based on the Go text/template library. 

Common use cases for KOTS template functions include rendering values during installation or upgrade, such as:
* Customer-specific license field values
* User-provided configuration values
* Information about the customer environment, such the number of nodes or the Kubernetes version in the cluster where the application is installed
* Random strings

KOTS template functions can also be used to work with integer, boolean, float, and string values, such as doing mathematical operations, trimming leading and trailing spaces, or converting string values to integers or booleans.

All functionality of the Go templating language, including if statements, loops, and variables, is supported with KOTS template functions. For more information about the Go library, see [text/template](https://golang.org/pkg/text/template/) in the Go documentation.

### Supported File Types

You can use KOTS template functions in Kubernetes manifest files for applications deployed by KOTS, such as:
* Custom resources in the `kots.io` API group like Application, Config, or HelmChart
* Custom resources in other API groups like Preflight, SupportBundle, or Backup
* Kubernetes objects like Deployments, Services, Secrets, or ConfigMaps
* Kubernetes Operators

### Limitations

* Not all fields in the Config and Application custom resources support templating. For more information, see [Application](/reference/custom-resource-application) and [Item Properties](/reference/custom-resource-config#item-properties) in _Config_.

* Templating is not supported in the [Embedded Cluster Config](/reference/embedded-config) resource.

* KOTS template functions are not directly supported in Helm charts. For more information, see [Helm Charts](#helm-charts) below.

### Helm Charts

KOTS template functions are _not_ directly supported in Helm charts. However, the HelmChart custom resource provides a way to map values rendered by KOTS template functions to Helm chart values. This allows you to use KOTS template functions with Helm charts without making changes to those Helm charts.

For information about how to map values from the HelmChart custom resource to Helm chart `values.yaml` files, see [Setting Helm Chart Values with KOTS](/vendor/helm-optional-value-keys).

### Template Function Rendering

During application installation and upgrade, KOTS templates all Kubernetes manifest files in a release (except for the Config custom resource) at the same time during a single process.

For the [Config](/reference/custom-resource-config) custom resource, KOTS templates each item separately so that config items can be used in templates for other items. For examples of this, see [Using Conditional Statements in Configuration Fields](/vendor/config-screen-conditional) and [Template Function Examples](/reference/template-functions-examples).

## Syntax {#syntax}

The KOTS template function syntax supports the following functionally equivalent delimiters:
* [`repl{{ ... }}`](#syntax-integer)
* [`{{repl ... }}`](#syntax-string)

### Syntax Requirements

KOTS template function syntax has the following requirements:
* In both the `repl{{ ... }}` and `{{repl ... }}` syntaxes, there must be no whitespace between `repl` and the `{{` delimiter.
* The manifests where KOTS template functions are used must be valid YAML. This is because the YAML manifests are linted before KOTS template functions are rendered.

### `repl{{ ... }}` {#syntax-integer}

This syntax is recommended for most use cases.

Any quotation marks wrapped around this syntax are stripped during rendering. If you need the rendered value to be quoted, you can pipe into quote (`| quote`) or use the [`{{repl ... }}`](#syntax-string) syntax instead.

#### Integer Example

```yaml
http:
  port: repl{{ ConfigOption "load_balancer_port" }}
```
```yaml
http:
  port: 8888
```  

#### Example with `| quote`

```yaml
customTag: repl{{ ConfigOption "tag" | quote }}
```
```yaml
customTag: 'key: value'
```

#### If-Else Example

```yaml
http:
  port: repl{{ if ConfigOptionEquals "ingress_type" "load_balancer" }}repl{{ ConfigOption "load_balancer_port" }}repl{{ else }}8081repl{{ end }}
```
```yaml
http:
  port: 8081
```

For more examples, see [Template Function Examples](/reference/template-functions-examples).

### `{{repl ... }}` {#syntax-string}

This syntax can be useful when having the delimiters outside the template function improves readability of the YAML, such as in multi-line statements or if-else statements.

To use this syntax at the beginning of a value in YAML, it _must_ be wrapped in quotes because you cannot start a YAML value with the `{` character and manifests consumed by KOTS must be valid YAML. When this syntax is wrapped in quotes, the rendered value is also wrapped in quotes.

#### Example With Quotes

The following example is wrapped in quotes because it is used at the beginning of a statement in YAML:

```yaml
customTag: '{{repl ConfigOption "tag" }}'
```
```yaml
customTag: 'key: value'
```

#### If-Else Example
```yaml
my-service:
  type: '{{repl if ConfigOptionEquals "ingress_type" "load_balancer" }}LoadBalancer{{repl else }}ClusterIP{{repl end }}'
```
```yaml
my-service:
  type: 'LoadBalancer'
```

For more examples, see [Template Function Examples](/reference/template-functions-examples).

## Contexts {#contexts}

KOTS template functions are grouped into different contexts, depending on the phase of the application lifecycle when the function is available and the context of the data that is provided.

### Static Context

The context necessary to render the static template functions is always available.

The static context also includes the Masterminds Sprig function library. For more information, see [Sprig Function Documentation](http://masterminds.github.io/sprig/) on the sprig website.

For a list of all KOTS template functions available in the static context, see [Static Context](template-functions-static-context).

### Config Context

Template functions in the config context are available when rendering an application that includes the KOTS [Config](/reference/custom-resource-config) custom resource, which defines the KOTS Admin Console config screen. At execution time, template functions in the config context also can use the static context functions. For more information about configuring the Admin Console config screen, see [About the Configuration Screen](/vendor/config-screen-about).

For a list of all KOTS template functions available in the config context, see [Config Context](template-functions-config-context).

### License Context

Template functions in the license context have access to customer license and version data. For more information about managing customer licenses, see [About Customers and Licensing](/vendor/licenses-about).

For a list of all KOTS template functions available in the license context, see [License Context](template-functions-license-context).

### kURL Context

:::note
Replicated kURL is available only for existing customers. If you are not an existing kURL user, use Replicated Embedded Cluster instead. For more information, see [Use Embedded Cluster](/vendor/embedded-overview).

kURL is a Generally Available (GA) product for existing customers. For more information about the Replicated product lifecycle phases, see [Support Lifecycle Policy](/vendor/policies-support-lifecycle).
:::

Template functions in the kURL context have access to information about applications installed with Replicated kURL. For more information about kURL, see [Introduction to kURL](/vendor/kurl-about).

For a list of all KOTS template functions available in the kURL context, see [kURL Context](template-functions-kurl-context).

### Identity Context

:::note
The KOTS identity service feature is deprecated and is not available to new users.
:::

Template functions in the Identity context have access to Replicated KOTS identity service information.

For a list of all KOTS template functions available in the identity context, see [Identity Context](template-functions-identity-context).