# restore ls

The `kots restore ls` command shows a list of all the available full snapshot restores for disaster recovery.
A namespace can be provided to filter restores based on the namespace the admin console is/was installed in.

### Usage

```bash
kubectl kots restore ls [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| :---------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | help for restore ls                                                 |
| `-n, --namespace` | string | filter by the namespace in which the admin console is/was installed |

### Example

```bash
kubectl kots restore ls --namespace kots-sentry
```
