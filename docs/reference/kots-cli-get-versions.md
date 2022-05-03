# get versions

The `kots get versions` command lists all versions of an application.

> Introduced in KOTS v1.61.0

### Usage

```bash
kubectl kots get versions [app-slug] [flags]
```

- _Replace `[app-slug]` with the app slug for your KOTS application (required)._
- _Provide `[flags]` according to the table below_

| Flag                      | Type   | Description                                                                                         |
| :------------------------ | ------ | --------------------------------------------------------------------------------------------------- |
| `-h, --help`              |        | Help for `get versions`.                                                                            |
| `-n, --namespace`         | string | (Required) The namespace where the admin console is running.                                        |
| `--current-page`          | int    | Offset, by page size, at which to start retrieving versions. **Default:** 0                         |
| `--page-size`             | int    | Number of versions to return. **Default:** 20                                                       |
| `--pin-latest`            | int    | When set to true, always returns the latest version at the beginning. **Default:** false            |
| `--pin-latest-deployable` | int    | When set to true, always returns the latest version that can be deployed. The latest deployable version can differ from the latest version if a required version, which cannot be skipped, is present. **Default:** false |
| `-o, --output`            | string | Output format. **Supported formats:** `json`. **Default:** Plain text                               |

### Example

```bash
kubectl kots get versions kots-sentry -n default
```
