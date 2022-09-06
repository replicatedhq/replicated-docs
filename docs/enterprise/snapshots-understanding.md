# How to Set Up Snapshots

This topic describes the process of setting up Replicated snapshots feature that provides backup and restore capabilities. This topic also describes any limitations and considerations.

## About Backup and Restore

An important part of the lifecycle of an application is backup and restore. The Replicated admin console can be used to create and manage your storage destination and schedule, and to perform and monitor the backup and restore process.

The admin console backup and restore feature is called snapshots. The snapshots feature is available only for licenses that have the Allow Snapshots feature enabled. Velero and restic are the underlying technologies for snapshots.

There are two types of snapshots:
  * **Full snapshots (Recommended)**: Backs up the admin console and all application data. For embedded clusters, this also backs up the Docker registry, which is required for air gapped installations.

    Object-stored data that does not use PVCs, such as Rook and Ceph, require custom hooks for backups. Custom hooks are configured by your vendor. See [Full Snapshots](snapshots-creating#full) in _Creating Snapshot Backups_.

  * **Partial snapshots**: Backs up the application volumes and manifest files only. See [Partial Snapshots](snapshots-creating#partial) in _Creating Snapshot Backups_.

## Installing Velero

Velero must be installed on the cluster to use snapshots.

  * **Existing clusters:** Install Velero on the cluster. See [Basic Install](https://velero.io/docs/v1.9/basic-install/) in the Velero documentation.
  * **Kubernetes installer clusters:** If your application vendor provided the Velero add-on in the Kubernetes installer, Velero is installed in the cluster automatically and you only need to configure Velero and a storage destination.

    If Velero is not already installed on the Kubernetes installer cluster, the snapshots configuration dialog in the admin console notifies you to install Velero before you can proceed with the configuration.

## About Storage Destinations

You initially configure the snapshots feature to store backups on a supported storage provider backend using the kots CLI. You can configure a storage destination for both existing clusters and clusters provisioned by the Replicated Kubernetes installer.

The following storage destinations are supported:

- Amazon Web Services (AWS)
- Google Cloud Provider (GCP)
- Microsoft Azure
- S3-Compatible
- Network File System (NFS)
- Hostpath

If you want to change the storage destination after the initial configuration, you can use the the Snapshots page in the admin console.

Kubernetes installer provisioned clusters include a locally-provisioned object store. By default, Kubernetes installer clusters are preconfigured in the admin console to store backups in the locally-provisioned object store. This object store is sufficient for only rollbacks and downgrades and is not a suitable configuration for disaster recovery. Replicated recommends that you configure a snapshots storage destination that is external to the cluster in the admin console for Kubernetes installer clusters.

## Limitations and Considerations

- Snapshots are useful for rollback and disaster recovery scenarios. They are not intended to be used for application migration scenarios.

- Only full snapshots are usable in disaster recovery scenarios.

- Snapshots must be restored on the same operating system that the snapshot was taken on. For example, snapshots taken on a CentOS cluster must be restored on a CentOS cluster.

- Snapshots can be restored only to clusters that use the same installation method as the cluster the snapshot was taken from. For example, online cluster snapshots must be restored to an online cluster.

- Snapshots does not support AWS S3 buckets that have a bucket policy requiring the server-side encryption header. If you want to require server-side encryption for objects, you can enable default encryption on the bucket instead.

- Use the Snapshots tab in the admin console to cleanup and remove snapshots. Otherwise, removing data from the snapshot storage itself results in data corruption and the loss of snapshots.


## Configuring Snapshots

You must configure the snapshots feature before you can create backups. Complete the following procedures to configure the snapshots feature:

1. Review the limitations and considerations. See [Limitations and Considerations](#limitations-and-considerations).

1. Install the Velero CLI.

1. Install Velero and configure a storage destination. See [Configuring Storage Destinations](snapshots-storage-destinations).

  :::note
  If you are using an Kubernetes installer cluster (embedded cluster) that includes the Velero add-on, you only have to configure Velero and change the default storage destination in the admin console. See [Configuring Velero](snapshots-velero-installing-config).
  :::

1. Enable access to the Velero namespace and optionally increase the default memory for the restic Pod. See [Configure Velero](snapshots-velero-installing-config).

## Next Step

You can create a full backup using one of the following methods:

  * Create backups manually. See [Creating Backups](snapshots-creating).
  * Schedule automatic backups. See [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [Restoring Full Backups](snapshots-restoring-full)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
