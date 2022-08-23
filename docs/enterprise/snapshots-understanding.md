# How to Set Up and Use Snapshots

This topic describes the process of setting up Replicated snapshots feature that provides backup and restore capabilities. This topic also describes any limitations, considerations, and overall prerequisites.

## About Backup and Restore

An important part of the lifecycle of an application is backup and restore. The Replicated admin console can be used to create and manage your storage destination and schedule, and to perform and monitor the backup and restore process.

The admin console backup and restore feature is called snapshots. The snapshots feature is available only for licenses that have the Allow Snapshots feature enabled.

There are two types of snapshots:
  * **Full snapshots (Recommended)**: Backs up the admin console and all application data. For embedded clusters, this also backs up the Docker registry, which is required for air gapped installations.

    Object-stored data that does not use PVCs, such as Rook and Ceph, require custom hooks for backups. Custom hooks are configured by your vendor. See [Full Snapshots](#full).

  * **Partial snapshots**: Backs up the application volumes and manifest files. See [Partial Snapshots](#partial).

Snapshots are useful for rollback and disaster recovery scenarios. They are not intended to be used for application migration scenarios.

## Limitations and Considerations

- By default, Kubernetes installer provisioned clusters are preconfigured in the admin console to store backups in a locally-provisioned object store. This object store is sufficient for only rollbacks and downgrades and is not a suitable configuration for disaster recovery. Replicated recommends that you configure a snapshots storage destination that is external to the cluster in the admin console for Kubernetes installer clusters.

- Only full snapshots are usable in disaster recovery scenarios.

- Snapshots must be restored on the same operating system that the snapshot was taken on. For example, snapshots taken on a CentOS cluster must be restored on a CentOS cluster.

- Snapshots can be restored only to clusters that use the same installation method as the cluster the snapshot was taken from. For example, online cluster snapshots must be restored to an online cluster.

- Snapshots does not support AWS S3 buckets that have a bucket policy requiring the server-side encryption header. If you want to require server-side encryption for objects, you can enable default encryption on the bucket instead.

- Use the Snapshots tab in the admin console to cleanup and remove snapshots. Otherwise, removing data from the snapshot storage itself results in data corruption and the loss of snapshots.


## Configuring and Using Snapshots

Complete the following procedures to configure and use snapshots backup and restore:

1. Review the limitations and considerations. See [Limitations and Considerations](#limitations-and-considerations).

1. Install and configure Velero. See [Installing and Configuring Velero](snapshots-velero-installing-config).

1. Configure an external storage destination. See [Storage Destinations](snapshots-storage-destinations).

1. Create full snapshots using one of the following methods:

    * Configure snapshots manually. See [Creating Snapshots](snapshots-creating).
    * Schedule automatic snapshots. See [Scheduling Snapshots](snapshots-scheduling).

    :::note
    Replicated does not recommend using partial snapshots because it is not suitable for backup and recovery.
    :::

1. (Optional) Restore full snapshots. See [Restoring Full Snapshots](snapshots-restoring-full).

## Additional Resources

[Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
