import ConfigContext from "../partials/template-functions/_config-context.mdx"

# Config Context

This topic provides a list of the Replicated template functions in the Config context.

<ConfigContext/>

## ConfigOption

```go
func ConfigOption(optionName string) string
```

Returns the value of the specified option from the Replicated Config custom resource as a string.

For the `file` config option type, `ConfigOption` returns the base64 encoded file. To return the decoded contents of a file, use [ConfigOptionData](#configoptiondata) instead.

```yaml
'{{repl ConfigOption "hostname" }}'
```

#### Example

The following [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the ConfigOption template function to set the port, node port, and annotations for a LoadBalancer service using the values supplied by the user on the config screen. These values are then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# HelmChart custom resource
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
For more information, see [values](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_.

## ConfigOptionData

```go
func ConfigOptionData(optionName string) string
```

For the `file` config option type,  `ConfigOptionData` returns the base64 decoded contents of the file. To return the base64 encoded file, use [ConfigOption](#configoption) instead.

```yaml
'{{repl ConfigOptionData "ssl_key"}}'
```

#### Example

The following [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the ConfigOptionData template function to set the TLS cert and key using the files supplied by the user on the config screen. These values are then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# HelmChart custom resource
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
For more information, see [values](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_.

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

For example, if you have the following Config defined:

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

The following [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the ConfigOptionEquals template function to set the `postgres.enabled` value depending on if the user selected the `embedded_postgres` option on the config screen. This value is then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# HelmChart custom resource
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
For more information, see [values](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_.

## ConfigOptionNotEquals

```go
func ConfigOptionNotEquals(optionName string, expectedValue string) bool
```

Returns true if the configuration option value is not equal to the supplied value.

```yaml
'{{repl ConfigOptionNotEquals "http_enabled" "1" }}'
```

## ConfigOptionName

> Introduced in KOTS v1.47.0

```go
func ConfigOptionName(optionName string) string
```

Returns the name of a configuration item. Use ConfigOptionName with repeatable items to get the generated name of each repeated value, such as to use the name as a key in a Kubernetes manifest.

For repeatable items, KOTS replaces `repl[[ .itemName ]]` with the generated name of each value, such as `serviceport-8jdn2bgd`, before it renders template functions. ConfigOptionName returns that generated name. For more information, see [Repeatable Items](/reference/custom-resource-config#repeatable-items) in _Config_.

#### Example

```yaml
# Kubernetes manifest targeted by a repeatable item
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
stringData:
  repl{{ ConfigOptionName "repl[[ .secretName ]]" }}: '{{repl ConfigOption "repl[[ .secretName ]]" }}'
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

The following [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the HasLocalRegistry, LocalRegistryHost, and LocalRegistryNamespace template functions to conditionally rewrite an image registry and repository depending on if a local registry is used. These values are then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# HelmChart custom resource
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
For more information, see [values](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_.

## LocalRegistryNamespace

```go
func LocalRegistryNamespace() string
```

Returns the namespace of the local registry that the user configured. Alternatively, for air gap installations with Embedded Cluster or kURL, LocalRegistryNamespace returns the namespace of the built-in registry.

#### Example

The following [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the HasLocalRegistry, LocalRegistryHost, and LocalRegistryNamespace template functions to conditionally rewrite an image registry and repository depending on if a local registry is used. These values are then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# HelmChart custom resource
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
For more information, see [values](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_.

## LocalImageName

```go
func LocalImageName(remoteImageName string) string
```

Given a `remoteImageName`, rewrite the `remoteImageName` so that it can be pulled to local hosts.

A common use case for the `LocalImageName` function is to ensure that a Kubernetes Operator can determine the names of container images on Pods created at runtime. For more information, see [Reference Images](/vendor/operator-referencing-images) in the _Packaging a Kubernetes Operator Application_ section.

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
This is often needed when an operator is deploying images to a namespace that is not managed by the Replicated installer.
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

The following [HelmChart](/reference/custom-resource-helmchart-v2) custom resource uses the HasLocalRegistry, LocalRegistryHost, and LocalRegistryNamespace template functions to conditionally rewrite an image registry and repository depending on if a local registry is used. These values are then mapped to the `values.yaml` file for the associated Helm chart during deployment.

```yaml
# HelmChart custom resource
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
For more information, see [values](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_.

## HelmValue

> Introduced in KOTS v1.133.0

```go
func HelmValue(path string) string
```

Returns a default value from the Helm chart that the HelmChart custom resource references. Use HelmValue to read a chart's default image values and pass them to the [ReplicatedImageName](#replicatedimagename) or [ReplicatedImageRegistry](#replicatedimageregistry) template functions, so that you don't have to repeat image references in the HelmChart custom resource.

HelmValue reads the `values.yaml` file of the chart archive that matches `spec.chart.name` and `spec.chart.chartVersion`, including the default values of any subcharts bundled with the chart. It does not read values that you set in the HelmChart custom resource or values that customers provide.

The `path` argument uses dot notation, such as `.image.repository`. The `.Values` prefix is optional. To match a key that contains a dot, escape the dot with a backslash, such as `.log\.level`. If the value is a map or a list, HelmValue returns it as JSON. If the path doesn't exist, HelmValue returns an empty string.

HelmValue works only in the HelmChart custom resource. In all other files, it returns an empty string. You can't use HelmValue in the `spec.chart.name` or `spec.chart.chartVersion` fields.

#### Example

```yaml
# values.yaml
initImage: ghcr.io/my-org/init:1.4.0
my-subchart:
  image:
    registry: ghcr.io
```

```yaml
# HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  values:
    initImage: '{{repl ReplicatedImageName (HelmValue ".initImage") }}'
    my-subchart:
      image:
        registry: '{{repl ReplicatedImageRegistry (HelmValue ".my-subchart.image.registry") }}'
```

## ReplicatedImageName

> Introduced in KOTS v1.133.0

```go
func ReplicatedImageName(image string, noProxy ...bool) string
```

Returns a full image reference, including the registry, repository, and tag or digest, rewritten so that the image can be pulled in the customer's environment. Use ReplicatedImageName in the HelmChart custom resource so that image references resolve correctly in both online and air gap installations.

ReplicatedImageName rewrites `image` in one of the following ways:

* If a local image registry is configured, such as in air gap installations, returns the location of the image in the local registry in the format `<local-registry-host>/<local-registry-namespace>/<image-name>:<tag>`. For example, `ghcr.io/my-org/init:1.4.0` becomes `registry.example.com/my-app/init:1.4.0`. The `noProxy` argument is ignored.

* If no local image registry is configured and `noProxy` is `true`, returns `image` unchanged. Use this for public images that don't go through the Replicated proxy registry.

* Otherwise, returns the proxy registry URL for the image in the format `<proxy-registry-domain>/proxy/<app-slug>/<image>`. The proxy registry domain is either `proxy.replicated.com` or your custom domain. If `image` already uses the Replicated proxy registry or the Replicated registry, ReplicatedImageName returns it unchanged, except that it replaces `proxy.replicated.com` or `registry.replicated.com` with your custom domain if you configured one.

Unlike [LocalImageName](#localimagename), ReplicatedImageName routes every image through the proxy registry in online installations unless `noProxy` is `true`. If `image` is not a valid image reference, rendering fails.

For more information, see [About the Proxy Registry](/vendor/private-images-about) and [Use custom domains](/vendor/custom-domains-using).

#### Example

```yaml
# HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  values:
    initImage: '{{repl ReplicatedImageName (HelmValue ".initImage") }}'
    busyboxImage: '{{repl ReplicatedImageName "docker.io/library/busybox:1.36" true }}'
```

## ReplicatedImageRegistry

> Introduced in KOTS v1.133.0

```go
func ReplicatedImageRegistry(registry string, noProxy ...bool) string
```

Returns a registry host rewritten so that images can be pulled in the customer's environment. Use ReplicatedImageRegistry when a Helm chart sets the image registry and repository in separate fields.

ReplicatedImageRegistry rewrites `registry` in one of the following ways:

* If a local image registry is configured, such as in air gap installations, returns the local registry address in the format `<local-registry-host>/<local-registry-namespace>`. The `registry` and `noProxy` arguments are ignored.

* If no local image registry is configured and `noProxy` is `true`, returns `registry` unchanged.

* Otherwise, returns the proxy registry path in the format `<proxy-registry-domain>/proxy/<app-slug>/<registry>`. The proxy registry domain is either `proxy.replicated.com` or your custom domain. If `registry` already uses the Replicated proxy registry or the Replicated registry, ReplicatedImageRegistry returns it unchanged, except that it replaces `proxy.replicated.com` or `registry.replicated.com` with your custom domain if you configured one.

:::note
KOTS pushes images to the local registry using only the last segment of the repository path. For example, KOTS pushes `ghcr.io/my-org/init` as `<local-registry-host>/<local-registry-namespace>/init`. If the separate repository field contains more than one path segment, such as `my-org/init`, the image reference doesn't resolve in air gap installations. For repositories with more than one path segment, use [ReplicatedImageName](#replicatedimagename) with the full image reference instead.
:::

#### Example

```yaml
# HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  chart:
    name: samplechart
    chartVersion: 3.1.7
  values:
    api:
      image:
        registry: '{{repl ReplicatedImageRegistry (HelmValue ".api.image.registry") }}'
        repository: api
        tag: 2.0.1
```
