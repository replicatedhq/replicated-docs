# Config Context

## ConfigOption

```go
func ConfigOption(optionName string) string
```

Returns the value of the config option as a string.

For information about the config screen and associated options, see [Config](custom-resource-config) in the _Custom Resources_ section.

```yaml
'{{repl ConfigOption "hostname" }}'
```

`ConfigOption` returns the base64 **encoded** value of the `file` config option.

```yaml
'{{repl ConfigOption "ssl_key"}}'
```

To use files in a Secret, use `ConfigOption`:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: tls-secret
type: kubernetes.io/tls
data:
  tls.crt: '{{repl ConfigOption "tls_certificate_file" }}'
  tls.key: '{{repl ConfigOption "tls_private_key_file" }}'
```

For more information about using TLS certificates, see [Using TLS Certificates](../vendor/packaging-using-tls-certs).

## ConfigOptionData

```go
func ConfigOptionData(optionName string) string
```

`ConfigOptionData` returns the base64 **decoded** value of a `file` config option.

```yaml
'{{repl ConfigOptionData "ssl_key"}}'
```

To use files in a ConfigMap, use `ConfigOptionData`:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: tls-config
data:
  tls.crt: |
    {{repl ConfigOptionData "tls_certificate_file" | nindent 4 }}

  tls.key: |
    {{repl ConfigOptionData "tls_private_key_file" | nindent 4 }}
```

## ConfigOptionFilename

```go
func ConfigOptionFilename(optionName string) string
```

`ConfigOptionFilename` returns the filename associated with a `file` config option.
It will return an empty string if used erroneously with other types.

```yaml
'{{repl ConfigOptionFilename "pom_file"}}'
```

As an example, if you have the following Config Spec defined:

```yaml
apiVersion: kots.io/v1beta1
kind: Config
metadata:
  name: my-application
spec:
  groups:
    - name: java_settings
      title: Java Settings
      description: Configures the Java Server build parameters
      items:
        - name: pom_file
          type: file
          required: true
```

You can use `ConfigOptionFilename` in a Pod Spec to mount a file like so:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: configmap-demo-pod
spec:
  containers:
    - name: some-java-app
      image: busybox
      command: ["bash"]
      args:
      - "-C"
      - "cat /config/{{repl ConfigOptionFilename pom_file}}"
      volumeMounts:
      - name: config
        mountPath: "/config"
        readOnly: true
  volumes:
    - name: config
      configMap:
        name: demo-configmap
        items:
        - key: repl{{ ConfigOptionFilename pom_file }}
          path: data_key_one
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo-configmap
data:
  data_key_one: repl{{ ConfigOption pom_file }}
```

## ConfigOptionEquals

```go
func ConfigOptionEquals(optionName string, expectedValue string) bool
```

Returns true if the configuration option value is equal to the supplied value.

```yaml
'{{repl ConfigOptionEquals "http_enabled" "1" }}'
```

## ConfigOptionNotEquals

```go
func ConfigOptionNotEquals(optionName string, expectedValue string) bool
```

Returns true if the configuration option value is not equal to the supplied value.

```yaml
'{{repl ConfigOptionNotEquals "http_enabled" "1" }}'
```

## LocalRegistryAddress

```go
func LocalRegistryAddress() string
```

Returns the local registry host or host/namespace that's configured.
This will always return everything before the image name and tag.

## LocalRegistryHost

```go
func LocalRegistryHost() string
```

Returns the local registry host that's configured.
This will include port if one is specified.

## LocalRegistryNamespace

```go
func LocalRegistryNamespace() string
```

Returns the local registry namespace that's configured.

## LocalImageName

```go
func LocalImageName(remoteImageName string) string
```

Given a `remoteImageName`, rewrite the `remoteImageName` so that it can be pulled to local hosts.

A common use case for the `LocalImageName` function is to ensure that a Kubernetes Operator can determine the names of container images on Pods created at runtime. For more information, see [Referencing Images](/vendor/operator-referencing-images) in the _Packaging a Kubernetes Operator Application_ section.

`LocalImageName` rewrites the `remoteImageName` in one of the following ways, depending on if a private registry is configured and if the image must be proxied:

* If there is a private registry configured in the customer's environment, such as in air gapped environments, rewrite `remoteImageName` to reference the private registry locally. For example, rewrite `elasticsearch:7.6.0` as `registry.somebigbank.com/my-app/elasticsearch:7.6.0`.

* If there is no private registry configured in the customer's environment, but the image must be proxied, rewrite `remoteImageName` so that the image can be pulled through the proxy service. For example, rewrite `"quay.io/orgname/private-image:v1.2.3"` as `proxy.replicated.com/proxy/app-name/quay.io/orgname/private-image:v1.2.3`.

* If there is no private registry configured in the customer's environment and the image does not need to be proxied, return `remoteImageName` without changes.

For more information about the Replicated registry proxy service, see [How the App Manager Accesses Private Images](/vendor/packaging-private-images#how-the-app-manager-accesses-private-images) in _Connecting to an Image Registry_.

## LocalRegistryImagePullSecret

```go
func LocalRegistryImagePullSecret() string
```

Returns the base64 encoded local registry image pull secret value.
This is often needed when an operator is deploying images to a namespace that is not managed by the Replicated app manager.
Image pull secrets must be present in the namespace of the pod.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-image-pull-secret
  namespace: my-namespace
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: '{{repl LocalRegistryImagePullSecret }}'
---
apiVersion: v1
kind: Pod
metadata:
  name: dynamic-pod
  namespace: my-namespace
spec:
  containers:
    - image: '{{repl LocalImageName "registry.replicated.com/my-app/my-image:abcdef" }}'
      name: my-container
  imagePullSecrets:
    - name: my-image-pull-secret
```

## ImagePullSecretName

```go
func ImagePullSecretName() string
```

Returns the name of the image pull secret that can be added to pod specs that use private images.
The secret will be automatically created in all application namespaces.
It will contain authentication information for any private registry used with the application.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  template:
    spec:
      imagePullSecrets:
      - name: repl{{ ImagePullSecretName }}
```

## HasLocalRegistry

```go
func HasLocalRegistry() bool
```

Returns true if the environment is configured to rewrite images to a local registry.
This is true for air gapped installations, and optionally true for online installations.

## Examples

This section includes examples for using template functions from the config context.

### Example: Using Variables to Generate TLS Certificates and Keys {#tls-cert-example}

For template functions that Replicated evaluates at the same time, you can assign the result returned by a template function to a variable in a manifest file, then use the variable in another template function.

Replicated evaluates and templates each item in the Config custom resource separately. Template functions in the Config custom resource do not have access to variables defined in other configuration fields.

As a workaround, you can create a configuration item with `hidden` set to `true` to evaluate complex templates and render the results.
Then, you can access the result using the [`ConfigOption`](#configoption) function.

The following Config custom resource example demonstrates how to generate a certificate authority (CA), a certificate, and a key using [Sprig](http://masterminds.github.io/sprig/) functions. It also shows how to use a hidden `tls_json` configuration field that contains all the generated values in JSON format, and then reference the `tls_json` field in other configuration fields.

**Warning**: Default values are treated as ephemeral. The following certificate chain is recalculated each time the application configuration is modified. Be sure that your application can handle updating these parameters dynamically.

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
