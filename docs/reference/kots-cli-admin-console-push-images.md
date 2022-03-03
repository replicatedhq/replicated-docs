# admin-console push-images

Pushes images from an air gap bundle to a private registry.
The air gap bundle can be either a Replicated admin console release or an application release.

### Usage
```bash
kubectl kots admin-console push-images [airgap-bundle] [private-registry] [flags]
```

This command supports all [global flags](kots-cli-global-flags) and also:

| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-h, --help`   |  |          Help for the admin-console |
| `--registry-username` | string |   username for the private registry |
| `--registry-password` | string |   password for the private registry |

### Examples
```bash
kubectl kots admin-console push-images ./kotsadm.tar.gz private.registry.host/app-name \
  --registry-username rw-username \
  --registry-password rw-password
```
