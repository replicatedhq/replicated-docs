# install

Installs the application and the admin console directly to a cluster.
The `kots install` command pulls Kubernetes manifests from the remote upstream, deploys the manifests to the specified cluster, installs the Replicated admin console, and sets up port forwarding to make the admin console accessible on port 8800.
Alternatively, you can specify the `--port` flag to override the default port.

### Usage

```bash
kubectl kots install [upstream uri] [flags]
```

- _Replace `[upstream-uri]` with the URI for your KOTS application (required)._
- _If the KOTS application has been packaged by Replicated Vendor, the `--license-file` flag must be provided._
- _Provide `[flags]` according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:

| Flag                        | Type   | Description                                                                                                                                                                                           |
|:----------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--airgap`                  | bool   | Set to `true` to run install in air gapped mode. Setting `--airgap-bundle` implies `--airgap=true`. **Default:** `false`. For more information, see [Installing in an Air Gapped Environment](../enterprise/installing-existing-cluster#air-gap). |
| `--airgap-bundle`           | string | Path to the application air gap bundle where application metadata will be loaded from. Setting `--airgap-bundle` implies `--airgap=true`. For more information, see [Installing in an Air Gapped Environment](../enterprise/installing-existing-cluster#air-gap).|
| `--app-version-label`       | string | The application version label to install. If not specified, the latest version is installed. |
| `--config-values`           | string | Path to a manifest file containing configuration values. This manifest must be `apiVersion: kots.io/v1beta1` and `kind: ConfigValues`. For more information, see [Define Application Configuration Values](../enterprise/installing-existing-cluster-automation#define-application-configuration-values).|
| `--copy-proxy-env`          | bool   | Copy proxy environment variables from current environment into all admin console components. **Default:** `false`|
| `--disable-image-push`      | bool   | Set to `true` to disable images from being pushed to private registry. **Default:** `false`|
| `--ensure-rbac`             | bool   | When `false`, KOTS does not attempt to create the RBAC resources necessary to manage applications. **Default:** `true`. If a role specification is needed, use the [generate-manifests](kots-cli-admin-console-generate-manifests) command. |
| `-h, --help`                |        | Help for install. |
| `--http-proxy`              | string | Sets HTTP_PROXY environment variable in all admin console components.  |
| `--https-proxy`             | string | Sets HTTPS_PROXY environment variable in all admin console components. |
| `--kotsadm-namespace`       | string | Set to override the namespace of kotsadm images. Used for air gapped installations. For more information, see [Installing in an Air Gapped Environment](../enterprise/installing-existing-cluster#air-gap). |
| `--kotsadm-registry`        | string | Set to override the registry of kotsadm images. Used for air gapped installations. For more information, see [Installing in an Air Gapped Environment](../enterprise/installing-existing-cluster#air-gap). |
| `--license-file`            | string | Path to a license file. |
| `--local-path`              | string | Specify a local-path to test the behavior of rendering a Replicated application locally. Only supported on Replicated application types.   |
| `--name`                    | string | Name of the application to use in the admin console. |
| `--no-port-forward`         | bool   | Set to `true` to disable automatic port forward. **Default:** `false` |
| `--no-proxy`                | string | Sets NO_PROXY environment variable in all admin console components. |
| `--port`                    | string | Override the local port to access the admin console. **Default:** 8800 |
| `--preflights-wait-duration`| string | Timeout to be used while waiting for preflights to complete. Must be in [Go duration](https://pkg.go.dev/time#ParseDuration) format. For example, 10s, 2m. **Default:** 15m |
| `--registry-password`       | string | Password to use to authenticate with the application registry. Used for air gapped installations. For more information, see [Installing in an Air Gapped Environment](../enterprise/installing-existing-cluster#air-gap).|
| `--registry-username`       | string | Username to use to authenticate with the application registry. Used for air gapped installations. For more information, see [Installing in an Air Gapped Environment](../enterprise/installing-existing-cluster#air-gap).|
| `--repo`                    | string | Repo URI to use when installing a Helm chart. |
| `--set`                     | strings| Values to pass to Helm when running `helm template`. |
| `--shared-password`         | string | Shared password to use when deploying the admin console.  |
| `--skip-compatibility-check`| bool   | Set to `true` to skip compatibility checks between the current KOTS version and the application. **Default:** `false` |
| `--skip-preflights`         | bool   | Set to `true` to skip preflight checks. **Default:** `false`. If any strict preflight checks are configured, the `--skip-preflights` flag is not honored because strict preflight checks must run and contain no failures before the application is deployed. For more information, see [About Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-creating#about-preflight-checks-and-support-bundles).|
| `--skip-rbac-check`         | bool   | Set to `true` to bypass RBAC check. **Default:** `false`|
| `--strict-security-context` | bool   | Set to `true` to explicitly enable explicit security contexts for all KOTS pods and containers. **Default:** `false`. **Note**: Might not work for some storage providers. |
| `--use-minimal-rbac`        | bool   | When set to `true`, KOTS RBAC permissions are limited to the namespace where it is installed. To use  `--use-minimal-rbac`, the application must support namespace-scoped installations and the user must have the minimum RBAC permissions required by KOTS in the target namespace. For a complete list of requirements, see [Namespace-scoped RBAC Requirements​](/enterprise/installing-general-requirements#namespace-scoped) in _Installation Requirements_. **Default:** `false` |
| `--wait-duration`           | string | Timeout to be used while waiting for individual components to be ready. Must be in [Go duration](https://pkg.go.dev/time#ParseDuration) format. For example, 10s, 2m. **Default:** 2m |
| `--with-minio`              | bool   | When set to `true`, KOTS deploys a local MinIO instance for storage and uses MinIO for host path and NFS snapshot storage. **Default:** `true` |

### Examples

```bash
kubectl kots install sentry/unstable --license-file ~/license.yaml
kubectl kots install kots-sentry/stable --shared-password IgqG5OBc9Gp --license-file ~/sentry-license.yaml --namespace sentry-namespace --config-values ~/config-values.yaml
kubectl kots install --ensure-rbac=false
```
