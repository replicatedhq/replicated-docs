# Creating Backups

For full disaster recovery, Replicated recommends creating full snapshots.

## Prerequisites

Configure a storage destination for your backups. See [How to Set Up Backup Storage](snapshots-config-workflow).

## Full Snapshots (Recommended) {#full}

Full snapshots back up the admin console and all application data.
They can be used for full Disaster Recovery by restoring over the same instance or into a new cluster. For limitations, see [Limitations and Considerations](snapshots-config-workflow#limitations-and-considerations) in _How to Set Up Backup Storage_.

There are two ways to create a full snapshot. First, make sure that your license has the snapshots feature enabled, then:

1. Using the kots CLI `backup` command. See [backup](../reference/kots-cli-backup-index) in the kots CLI documentation.
2. Using the admin console:

    ![Instance Backup UI](/images/snapshot-instance-backup.png)

After a full snapshot has been created, you can get a command to do a restore by clicking the restore icon (check screenshot below).
There are two available options for doing a restore. You can either do a full restore which will restore the admin console and the application with all of its data, or you can choose to do a partial restore of just your application and its data.

![Instance Restore UI](/images/snapshot-instance-restore.png)

If you have multiple applications within the admin console, each application should have a backup resource in order to be included in the full snapshot backup. For more information, see [Backup](../reference/custom-resource-backup) in the _Custom resources_ section.

## Partial Snapshots {#partial}

Partial snapshots only back up application volumes and application manifests; they do not back up the admin console or the metadata about an application.
They are useful for capturing information before deploying a new release, in case you need to roll back, but they are not suitable for full disaster recovery.
For backups that give you the ability to do full disaster recovery, use full snapshots. For more information about full snapshots, see [Full Snapshots (recommended)](#full).

Partial snapshots can only be created via the admin console (check screenshot below).

![Application Backup UI](/images/snapshot-application-backup.png)

## Additional Resources

[Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
