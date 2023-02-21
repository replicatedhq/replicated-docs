# Creating and Scheduling Backups

This topic describes how to use the Replicated snapshots feature to create backups. It also includes information about how to use the Replicated admin console create a schedule for automatic backups. For information about restoring, see [Restoring from Backups](snapshots-restoring-full).

## Prerequisite

Before you can create backups, you must configure a storage destination. See [How to Set Up Backup Storage](snapshots-config-workflow).

## Create a Full Backup (Recommended) {#full}

Full backups, or _instance snapshots_, back up the admin console and all application data, including application volumes and manifest files.

If you manage multiple applications with the admin console, data from all applications that support backups is included in a full backup. To check if backups are supported for an application, go to the **View files** page in the admin console, open the `upstream` folder, and confirm that the application includes a manifest file with `kind: Backup` and `apiVersion: velero.io/v1`.

From a full backup, you can:
* Restore application and admin console data.
* Restore only application data.
* Restore only admin console data.

Full backups are recommended because they support all types of restores. For example, you can restore your instance from full backups in disaster recovery scenarios. Or, you can use a full backup to roll back after you deploy a new version of an application by restoring only application data.

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

Partial backups, or _application snapshots_, back up application volumes and application manifests only. Partial backups do not back up admin console data.

:::note
Replicated recommends that you create full backups instead of partial backups because partial backups are not suitable for disaster recovery. See [Create a Full Backup](#full) above.
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

1. Configure the automatic backup schedule for the type of snapshots that you selected:

   * For **Schedule**, select Hourly, Daily, Weekly, or Custom.
   * For **Cron Expression**, enter a cron expression to create a custom automatic backup schedule. For information about supported cron expressions, see [Cron Expressions](/reference/cron-expressions) in _Reference_.

1. (Optional) For **Retention Policy**, edit the amount of time that backup data is saved. By default, backup data is saved for 30 days.

   The retention policy applies to all backups, including both automatically- and manually-created backups. Changing the retention policy affects only backups created after the time of the change.
## Additional Resources

[Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
