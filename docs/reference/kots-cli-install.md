# install

Installs the application and the admin console directly to a cluster.
The `kots install` command pulls Kubernetes manifests from the remote upstream, deploys the manifests to the specified cluster, installs the Replicated admin console, and sets up port forwarding to make the admin console accessible.

### Usage

```bash
kubectl kots install [upstream uri] [flags]
```

- _Replace `[upstream-uri]` with the URI for your KOTS application (required)._
- _If the KOTS application has been packaged by Replicated Vendor, the `--license-file` flag must be provided._
- _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:

| Flag                        | Type   | Description                                                                                                                                                                               |
|:----------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--airgap`                  | bool   | Set to true to run install in air gapped mode. Setting --airgap-bundle implies --airgap=true.                                                                                              |
| `--airgap-bundle`           | string | Path to the application air gap bundle where application metadata will be loaded from.                                                                                                      |
| `--config-values`           | string | Path to a manifest containing config values (must be apiVersion: kots.io/v1beta1, kind: ConfigValues).                                                                                      |
| `--copy-proxy-env`          | bool   | Copy proxy environment variables from current environment into all admin console components.                                                                                          |
| `--disable-image-push`      | bool   | Set to true to disable images from being pushed to private registry.                                                                                                                       |
| `--ensure-rbac`             | bool   | When set, kots skips RBAC configuration at installation time. **Default:** false. If a role specification is needed, use the [generate-manifests](kots-cli-admin-console-generate-manifests) command. |
| `-h, --help`                |        | Help for install.                                                                                                                                                                          |
| `--http-proxy`              | string | Sets HTTP_PROXY environment variable in all admin console components.                                                                                                                 |
| `--https-proxy`             | string | Sets HTTPS_PROXY environment variable in all admin console components.                                                                                                                |
| `--kotsadm-namespace`       | string | Set to override the namespace of kotsadm images. Used for air gapped installations.                                                                                                        |
| `--kotsadm-registry`        | string | Set to override the registry of kotsadm images. Used for air gapped installations.                                                                                                         |
| `--license-file`            | string | Path to a license file _(required when `[upstream-uri]` points to a replicated app)_.                                                                                                      |
| `--app-version-label`      | string | The application version label to install. If not specified, the latest version is installed.                                                                                                      |
| `--local-path`              | string | Specify a local-path to test the behavior of rendering a replicated application locally _(only supported on replicated app types currently)_.                                                      |
| `--name`                    | string | Name of the application to use in the admin console.                                                                                                                                       |
| `-n, --namespace`           | string | The namespace to deploy to.                                                                                                                                                                |
| `--no-port-forward`            | bool   | Set to true to disable automatic port forward. **Default:** false                                                                                                                            |
| `--no-proxy`                | string | Sets NO_PROXY environment variable in all admin console components.                                                                                                                   |
| `--registry-password`       | string | Password to use to authenticate with the application registry. Used for air gapped installations.                                                                                          |
| `--registry-username`       | string | Username to use to authenticate with the application registry. Used for air gapped installations.                                                                                          |
| `--shared-password`         | string | Shared password to apply.                                                                                                                                                                  |
| `--skip-preflights`         | bool   | Set to true to skip preflight checks.                                                                                                                                                      |
| `--strict-security-context` | bool   | Set to explicitly enable strict security contexts for all kots pods and containers (may not work for some storage providers) **Default:** false                                               |
| `--wait-duration`           | string | Timeout to be used while waiting for individual components to be ready. Must be in [Go duration](https://pkg.go.dev/time#ParseDuration) format (eg: 10s, 2m).                         |
| `--with-minio`              | bool   | When set, kots deploys a local minio instance for storage and use minio for hostpath and NFS snapshot storage. **Default:** true                                                          |

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
