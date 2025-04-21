# admin-console upgrade

 
 

 







Upgrades the KOTS Admin Console to match the version of KOTS CLI.


### Usage
```bash
kubectl kots admin-console upgrade [flags]
```

This command supports all [global flags](kots-cli-global-flags) and also:                                                                                                                                                                                                                               
<table>
    <tr>
      <th width="30%">Flag</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
  <td><code>--ensure-rbac</code></td>
  <td>bool</td>
  <td>When <code>false</code>, KOTS does not attempt to create the RBAC resources necessary to manage applications. <strong>Default:</strong> <code>true</code>. If a role specification is needed, use the <a href="kots-cli-admin-console-generate-manifests">generate-manifests</a> command.</td>
</tr>
    <tr>
  <td><code>-h, --help</code></td>
  <td></td>
  <td>Help for the command.</td>
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
  <td><code>--skip-rbac-check</code></td>
  <td>bool</td>
  <td>When <code>true</code>, KOTS does not validate RBAC permissions. <strong>Default:</strong> <code>false</code></td>
</tr>
    import StrictSecContextYaml from "./_strict-sec-context-yaml.mdx"

<tr>
  <td><code>--strict-security-context</code></td>
  <td>bool</td>
  <td>
  <p>Set to <code>true</code> to explicitly enable strict security contexts for all KOTS Pods and containers.</p>
  <p>By default, KOTS Pods and containers are not deployed with a specific security context. When <code>true</code>, <code>--strict-security-context</code> does the following:</p>
  <ul>
    <li>Ensures containers run as a non-root user</li>
    <li>Sets the specific UID for the containers (1001)</li>
    <li>Sets the GID for volume ownership and permissions (1001)</li>
    <li>Applies the default container runtime seccomp profile for security</li>
    <li>Ensures the container is not run with privileged system access</li>
    <li>Prevents the container from gaining more privileges than its parent process</li>
    <li>Ensures the container's root filesystem is mounted as read-only</li>
    <li>Removes all Linux capabilities from the container</li>
  </ul>
  <p>The following shows the <code>securityContext</code> for KOTS Pods when <code>--strict-security-context</code> is set:</p>
  <StrictSecContextYaml/>
  <p><strong>Default:</strong> <code>false</code></p>
  :::note
  Might not work for some storage providers.
  :::
  </td>
</tr>
    <tr>
  <td><code>--wait-duration</code></td>
  <td>string</td>
  <td>Timeout out to be used while waiting for individual components to be ready.  Must be in <a href="https://pkg.go.dev/time#ParseDuration">Go duration</a> format. <strong>Example:</strong> 10s, 2m</td>
</tr>
    <tr>
  <td><code>--with-minio</code></td>
  <td>bool</td>
  <td>When <code>true</code>, KOTS deploys a local MinIO instance for storage and attempts to change any MinIO-based snapshots (hostpath and NFS) to the local-volume-provider plugin. See <a href="https://github.com/replicatedhq/local-volume-provider">local-volume-provider</a> in GitHub. <strong>Default:</strong> <code>true</code></td>
</tr>              
</table>

### Examples
```bash
kubectl kots admin-console upgrade --namespace kots-sentry
kubectl kots admin-console upgrade --ensure-rbac=false
```