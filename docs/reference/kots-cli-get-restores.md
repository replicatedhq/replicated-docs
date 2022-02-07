# get restores

The `kots get restores` command lists created full snapshot restores.

### Usage

```bash
kubectl kots get restores [flags]
```

- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| :---------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | help for get restores                                               |
| `-n, --namespace` | string | filter by the namespace in which the admin console is/was installed |

### Examples

Basic

```bash
kubectl kots get restores
```

Filtering by a namespace

```bash
kubectl kots get restores -n default
```
