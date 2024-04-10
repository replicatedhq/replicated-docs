# Compatibility Matrix Cluster Add-ons (Beta)

This topic describes the supported cluster add-ons for Replicated Compatibility Matrix.

## CLI

The Replicated CLI can be used to [create](/reference/replicated-cli-cluster-addon-create), [manage](/reference/replicated-cli-cluster-addon-ls) and [remove](/reference/replicated-cli-cluster-addon-rm) cluster add-ons.

## Supported Add-ons

This section lists the supported cluster add-ons for clusters created with the Compatiblity Matrix.

### object-store

The Replicated cluster object store add-on can be used to create object store buckets for cloud clusters (currently only AWS S3 is supported for EKS clusters).

Assuming you already have a cluster, run the following command with the cluster ID to create an object store bucket:

```bash
$ replicated cluster addon create object-store 4d2f7e70 --bucket mybucket
05929b24    Object Store    pending         {"bucket_prefix":"mybucket"}
$ replicated cluster addon ls 4d2f7e70
ID          TYPE            STATUS          DATA
05929b24    Object Store    ready           {"bucket_prefix":"mybucket","bucket_name":"mybucket-05929b24-cmx","service_account_namespace":"cmx","service_account_name":"mybucket-05929b24-cmx","service_account_name_read_only":"mybucket-05929b24-cmx-ro"}
```

This will create two service accounts in a namespace, one read-write and the other read-only access to the object store bucket.

Additional service accounts can be created in any namespace with access to the object store by annotating the new service account with the same `eks.amazonaws.com/role-arn` annotation found in the predefined ones (`service_account_name` and `service_account_name_read_only`).

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Distributions</th>
    <td>EKS</td>
  </tr>
  <tr>
    <th>Options</th>
    <td>
      <ul>
        <li><strong>bucket (string):</strong> A prefix for the bucket name to be created (required)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Data</th>
    <td>
      <ul>
        <li><strong>bucket_prefix:</strong> The prefix specified by the user for the bucket name</li>
      </ul>
      <ul>
        <li><strong>bucket_name:</strong> The actual bucket name</li>
      </ul>
      <ul>
        <li><strong>service_account_namespace:</strong> The namespace in which the service accounts (`service_account_name` and `service_account_name_read_only`) have been created.</li>
      </ul>
      <ul>
        <li><strong>service_account_name:</strong> The service account name for read-write access to the bucket.</li>
      </ul>
      <ul>
        <li><strong>service_account_name_read_only:</strong> The service account name for read-only access to the bucket.</li>
      </ul>
    </td>
  </tr>
</table>
