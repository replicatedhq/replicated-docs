# upstream upgrade

The `kots upstream upgrade` fetches the latest version of the upstream application.
It is functionality equivalent to clicking the "Check For Updates" in the Admin Console.

## Usage
```bash
kubectl kots upstream upgrade [app-slug] [flags]
```
* _Replace `[app-slug]` with the app slug for your KOTS application (required)._
* _Provide `[flags]` according to the table below_

| Flag                     | Type   | Description                                                                                      |
|:-------------------------|--------|--------------------------------------------------------------------------------------------------|
| `-h, --help`             |        | help for upstream                                                                                |
| `--kubeconfig`           | string | the kubeconfig to use. **Default:** `$KUBECONFIG`. If unset, then `$HOME/.kube/config`         |
| `-n, --namespace`        | string | (Required) the namespace where the Admin Console is running                                    |
| `--deploy`               | bool   | ensures the latest available release is deployed                                                 |
| `--deploy-version-label` | string | ensures the release with the provided version label is deployed                                  |
| `--skip-preflights`      | bool   | set to true to skip preflight checks                                                             |
| `--airgap-bundle`        | string | path to the application airgap bundle where application images and metadata will be loaded from  |
| `--kotsadm-namespace`    | string | the registry namespace to use for application images                                             |
| `--kotsadm-registry`     | string | the registry endpoint where application images will be pushed                                    |
| `--registry-password`    | string | the password to use to authenticate with the registry                                            |
| `--registry-username`    | string | the username to use to authenticate with the registry                                            |
| `--disable-image-push`   | bool   | set to true to disable images from being pushed to private registry. **Default:** `false`       |
| `--skip-registry-check`  | bool   | Set to `true` to skip the connectivity test and validation of the provided registry information. **Default:** `false` |
| `--wait`                 | bool   | set to false to download the updates in the background **Default:** `true`                      |
| `-o, --output`           | string | output format (currently supported: json). **Default:** Plain text if not set                  |


#### About Strict Preflight Checks

If any strict preflight checks are configured, the `--skip-preflights` flag are not honored because the preflight checks must run and contain no failures before the application is deployed.

When the `--deploy` option is provided and there are strict preflight checks, the preflight checks always run. The deployment waits for up to 15 minutes for the preflight checks to complete. If the checks complete without strict preflight failures, the release deploys. If the checks do not complete within 15 minutes, the release does not deploy. If there are one or more strict preflight failures, the release does not deploy.

For more information about strict preflight checks, see [Define Preflight Checks](/vendor/preflight-defining).


## Example
```bash
kubectl kots upstream upgrade kots-sentry --namespace kots-sentry
```