# velero ensure-permissions

Ensures the necessary permissions that enables the Admin Console to access Velero.

### Usage

```bash
kubectl kots velero ensure-permissions [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| ----------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | help for ensure-permissions |
| `-n, --namespace` | string | the namespace where the admin console is running _(required)_ |
| `--velero-namespace` | string | the namespace where velero is running _(required)_ |

### Example

```bash
kubectl kots velero ensure-permissions --namespace kots-sentry --velero-namespace velero
```
