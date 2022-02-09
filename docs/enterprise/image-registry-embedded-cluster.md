# Image registry for Kubernetes installer clusters

You can use the open source kURL registry add-on to host application images on Kubernetes installer-created clusters.

## About the kURL registry add-on

The open source KOTS add-on can be installed on a Kubernetes installer-created cluster, which can also include the open source kURL registry add-on.
When installing in an air gapped environment, the embedded registry will be automatically used to host all application images.

For more information about the registry add-on, see [Registry Add-On](https://kurl.sh/docs/add-ons/registry) in the kURL documentation.

## Enable and disable image garbage collection

> Introduced in KOTS 1.48.0

With every application update, new images will be pushed into this registry.
In order to keep the registry from running out of storage, images that are no longer used will be automatically deleted from the registry.

This feature is currently only supported in Kubernetes installer-created clusters when using the Registry add-on.
Image garbage collection is enabled by default. To disable it, execute the following command in the cluster:

```bash
kubectl patch configmaps kotsadm-confg --type merge -p "{\"data\":{\"enable-image-deletion\":\"false\"}}"
```

To enable it again, execute the following command:
```bash
kubectl patch configmaps kotsadm-confg --type merge -p "{\"data\":{\"enable-image-deletion\":\"false\"}}"
```

Garbage collection is triggered automatically when a new application version is deployed.
The `admin-console garbage-collect-images` command can be used to trigger it manually. For more information, see [kots admin-console garbage-collect-images](https://kots.io/kots-cli/admin-console/garbage-collect-images/) in the kots CLI documentation.

### Restoring deleted images
Deleted images may be reloaded from application and the Replicated admin console air gap bundles using the `admin-console push-images` command. For more information, see [kots admin-console push-images](https://kots.io/kots-cli/admin-console/push-images/) in the kots CLI documentation.

For an example of using the `admin-console push-images` command, see [Installing in an air gapped environment](installing-existing-cluster-airgapped).

Registry address and namespace can be found on the Registry Settings page in the admin console.
Registry username and password can be found in the `registry-creds` secret in the default namespace.

### Limitations
Currently the image garbage collection feature has following limitations:

#### Shared image registries
The image garbage collection process assumes that the registry is not shared with any other instances of the Replicated app manager nor any external applications.
If the embedded registry is used by another external application, this feature should be disabled to prevent image loss.

#### Customer supplied registries
This feature is currently only supported when used with the embedded open source kURL registry.
If the admin console instance is configured to use a different registry, this feature should be disabled to prevent image loss.

#### Application rollbacks
Currently image garbage collection has no effect when the `allowrollback` field in the `application.yaml` file is set to `true`. For more information, see [Application](../reference/custom-resource-application) in _Custom Resources_.
