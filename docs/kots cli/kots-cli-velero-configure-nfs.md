# velero configure-nfs

Configures snapshots to use NFS as storage destination.

### Usage

```bash
kubectl kots velero configure-nfs [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| ----------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | help for configure-nfs |
| `-n, --namespace` | string | the namespace of the admin console _(required)_ |
| `--nfs-server` | string | the hostname or IP address of the NFS server _(required)_ |
| `--nfs-path` | string | the path that is exported by the NFS server _(required)_ |
| `--kotsadm-namespace` | string | set to override the namespace of kotsadm images. used for airgapped installations. |
| `--kotsadm-registry`  | string | set to override the registry of kotsadm images. used for airgapped installations. |
| `--registry-password` | string | password to use to authenticate with the provided registry. used for airgapped installations. |
| `--registry-username` | string | username to use to authenticate with the provided registry. used for airgapped installations. |
| `--force-reset` | bool | bypass the reset prompt and force resetting the nfs path. _(default `false`)_ |
| `--output` | string | output format. supported values: json |

### Examples

Basic

```bash
kubectl kots velero configure-nfs --nfs-server 10.128.0.32 --nfs-path /mnt/nfs_share --namespace kots-sentry
```

Using a registry for airgapped installations

```bash
kubectl kots velero configure-nfs \
  --nfs-server 10.128.0.32 \
  --nfs-path /mnt/nfs_share \
  --namespace kots-sentry \
  --kotsadm-registry private.registry.host \
  --kotsadm-namespace kots-sentry \
  --registry-username ro-username \
  --registry-password ro-password
```
