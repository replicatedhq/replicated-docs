# backup ls

:::note
This command is deprecated. Use [`kubectl kots get backups`](/reference/kots-cli-get-backups) instead.
:::

Show a list of all the available instance snapshots for disaster recovery.

### Usage

```bash
kubectl kots backup ls [flags]
```

This command supports the following flags:

| Flag              | Type   | Description                                                         |
| :---------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | Help for `backup ls`.                                                  |
| `-n, --namespace` | string | Filter by the namespace the admin console was installed in. |

### Example

```bash
kubectl kots backup ls --namespace kots-sentry
```
