# About deploying a registry on an embedded cluster

This topic describes using the kURL registry add-on to host application images on embedded clusters.

## About the kURL registry add-on

KOTS can be installed as an add-on on a [kURL](https://kurl.sh/docs/introduction/) cluster, which can also include the [registry add-on](https://kurl.sh/docs/add-ons/registry).
When installing in [air gap](/kotsadm/installing/installing-embedded-cluster/#airgapped-installations) mode, the embedded registry will be automatically used to host all application images.

## Enable and disable image garbage collection

> Introduced in KOTS 1.48.0

With every application update, new images will be pushed into this registry.
In order to keep the registry from running out of storage, images that are no longer used will be automatically deleted from the registry.

This feature is currently only supported in embedded kURL clusters when using the Registry add-on.
Image garbage collection is enabled by default.
To disable it, execute the following command in the kURL cluster:

```bash
kubectl patch configmaps kotsadm-confg --type merge -p "{\"data\":{\"enable-image-deletion\":\"false\"}}"
```

To enable it again, execute the following command:
```bash
kubectl patch configmaps kotsadm-confg --type merge -p "{\"data\":{\"enable-image-deletion\":\"false\"}}"
```

Garbage collection is triggered automatically when a new application version is deployed.
The [admin-console garbage-collect-images](/kots-cli/admin-console/garbage-collect-images/) command can be used to trigger it manually.

### Restoring deleted images
Deleted images may be reloaded from application and Admin Console [airgap bundles](/kotsadm/installing/airgap-packages/) using the [admin-console push-images](/kots-cli/admin-console/push-images/) command.
See [installation instructions](/kotsadm/installing/airgap-packages/#kots-install) for an example of using this command.
Registry address and namespace can be found on the Registry Settings page in Admin Console.
Registry username and password can be found in the `registry-creds` secret in the default namespace.

### Limitations
Currently the image garbage collection feature has following limitations:

#### Shared image registries
The image garbage collection process assumes that the registry is not shared with any other instances of KOTS nor any external applications.
If the embedded registry is used by another external application, this feature should be disabled to prevent image loss.

#### Customer supplied registries
This feature is currently only supported when used with the embedded kURL registry.
If the Admin Console instance is configured to use a different registry, this feature should be disabled to prevent image loss.

#### Application rollbacks
Currently image garbage collection has no effect when [application rollback](/reference/v1beta1/application/#allowrollback) is enabled.
