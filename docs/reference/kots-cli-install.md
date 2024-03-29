import StrictSecurityContext from "../partials/kots-cli/_strict-security-context.mdx"

# install

Installs the application and the Replicated admin console directly to a cluster.
The `kots install` command pulls Kubernetes manifests from the remote upstream, deploys the manifests to the specified cluster, installs the admin console, and sets up port forwarding to make the admin console accessible on port 8800.
Alternatively, you can specify the `--port` flag to override the default port.

### Usage

```bash
kubectl kots install [upstream uri] [flags]
```

- _Replace [upstream-uri] with the URI for your KOTS application (required)._
- _If the KOTS application has been packaged by Replicated Vendor, the `--license-file` flag must be provided._
- _Provide [flags] according to the table below_

This command supports all [global flags](kots-cli-global-flags) and also:

<table>
    <tr>
        <td>Flag</td>
        <td>Type</td>
        <td>Description</td>
    </tr>
    <tr>
        <td><code>--airgap</code></td>
        <td>bool</td>
        <td>Set to <code>true</code> to run install in air gapped mode. Setting <code>--airgap-bundle</code> implies <code>--airgap=true</code>. <strong>Default:</strong> <code>false</code>. For more information, see <a href="/enterprise/installing-existing-cluster-airgapped">Air Gap Installation in Existing Clusters</a>.</td>
    </tr>
    <tr>
        <td><code>--airgap-bundle</code></td>
        <td>string</td>
        <td>Path to the application air gap bundle where application metadata will be loaded from. Setting <code>--airgap-bundle</code> implies <code>--airgap=true</code>. For more information, see <a href="/enterprise/installing-existing-cluster-airgapped">Air Gap Installation in Existing Clusters</a>.</td>
    </tr>
    <tr>
        <td><code>--app-version-label</code></td>
        <td>string</td>
        <td>The application version label to install. If not specified, the latest version is installed.</td>
    </tr>
    <tr>
        <td><code>--config-values</code></td>
        <td>string</td>
        <td>Path to a manifest file containing configuration values. This manifest must be <code>apiVersion: kots.io/v1beta1</code> and <code>kind: ConfigValues</code>. For more information, see <a href="/enterprise/installing-existing-cluster-automation#define-application-configuration-values">Define Application Configuration Values</a>.</td>
    </tr>
    <tr>
        <td><code>--copy-proxy-env</code></td>
        <td>bool</td>
        <td>Copy proxy environment variables from current environment into all admin console components. <strong>Default:</strong> <code>false</code></td>
    </tr>
    <tr>
        <td><code>--disable-image-push</code></td>
        <td>bool</td>
        <td>Set to <code>true</code> to disable images from being pushed to private registry. <strong>Default:</strong> <code>false</code></td>
    </tr>
    <tr>
        <td><code>--ensure-rbac</code></td>
        <td>bool</td>
        <td>When <code>false</code>, KOTS does not attempt to create the RBAC resources necessary to manage applications. <strong>Default:</strong> <code>true</code>. If a role specification is needed, use the [generate-manifests](kots-cli-admin-console-generate-manifests) command.</td>
    </tr>
    <tr>
        <td><code>-h, --help</code></td>
        <td></td>
        <td>Help for install.</td>
    </tr>
    <tr>
        <td><code>--http-proxy</code></td>
        <td>string</td>
        <td>Sets HTTP_PROXY environment variable in all admin console components.</td>
    </tr>
    <tr>
        <td><code>--https-proxy</code></td>
        <td>string</td>
        <td>Sets HTTPS_PROXY environment variable in all admin console components.</td>
    </tr>
    <tr>
        <td><code>--kotsadm-namespace</code></td>
        <td>string</td>
        <td>Set to override the namespace of kotsadm images. Used for air gapped installations. For more information, see [Air Gap Installation in Existing Clusters](/enterprise/installing-existing-cluster-airgapped).</td>
    </tr>
    <tr>
        <td><code>--kotsadm-registry</code></td>
        <td>string</td>
        <td>Set to override the registry of kotsadm images. Used for air gapped installations. For more information, see [Air Gap Installation in Existing Clusters](/enterprise/installing-existing-cluster-airgapped).</td>
    </tr>
    <tr>
        <td><code>--license-file</code></td>
        <td>string</td>
        <td>Path to a license file.</td>
    </tr>
    <tr>
        <td><code>--local-path</code></td>
        <td>string</td>
        <td>Specify a local-path to test the behavior of rendering a Replicated application locally. Only supported on Replicated application types.</td>
    </tr>
    <tr>
        <td><code>--name</code></td>
        <td>string</td>
        <td>Name of the application to use in the admin console.</td>
    </tr>
    <tr>
        <td><code>--no-port-forward</code></td>
        <td>bool</td>
        <td>Set to <code>true</code> to disable automatic port forward. <strong>Default:</strong> <code>false</code></td>
    </tr>
    <tr>
        <td><code>--no-proxy</code></td>
        <td>string</td>
        <td>Sets NO_PROXY environment variable in all admin console components.</td>
    </tr>
    <tr>
        <td><code>--port</code></td>
        <td>string</td>
        <td>Override the local port to access the admin console. <strong>Default:</strong> 8800</td>
    </tr>
    <tr>
        <td><code>--preflights-wait-duration</code></td>
        <td>string</td>
        <td>Timeout to be used while waiting for preflights to complete. Must be in [Go duration](https://pkg.go.dev/time#ParseDuration) format. For example, 10s, 2m. <strong>Default:</strong> 15m</td>
    </tr>
    <tr>
        <td><code>--registry-password</code></td>
        <td>string</td>
        <td>Password to use to authenticate with the application registry. Used for air gapped installations. For more information, see [Air Gap Installation in Existing Clusters](/enterprise/installing-existing-cluster-airgapped).</td>
    </tr>
    <tr>
        <td><code>--registry-username</code></td>
        <td>string</td>
        <td>Username to use to authenticate with the application registry. Used for air gapped installations. For more information, see [Air Gap Installation in Existing Clusters](/enterprise/installing-existing-cluster-airgapped).</td>
    </tr>
    <tr>
        <td><code>--repo</code></td>
        <td>string</td>
        <td>Repo URI to use when installing a Helm chart.</td>
    </tr>
    <tr>
        <td><code>--shared-password</code></td>
        <td>string</td>
        <td>Shared password to use when deploying the admin console.</td>
    </tr>
    <tr>
        <td><code>--skip-compatibility-check</code></td>
        <td>bool</td>
        <td>Set to <code>true</code> to skip compatibility checks between the current KOTS version and the application. <strong>Default:</strong> <code>false</code></td>
    </tr>
    <tr>
        <td><code>--skip-preflights</code></td>
        <td>bool</td>
        <td>Set to <code>true</code> to skip preflight checks. <strong>Default:</strong> <code>false</code>. If any strict preflight checks are configured, the <code>--skip-preflights</code> flag is not honored because strict preflight checks must run and contain no failures before the application is deployed. For more information, see [Defining Preflight Checks](/vendor/preflight-defining).</td>
    </tr>
    <tr>
        <td><code>--skip-rbac-check</code></td>
        <td>bool</td>
        <td>Set to <code>true</code> to bypass RBAC check. <strong>Default:</strong> <code>false</code></td>
    </tr>
    <tr>
        <td><code>--skip-registry-check</code></td>
        <td>bool</td>
        <td>Set to <code>true</code> to skip the connectivity test and validation of the provided registry information. <strong>Default:</strong> <code>false</code></td>
    </tr>
    <StrictSecurityContext/>
    <tr>
        <td><code>--use-minimal-rbac</code></td>
        <td>bool</td>
        <td>When set to <code>true</code>, KOTS RBAC permissions are limited to the namespace where it is installed. To use  <code>--use-minimal-rbac</code>, the application must support namespace-scoped installations and the user must have the minimum RBAC permissions required by KOTS in the target namespace. For a complete list of requirements, see [Namespace-scoped RBAC Requirements​](/enterprise/installing-general-requirements#namespace-scoped) in _Installation Requirements_. <strong>Default:</strong> <code>false</code></td>
    </tr>
    <tr>
        <td><code>--wait-duration</code></td>
        <td>string</td>
        <td>Timeout to be used while waiting for individual components to be ready. Must be in [Go duration](https://pkg.go.dev/time#ParseDuration) format. For example, 10s, 2m. <strong>Default:</strong> 2m</td>
    </tr>
    <tr>
        <td><code>--with-minio</code></td>
        <td>bool</td>
        <td>When set to <code>true</code>, KOTS deploys a local MinIO instance for storage and uses MinIO for host path and NFS snapshot storage. <strong>Default:</strong> <code>true</code></td>
    </tr>
</table>


### Examples

```bash
kubectl kots install sentry/unstable --license-file ~/license.yaml
kubectl kots install kots-sentry/stable --shared-password IgqG5OBc9Gp --license-file ~/sentry-license.yaml --namespace sentry-namespace --config-values ~/config-values.yaml
kubectl kots install --ensure-rbac=false
```
