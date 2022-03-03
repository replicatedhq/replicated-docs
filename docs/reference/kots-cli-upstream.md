# upstream

## upstream upgrade

The `kots upstream upgrade` fetches the latest version of the upstream application.
It is functionality equivalent to clicking the "Check For Updates" in the admin console.

### Usage
```bash
kubectl kots upstream upgrade [app-slug] [flags]
```
* _Replace `[app-slug]` with the app slug for your KOTS application (required)._
* _Provide `[flags]` according to the table below_

| Flag                     | Type   | Description                                                                                      |
|:-------------------------|--------|--------------------------------------------------------------------------------------------------|
| `-h, --help`             |        | help for upstream                                                                                |
| `--kubeconfig`           | string | the kubeconfig to use _(default is `$KUBECONFIG`. If unset, then `$HOME/.kube/config`)_          |
| `-n, --namespace`        | string | the namespace where the admin console is running _(required)_                                    |
| `--deploy`               | bool   | ensures the latest available release is deployed                                                 |
| `--deploy-version-label` | string | ensures the release with the provided version label is deployed                                  |
| `--skip-preflights`      | bool   | set to true to skip preflight checks                                                             |
| `--airgap-bundle`        | string | path to the application airgap bundle where application images and metadata will be loaded from  |
| `--kotsadm-namespace`    | string | the registry namespace to use for application images                                             |
| `--kotsadm-registry`     | string | the registry endpoint where application images will be pushed                                    |
| `--registry-password`    | string | the password to use to authenticate with the registry                                            |
| `--registry-username`    | string | the username to use to authenticate with the registry                                            |
| `--disable-image-push`   | bool   | set to true to disable images from being pushed to private registry                              |
| `--wait` | bool | set to false to download the updates in the background _(defaults to true)_
| `-o, --output`           | string | output format (currently supported: json) _(defaults to plain text if not set)_                  |

### Example
```bash
kubectl kots upstream upgrade kots-sentry --namespace kots-sentry
```

## upstream download

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
