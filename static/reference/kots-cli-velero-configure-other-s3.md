# velero configure-other-s3

Configures snapshots to use an S3-compatible storage provider, such as Minio, as a storage destination.

### Usage

```bash
kubectl kots velero configure-other-s3 [flags]
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
        <td>`--access-key-id`</td>
        <td>string</td>
        <td>The AWS access key ID to use for accessing the bucket (required)</td>
    </tr>
    <tr>
        <td>`--bucket`</td>
        <td>string</td>
        <td>Name of the object storage bucket where backups should be stored (required)</td>
    </tr>
    <tr>
        <td>`--endpoint`</td>
        <td>string</td>
        <td>The S3 endpoint (for example, http://some-other-s3-endpoint) (required)</td>
    </tr>
    <tr>
        <td>`--path`</td>
        <td>string</td>
        <td>Path to a subdirectory in the object store bucket</td>
    </tr>
    <tr>
        <td>`--region`</td>
        <td>string</td>
        <td>The region where the bucket exists (required)</td>
    </tr>
    <tr>
        <td>`--secret-access-key`</td>
        <td>string</td>
        <td>The AWS secret access key to use for accessing the bucket (required)</td>
    </tr>
    <tr>
        <td>`--cacert`</td>
        <td>string</td>
        <td>File containing a certificate bundle to use when verifying TLS connections to the object store</td>
    </tr>
    <tr>
        <td>`--skip-validation`</td>
        <td>bool</td>
        <td>Skip the validation of the S3 bucket (default `false`)</td>
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
</table>

#### Example

```bash
kubectl kots velero configure-other-s3 --namespace default --endpoint http://minio --region us-east-1 --bucket kots-snaps --access-key-id XXXXXXXJTJB7M2XZUV7D --secret-access-key mysecretkey
```