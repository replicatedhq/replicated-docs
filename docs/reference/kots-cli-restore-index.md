# restore

The `kots restore` restores a full snapshot for disaster recovery.

### Usage

```bash
kubectl kots restore [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                                     |
| :---------------- | ------ | ------------------------------------------------------------------------------- |
| `-h, --help`      |        | help for restore                                                                |
| `--from-backup`   | string | the name of the backup to restore from _(required)_                             |
| `-o, --output`    | string | output format (currently supported: json) _(defaults to plain text if not set)_ |

### Example

```bash
kubectl kots restore --from-backup instance-942kf
```
