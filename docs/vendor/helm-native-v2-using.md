import ReplicatedHelmMigration from "../partials/helm/_replicated-helm-migration.mdx"

# Configuring the HelmChart Custom Resource

This topic describes how to configure the Replicated HelmChart custom resource version `kots.io/v1beta2`. It also includes guidance for updating the HelmChart custom resource from `kots.io/v1beta1` to `kots.io/v1beta2`. For more information about how KOTS installs Helm charts, see [About Distributing Helm Charts with KOTS](helm-native-about).

## Overview

Supporting KOTS installations of your Helm chart requires that you configure the HelmChart custom resource. The HelmChart custom resource creates a mapping between KOTS and your Helm chart `values.yaml` file. For example, a `values.`

To configure the HelmChart custom resource:
* Update the `builders` key to 
* Update the `values` key to rewrite image names so that Kubernetes can locate private images
* Update the `values` key to inject image pull secrets so that private images can be accessed through the Replicated proxy service
* Update the `optionalValues` key add backup labels to resources when the user's license support backup and restore with the snapshots feature

Configuring the HelmChart custom resource requires editing the `values`, `optionalValues`, and `builders` keys. Each of these keys has unique requirements and limitations. For more information about working with these keys, see [values](/reference/custom-resource-helmchart-v2#values), [optionalValues](/reference/custom-resource-helmchart-v2#optionalvalues), and [builders](/reference/custom-resource-helmchart-v2#builders) in _HelmChart_.

## Rewrite Image Names

You must rewrite image names in your Helm chart so that the images can be accessed during installation or upgrade.

Container images are usually given a name such as `example/mycontainerimage` or `my-apiserver`. Images can also include a registry hostname. For example, `fictional.registry.example/imagename`.

### Private Registries

For more information about how KOTS uses the proxy service to get proxy access to images on your external private registry, see [About Using an External Registry](private-images-about#about-the-proxy-service).

Kubernetes requires the following to locate images:
* The registry domain. For private images, this is the domain of the Registry proxy service at `proxy.replicated.com`.
* The path to the image repository on the registry. For private images accessed through the proxy service, the path has the following format: `/proxy/APP_SLUG/EXTERNAL_REGISTRY_IMAGE_URL`, where `APP_SLUG` is the slug of your Replicated application and `EXTERNAL_REGISTRY_IMAGE_URL` is the path to the private image on your external registry.

**Example**

The following examples show how to create a field in the `values` key that rewrites an image name. In this case, you use a static value to for the location of the private image at `proxy.replicated.com`. 

```yaml 
# kots.io/v1beta2 HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  ...
  values:
    image:
    # private image accessed through the proxy service
      name: proxy.replicated.com/proxy/my-app/quay.io/my-org/api
      tag: v1.0.1  
```

### Local Registries

To support users in air gap and online environments that push images to local registries, Replicated recommends that you use Replicated template functions with a ternary operator when you rewrite image names.

The following describes the template functions that you can use to support local image registries:
* **HasLocalRegistry**: Returns true if the environment is configured to rewrite images to a local registry. HasLocalRegistry is always true for air gapped installations and optionally true for online installations. See [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry) in _Config Context_.
* **LocalRegistryHost**: Returns the host of the local registry that the user configured. See [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost) in _Config Context_.
* **LocalRegistryNamespace**: Returns the namespace of the local registry that the user configured. See [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace) in _Config Context_.

When you include the HasLocalRegistry template function with a ternary operator, KOTS uses the host and namespace of the local registry when a local registry is configured in the environment. Otherwise, KOTS uses the proxy service or external registry URL for the image.

For example, if the user configured a local registry and used the namespace `example-namespace`, then the template function `'{{repl HasLocalRegistry | ternary LocalRegistryNamespace "my-org" }}/mariadb'` evaluates to `example-namespace/mariadb`. If the user did _not_ configure a local registry, then the template function evaluates to `my-org/maridb`.

**Private Image Example**

The following example for private images shows how to create a field in the `values` key that rewrites the registry domain to `proxy.replicated.com` unless the user configured a local registry. Similarly, it shows how to update a field to rewrite the repository to the path of the image on `proxy.replicated.com` or on the user's local registry.

```yaml
# kots.io/v1beta2 HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  ...
  values:
    image:
      registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "proxy.replicated.com" }}'
      repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/my-app/ecr.us-east-1.amazonaws.com/example" }}/wordpress'
      tag: 6.1.1-debian
```

**Public Image Example**

The following example for private images shows how to create a field in the `values` key that rewrites the registry domain to your external registry unless the user configured a local registry. Similarly, it shows how to add a field to rewrite the repository to the path of the image on `proxy.replicated.com` or on the user's local registry.
 
```yaml 
# kots.io/v1beta2 HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  ...
  values:
    mariadb:
      image:
        registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "docker.io" }}'
        repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "my-org" }}/mariadb'
        tag: 10.6.12-debian  
```

## Inject Image Pull Secrets

Kubernetes requires a Secret of type `kubernetes.io/dockerconfigjson` to authenticate with a registry and pull a private image. When you reference a private image in a Pod definition, you also provide the name of the Secret in a `imagePullSecrets` key in the Pod definition. For more information, see [Specifying imagePullSecrets on a Pod](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod) in the Kubernetes documentation.

During installation, KOTS creates a `kubernetes.io/dockerconfigjson` type Secret that is based on the customer license. This pull secret grants access to the private image on the Replicated proxy service. You must provide the name of this KOTS-generated pull secret in any Pod definitions that reference the private image.

You can inject the name of this pull secret into a field in the HelmChart custom resource using the Replicated ImagePullSecretName template function. During installation, KOTS overwrites the value of the corresponding field in your Helm chart `values.yaml` file with the rendered value of the ImagePullSecretName template function. 

**Example**

The following example shows a `spec.values.image.pullSecrets` field in the HelmChart custom resource that uses the ImagePullSecretName template function to inject the name of the KOTS-generated pull secret:

```yaml
# kots.io/v1beta2 HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  values:
    image:
      registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "proxy.replicated.com" }}'
      repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/my-app/ecr.us-east-1.amazonaws.com/my-org" }}/api'
      pullSecrets:
      - '{{repl ImagePullSecretName }}'
```

The `spec.values.image.pullSecrets` field in the HelmChart custom resource corresponds to a `image.pullSecrets` field in your Helm chart `values.yaml` file, as shown in the example below:

```yaml
# Helm chart values.yaml file

image:
  registry: ecr.us-east-1.amazonaws.com
  repository: my-org/api/nginx
  pullSecrets: nginxsecret
```

During installation, KOTS overwrites the `image.pullSecrets` field in your Helm chart `values.yaml` file based on the rendered value of the corresponding `spec.values.image.pullSecrets` field in the HelmChart custom resource. This means that any Pod definitions where you access the `image.pullSecrets` field are updated to use the name of the KOTS-generated pull secret, as shown in the example below:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: {{ .Values.image.registry }}
    image: {{ .Values.image.repository }}
  imagePullSecrets:
  - name: {{ .Values.image.pullSecrets }}  
```

## Add Backup Labels for Snapshots

The Replicated snapshots feature requires the following labels on all resources in your Helm chart that you want to be included in the backup:
* `kots.io/backup: velero`
* `kots.io/APP_SLUG`, where `APP_SLUG` is the slug of your Replicated application.

For more information about snapshots, see [Understanding Backup and Restore](snapshots-overview).

To support backup and restore with snapshots, add the `kots.io/backup: velero` and `kots.io/APP_SLUG` labels to fields under the HelmChart custom resource `optionalValues` key. Add a `when` statement that evaluates to true only when the customer license has the `isSnapshotSupported` entitlement.

The fields that you create under the `optionalValues` key must map to fields in your Helm chart `values.yaml` file. For more information about working with the `optionalValues` key, see [optionalValues](/reference/custom-resource-helmchart-v2#optionalvalues) in _HelmChart v2_.

**Example**

The following example shows how to add backup labels for snapshots in the `optionalValues` key of the HelmChart custom resource:

```yaml
# kots.io/v1beta2 HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  ...
  optionalValues:
  # add backup labels only if the license supports snapshots
  - when: "repl{{ LicenseFieldValue `isSnapshotSupported` }}"
    recursiveMerge: true
    values:
      mariadb:
        commonLabels:
          kots.io/backup: velero
          kots.io/app-slug: my-app-slug
        podLabels:
          kots.io/backup: velero
          kots.io/app-slug: my-app-slug
```

## Support Local Image Registries

Local image registries are required for KOTS installations in air gapped environments. Also, users in online environments can optionally push images to a local private registry. For more information about how users configure a local image registry with KOTS, see [Using Private Registries](/enterprise/image-registry-settings).

To support the use of local registries for installations with version `kots.io/v1beta2` of the HelmChart custom resource, you must provide the necessary values to render the Helm chart in the `builder` field of the HelmChart custom resource. The `builder` field instructs KOTS where to pull the images so that it can push them to the local private registry.

For more information about how to configure the `builder` key, see [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

:::note
If you already configured the `builder` key previously to support air gap installations, then you can use the same configuration in your HelmChart custom resource to support the use of local registries for online installations. No additional configuration is required.
:::

## Migrate from v1beta1 to v1beta2 {#migrating}

The HelmChart custom resource `kots.io/v1beta1` is deprecated and is not recommended for new installations. This section includes considerations for migrating from version `kots.io/v1beta1` of the HelmChart resource to version `kots.io/v1beta2`.

### Support Both Versions {#support-both}

The HelmChart custom resource version `kots.io/v1beta2` is available only for installations that use KOTS v1.99.0 or later. To support existing users that have not yet upgraded to KOTS v1.99.0 or later, Replicated recommends that you include both a `kots.io/v1beta2` and a `kots.io/v1beta1` HelmChart custom resource for each Helm chart in your release. This allows you to support both installation methods from the same release.

When you include both a `kots.io/v1beta2` and `kots.io/v1beta1` HelmChart custom resource in a single release for the same Helm chart, installations with KOTS v1.98.0 or earlier use `kots.io/v1beta1`. Installations with KOTS v1.99.0 or later use `kots.io/v1beta2`.

### Update an Existing HelmChart Custom Resource

After all your users install KOTS v1.99.0 or later, you can stop supporting installations with version `kots.io/v1beta1` of the HelmChart custom resource. To migrate from `kots.io/v1beta1` to `kots.io/v1beta2`, update the fields in the existing HelmChart custom resources in your releases.

:::note
Migrating from the Replicated Helm installation method (`apiVersion: kots.io/v1beta1` and `useHelmInstall: false`) for an existing chart in an existing installation is not supported. For more information, see [Migrating from Replicated Helm](#migrating-from-replicated-helm) below.
:::

The `kots.io/v1beta2` HelmChart custom resource has the following differences from `kots.io/v1beta1`:

<table>
  <tr>
    <th>HelmChart v1beta2</th>
    <th>HelmChart v1beta1</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>apiVersion: kots.io/v1beta2</code></td>
    <td><code>apiVersion: kots.io/v1beta1</code></td>
    <td><code>apiVersion</code> is updated to <code>kots.io/v1beta2</code></td>
  </tr>
  <tr>
    <td><code>releaseName</code></td>
    <td><code>chart.releaseName</code></td>
    <td><code>releaseName</code> is a top level field under <code>spec</code></td>
  </tr>
  <tr>
    <td>N/A</td>
    <td><code>helmVersion</code></td>
    <td><code>helmVersion</code> field is removed</td>
  </tr>
  <tr>
    <td>N/A</td>
    <td><code>helmInstall</code></td>
    <td><code>helmInstall</code> field is removed</td>
  </tr>
</table>

For an example of the HelmChart v2 custom resource, see [HelmChart v2](/reference/custom-resource-helmchart-v2).

### Migrate from Replicated Helm

<ReplicatedHelmMigration/>

To upgrade from Replicated Helm to another installation method, the user must reinstall your application in a new environment.