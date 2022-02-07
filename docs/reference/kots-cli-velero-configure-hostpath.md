# velero configure-hostpath

Configure snapshots to use a host path as storage destination.

### Usage

```bash
kubectl kots velero configure-hostpath [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| ----------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | help for configure-hostpath |
| `-n, --namespace` | string | the namespace of the admin console _(required)_ |
| `--hostpath` | string | a local host path on the node |
| `--kotsadm-namespace` | string | set to override the namespace of kotsadm images. used for airgapped installations. |
| `--kotsadm-registry`  | string | set to override the registry of kotsadm images. used for airgapped installations. |
| `--registry-password` | string | password to use to authenticate with the provided registry. used for airgapped installations. |
| `--registry-username` | string | username to use to authenticate with the provided registry. used for airgapped installations. |
| `--force-reset` | bool | bypass the reset prompt and force resetting the host path directory. _(default `false`)_ |
| `--output` | string | output format. supported values: json |

### Examples

Basic

```bash
kubectl kots velero configure-hostpath --hostpath /mnt/kots-sentry-snapshots --namespace kots-sentry
```

Using a registry for airgapped installations

```bash
kubectl kots velero configure-hostpath \
  --hostpath /mnt/kots-sentry-snapshots \
  --namespace kots-sentry \
  --kotsadm-registry private.registry.host \
  --kotsadm-namespace kots-sentry \
  --registry-username ro-username \
  --registry-password ro-password
```
