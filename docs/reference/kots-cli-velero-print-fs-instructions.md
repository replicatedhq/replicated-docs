# velero print-fs-instructions

(Deprecated) Prints instructions for setting up a file system as the snapshots storage destination (e.g., NFS or Host Path).

This command is deprecated and will be removed in a future release. Please use [kots velero configure-hostpath](/reference/kots-cli-velero-configure-hostpath) or [kots velero configure-nfs](/reference/kots-cli-velero-configure-nfs) instead.

### Usage

```bash
kubectl kots velero print-fs-instructions [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| ----------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | help for ensure-permissions |
| `-n, --namespace` | string | the namespace of the admin console _(required)_ |

### Example

Basic

```bash
kubectl kots velero print-fs-instructions --namespace kots-sentry
```
