# get backups

The `kots get backups` command lists available full snapshots (instance).

### Usage

```bash
kubectl kots get backups [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| :---------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | help for get backups                                                |
| `-n, --namespace` | string | filter by the namespace in which the admin console is/was installed |

### Examples

Basic

```bash
kubectl kots get backups
```

Filtering by a namespace

```bash
kubectl kots get backups -n default
```
