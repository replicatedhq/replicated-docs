# Creating and Scheduling Backups

This topic describes how to use the Replicated snapshots feature to create backups. It also includes information about how to use the Replicated admin console create a schedule for automatic backups.

## Prerequisite

Before you can create backups, you must configure a storage destination. See [How to Set Up Backup Storage](snapshots-config-workflow).

## Create a Full Backup (Recommended) {#full}

Full backups, or _instance snapshots_, back up the admin console, application volumes, application manifests, and application metadata. If you manage multiple applications with the admin console, then data from all applications that support backups is included in a full backup. You can use a full backup for disaster recovery scenarios by restoring over the same instance or into a new cluster.

From a full backup, you can do a full restore of the instance. Or, you can also choose to restore only application or admin console data. For more information about restoring, see [Restoring from Backups](snapshots-restoring-full).

You can create a full backup with the following methods:
* [Create a Backup with the CLI](#cli-backup)
* [Create a Backup in the Admin Console](#admin-console-backup)

### Create a Backup with the CLI {#cli-backup}

To create a full backup with the kots CLI, run the following command:

   ```
   kubectl kots backup --namespace NAMESPACE
   ```
   Replace `NAMESPACE` with the namespace where the admin console is installed.
   
For more information, see [backup](/reference/kots-cli-backup-index) in _kots CLI_.

### Create a Backup in the Admin Console {#admin-console-backup}

To create a full backup in the admin console:

1. Go to **Snapshots > Full Snapshots (Instance)**. 
1. Click **Start a snapshot**.
   
   When the backup is complete, it appears in the list of backups on the page, as shown in the following image:
   
   ![Full snapshot page with one completed snapshot](/images/snapshot-instance-list.png)

## Create a Partial Backup {#partial}

Partial backups, or _application snapshots_, back up only application volumes and application manifests. They do not include admin console data or application metadata.

A common use case for partial backups is to back up an application before you deploy a new version in case you need to roll back. For more information about restoring from partial backups, see [Restoring from Backups](snapshots-restoring-full).

:::note
Partial backups are not suitable for disaster recovery. To create backups for disaster recovery, see [Create a Full Backup (Recommended)](#full) above.
:::

To create a partial backup in the admin console:

1. Go to **Snapshots > Partial Snapshots (Application)**.

1. If you manage multiple applications in the admin console, use the dropdown to select the application that you want to back up. 

1. Click **Start a snapshot**.

   When the snapshot is complete, it appears in the list of snapshots on the page as shown in the following image:

   ![Partial snapshot page with one completed snapshot](/images/snapshot-application-list.png)

## Schedule Automatic Backups

You can use the admin console to schedule full or partial backups. This is useful for automatically creating regular backups of admin console and application data.

To schedule automatic backups in the admin console:

1. Go to **Snapshots > Settings & Schedule**.

1. Under **Automatic snapshots**, select **Full snapshots (Instance)** or **Partial snapshots (Application)** depending on the type of backup that you want to schedule.

   ![Snapshot Settings and Schedule page](/images/snapshot-schedule.png)

1. (Partial Backups Only) If you manage multiple applications in the admin console, use the dropdown to select the application that you want to back up.

1. Select **Enable automatic scheduled snapshots**. 

1. Configure the automatic backup schedule:

   * For **Schedule**, select Hourly, Daily, Weekly, or Custom.
   * For **Cron Expression**, enter a cron expression to customize the automatic backup schedule that you selected. For information about supported cron expressions, see [Cron Expressions](/reference/cron-expressions) in _Reference_.

1. (Optional) For **Retention Policy**, edit the amount of time that data from the automatic backups is saved.
   
   :::note
   The default retention period is one month. Changing the retention policy affects only snapshots created after the time of the change.
   :::
## Additional Resources

[Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
