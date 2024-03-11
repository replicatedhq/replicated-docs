# Image Registry for Embedded kURL Clusters

This topic describes the Replicated kURL registry for embedded kURL clusters.

## Overview

The kURL Registry add-on can be used to host application images. For air gap installations, this kURL registry is automatically used to host all application images.

With every application update, new images are pushed to the kURL registry.
To keep the registry from running out of storage, images that are no longer used are automatically deleted from the registry.

For more information about the kURL Registry add-on, see [Registry Add-On](https://kurl.sh/docs/add-ons/registry) in the kURL documentation.

## Trigger Garbage Collection

Every time the application instance is upgraded, image garbage collection automatically deletes images that are no longer used.

You can also manually trigger image garbage collection. To manually run garbage collection:

```bash
kubectl kots admin-console garbage-collect-images -n NAMESPACE
```
Where `NAMESPACE` is the namespace where the application is installed.

For more information, see [admin-console garbage-collect-images](/reference/kots-cli-admin-console-garbage-collect-images/).

## Disable Image Garbage Collection

Image garbage collection is enabled by default for embedded kURL clusters that use the kURL registry.

To disable image garbage collection:

```bash
kubectl patch configmaps kotsadm-confg --type merge -p "{\"data\":{\"enable-image-deletion\":\"false\"}}"
```

To enable garbage collection again:
```bash
kubectl patch configmaps kotsadm-confg --type merge -p "{\"data\":{\"enable-image-deletion\":\"true\"}}"
```

## Restore Deleted Images

Deleted images can be reloaded from air gap bundles using the `admin-console push-images` command. For more information, see [admin-console push-images](/reference/kots-cli-admin-console-push-images/) in the kots CLI documentation.

The registry address and namespace can be found on the **Registry Settings** page in the Replicated admin console.
The registry username and password can be found in the `registry-creds` secret in the default namespace.

## Limitations

The kURL registry image garbage collection feature has following limitations:

* **Optional components**: Some applications define Kubernetes resources that can be enabled or disabled dynamically. For example, template functions can be used to conditionally deploy a StatefulSet based on configuration from the user.

   If a resource is disabled and no longer deployed, its images can be included in the garbage collection.

   To prevent this from happening, include the optional images in the `additionalImages` list of the Application custom resource. For more information, see [`additionalImages`](/reference/custom-resource-application#additionalimages) in _Application_.

* **Shared Image Registries**: The image garbage collection process assumes that the registry is not shared with any other instances of Replicated KOTS, nor shared with any external applications. If the embedded kURL registry is used by another external application, disable garbage collection to prevent image loss.

* **Customer Supplied Registries**: Image garbage collection is supported only when used with the embedded kURL registry. If the KOTS instance is configured to use a different registry, disable garbage collection to prevent image loss.

* **Application Rollbacks**: Image garbage collection has no effect when the `allowRollback` field in the KOTS Application custom resource is set to `true`. For more information, see [Application](/reference/custom-resource-application) in _KOTS Custom Resources_.
