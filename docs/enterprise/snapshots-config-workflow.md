# How to Set Up Backup Storage

This topic describes the process of setting up backup storage for the Replicated snapshots feature.

## Configuring Backup Storage

You must configure backup storage before you can create backups.

:::note
If your Kubernetes installer cluster includes the Velero add-on, you only have to configure the storage destination in the admin console and potentially configure the Velero installation. For more information, see step 3 and step 4 below.
:::

Complete the following procedures to configure the snapshots feature:

1. Review the limitations and considerations. See [Limitations and Considerations](snapshots-understanding#limitations-and-considerations).

1. Install the Velero CLI. See [Installing the Velero CLI](snapshots-velero-cli-installing).

1. Install Velero and configure a storage destination using one of the following procedures.

    - [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath)
    - [Configuring an NFS Storage Destination](snapshots-configuring-nfs)
    - [Configuring Other Storage Destinations](snapshots-storage-destinations)

1. Enable access to the Velero namespace and optionally increase the default memory for the restic Pod. See [Configure Velero](snapshots-velero-installing-config).

## Next Step

You can create a full backup using one of the following methods:

  * Create backups manually. See [Creating Backups](snapshots-creating).
  * Schedule automatic backups. See [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [Restoring Full Backups](snapshots-restoring-full)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
