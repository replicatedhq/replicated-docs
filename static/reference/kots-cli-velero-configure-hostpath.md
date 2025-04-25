# velero configure-hostpath

Configure snapshots to use a host path as storage destination.

### Usage

```bash
kubectl kots velero configure-hostpath [flags]
```

- _Provide `[flags]` according to the table below_

<table>
     <tr>
        <td width="30%">Flag</td>
        <td>Type</td>
        <td>Description</td>
    </tr>
    <tr>
  <td><code>-h, --help</code></td>
  <td></td>
  <td>Help for the command.</td>
</tr>
    <tr>
        <td>`-n, --namespace`</td>
        <td>string</td>
        <td>The namespace of the Admin Console (required)</td>
    </tr>
    <tr>
        <td>`--hostpath`</td>
        <td>string</td>
        <td>A local host path on the node</td>
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
        <td>`--force-reset`</td>
        <td>bool</td>
        <td>Bypass the reset prompt and force resetting the nfs path. (default `false`)</td>
    </tr>
    <tr>
        <td>`--output`</td>
        <td>string</td>
        <td>Output format. Supported values: `json`</td>
    </tr>
</table>

### Examples

Basic

```bash
kubectl kots velero configure-hostpath --hostpath /mnt/kots-sentry-snapshots --namespace kots-sentry
```

Using a registry for airgapped installations

```bash
kubectl kots velero configure-hostpath \
  --hostpath /mnt/kots-sentry-snapshots \
  --namespace kots-sentry \
  --kotsadm-registry private.registry.host/kots-sentry \
  --registry-username ro-username \
  --registry-password ro-password
```