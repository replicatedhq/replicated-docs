# Compatibility Matrix Cluster Add-ons (Beta)

This topic describes the supported cluster add-ons for Replicated compatibility matrix.

## Overview

The Replicated compatibility matrix enables you to extend your cluster with add-ons, to make use of by your application, such as an AWS S3 object store.
This allows you to more easily provision dependencies required by your application.

## CLI

The replicated CLI can be used to [create](/reference/replicated-cli-cluster-addon-create), [manage](/reference/replicated-cli-cluster-addon-ls) and [remove](/reference/replicated-cli-cluster-addon-rm) cluster add-ons.

## Supported Add-ons

This section lists the supported cluster add-ons for clusters created with compatiblity matrix.

### object-store (Alpha)

The Replicated cluster object store add-on can be used to create S3 compatible object store buckets for clusters (currently only AWS S3 is supported for EKS clusters).

Assuming you already have a cluster, run the following command with the cluster ID to create an object store bucket:

```bash
$ replicated cluster addon create object-store 4d2f7e70 --bucket-prefix mybucket
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
    <td>EKS (AWS S3)</td>
  </tr>
  <tr>
    <th>Cost</th>
    <td>Flat fee per bucket.</td>
  </tr>
  <tr>
    <th>Options</th>
    <td>
      <ul>
        <li><strong>bucket_prefix (string):</strong> A prefix for the bucket name to be created (required)</li>
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

### Postgres (Alpha)

The Replicated cluster Postgres add-on can be used to create Postgres databases for clusters (currently only AWS RDS Postgres is supported for EKS clusters).

Assuming you already have a cluster, run the following command with the cluster ID to create a Postgres instance:

```bash
$ replicated cluster addon create postgres 4d2f7e70
156a8d6d    Object Store    pending          {"version":"16.2","disk_gib":200,"instance_type":"db.t3.micro"}
$ replicated cluster addon ls 4d2f7e70
ID          TYPE            STATUS          DATA
156a8d6d    Object Store    ready           156a8d6d    Postgres    ready           {"version":"16.2","disk_gib":200,"instance_type":"db.t3.micro","uri":"postgres://postgres:0b19d6a121a98d0548b3@cmx-156a8d6d.c8ivk9ghfxau.us-east-1.rds.amazonaws.com:5432/postgres"}
```

This will create a postgres database, and return the `uri` which allows you to connect to the instance..

<table>
  <tr>
    <th width="35%">Type</th>
    <th width="65%">Description</th>
  </tr>
  <tr>
    <th>Supported Kubernetes Distributions</th>
    <td>EKS (AWS RDS Postgres)</td>
  </tr>
  <tr>
    <th>Cost</th>
    <td>Flat fee per instance.</td>
  </tr>
  <tr>
    <th>Options</th>
    <td>
      <ul>
        <li><strong>version (string):</strong> The Postgres version to create. Supported versions: 11, 12, 13, 14, 15, 16</li>
        <li><strong>instance-type (string):</strong>The type of instance to use for the Postgres database (default "db.t3.micro"). Supported Instance Types: db.t3.micro, db.t3.small, db.t3.medium, db.t3.large, db.t3.xlarge, db.t3.2xlarge, db.m5d.large, db.m5d.xlarge, db.m5d.2xlarge</li>
        <li><strong>disk (number):</strong>Disk Size (GiB) for the Postgres database (default 200)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>Data</th>
    <td>
      <ul>
        <li><strong>version:</strong> The Postgres version that was created.</li>
      </ul>
      <ul>
        <li><strong>disk_gib:</strong> Disk Size (GiB) for the Postgres database (default 200)</li>
      </ul>
      <ul>
        <li><strong>instance_type:</strong> >The type of instance to use for the Postgres database (default "db.t3.micro").</li>
      </ul>
      <ul>
        <li><strong>uri:</strong> The URI that can be used to connect with the database.</li>
      </ul>
    </td>
  </tr>
</table>
