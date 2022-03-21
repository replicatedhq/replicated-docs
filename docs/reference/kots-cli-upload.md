# upload

Upload Kubernetes manifests from the local filesystem, creating a new version of the application that can be deployed.
When you have a copy of an application that was created with `kots pull` or `kots download`, you can upload it back to the Admin Console using the `kots upload` command.

## Usage
```bash
kubectl kots upload [source] [flags]
```
* _Replace `[source]` with a directory containing the manifests of your KOTS application (required)._
* _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:


| Flag                 | Type | Description |
|:----------------------|------|-------------|
| `-h, --help`  |       |       help for upload |
| `--name`| string |          the name of the kotsadm application to create |
| `-n, --namespace`| string |     the namespace to upload to _(default `"default"`)_ |
| `--slug`| string |          the application slug to use. if not present, a new one will be created |
| `--upstream-uri`| string |  the upstream uri that can be used to check for updates |
| `--deploy`| bool |  when set, automatically deploy the uploaded version |
| `--skip-preflights`| bool |  set to true to skip preflight checks |
| `-o, --output` | string | output format (currently supported: json) _(defaults to plain text if not set)_ |


Any `plainText` values in the `upstream/userdata/config.yaml` file will be re-encrypted using the application cipher automatically, if the matching config item is a password type.
If both an encrypted and plainText value is provided on a single item, the plainText value will overwrite the encrypted value, if they differ.

#### About Strict Preflight Checks
If any strict preflight checks are configured, the `--skip-preflights` flag are not honored because the preflight checks must run and contain no failures before the application is deployed.

When the `--deploy` option is provided and there are strict preflight checks, the preflight checks always run. The deployment waits for up to 15 minutes for the preflight checks to complete. If the checks complete without strict preflight failures, the release deploys. If the checks do not complete within 15 minutes, the release does not deploy. If there are one or more strict preflight failures, the release does not deploy.

For more information about strict preflight checks, see [About Preflight Checks and Support Bundles](../vendor/preflight-support-bundle-creating#about-preflight-checks-and-support-bundles).


## Examples

```bash
kubectl kots upload ./manifests --name kots-sentry --namespace kots-sentry --slug kots-sentry --upstream-uri kots-sentry/unstable
```
