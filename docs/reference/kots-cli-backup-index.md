# backup

Create a full instance snapshot for disaster recovery.

### Usage

```bash
kubectl kots backup [flags]
```

This command supports the following flags:

| Flag              | Type   | Description                                                                     |
| :---------------- | ------ | ------------------------------------------------------------------------------- |
| `-h, --help`      |        | Help for `backup`.                                                                 |
| `-n, --namespace` | string | The namespace where the admin console is running. **Default:** `default`        |
| `-o, --output`    | string | The output format. Supports JSON. Defaults to plain text if not set. |
| `--wait`.             | bool   | Wait for the backup to finish. **Default:** true                                     |

### Example

```bash
kubectl kots backup --namespace kots-sentry
```
