# Image Registry for Embedded Clusters

The Replicated kURL installer includes the kURL Registry add-on, which can be used to host application images on embedded clusters.

For air gap installations, the embedded kURL registry is automatically used to host all application images.

For more information about the kURL Registry add-on, see [Registry Add-On](https://kurl.sh/docs/add-ons/registry) in the kURL documentation.

## Enable and Disable Image Garbage Collection

> Introduced in KOTS 1.48.0

With every application update, new images are pushed to this registry.
To keep the registry from running out of storage, images that are no longer used are automatically deleted from the registry.

This feature is currently only supported in embedded clusters when using the Registry add-on.
Image garbage collection is enabled by default. To disable this feature, execute the following command in the cluster:

```bash
kubectl patch configmaps kotsadm-confg --type merge -p "{\"data\":{\"enable-image-deletion\":\"false\"}}"
```

To enable garbage collection again, execute the following command:
```bash
kubectl patch configmaps kotsadm-confg --type merge -p "{\"data\":{\"enable-image-deletion\":\"true\"}}"
```

Garbage collection is triggered automatically when a new application version is deployed.
The `admin-console garbage-collect-images` command can be used to trigger it manually. For more information, see [admin-console garbage-collect-images](/reference/kots-cli-admin-console-garbage-collect-images/) in the kots CLI documentation.

### Restoring Deleted Images
Deleted images can be reloaded from air gap bundles using the `admin-console push-images` command. For more information, see [admin-console push-images](/reference/kots-cli-admin-console-push-images/) in the kots CLI documentation.

For an example of using the `admin-console push-images` command, see [Air Gap Installation in Existing Clusters](installing-existing-cluster-airgapped).

The registry address and namespace can be found on the **Registry Settings** page in the Replicated admin console.
The registry username and password can be found in the `registry-creds` secret in the default namespace.

### Limitations
Currently the image garbage collection feature has following limitations:

#### Optional Components
Some applications define Kubernetes resources that can be enabled or disabled dynamically. For example, template functions can be used to conditionally deploy a StatefulSet based on configuration from the user.
If a resource is disabled and no longer deployed, its images can be included in the garbage collection.

To prevent this from happening, include the optional images in the `additionalImages` list of the Application custom resource. For more information, see [`additionalImages`](/reference/custom-resource-application#additionalimages) in _Application_.

#### Shared Image Registries
The image garbage collection process assumes that the registry is not shared with any other instances of Replicated KOTS, nor shared with any external applications. If the embedded registry is used by another external application, disable this feature to prevent image loss.

#### Customer Supplied Registries
This feature is currently only supported when used with the embedded kURL registry.
If the KOTS instance is configured to use a different registry, disable this feature to prevent image loss.

#### Application Rollbacks
Currently image garbage collection has no effect when the `allowRollback` field in the `application.yaml` file is set to `true`. For more information, see [Application](/reference/custom-resource-application).
