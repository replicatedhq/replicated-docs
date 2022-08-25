# Scheduling Automatic Backups

The Replicated admin console lets you schedule automatic snapshots for routine backup.

## Prerequisites

Complete the following items before you perform this task:

* Review the limitations and considerations. See [Limitations and Considerations](snapshots-understanding#limitations-and-considerations) in _How to Set Up and Use Snapshots_.
* Install and configure Velero. See [Installing and Configuring Velero](snapshots-venerlo-installing-config).
* Configure a storage destination. See [Configuring Storage Destinations](snapshots-storage-destinations).

## Retention

The default retention period for snapshots is 1 month.
Setting the retention only affects snapshots created after the time of the change.
For example, if an existing snapshot had a retention of 1 year and is already 6 months old, and a user then uses the UI to change the retention to 1 month, the existing snapshot will still be around for another 6 months.

## Automatic Snapshots

Check out the screenshot below for instructions on how to enable and configure automatic scheduled snapshots.

![Snapshot Schedule](/images/snapshot-schedule.png)

## Additional Resources

[Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
