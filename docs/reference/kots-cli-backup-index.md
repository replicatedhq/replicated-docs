# backup

The `kots backup` creates a new instance snapshot for disaster recovery.

### Usage

```bash
kubectl kots backup [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                                     |
| :---------------- | ------ | ------------------------------------------------------------------------------- |
| `-h, --help`      |        | help for backup                                                                 |
| `-n, --namespace` | string | the namespace where the admin console is running _(default `"default"`)_        |
| `-o, --output`    | string | output format (currently supported: json) _(defaults to plain text if not set)_ |

### Example

```bash
kubectl kots backup --namespace kots-sentry
```
