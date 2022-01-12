# Template functions

KOTS applications have access to a rich set of template functions that can be used to render the Kubernetes manifests in the customer's environment.

KOTS uses Go's [text/template](https://golang.org/pkg/text/template/) libraries as the basis for the templating. All functionality of Go's templating language can be used in conjuction with KOTS custom functions.

All template functions are documented in the [template function reference](template-functions-about) section.

## Using Template Functions

To use a template function, include it as a string in the application.
A simple example is using a boolean [custom entitlement field](licenses-adding-custom-fields) to deliver a value for Max Concurrent Users.
This value should be available as an environment variable in a pod.

Given the custom license field named `max_concurrent_users`, this value can be supplied to the pod environment variable like this:

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

### A note on `{{repl` vs `repl{{`

The template function syntax supports delimiters of either `{{repl ...}}` or `repl{{ ... }}`.
These are functionally equivalent and both are supported by the KOTS runtime.

However, `{{` is not a valid string beginning in YAML, so to use `{{repl` as the only part of a value, it's required that the YAML attribute be surrounded by quotes.
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

## Using Variables in Templates

A result returned from a template function can be assigned to a variable, and the variable can be used in another template function as long as the templates are evaluated at the same time.
All application YAML documents are templated in a single pass.

The application [Config file](custom-resource-config) is an exception.
Each config item is templated separately and has no access to variables created in other config items.
As a workaround, a hidden config item can be used to evaluate complex templates and render the results.
The result can be accessed using the [ConfigOption](template-functions-config-context#configoption) function.

### Generating TLS certs and keys example

This example demonstrates how to generate a CA, a cert, and a key using [Sprig](http://masterminds.github.io/sprig/) functions.
`tls_json` is the hidden config item that contains all of the generated values in JSON format.

*Prerequisites*
* This requires KOTS 1.26.0 or later.
* **Warning**: Default values are treated as ephemeral. The following certificate chain is recalculated each time the application configuration is modified. Be sure that your application can handle updating these parameters dynamically.

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: config-sample
spec:
  groups:
    - name: example_settings
      title: My Example Config
      items:
        - name: ingress_hostname
          title: Ingress Hostname
          help_text: Enter a DNS hostname to use as the cert's CN.
          type: text
        - name: tls_json
          title: TLS JSON
          type: textarea
          hidden: true
          default: |-
            repl{{ $ca := genCA (ConfigOption "ingress_hostname") 365 }}
            repl{{ $tls := dict "ca" $ca }}
            repl{{ $cert := genSignedCert (ConfigOption "ingress_hostname") (list ) (list (ConfigOption "ingress_hostname")) 365 $ca }}
            repl{{ $_ := set $tls "cert" $cert }}
            repl{{ toJson $tls }}
        - name: tls_ca
          title: Signing Authority
          type: textarea
          default: repl{{ fromJson (ConfigOption "tls_json") | dig "ca" "Cert" "" }}
        - name: tls_cert
          title: TLS Cert
          type: textarea
          default: repl{{ fromJson (ConfigOption "tls_json") | dig "cert" "Cert" "" }}
        - name: tls_key
          title: TLS Key
          type: textarea
          default: repl{{ fromJson (ConfigOption "tls_json") | dig "cert" "Key" "" }}
```
