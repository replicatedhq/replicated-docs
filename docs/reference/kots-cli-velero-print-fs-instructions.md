# velero print-fs-instructions

:::note
This command is deprecated. Use [`kubectl kots velero configure-hostpath`](/reference/kots-cli-velero-configure-hostpath) or [`kubectl kots velero configure-nfs`](/reference/kots-cli-velero-configure-nfs) instead.
:::

Prints instructions for setting up a file system as the snapshots storage destination (such as NFS or host path).

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
