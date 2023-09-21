# Creating and Scheduling Backups

This topic describes how to use the Replicated snapshots feature to create backups. It also includes information about how to use the Replicated admin console create a schedule for automatic backups. For information about restoring, see [Restoring from Backups](snapshots-restoring-full).

## Prerequisites

- Before you can create backups, you must configure a storage destination:

   - [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath)
   - [Configuring an NFS Storage Destination](snapshots-configuring-nfs)
   - [Configuring Other Storage Destinations](snapshots-storage-destinations)

- If you have multiple applications in the admin console, make sure that each application has its own Backup custom resource file so that they can be included in the full backup. Use the **View file** tab to check for the Backup custom resources (`kind: Backup`, `apiVersion: velero.io/v1`). 

   If any Backup custom resource files are missing, contact your vendor.

## Create a Full Backup (Recommended) {#full}

Full backups, or _instance snapshots_, back up the admin console and all application data, including application volumes and manifest files. If you manage multiple applications with the admin console, data from all applications that support backups is included in a full backup.

From a full backup, you can:
* Restore application and admin console data
* Restore only application data
* Restore only admin console data

You can create a full backup with the following methods:
* [Create a Backup with the CLI](#cli-backup)
* [Create a Backup in the Admin Console](#admin-console-backup)

### Create a Backup with the CLI {#cli-backup}

To create a full backup with the Replicated kots CLI, run the following command:

   ```
   kubectl kots backup --namespace NAMESPACE
   ```
   Replace `NAMESPACE` with the namespace where the admin console is installed.
   
For more information, see [backup](/reference/kots-cli-backup-index) in _kots CLI_.

### Create a Backup in the Admin Console {#admin-console-backup}

To create a full backup in the admin console:

1. To check if backups are supported for an application, go to the **View files** page, open the `upstream` folder, and confirm that the application includes a manifest file with `kind: Backup` and `apiVersion: velero.io/v1`. This manifest also shows which pod volumes are being backed up.

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
   * For **Cron Expression**, enter a cron expression to create a custom automatic backup schedule. For information about supported cron expressions, see [Cron Expressions](/reference/cron-expressions).

1. (Optional) For **Retention Policy**, edit the amount of time that backup data is saved. By default, backup data is saved for 30 days.

   The retention policy applies to all backups, including both automatically- and manually-created backups. Changing the retention policy affects only backups created after the time of the change.
## Additional Resources

[Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
