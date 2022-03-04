# upstream download

The `kots upstream download` command retries downloading a failed update of the upstream application.

> Introduced in KOTS v1.65.0

### Usage
```bash
kubectl kots upstream download [app-slug] [flags]
```
* _Replace `[app-slug]` with the app slug for your KOTS application (required)._
* _Provide `[flags]` according to the table below._

| Flag                              | Type   | Description                                                                                      |
|:----------------------------------|--------|--------------------------------------------------------------------------------------------------|
| `-h, --help`                      |        | Help for `upstream download`.                                                                       |
| `--kubeconfig`                    | string | The kubeconfig to use. **Default**: `$KUBECONFIG`. If unset, then `$HOME/.kube/config`.          |
| `-n, --namespace`                 | string | (Required) The namespace where the admin console is running.                                    |
| `--sequence`                      | int    | (Required) The local app sequence for the version to retry downloading.                         |
| `--skip-preflights`               | bool   | Set to `true` to skip preflight checks.                                                             |
| `--skip-compatibility-check`      | bool   | Set to `true` to skip compatibility checks between the current kots version and the update.         |
| `--wait`                          | bool   | Set to `false` to download the update in the background. **Default**: `true`.                         |
| `-o, --output`                    | string | Output format. **Supported formats**: `json`. **Default**: Plain text.                  |

### Example
```bash
kubectl kots upstream download kots-sentry --namespace kots-sentry --sequence 8
```
