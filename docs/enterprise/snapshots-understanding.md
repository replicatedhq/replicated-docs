# About Backup and Restore

This topic provides conceptual information about backup and restore.

## Overview

An important part of the lifecycle of an application is backup and restore. The Replicated admin console can be used to create and manage your storage destination and schedule, and to perform and monitor the backup and restore process.

The admin console backup and restore feature is called snapshots. The snapshots feature is available only for licenses that have the Allow Snapshots feature enabled. Velero and restic are the underlying technologies for snapshots.

There are two types of snapshots:
  * **Full snapshots (Recommended)**: Backs up the admin console and all application data. For embedded clusters, this also backs up the Docker registry, which is required for air gapped installations.

    Object-stored data that does not use PVCs, such as Rook and Ceph, require custom hooks for backups. Custom hooks are configured by your vendor. See [Full Snapshots](snapshots-creating#full) in _Creating Backups_.

  * **Partial snapshots**: Backs up the application volumes and manifest files only. See [Partial Snapshots](snapshots-creating#partial) in _Creating Backups_.

## Limitations and Considerations

- Snapshots are useful for rollback and disaster recovery scenarios. They are not intended to be used for application migration scenarios.

- Only full snapshots are usable in disaster recovery scenarios.

- Snapshots must be restored on the same operating system that the snapshot was taken on. For example, snapshots taken on a CentOS cluster must be restored on a CentOS cluster.

- Snapshots can be restored only to clusters that use the same installation method as the cluster the snapshot was taken from. For example, online cluster snapshots must be restored to an online cluster.

- Snapshots does not support Amazon Simple Storage Service (Amazon S3) buckets that have a bucket policy requiring the server-side encryption header. If you want to require server-side encryption for objects, you can enable default encryption on the bucket instead. For more information about Amazon S3, see the [Amazon S3](https://docs.aws.amazon.com/s3/?icmpid=docs_homepage_featuredsvcs) documentation.

- Use the Snapshots tab in the admin console to cleanup and remove snapshots. Otherwise, removing data from the snapshot storage itself results in data corruption and the loss of snapshots.

## About Storage Destinations

You can use a storage provider that is compatible with Velero as the storage destination for backups created with the Replicated snapshots feature. For a list of the compatible storage providers, see [Providers](https://velero.io/docs/v1.10/supported-providers/) in the Velero documentation.

You initially configure backups on a supported storage provider backend using the kots CLI. If you want to change the storage destination after the initial configuration, you can use the the Snapshots page in the admin console, which has built-in support for the following storage destinations:

- Amazon Web Services (AWS)
- Google Cloud Provider (GCP)
- Microsoft Azure
- S3-Compatible
- Network File System (NFS)
- Host Path

Kubernetes installers that include the Velero add-on also include a locally-provisioned object store. By default, Kubernetes installer clusters are preconfigured in the admin console to store backups in the locally-provisioned object store. This object store is sufficient for only rollbacks and downgrades and is not a suitable configuration for disaster recovery. Replicated recommends that you configure a snapshots storage destination that is external to the cluster in the admin console for Kubernetes installer clusters.

## Additional Resources

- [How to Set Up Backup Storage](snapshots-config-workflow)
