import V2Example from "../partials/helm/_v2-native-helm-cr-example.mdx"

# Configuring the HelmChart Custom Resource

This topic describes how to configure the `apiVersion: kots.io/v1beta2` HelmChart custom resource. It also includes guidance for updating the HelmChart custom resource from `kots.io/v1beta1` to `kots.io/v1beta2`. 

## Overview

When you include version `kots.io/v1beta2` of the HelmChart custom resource for a Helm chart in your release, KOTS v1.99.0 or later does a Helm install or upgrade of the chart without making any modifications to the chart.

Supporting Helm chart installations with version `kots.io/v1beta2` of the HelmChart custom resource requires additional configuration. You need to update the HelmChart custom resource to rewrite images, inject image pull secrets, and add backup labels for snapshots. Additionally, if you want to support the use of local image registries for air gap or online installations, you must configure the `builder` key.

:::note
Configuring the HelmChart custom resource version `kots.io/v1beta2` requires editing the `values`, `optionalValues`, and `builders` keys. Each of these keys has unique requirements and limitations. For more information about working with these keys, see [values](/reference/custom-resource-helmchart-v2#optional-values), [optionalValues](/reference/custom-resource-helmchart-v2#values), and [builders](/reference/custom-resource-helmchart-v2#builders).
:::

For more information about how KOTS installs Helm charts with the `kots.io/v1beta2` HelmChart custom resource, including the differences between versions `kots.io/v1beta1` and `kots.io/v1beta2`, see [About Distributing Helm Charts with KOTS](helm-native-about).

## Supporting Local Image Registries

Local image registries are required for KOTS installations in air gapped environments. Also, by default, users in online environments can optionally push images to a local private registry. For more information about how users configure a local image registry with KOTS, see [Using Private Registries](/enterprise/image-registry-settings).

When installing with version `kots.io/v1beta2` of the HelmChart custom resource, you must provide the necessary values in the `builder` field of the HelmChart custom resource to render the Helm chart with all of the necessary images. This instructs KOTS where to pull the images so that it can push them to the local private registry.

:::note
If you already configured the `builder` key previously to support air gap installations, then you can use the same configuration in your HelmChart custom resource to support the use of local registries for online installations. No additional configuration is required.
:::

For more information about how to configure the `builder` key, see [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

## Rewriting Image Names

This section describes how to rewrite image names in the `values` key of the HelmChart custom resource so that KOTS can locate your application's public or private images during installation and upgrade.

### Image Registry and Repository

To locate images, KOTS requires:
* The registry domain. For private images, this is the domain of the Registry proxy service at `proxy.replicated.com`. For public images, this is the domain of your external registry.
* The path to the image repository on the registry. For private images accessed through the proxy service, the path has the following format: `/proxy/APP_SLUG/EXTERNAL_REGISTRY_IMAGE_URL`, where `APP_SLUG` is the slug of your Replicated application and `EXTERNAL_REGISTRY_IMAGE_URL` is the path to the private image on your external registry.

For more information about how KOTS uses the proxy service to get proxy access to images on your external private registry, see [About Using an External Registry](private-images-about#about-the-proxy-service).

### Local Image Registries

To support your users in air gap and online environments pushing images to local registries, Replicated recommends that you include the following Replicated template functions with a ternary operator when you rewrite image names in the HelmChart custom resource:
* **HasLocalRegistry**: Returns true if the environment is configured to rewrite images to a local registry. HasLocalRegistry is always true for air gapped installations and optionally true for online installations. See [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry) in _Config Context_.
* **LocalRegistryHost**: Returns the host of the local registry that the user configured. See [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost) in _Config Context_.
* **LocalRegistryNamespace**: Returns the namespace of the local registry that the user configured. See [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace) in _Config Context_.

For example, if the user configured a local registry and used the namespace `example-namespace`, then the template function `'{{repl HasLocalRegistry | ternary LocalRegistryNamespace "my-org" }}/mariadb'` evaluates to `example-namespace/mariadb`. If the user did _not_ configure a local registry, then the template function evaluates to `my-org/maridb`.

For more information about how users configure a local image registry with KOTS, see [Using Private Registries](/enterprise/image-registry-settings).

When you include the HasLocalRegistry template function with a ternary operator, KOTS uses the host and namespace of the local registry when a local registry is configured in the environment. Otherwise, KOTS uses the proxy service or external registry URL for the image.

### Examples

This section includes examples to demonstrate how to rewrite private or public image names in the `value` key of the HelmChart custom resource. For more information about working with the `values` key, see [values](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_.

**Private Image Example**

The following example for private images shows how to update a `values.image.registry` field so that KOTS uses `proxy.replicated.com` unless the user configured a local registry. Similarly, it shows how to update `values.image.repository` field so that KOTS uses the path of the image on `proxy.replicated.com` or on the user's local registry.

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

The following example for public images shows how to update a `values.mariadb.image.registry` field so that KOTS uses the domain of your external registry unless the user configured a local registry. Similarly, it shows how to update a `values.mariadb.image.repository` field so that KOTS uses the path of the image on your external registry or on the user's local registry.
 
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

**No Support for Local Registries Examples**

The following examples show how you can update an image name if you do _not_ need to support the use of local registries for users in air gap or online environments. In this case, you can use a static value to for the location of the image at `proxy.replicated.com` or on your external registry. 

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
    # public image on quay.io
      name: quay.io/my-org/api
      tag: v1.0.1  
```

## Injecting Pull Secrets for Private Images

To access private images, KOTS requires an image pull secret. You can use the Replicated ImagePullSecretName template function in the `values` key of the HelmChart custom resource to inject image pull secrets for private registries. The ImagePullSecretName template function returns the name of the image pull secret that can be added to any Pod specs that use private images. For more information, see [ImagePullSecretName](/reference/template-functions-config-context#imagepullsecretname) in _Config Context_.

Use the following format for the ImagePullSecretName template function in the `values` key HelmChart custom resource:

```yaml
# kots.io/v1beta2 HelmChart custom resource
apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  values:
    ...
    pullSecrets:
    - '{{repl ImagePullSecretName }}'
```

For more information about working with the `values` key, see [values](/reference/custom-resource-helmchart-v2#values) in _HelmChart v2_.

**Example**

The following example shows how to set a `values.image.pullSecrets` field to the ImagePullSecretName template function.

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
      repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/my-app/ecr.us-east-1.amazonaws.com/example" }}/wordpress'
      tag: 6.1.1-debian
      pullSecrets:
      - '{{repl ImagePullSecretName }}'
```

## Adding Backup Labels for Snapshots

The Replicated snapshots feature requires the following labels on all resources in your Helm chart to be included in the backup:
* `kots.io/backup: velero`
* `kots.io/APP_SLUG`, where `APP_SLUG` is the slug of your Replicated application.

For more information about snapshots, see [Understanding Backup and Restore](snapshots-overview).

Add the `kots.io/backup: velero` and `kots.io/APP_SLUG` labels to the HelmChart custom resource `optionalValues` key along with a `when` statement that evaluates to true only when the license has the `isSnapshotSupported` entitlement.

For more information about working with the `optionalValues` key, see [optionalValues](/reference/custom-resource-helmchart-v2#optionalvalues) in _HelmChart v2_.

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
          kots.io/app-slug: craig-helm
        podLabels:
          kots.io/backup: velero
          kots.io/app-slug: craig-helm
```

## Migrating from `v1beta1` to `v1beta2` {#migrating}

This section includes consideration for migrating from version `kots.io/v1beta1` of the HelmChart resource to version `kots.io/v1beta2`.

### Supporting `v1beta1` and `v1beta2`

The HelmChart custom resource version `kots.io/v1beta2` is available only for installations that use KOTS v1.99.0 or later. To support existing users that have not yet upgraded to KOTS v1.99.0 or later, Replicated recommends that you include both a `kots.io/v1beta2` and a `kots.io/v1beta1` HelmChart custom resource for each Helm chart in your release. This allows you to support both installation methods from the same release.

When you include both a `kots.io/v1beta2` and `kots.io/v1beta1` HelmChart custom resource in a single release for the same Helm chart, installations with KOTS v1.98.0 or earlier use `kots.io/v1beta1`. Installations with KOTS v1.99.0 or later use `kots.io/v1beta2`.

### Updating an Existing HelmChart Custom Resource

To stop supporting installations with version `kots.io/v1beta1` of the HelmChart custom resource and migrate to `kots.io/v1beta2` instead, you can update the fields in the existing HelmChart custom resources in your releases.

:::note
Migrating from the deprecated Replicated Helm installation method (`apiVersion: kots.io/v1beta1` and `useHelmInstall: flase`) for an existing chart is not supported. For more information, see [Replicated Helm Limitations](helm-native-about#replicated-helm-limitations) in _About Distributing Helm Chart with KOTS_.
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
    <td><code>N/A</code></td>
    <td><code>helmInstall</code></td>
    <td><code>helmInstall</code> field is removed</td>
  </tr>
</table>

The following shows an example of the HelmChart v2 custom resource. For more information, see [HelmChart v2 (Beta)](/reference/custom-resource-helmchart-v2).

<V2Example/>