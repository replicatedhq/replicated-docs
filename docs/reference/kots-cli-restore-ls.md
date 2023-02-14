# restore ls

Show a list of all the available full snapshot restores for disaster recovery.

### Usage

```bash
kubectl kots restore ls [flags]
```

This command supports the following flags:

| Flag              | Type   | Description                                                         |
| :---------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | Help for `restore ls`.                                                 |
| `-n, --namespace` | string | Filter by the namespace the admin console was installed in.|

### Example

```bash
kubectl kots restore ls --namespace kots-sentry
```
