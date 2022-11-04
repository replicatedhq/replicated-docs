# pull

Running this command will create a directory on the workstation containing the application and Kubernetes manifests. These assets can be used to deploy KOTS to a cluster through other workflows, such as kubectl. This command is necessary when managing a application without the use of the admin console.

### Usage
```bash
kubectl kots pull [upstream uri] [flags]
```
* _Replace `[upstream-uri]` with the URI for your KOTS application (required)._
* _If the KOTS application has been packaged by Replicated Vendor, the `--license-file` flag must be provided._
* _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:

| Flag | Type | Description |
|:-----|------|-------------|
| `--downstream` | strings | the list of any downstreams to create/update |
| `--exclude-admin-console` | bool | set to true to exclude the admin console _(only valid when `[upstream-uri]` points to a replicated app)_ |
| `--exclude-kots-kinds` | bool | set to true to exclude rendering KOTS custom objects to the base directory _(default `true`)_ |
| `-h, --help` | | help for pull |
| `--image-namespace` | string | the namespace/org in the docker registry to push images to _(required when `--rewrite-images` is set)_ |
| `--license-file` | string | path to a license file _(required when `[upstream-uri]` points to a replicated app)_ |
| `--local-path` | string | specify a local-path to pull a locally available replicated app _(only valid when `[upstream-uri]` points to a replicated app)_ |
| `-n, --namespace` | string | namespace to render the upstream to in the base _(default `"default"`)_ |
| `--registry-endpoint` | string | the endpoint of the local docker registry to use when pushing images _(required when `--rewrite-images` is set)_ |
| `--rewrite-images` | bool | set to true to force all container images to be rewritten and pushed to a local registry |
| `--rootdir` | string | root directory that will be used to write the yaml to _(default `${HOME}` or `%USERPROFILE%`)_ |
| `--shared-password` | string | shared password to use when deploying the admin console |
| `--http-proxy` | string | sets HTTP_PROXY environment variable in all KOTS Admin Console components |
| `--https-proxy` | string | sets HTTPS_PROXY environment variable in all KOTS Admin Console components |
| `--no-proxy` | string | sets NO_PROXY environment variable in all KOTS Admin Console components |
| `--copy-proxy-env` | bool | copy proxy environment variables from current environment into all KOTS Admin Console components |
| `--config-values` | string | path to a manifest containing config values (must be apiVersion: kots.io/v1beta1, kind: ConfigValues) |
| `--with-minio` | bool | set to true to include a local minio instance to be used for storage _(default true)_ |

### Example
```bash
kubectl kots pull sentry/unstable --license-file ~/license.yaml
```
