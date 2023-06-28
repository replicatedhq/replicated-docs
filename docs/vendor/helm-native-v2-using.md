# Using Native Helm v2

This topic describes how to support Helm chart installations with the KOTS native Helm v2 method. It also includes guidance for migrating from native Helm v1 to native Helm v2. 

## Overview

With native Helm v1, KOTS automatically modifies the chart with Kustomize to rewrite images, inject image pull secrets, and add the backup labels required for snapshots during installation. To support installations with native Helm v2, you need to manually update the HelmChart v2 custom resource to rewrite images, inject image pull secrets, and add backup labels. Additionally, to support the use of local image registries for both air gap and online installations with native Helm v2, you must configure the `builder` key in the HelmChart v2 custom resource.

For more information about the differences between native Helm v2 and v1, see [About Distributing Helm Charts with KOTS](helm-native-about).

## Supporting Local Image Registries

Local image registries are required for KOTS installations in air gapped environments. By default, users in online environments can also optionally push images to a local private registry. For more information about how users configure a local image registry with KOTS, see [Using Private Registries](/enterprise/image-registry-settings).

With native Helm v1, KOTS automatically supports pushing images to a local private registry for online installations. With native Helm v2, you must provide the necessary values in the `builder` field of the HelmChart v2 custom resource to render the Helm chart with all of the necessary images. This instructs KOTS where to pull the images so that it can push them to the local private registry.

:::note
If you already configured the `builder` key to support air gap installations, then you can use the same configuration in your HelmChart v2 custom resource to support the use of local registries for online installations. No additional configuration is required.
:::

For more information about how to configure the `builder` key, see [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

## Rewrite Image Names

This section describes how to rewrite image names in the `values` key of your HelmChart v2 custom resource so that KOTS can locate your application's public or private images during installation and upgrade.

To locate images, KOTS requires:
* The registry domain. For private images, this is the domain of the Registry proxy service at `proxy.replicated.com`. For public images, this is the domain of your external registry.
* The path to the image repository on the registry. For private images accessed through the proxy service, the path has the following format: `/proxy/APP_SLUG/EXTERNAL_REGISTRY_IMAGE_URL`, where `APP_SLUG` is the slug of your Replicated application and `EXTERNAL_REGISTRY_IMAGE_URL` is the path to the private image on your external registry.

Additionally, to support your users pushing images to local registries, Replicated recommends that you include the following Replicated template functions when you rewrite image names:
* **HasLocalRegistry**: Returns true if the environment is configured to rewrite images to a local registry. HasLocalRegistry is always true for air gapped installations and optionally true for online installations. 
* **LocalRegistryHost**: Returns the host of the local registry that the user configured.
* **LocalRegistryNamespace**: Returns the namespace of the local registry that the user configured.

When you include these template functions with a ternary operator, you allow KOTS to dynamically update the image name to use the local image registry if one is configured.

### Examples

These examples demonstrate how to use Replicated template functions to rewrite image names in the `values.image.registry` and `values.image.repository` fields of the HelmChart v2 custom resource.

**Private Image**

```yaml
# HelmChart v2 custom resource
...
values:
  image:
    registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "proxy.replicated.com" }}'
    repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/my-app/429114214526.dkr.ecr.us-east-1.amazonaws.com/craig" }}/wordpress'
    tag: 6.1.1-debian-11-r66-custom
```

**Public Image**
 
```yaml 
# HelmChart v2 custom resource
...
  values:
    image:
      registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "docker.io" }}'
      repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "bitnami" }}/mariadb'
      tag: 10.6.12-debian-11-r9  
```

<!-- ### Without Support for Local Registries {#without-local}

If you do not support air gap installations, or if you do not support the use of local registries for users in online environments, then write image names with a static value that points to the location of the private image on `proxy.replicated.com` or the location of the public image at your private registry URL. 

**Private Image Example**

```yaml
# HelmChart v2 custom resource
...
values:
  image:
    name: proxy.replicated.com/proxy/APP_SLUG/REGISTRY_URL
    tag: IMAGE_TAG
```

**Public Image Example**

```yaml
# HelmChart v2 custom resource
...
values:
  image:
    name: my.registry.com/directory/image_name
    tag: IMAGE_TAG
``` -->
## Inject Pull Secrets for Private Images

To access private images, KOTS requires an image pull secret. Use the [ImagePullSecretName](/reference/template-functions-config-context#imagepullsecretname) Replicated template function to inject image pull secrets for private registries.

Use the following format for the ImagePullSecretName template function:

```yaml
# HelmChart v2 custom resource
...
pullSecrets:
- '{{repl ImagePullSecretName }}'
```

**Example**

The following example shows how to set the `pullSecrets` field to the ImagePullSecretName template function:

```yaml
# HelmChart v2 custom resource
...
values:
  image:
    registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "proxy.replicated.com" }}'
    repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/my-app/429114214526.dkr.ecr.us-east-1.amazonaws.com/craig" }}/wordpress'
    tag: 6.1.1-debian-11-r66-custom
    pullSecrets:
    - '{{repl ImagePullSecretName }}'
```

## Add Backup Labels for Snapshots

The Replicated snapshots feature requires the following labels on all resources to be included in the backup:
* `kots.io/backup: velero`
* `kots.io/app-slug`

To support snapshots in native Helm v2 installations, add the `kots.io/backup: velero` and `kots.io/app-slug` labels in the HelmChart v2 custom resource:


```yaml
  # HelmChart v2 custom resource
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

## Migrating from Native Helm v1 to v2

Native Helm v2 is supported for installations that use KOTS v1.99.0 or later. To support existing users that have not yet upgraded to KOTS v1.99.0 or later, Replicated recommends that you include both a HelmChart v1 and a HelmChart v2 custom resource for each Helm chart in your release. This allows you to support both the native Helm v1 and native Helm v2 installation methods from the same release.

When you include both a HelmChart v1 and v2 custom resource, installations with KOTS v1.98.0 or earlier use the HelmChart v1 custom resource. Installations with KOTS v1.99.0 or later use the HelmChart v2 custom resource.

To use an existing HelmChart v1 custom resource to create a HelmChart v2 custom resource, make the following changes:
* Change `apiVersion` from `v1beta1` to `v1beta2`
* Change `chart.releaseName` to `releaseName`
* Remove `helmVersion`
* Remove `helmInstall`