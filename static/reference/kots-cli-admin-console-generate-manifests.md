# admin-console generate-manifests

Running this command will create a directory on the workstation containing the Replicated Admin Console manifests. These assets can be used to deploy KOTS to a cluster through other workflows, such as kubectl, to provide additional customization of the Admin Console before deploying.

### Limitations

* `generate-manifests` does not support generating manifests for Red Hat OpenShift clusters or GKE Autopilot clusters if executed without a Kubernetes cluster context.

* To upgrade a KOTS instance that has ever been on version 1.72.0 or earlier, you must run `generate-manifests` with a Kubernetes cluster context.

* The `admin-console generate-manifests` command does not accept the [`--strict-security-context`](/reference/kots-cli-install#usage) flag, which deploys KOTS Pods with a security context. To generate Admin Console manifests with a security context, add the following to the Pod templates for Deployments and StatefulSets deployed by KOTS:

    ```yaml
securityContext:
  fsGroup: 1001
  runAsGroup: 1001
  runAsNonRoot: true
  runAsUser: 1001
  seccompProfile:
    type: RuntimeDefault
  supplementalGroups:
  - 1001
```

### Usage
```bash
kubectl kots admin-console generate-manifests [flags]
```

This command supports the following flags:

<table>
    <tr>
        <td>Flag</td>
        <td>Type</td>
        <td>Description</td>
    </tr>
    <tr>
        <td><code>--rootdir</code></td>
        <td>string</td>
        <td>Root directory where the YAML will be written (default `${HOME}` or `%USERPROFILE%`)</td>
    </tr>
    <tr>
        <td><code>--namespace</code></td>
        <td>string</td>
        <td>Target namespace for the Admin Console</td>
    </tr>
    <tr>
        <td><code>--shared-password</code></td>
        <td>string</td>
        <td>Shared password to use when deploying the Admin Console</td>
    </tr>
    <tr>
        <td><code>--http-proxy</code></td>
        <td>string</td>
        <td>Sets HTTP_PROXY environment variable in all KOTS Admin Console components</td>
    </tr>
    <tr>
        <td><code>--http-proxy</code></td>
        <td>string</td>
        <td>Sets HTTP_PROXY environment variable in all KOTS Admin Console</td>
    </tr>
    <tr>
  <td><code>--kotsadm-namespace</code></td>
  <td>string</td>
  <td><p>Set to override the registry namespace of KOTS Admin Console images. Used for air gap installations. For more information, see [Air Gap Installation in Existing Clusters with KOTS](/enterprise/installing-existing-cluster-airgapped).</p><p><strong>Note:</strong> Replicated recommends that you use <code>--kotsadm-registry</code> instead of <code>--kotsadm-namespace</code> to override both the registry hostname and, optionally, the registry namespace with a single flag.</p></td>
</tr>
    <tr>
  <td><code>--kotsadm-registry</code></td>
  <td>string</td>
  <td>Set to override the registry hostname and namespace of KOTS Admin Console images. Used for air gap installations. For more information, see [Air Gap Installation in Existing Clusters with KOTS](/enterprise/installing-existing-cluster-airgapped).</td>
</tr>
    <tr>
        <td><code>--no-proxy</code></td>
        <td>string</td>
        <td>Sets NO_PROXY environment variable in all KOTS Admin Console components</td>
    </tr>
    <tr>
        <td><code>--private-ca-configmap</code></td>
        <td>string</td>
        <td>Name of a ConfigMap containing private CAs to add to the kotsadm deployment</td>
    </tr>
    <tr>
  <td><code>--registry-password</code></td>
  <td>string</td>
  <td>Password to use to authenticate with the application registry. Used for air gap installations.</td>
</tr>
    <tr>
  <td><code>--registry-username</code></td>
  <td>string</td>
  <td>Username to use to authenticate with the application registry. Used for air gap installations.</td>
</tr>
    <tr>
        <td><code>--with-minio</code></td>
        <td>bool</td>
        <td>Set to true to include a local minio instance to be used for storage (default true)</td>
    </tr>
    <tr>
        <td><code>--minimal-rbac</code></td>
        <td>bool</td>
        <td>Set to true to include a local minio instance to be used for storage (default true)</td>
    </tr>
    <tr>
        <td><code>--additional-namespaces</code></td>
        <td>string</td>
        <td>Comma delimited list to specify additional namespace(s) managed by KOTS outside where it is to be deployed. Ignored without with <code>--minimal-rbac=true</code></td>
    </tr>
    <tr>
        <td><code>--storage-class</code></td>
        <td>string</td>
        <td>Sets the storage class to use for the KOTS Admin Console components. <strong>Default:</strong> unset, which means the default storage class will be used</td>
    </tr>
</table>

### Examples
```bash
kubectl kots admin-console generate-manifests
kubectl kots admin-console generate-manifests --rootdir ./manifests
kubectl kots admin-console generate-manifests --namespace kotsadm --minimal-rbac=true --additional-namespaces="app1,app3"
```