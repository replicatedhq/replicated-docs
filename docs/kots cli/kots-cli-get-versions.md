# get versions

The `kots get versions` command lists all versions of an application.

### Usage

```bash
kubectl kots get versions [app-slug] [flags]
```

- _Replace `[app-slug]` with the app slug for your KOTS application (required)._
- _Provide `[flags]` according to the table below_

| Flag              | Type   | Description                                                         |
| :---------------- | ------ | ------------------------------------------------------------------- |
| `-h, --help`      |        | help for get apps                                                   |
| `-n, --namespace` | string | the namespace where the admin console is running _(required)_       |
| `-o, --output`    | string | output format (currently supported: json) (defaults to plain text if not set)|

### Example

```bash
kubectl kots get versions kots-sentry -n default
```
