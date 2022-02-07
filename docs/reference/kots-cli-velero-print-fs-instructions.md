# velero print-fs-instructions

Print instructions for setting up Velero with the current file system configuration (e.g. NFS, Host Path, etc..)

### Usage

```bash
kubectl kots velero print-fs-instructions [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| ----------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | help for ensure-permissions |
| `-n, --namespace` | string | the namespace of the admin console _(required)_ |
| `--output` | string | output format. supported values: json |

### Example

Basic

```bash
kubectl kots velero print-fs-instructions --namespace kots-sentry
```

Note: when using the `json` output format, the printed credentials will be Base64 encoded.
