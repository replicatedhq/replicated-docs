import ConfigContext from "../partials/template-functions/_config-context.mdx"

# Config Context

<ConfigContext/>

## ConfigOption

```go
func ConfigOption(optionName string) string
```

Returns the value of the specified option from the KOTS Config custom resource as a string.

For the `file` config option type, `ConfigOption` returns the base64 encoded file. To return the decoded contents of a file, use [ConfigOptionData](#configoptiondata) instead.

```yaml
'{{repl ConfigOption "hostname" }}'
```

#### Example

The following KOTS [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the ConfigOption template function to set the port, node port, and annotations for a LoadBalancer service using the values supplied by the user on the KOTS Admin Console config screen. These values are then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# KOTS HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  values:
    myapp:
      service:
        type: LoadBalancer
        port: repl{{ ConfigOption "myapp_load_balancer_port"}}
        nodePort: repl{{ ConfigOption "myapp_load_balancer_node_port"}}
        annotations: repl{{ ConfigOption `myapp_load_balancer_annotations` | nindent 14 }}
```
For more information, see [Setting Helm Values with KOTS](/vendor/helm-optional-value-keys).

## ConfigOptionData

```go
func ConfigOptionData(optionName string) string
```

For the `file` config option type,  `ConfigOptionData` returns the base64 decoded contents of the file. To return the base64 encoded file, use [ConfigOption](#configoption) instead.

```yaml
'{{repl ConfigOptionData "ssl_key"}}'
```

#### Example

The following KOTS [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the ConfigOptionData template function to set the TLS cert and key using the files supplied by the user on the KOTS Admin Console config screen. These values are then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# KOTS HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  values:
    myapp:
      tls:
        enabled: true
        genSelfSignedCert: repl{{ ConfigOptionEquals "myapp_ingress_tls_type" "self_signed" }}
        cert: repl{{ print `|`}}repl{{ ConfigOptionData `tls_certificate_file` | nindent 12 }}
        key: repl{{ print `|`}}repl{{ ConfigOptionData `tls_private_key_file` | nindent 12 }}
```
For more information, see [Setting Helm Values with KOTS](/vendor/helm-optional-value-keys).

## ConfigOptionFilename

```go
func ConfigOptionFilename(optionName string) string
```

`ConfigOptionFilename` returns the filename associated with a `file` config option.
It will return an empty string if used erroneously with other types.

```yaml
'{{repl ConfigOptionFilename "pom_file"}}'
```

#### Example

For example, if you have the following KOTS Config defined:

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

The following example shows how to use `ConfigOptionFilename` in a Pod Spec to mount a file:

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
        - key: data_key_one
          path: repl{{ ConfigOptionFilename pom_file }}
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: demo-configmap
data:
  data_key_one: repl{{ ConfigOptionData pom_file }}
```

## ConfigOptionEquals

```go
func ConfigOptionEquals(optionName string, expectedValue string) bool
```

Returns true if the configuration option value is equal to the supplied value.

```yaml
'{{repl ConfigOptionEquals "http_enabled" "1" }}'
```

#### Example

The following KOTS [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the ConfigOptionEquals template function to set the `postgres.enabled` value depending on if the user selected the `embedded_postgres` option on the KOTS Admin Console config screen. This value is then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# KOTS HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  values:
    postgresql:
      enabled: repl{{ ConfigOptionEquals `postgres_type` `embedded_postgres`}}
```
For more information, see [Setting Helm Values with KOTS](/vendor/helm-optional-value-keys).

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

Returns the host of the local registry that the user configured. Alternatively, for air gap installations with Replicated Embedded Cluster or Replicated kURL, LocalRegistryHost returns the host of the built-in registry.

Includes the port if one is specified.

#### Example

The following KOTS [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the HasLocalRegistry, LocalRegistryHost, and LocalRegistryNamespace template functions to conditionally rewrite an image registry and repository depending on if a local registry is used. These values are then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# KOTS HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  values:
    myapp:
      image:
        registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "images.mycompany.com" }}'
        repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/myapp/quay.io/my-org" }}/nginx'
        tag: v1.0.1
```
For more information, see [Setting Helm Values with KOTS](/vendor/helm-optional-value-keys).

## LocalRegistryNamespace

```go
func LocalRegistryNamespace() string
```

Returns the namespace of the local registry that the user configured. Alternatively, for air gap installations with Embedded Cluster or kURL, LocalRegistryNamespace returns the namespace of the built-in registry.

#### Example

The following KOTS [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the HasLocalRegistry, LocalRegistryHost, and LocalRegistryNamespace template functions to conditionally rewrite an image registry and repository depending on if a local registry is used. These values are then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# KOTS HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  values:
    myapp:
      image:
        registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "images.mycompany.com" }}'
        repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/myapp/quay.io/my-org" }}/nginx'
        tag: v1.0.1
```
For more information, see [Setting Helm Values with KOTS](/vendor/helm-optional-value-keys).

## LocalImageName

```go
func LocalImageName(remoteImageName string) string
```

Given a `remoteImageName`, rewrite the `remoteImageName` so that it can be pulled to local hosts.

A common use case for the `LocalImageName` function is to ensure that a Kubernetes Operator can determine the names of container images on Pods created at runtime. For more information, see [Referencing Images](/vendor/operator-referencing-images) in the _Packaging a Kubernetes Operator Application_ section.

`LocalImageName` rewrites the `remoteImageName` in one of the following ways, depending on if a private registry is configured and if the image must be proxied:

* If there is a private registry configured in the customer's environment, such as in air gapped environments, rewrite `remoteImageName` to reference the private registry locally. For example, rewrite `elasticsearch:7.6.0` as `registry.somebigbank.com/my-app/elasticsearch:7.6.0`.

* If there is no private registry configured in the customer's environment, but the image must be proxied, rewrite `remoteImageName` so that the image can be pulled through the proxy registry. For example, rewrite `"quay.io/orgname/private-image:v1.2.3"` as `proxy.replicated.com/proxy/app-name/quay.io/orgname/private-image:v1.2.3`.

* If there is no private registry configured in the customer's environment and the image does not need to be proxied, return `remoteImageName` without changes.

For more information about the Replicated proxy registry, see [About the Proxy Registry](/vendor/private-images-about).

## LocalRegistryImagePullSecret

```go
func LocalRegistryImagePullSecret() string
```

Returns the base64 encoded local registry image pull secret value.
This is often needed when an operator is deploying images to a namespace that is not managed by Replicated KOTS.
Image pull secrets must be present in the namespace of the pod.

#### Example

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

#### Example

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
HasLocalRegistry is always true for air gap installations. HasLocalRegistry is true in online installations if the user pushed images to a local registry.

#### Example

The following KOTS [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the HasLocalRegistry, LocalRegistryHost, and LocalRegistryNamespace template functions to conditionally rewrite an image registry and repository depending on if a local registry is used. These values are then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# KOTS HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  values:
    myapp:
      image:
        registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "images.mycompany.com" }}'
        repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/myapp/quay.io/my-org" }}/nginx'
        tag: v1.0.1
```
For more information, see [Setting Helm Values with KOTS](/vendor/helm-optional-value-keys).