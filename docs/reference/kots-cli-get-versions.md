# get versions

The `kots get versions` command lists all versions of an application.

> Introduced in KOTS v1.61.0

### Usage

```bash
kubectl kots get versions [app-slug] [flags]
```

- _Replace `[app-slug]` with the app slug for your KOTS application (required)._
- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| :---------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | Help for `get apps`.                                                  |
| `-n, --namespace` | string | (Required) The namespace where the admin console is running.       |
| `-o, --output`    | string | Output format. **Supported formats**: `json`. **Default**: Plain text.|

### Example

```bash
kubectl kots get versions kots-sentry -n default
```
