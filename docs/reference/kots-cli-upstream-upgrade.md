# upstream upgrade

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

Note: If any [`strict preflights`](../docs/vendor/preflight-support-bundle-creating.md) are configured, the `--skip-preflights` flag will not be honored since preflight checks must run and contain no failures before the application can be deployed. 

When the `--deploy` option is provided and there are [`strict preflights`](../docs/vendor/preflight-support-bundle-creating.md), the preflight checks will always run. The deployment will wait up to 15 minutes for preflight checks to complete before deploying.

### Example
```bash
kubectl kots upstream upgrade kots-sentry --namespace kots-sentry
```
