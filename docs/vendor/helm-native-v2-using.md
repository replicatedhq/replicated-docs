# Using Native Helm v2

This topic describes the required procedures for supporting Helm chart installations with the KOTS native Helm v2 method. It also includes steps for migrating from native Helm v1 to native Helm v2. 

## Overview

With native Helm v1, KOTS automatically modifies the chart with Kustomize to rewrite images, inject image pull secrets, and add the required backup labels for snapshots during installation. To support installations with native Helm v2, you need to manually update the HelmChart v2 custom resource with Replicated template functions to rewrite images, inject image pull secrets, and add backup labels.

For more information about the differences between native Helm v2 and v1, see [About Distributing Helm Charts with KOTS](helm-native-about).

## Rewrite Images and Inject Pull Secrets

To rewrite images:

```yaml
# HelmChart v2 custom resource
...
  values:
    # private image example
    image:
      registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "proxy.replicated.com" }}'
      repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/APP_SLUG/REGISTRY_URL" }}'
      tag: IMAGE_TAG
      pullSecrets:
      - '{{repl ImagePullSecretName }}'
    # public image example
    mariadb:
      image:
        registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "docker.io" }}'
        repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "bitnami" }}/mariadb'
        tag: 10.6.12-debian-11-r9  
```

## Add Backup Labels for Snapshots

Snapshots requires labels on all the resources to be included in the backup. To support snapshots in native Helm v2 installations, you need to add the `kots.io/backup: velero` and `kots.io/app-slug` labels  the HelmChart v2 custom resource.

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

To support existing users that have not yet upgraded to KOTS v1.99.0 or later, Replicated recommends that you include both a HelmChart v1 and a HelmChart v2 custom resource for each Helm chart in your release. 

In addition to adding template functions for rewriting images, injecting pull secrets, and adding backup labels as described above, make the following changes to your HelmChart v1 custom resource to upgrade to native Helm v2:
* Change apiVersion from v1beta1 to v1beta2
* Change `chart.releaseName` to `releaseName`
* Remove helmVersion
* Remove helmInstall
* If you do not already have the `builders` field configured, then you must configure the builders field to support online installations that are configured to push and pull images from a private registry

