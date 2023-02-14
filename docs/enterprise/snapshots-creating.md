# Creating and Scheduling Backups

This topic describes how to use the snapshots feature to create backups. It also includes information about how to create a schedule for automatic backups.

## Prerequisite

Configure a storage destination for your backups. See [How to Set Up Backup Storage](snapshots-config-workflow).

## Create a Full Backup (Recommended) {#full}

Full backups, also referred to as _Full (Instance) snapshots_, back up the admin console and all application data.
You can use full backups for disaster recovery by restoring over the same instance or into a new cluster.

For limitations, see [Limitations and Considerations](snapshots-config-workflow#limitations-and-considerations) in _How to Set Up Backup Storage_.

You can create a full backup with the kots CLI or in the admin console UI:

* **kots CLI**: Run the `kots backup` command. See [backup](/reference/kots-cli-backup-index) in the kots CLI documentation.

   **Example**:
   ```
   kubectl kots backup --namespace my-app-namespace
   ```
* **Admin console**: In the admin console, go to **Snapshots > Full Snapshots (Instance)** and click **Start a snapshot**.

   The following image shows the **Full Snapshots (Instance)** page in the admin console where you can create a full backup:

    ![Full Snapshots page](/images/snapshot-instance-backup.png)

## Create a Partial Backup {#partial}

Partial backups, also referred to as _Partial (Application) snapshots_, back up only application volumes and application manifests.

You can use partial backups for backing up information before deploying a new release version of an application, in case you need to roll back. Partial backups are not suitable for full disaster recovery.

For limitations, see [Limitations and Considerations](snapshots-config-workflow#limitations-and-considerations) in _How to Set Up Backup Storage_.

To create a partial backup, log in to the admin console and go to **Snapshots > Partial Snapshots (Application)**. Then, click **Start a snapshot**.

![Application Backup UI](/images/snapshot-application-backup.png)

## Schedule Automatic Backups

You can use the admin console to schedule automatic backups.

To schedule automatic backups:

1. Log in to the admin console and go to **Snapshots > Settings & Schedule**.

1. Under **Automatic snapshots**, select **Full snapshots (Instance)** or **Partial snapshots (Application)** depending on the type of backup that you want to schedule.

1. (Partial Snapshots Only) If you have multiple applications in the admin console, in the dropdown, select the application for which you want to schedule partial backups.

1. Select **Enable automatic scheduled snapshots**. 

1. Configure the backup schedule:
   * For **Schedule**, select Hourly, Daily, Weekly, or Custom.
   * For **Cron Expression**, customize the automatic backup schedule. For information about supported cron expressions, see [Cron Expressions](/reference/cron-expressions).

   ![Snapshot Schedule](/images/snapshot-schedule.png)

1. (Optional) For **Retention Policy**, edit the amount of time that backups are saved.
   
   :::note
   The default retention period is one month. Changing the retention policy affects only snapshots created after the time of the change.
   :::
## Additional Resources

[Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
