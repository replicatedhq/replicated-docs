# restore

Restore full snapshots for disaster recovery, or do a partial restore of the application only or the admin console only.

### Usage

```bash
kubectl kots restore --from-backup [flags]
```

This command supports the following flags:

| Flag                        | Type   | Description                                                                                   |
| :-------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| `--exclude-admin-console`   | bool   | Exclude restoring the admin console and only restore the applications. **Default:** false |
| `--exclude-apps`            | bool   | Exclude restoring the applications and only restore the admin console. **Default:** false |
| `--from-backup`             | string | (Required) The name of the backup to restore from. |
| `-h, --help`                |        | Help for `restore`.                                                                              |
| `-o, --output`              | string | The output format. Supports JSON. Defaults to plain text if not set. |
| `--velero-namespace`        | string | (Required for minimal RBAC installations) The namespace where Velero is installed. |
| `--wait-for-apps`           | bool   | Wait for all applications to be restored. **Default:** true |

### Example

```bash
kubectl kots restore --from-backup instance-942kf
```
