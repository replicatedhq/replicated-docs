# About Template Functions

This topic describes Replicated template functions, including information about template function contexts, syntax, and examples.

## Overview of Template Functions

You can use Go template functions in your application manifest files to render the manifests in the customer environment. Replicated also provides a set of custom template functions based on the Go text/template library. You can use all functionality of Go templating language with the Replicated custom template functions. For more information, see [text/template](https://golang.org/pkg/text/template/) in the Go documentation.

Replicated template functions are grouped into different contexts, depending on the phase of the application lifecycle when the function is available and the context data that is provided. For more information, see [Replicated Template Function Contexts](#contexts) below.

Adding template functions to your application manifest file is often useful for generating values that are specific to the customer environment. For example, you use Replicated template functions to map the configuration options that users select on the admin console Configuration screen to fields in your application manifest files. Similarly, template functions can also return values with information about the customer environment, such the number of nodes detected in the Kubernetes cluster where the application is installed.

You can assign the result returned by a template function to a variable in a manifest file, then use the variable in another template function as long as the templates are evaluated at the same time. All manifest files for the application, except for the Config custom resource, are templated in a single pass.


## Template Function Syntax {#syntax}

You add template functions as Strings in the manifest files for your application.

The Replicated template function syntax supports the following functionally equivalent delimiters:

* ```yaml
  {{repl ...}}
  ```

  :::note
  `{{` is not a valid beginning to a string in YAML. To use this delimiter, you must wrap the template function in quotes. For example, `value: '{{repl LicenseFieldValue "max_concurrent_users"}}'`. When parsed, a template function wrapped in quotes renders a string. For example, `value: '100'`.
  :::

* `repl{{ ... }}`

For example:

```yaml
env:
  - name: MAX_CONCURRENT_USERS
    value: '{{repl LicenseFieldValue "max_concurrent_users"}}'
```

This solution is readable and works well for string values.
The surrounding `'` characters allow this to be parsed and will render as:

```yaml
env:
  - name: MAX_CONCURRENT_USERS
    value: '100'
```

But some Kubernetes API fields require integer values, not strings.
For example, replica count. **The following YAML is not valid**:

```yaml
replicas: '{{repl ConfigOption "replicas"}}'
```

This is invalid because it will render as:

```yaml
replicas: '5'
```

And the Kubernetes API will reject a string value in this position.

To solve this, reverse the delimiter in the template function and remove the surrounding quotes:

```yaml
replicas: repl{{ ConfigOption "replicas" }}
```

Because this doesn't have surrounding quotes and is valid YAML, this will render as:

```yaml
replicas: 5
```

And Kubernetes will be able to handle this.

## Replicated Template Function Contexts {#contexts}

Replicated template functions are grouped into different contexts, depending on the phase of the application lifecycle when the function is available and the context data that is provided.

## Static Context
Template functions in the static context can be used in any YAML, at any time.
The static context also includes the Masterminds Sprig function library. For more information, see [Sprig Function Documentation](http://masterminds.github.io/sprig/) on the sprig website.

For a list of all Replicated functions available in the static context, see [Static context](template-functions-static-context).

## Config Context
Template functions in the config context are available when rendering an application that has a config screen.
At execution time, template functions in this context also can use the static context functions.

For a list of all Replicated functions available in the config context, click see [Config context](template-functions-config-context).

## License Context
Template functions in the license context have access to license and version data.

For a list of all Replicated functions available in the license context, see [License context](template-functions-license-context).

## kURL Context
Template functions in the kURL context have access to information about applications installed on a cluster created by the Replicated Kubernetes installer.

For a list of all Replicated functions available in the kURL context, see [kURL context](template-functions-kurl-context).

## Identity Context
Template functions in the Identity context have access to Replicated identity service information.

For a list of all Replicated functions available in the identity context, see [Identity context](template-functions-identity-context).


## Template Function Examples

This section includes examples of how to use template functions in the manifest files for your application.

### Example: Use a Template Function for a Custom License Field

This example shows how to add a boolean [custom license field](licenses-adding-custom-fields) to deliver a value for Max Concurrent Users.

This value is available as an environment variable in a Pod.

Given the custom license field named `max_concurrent_users`, this value can be supplied to the Pod environment variable like this:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  selector:
    matchLabels:
      app: api
  template:
    spec:
      containers:
      - image: myapp/api:v1.0.1
        name: api
        env:
          - name: MAX_CONCURRENT_USERS
            value: 'repl{{ LicenseFieldValue "max_concurrent_users" }}'
```
