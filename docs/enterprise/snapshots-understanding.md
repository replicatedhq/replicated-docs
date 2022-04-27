# Understanding Snapshots

An important part of the lifecycle of an application is backup and restore. The Replicated admin console can be used to create and manage your storage destination and schedule, and to perform and monitor the backup and restore process. This feature is only available for licenses that have the Allow Snapshots feature enabled.

There are two types of snapshots:
  * Full snapshots (Instance)
  * Partial snapshots (Application)

Snapshots are useful for rollback and disaster recovery scenarios. They are not intended to be used for application migration scenarios.

## Full Snapshots (recommended)

Full snapshots back up the admin console and all application data.
They can be used for full Disaster Recovery; by restoring over the same instance, or into a new cluster.

There are two ways to create a full snapshot. First, make sure that your license has the snapshots feature enabled, then:

1. Using the kots CLI `backup` command. See [backup](../reference/kots-cli-backup-index) in the kots CLI documentation.
2. Using the admin console (check screenshot below).

    ![Instance Backup UI](/images/snapshot-instance-backup.png)

After a full snapshot has been created, you can get a command to do a restore by clicking the restore icon (check screenshot below).
There are two available options for doing a restore. You can either do a full restore which will restore the admin console and the application with all of its data, or you can choose to do a partial restore of just your application and its data.

![Instance Restore UI](/images/snapshot-instance-restore.png)

If you have multiple applications within the admin console, each application should have a backup resource in order to be included in the full snapshot backup. For more information, see [Backup](../reference/custom-resource-backup) in the _Custom resources_ section.

## Partial Snapshots

Partial snapshots only back up applications volumes and application manifests; they do not back up the admin console or the metadata about an application.
They are useful for capturing information before deploying a new release, in case you need to roll back, but they are not suitable for full disaster recovery.
For backups that give you the ability to do full disaster recovery, use full snapshots. For more information, see [Full snapshots (recommended)](#full-snapshots-recommended) above.

Partial snapshots can only be created via the admin console (check screenshot below).

![Application Backup UI](/images/snapshot-application-backup.png)
