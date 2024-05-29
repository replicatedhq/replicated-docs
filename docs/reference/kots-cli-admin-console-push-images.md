# admin-console push-images

Pushes images from an air gap bundle to a private registry.
The air gap bundle can be either a KOTS Admin Console release or an application release.

### Usage
```bash
kubectl kots admin-console push-images [airgap-bundle] [private-registry] [flags]
```

This command supports all [global flags](kots-cli-global-flags) and also:

| Flag                    | Type   | Description                         |
|:------------------------|--------|-------------------------------------|
| `-h, --help`            |        | Help for the command          |
| `--registry-username`   | string | username for the private registry   |
| `--registry-password`   | string | password for the private registry   |
| `--skip-registry-check` | bool   | Set to `true` to skip the connectivity test and validation of the provided registry information. **Default:** `false` |

### Examples
```bash
kubectl kots admin-console push-images ./kotsadm.tar.gz private.registry.host/app-name \
  --registry-username rw-username \
  --registry-password rw-password
```
