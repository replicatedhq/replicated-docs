# install

Installs the KOTS application and the admin console directly to a cluster.
The `kots install` command pulls Kubernetes manifests from the remote upstream, deploys the manifests to the specified cluster, installs the admin console, and sets up port forwarding to make the admin console accessible.

### Usage

```bash
kubectl kots install [upstream uri] [flags]
```

- _Replace `[upstream-uri]` with the URI for your KOTS application (required)._
- _If the KOTS application has been packaged by Replicated Vendor, the `--license-file` flag must be provided._
- _Provide `[flags]` according to the table below_

This command supports all [global flags](/kots-cli/global-flags/) and also:

| Flag                        | Type   | Description                                                                                                                                                                               |
|:----------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--airgap`                  | bool   | set to true to run install in airgapped mode. setting --airgap-bundle implies --airgap=true.                                                                                              |
| `--airgap-bundle`           | string | path to the application airgap bundle where application metadata will be loaded from                                                                                                      |
| `--config-values`           | string | path to a manifest containing config values (must be apiVersion: kots.io/v1beta1, kind: ConfigValues                                                                                      |
| `--copy-proxy-env`          | bool   | copy proxy environment variables from current environment into all KOTS Admin Console components                                                                                          |
| `-h, --help`                |        | help for install                                                                                                                                                                          |
| `--http-proxy`              | string | sets HTTP_PROXY environment variable in all KOTS Admin Console components                                                                                                                 |
| `--https-proxy`             | string | sets HTTPS_PROXY environment variable in all KOTS Admin Console components                                                                                                                |
| `--kotsadm-namespace`       | string | set to override the namespace of kotsadm images. used for airgapped installations.                                                                                                        |
| `--kotsadm-registry`        | string | set to override the registry of kotsadm images. used for airgapped installations.                                                                                                         |
| `--license-file`            | string | path to a license file _(required when `[upstream-uri]` points to a replicated app)_                                                                                                      |
| `--local-path`              | string | specify a local-path to test the behavior of rendering a replicated app locally _(only supported on replicated app types currently)_                                                      |
| `--name`                    | string | name of the application to use in the Admin Console                                                                                                                                       |
| `-n, --namespace`           | string | the namespace to deploy to                                                                                                                                                                |
| `--no-proxy`                | string | sets NO_PROXY environment variable in all KOTS Admin Console components                                                                                                                   |
| `--port-forward`            | bool   | set to false to disable automatic port forward (default true).                                                                                                                            |
| `--registry-password`       | string | password to use to authenticate with the application registry. used for airgapped installations.                                                                                          |
| `--registry-username`       | string | username to use to authenticate with the application registry. used for airgapped installations.                                                                                          |
| `--shared-password`         | string | shared password to apply                                                                                                                                                                  |
| `--skip-preflights`         | bool   | set to true to skip preflight checks                                                                                                                                                      |
| `--disable-image-push`      | bool   | set to true to disable images from being pushed to private registry                                                                                                                       |
| `--wait-duration`           | string | timeout out to be used while waiting for individual components to be ready. must be in [Go duration](https://pkg.go.dev/time#ParseDuration) format (eg: 10s, 2m).                         |
| `--with-minio`              | bool   | when set, kots will deploy a local minio instance for storage and use minio for hostpath and NFS snapshot storage (default true)                                                          |
| `--ensure-rbac`             | bool   | when set, kots will skip RBAC configuration at install time. (default false) if a role spec is needed, use the [generate-manifests](/kots-cli/admin-console/generate-manifests/) command. |
| `--strict-security-context` | bool   | set to explicitly enable strict security contexts for all kots pods and containers (may not work for some storage providers, default false)                                               |

<!-- | `--repo` | string | repo uri to use when installing a helm chart | -->
<!-- | `--set` | strings | values to pass to helm when running helm template | -->

### Examples

```bash
kubectl kots install sentry/unstable --license-file ~/license.yaml
kubectl kots install kots-sentry/stable --shared-password IgqG5OBc9Gp --license-file ~/sentry-license.yaml --namespace sentry-namespace --config-values ~/config-values.yaml
kubectl kots install --ensure-rbac=false
```

<!-- Helm example coming soon -->
<!-- kubectl kots install helm://elastic/elasticsearch -->
