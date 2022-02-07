# backup ls

The `kots backup ls` command shows a list of all the available instance snapshots for disaster recovery.
A namespace can be provided to filter backups based on the namespace the admin console is/was installed in.

### Usage

```bash
kubectl kots backup ls [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| :---------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | help for backup ls                                                  |
| `-n, --namespace` | string | filter by the namespace in which the admin console is/was installed |

### Example

```bash
kubectl kots backup ls --namespace kots-sentry
```
