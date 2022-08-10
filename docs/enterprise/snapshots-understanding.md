# Creating Snapshots

This topic describes the Replicated snapshots feature that provides backup and restore capabilities. This topic also describes how to create snapshots.

## About Backup and Restore

An important part of the lifecycle of an application is backup and restore. The Replicated admin console can be used to create and manage your storage destination and schedule, and to perform and monitor the backup and restore process.

The admin console backup and restore feature is called snapshots. The snapshots feature is available only for licenses that have the Allow Snapshots feature enabled.

There are two types of snapshots:
  * **Full snapshots (Recommended)**: Backs up the admin console and all application data. For embedded clusters, this also backs up the Docker registry, which is required for air gapped installations.

    Object-stored data that does not use PVCs, such as Rook and Ceph, require custom hooks for backups. Custom hooks are configured by your vendor. See [Full Snapshots](#full).

  * **Partial snapshots**: Backs up the application volumes and manifest files. See [Partial Snapshots](#partial).

Snapshots are useful for rollback and disaster recovery scenarios. They are not intended to be used for application migration scenarios.

## Limitations and Considerations

- By default, snapshots are stored locally on the cluster. For production environments, Replicated recommends storing snapshots externally to prevent losing snapshots during a complete cluster outage.

- Only full snapshots are usable in disaster recovery scenarios.

- Snapshots must be restored on the same operating system that the snapshot was taken on. For example, snapshots taken on a CentOS cluster must be restored on a CentOS cluster.

- Snapshots can be restored only to clusters that use the same installation method as the cluster the snapshot was taken from. For example, online cluster snapshots must be restored to an online cluster.

- Snapshots does not support AWS S3 buckets that have a bucket policy requiring the server-side encryption header. If you want to require server-side encryption for objects, you can enable default encryption on the bucket instead.

- Use the Snapshots tab in the admin console to cleanup and remove snapshots. Otherwise, removing data from the snapshot storage itself results in data corruption and the loss of snapshots.

## Full Snapshots (Recommended) {#full}

Full snapshots back up the admin console and all application data.
They can be used for full Disaster Recovery by restoring over the same instance or into a new cluster. For limitations, see [Limitations and Considerations](#limitations-and-considerations).

There are two ways to create a full snapshot. First, make sure that your license has the snapshots feature enabled, then:

1. Using the kots CLI `backup` command. See [backup](../reference/kots-cli-backup-index) in the kots CLI documentation.
2. Using the admin console (check screenshot below).

    ![Instance Backup UI](/images/snapshot-instance-backup.png)

After a full snapshot has been created, you can get a command to do a restore by clicking the restore icon (check screenshot below).
There are two available options for doing a restore. You can either do a full restore which will restore the admin console and the application with all of its data, or you can choose to do a partial restore of just your application and its data.

![Instance Restore UI](/images/snapshot-instance-restore.png)

If you have multiple applications within the admin console, each application should have a backup resource in order to be included in the full snapshot backup. For more information, see [Backup](../reference/custom-resource-backup) in the _Custom resources_ section.

## Partial Snapshots {#partial}

Partial snapshots only back up application volumes and application manifests; they do not back up the admin console or the metadata about an application.
They are useful for capturing information before deploying a new release, in case you need to roll back, but they are not suitable for full disaster recovery.
For backups that give you the ability to do full disaster recovery, use full snapshots. For more information, see [Full snapshots (recommended)](#full-snapshots-recommended) above.

Partial snapshots can only be created via the admin console (check screenshot below).

![Application Backup UI](/images/snapshot-application-backup.png)
