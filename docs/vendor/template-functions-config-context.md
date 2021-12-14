# Config context

## ConfigOption

```go
func ConfigOption(optionName string) string
```

Returns the value of the config option as a string.
The config screen and associated options are described [here](/reference/v1beta1/config).

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

Learn more about [using TLS certs](/vendor/packaging/using-tls-certs) in KOTS.

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

This is a wrapper around other functions.
Given a `remoteImageName` rewrite it so that it references the local registry.
If no local registry is set, the `remoteImageName` is returned.

## LocalRegistryImagePullSecret

```go
func LocalRegistryImagePullSecret() string
```

Returns the base64 encoded local registry image pull secret value.
This is often needed when an operator is deploying images to a namespace that is not managed by KOTS.
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
This will be true for airgapped installs, and optionally true for online installs.
