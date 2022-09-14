# How to Set Up Backup Storage

This topic describes the process of setting up backup storage for the Replicated snapshots feature.

## Configuring a Backup Storage Destination

You must configure a backup storage destination before you can create backups.

Complete the following procedures to configure the snapshots feature:

1. Review the limitations and considerations below. See [Limitations and Considerations](#limitations-and-considerations).

1. (Kubernetes installer clusters) On the Snapshots tab in the admin console, click **Check for Velero** to see whether Velero was installed by the Kubernetes installer. Then do one of the following:

    - If Velero was installed, do the following to complete the storage destination configuration:

        1. Update the default internal storage settings in the admin console because internal storage is insufficient for full backups. See [Updating Settings in the Admin Console](snapshots-updating-with-admin-console).

        1. Enable access to the Velero namespace if you are using RBAC and optionally increase the default memory for the restic Pod. See [Configure Velero](snapshots-velero-installing-config).

    - If Velero was not installed, proceed with the rest of this process to install Velero and configure a storage destination.

1. Install the Velero CLI. See [Installing the Velero CLI](snapshots-velero-cli-installing).

1. Install Velero and configure a storage destination using one of the following procedures.

    - [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath)
    - [Configuring an NFS Storage Destination](snapshots-configuring-nfs)
    - [Configuring Other Storage Destinations](snapshots-storage-destinations)

1. Enable access to the Velero namespace if you are using RBAC and optionally increase the default memory for the restic Pod. See [Configure Velero](snapshots-velero-installing-config).

## Limitations and Considerations

- Snapshots are useful for rollback and disaster recovery scenarios. They are not intended to be used for application migration scenarios.

- Only full snapshots are usable in disaster recovery scenarios.

- Snapshots must be restored on the same operating system that the snapshot was taken on. For example, snapshots taken on a CentOS cluster must be restored on a CentOS cluster.

- Snapshots can be restored only to clusters that use the same installation method as the cluster the snapshot was taken from. For example, online cluster snapshots must be restored to an online cluster.

- Snapshots does not support Amazon Simple Storage Service (Amazon S3) buckets that have a bucket policy requiring the server-side encryption header. If you want to require server-side encryption for objects, you can enable default encryption on the bucket instead. For more information about Amazon S3, see the [Amazon S3](https://docs.aws.amazon.com/s3/?icmpid=docs_homepage_featuredsvcs) documentation.

- Use the Snapshots tab in the admin console to cleanup and remove snapshots. Otherwise, removing data from the snapshot storage itself results in data corruption and the loss of snapshots.

## Next Step

After you configure a storage destination, you can create a full backup using one of the following methods:

  * Create backups manually. See [Creating Backups](snapshots-creating).
  * Schedule automatic backups. See [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [Restoring Full Backups](snapshots-restoring-full)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
