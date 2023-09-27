import Help from "../partials/replicated-cli/_help.mdx"

# install

Installs the application and the Replicated admin console directly to a cluster.
The `kots install` command pulls Kubernetes manifests from the remote upstream, deploys the manifests to the specified cluster, installs the admin console, and sets up port forwarding to make the admin console accessible on port 8800.
Alternatively, you can specify the `--port` flag to override the default port.

## Usage

```bash
kubectl kots install [upstream uri] [flags]
```

Where `[upstream-uri]` is the URI for the application (required).

## Flags

This command supports all [global flags](kots-cli-global-flags) and also:

<table>
  <tr>
    <th>Flag</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>--airgap</td>
    <td>bool</td>
    <td>Set to <code>true</code> to run install in air gapped mode. Setting <code>--airgap-bundle</code> implies <code>--airgap=true</code>. <strong>Default:</strong> <code>false</code>. For more information, see <a href="/enterprise/installing-existing-cluster-airgapped">Air Gap Installation in Existing Clusters</a>.</td>
  </tr>
  <tr>
    <td>--airgap-bundle</td>
    <td>string</td>
    <td>Path to the application air gap bundle where application metadata will be loaded from. Setting <code>--airgap-bundle</code> implies <code>--airgap=true</code>. For more information, see <a href="/enterprise/installing-existing-cluster-airgapped">Air Gap Installation in Existing Clusters</a>.</td>
  </tr>
  <tr>
    <td>--app-version-label</td>
    <td>string</td>
    <td>The application version label to install. If not specified, the latest version is installed. </td>
  </tr>
  <tr>
    <td>--config-values</td>
    <td>string</td>
    <td>Path to a manifest file containing configuration values. This manifest must be <code>apiVersion: kots.io/v1beta1</code> and <code>kind: ConfigValues</code>. For more information, see <a href="/enterprise/installing-existing-cluster-automation#define-application-configuration-values">Define Application Configuration Values</a>.</td>
  </tr>
  <tr>
    <td>--copy-proxy-env</td>
    <td>bool</td>
    <td>Copy proxy environment variables from current environment into all admin console components. <strong>Default:</strong> <code>false</code></td>
  </tr>
  <tr>
    <td>--disable-image-push</td>
    <td>bool</td>
    <td>Set to <code>true</code> to disable images from being pushed to private registry. <strong>Default:</strong> <code>false</code></td>
  </tr>
  <tr>
    <td>--ensure-rbac</td>
    <td>bool</td>
    <td>When <code>false</code>, KOTS does not attempt to create the RBAC resources necessary to manage applications. <strong>Default:</strong> <code>true</code>. If a role specification is needed, use the <a href="kots-cli-admin-console-generate-manifests">generate-manifests</a> command.</td>
  </tr>
  <Help/>
  <tr>
    <td>--http-proxy</td>
    <td>string</td>
    <td>Sets HTTP_PROXY environment variable in all admin console components.</td>
  </tr>
  <tr>
    <td>--https-proxy</td>
    <td>string</td>
    <td>Sets HTTPS_PROXY environment variable in all admin console components.</td>
  </tr>
  <tr>
    <td>--kotsadm-namespace</td>
    <td>string</td>
    <td>Set to override the namespace of kotsadm images. Used for air gapped installations. For more information, see <a href="/enterprise/installing-existing-cluster-airgapped">Air Gap Installation in Existing Clusters</a>.</td>
  </tr>
  <tr>
    <td>--kotsadm-registry</td>
    <td>string</td>
    <td>Set to override the registry of kotsadm images. Used for air gapped installations. For more information, see <a href="/enterprise/installing-existing-cluster-airgapped">Air Gap Installation in Existing Clusters</a>.</td>
  </tr>
  <tr>
    <td>--license-file</td>
    <td>string</td>
    <td>Path to a license file.</td>
  </tr>
  <tr>
    <td>--local-path`</td>
    <td>string</td>
    <td>Specify a local-path to test the behavior of rendering a Replicated application locally. Only supported on Replicated application types.</td>
  </tr>
  <tr>
    <td>--name</td>
    <td>string</td>
    <td>Name of the application to use in the admin console.</td>
  </tr>
  <tr>
    <td>--no-port-forward</td>
    <td>bool</td>
    <td>Set to <code>true</code> to disable automatic port forward. <strong>Default:</strong> <code>false</code>.</td>
  </tr>
  <tr>
    <td>--no-proxy</td>
    <td>string</td>
    <td>Sets NO_PROXY environment variable in all admin console components.</td>
  </tr>
  <tr>
    <td>--port</td>
    <td>string</td>
    <td>Override the local port to access the admin console. <strong>Default:</strong> 8800 </td>
  </tr>
  <tr>
    <td>--preflights-wait-duration</td>
    <td>string</td>
    <td>Timeout to be used while waiting for preflights to complete. Must be in <a href="https://pkg.go.dev/time#ParseDuration">Go duration</a> format. For example, 10s, 2m. <strong>Default:</strong> 15m</td>
  </tr>
  <tr>
    <td>--registry-password</td>
    <td>string</td>
    <td>Password to use to authenticate with the application registry. Used for air gapped installations. For more information, see <a href="/enterprise/installing-existing-cluster-airgapped">Air Gap Installation in Existing Clusters</a>.</td>
  </tr>
  <tr>
    <td>--registry-username</td>
    <td>string</td>
    <td>Username to use to authenticate with the application registry. Used for air gapped installations. For more information, see <a href="/enterprise/installing-existing-cluster-airgapped">Air Gap Installation in Existing Clusters</a>.</td>
  </tr>
  <tr>
    <td>--repo</td>
    <td>string</td>
    <td>Repo URI to use when installing a Helm chart.</td>
  </tr>
  <tr>
    <td>--set</td>
    <td>strings</td>
    <td>Values to pass to Helm when running `helm template`.</td>
  </tr>
  <tr>
    <td>--shared-password</td>
    <td>string</td>
    <td>Shared password to use when deploying the admin console.</td>
  </tr>
  <tr>
    <td>--skip-compatibility-check</td>
    <td>bool</td>
    <td>Set to <code>true</code> to skip compatibility checks between the current KOTS version and the application. <strong>Default:</strong> <code>false</code>.</td>
  </tr>
  <tr>
    <td>--skip-preflights</td>
    <td>bool</td>
    <td>Set to <code>true</code> to skip preflight checks. <strong>Default:</strong> <code>false</code>. If any strict preflight checks are configured, the <code>--skip-preflights</code> flag is not honored because strict preflight checks must run and contain no failures before the application can be deployed. For more information, see <a href="/vendor/preflight-kots-defining">Define KOTS Preflight Checks</a>.</td>
  </tr>
  <tr>
    <td>--skip-rbac-check</td>
    <td>bool</td>
    <td>Set to <code>true</code> to bypass RBAC check. <strong>Default:</strong> <code>false</code>.</td>
  </tr>
  <tr>
    <td>--skip-registry-check</td>
    <td>bool</td>
    <td>Set to <code>true</code> to skip the connectivity test and validation of the provided registry information. <strong>Default:</strong> <code>false</code>.</td>
  </tr>
  <tr>
    <td>--strict-security-context</td>
    <td>bool</td>
    <td><p>Set to <code>true</code> to explicitly enable explicit security contexts for all KOTS pods and containers. <strong>Default:</strong> <code>false</code>.</p> <p><strong>Note:</strong> Might not work for some storage providers.</p></td>
  </tr>
  <tr>
    <td>--use-minimal-rbac</td>
    <td>bool</td>
    <td>When <code>true</code>, KOTS RBAC permissions are limited to the namespace where KOTS is installed. To use  <code>--use-minimal-rbac</code>, the application must support namespace-scoped installations and the user must have the minimum RBAC permissions required by KOTS in the target namespace. For a complete list of requirements, see [Namespace-scoped RBAC Requirements​](/enterprise/installing-general-requirements#namespace-scoped) in _Installation Requirements_. <strong>Default:</strong> <code>false</code>.</td>
  </tr>
  <tr>
    <td>--wait-duration</td>
    <td>string</td>
    <td>Timeout to be used while waiting for individual components to be ready. Must be in <a href="https://pkg.go.dev/time#ParseDuration">Go duration</a> format. For example, 10s, 2m. <strong>Default:</strong> 2m</td>
  </tr>
  <tr>
    <td>--with-minio</td>
    <td>bool</td>
    <td><p>When <code>true</code>, KOTS deploys a local MinIO instance for storage of application archives, support bundles, and snapshots configured to either the host path or NFS storage destination.</p>
    <p>When <code>false</code>, KOTS is installed as a Statefulset with an attached PersistentVolume (PV). See <a href="https://github.com/replicatedhq/local-volume-provider">local-volume-provider</a> in GitHub. </p>
    <p><strong>Default:</strong> <code>true</code>.</p>
    </td>
  </tr>
</table>

### Examples

```bash
kubectl kots install sentry/unstable --license-file ~/license.yaml
kubectl kots install kots-sentry/stable --shared-password IgqG5OBc9Gp --license-file ~/sentry-license.yaml --namespace sentry-namespace --config-values ~/config-values.yaml
kubectl kots install --ensure-rbac=false
```
