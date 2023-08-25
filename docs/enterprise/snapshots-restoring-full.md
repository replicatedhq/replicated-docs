import RestoreTable from "../partials/snapshots/_restoreTable.mdx"

# Restoring from Backups

Full restores and Replicated admin console only restores must be done using the Replicated kots CLI because the admin console gets recreated and the admin console UI is disconnected during this process.

Partial restores (application only) can be done using the:

- kots CLI from a full backup
- Admin console from either a full or partial backup

For more information about the restore process, see [About Restores](snapshots-understanding#restores) in _About Backup and Restore_.

## Restore from the CLI {#full-cli}

From a full backup, you can do any of the following types of restores using the kots CLI:

- **Full restore:** Restores the admin console and the application
- **Partial restore:** Restores the application only
- **Admin console:** Restores the admin console only

Use the corresponding CLI procedure for your environment:

- [Existing Clusters](#existing)
- [Online Embedded Clusters](#online)
- [Air Gapped Embedded Clusters](#air-gapped)


### Existing Clusters {#existing}

If you are restoring to a healthy cluster, you can skip reinstalling Velero and continue to running the `get backups` and `restore` commands in the last two steps.

To restore a backup on an existing cluster:

1. (New or Unhealthy Clusters Only) Install a version of Velero compatible with the one that was used to make the snapshot backup:

    * **Host Path:** See [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath)
    * **NFS:** See [Configuring an NFS Storage Destination](snapshots-configuring-nfs) or  for the configuration steps and how to set up Velero.
    * **AWS, GCP, Azure, or other S3:** See [Configuring Other Storage Destinations](snapshots-storage-destinations). 

1. Run the `kubectl kots get backups` command to get a list of backups.

1. Run the following command to restore a full backup: 

    ```bash
    kubectl kots restore --from-backup BACKUP
    ```
    Replace `BACKUP` with the the name of the backup to restore from.
    
    For more information about the available restore options, including application only and admin console only, see [restore](/reference/kots-cli-restore-index/) in _Reference_.

### Online Embedded Clusters {#online}

If you are restoring to a healthy cluster, you can skip the installation and configuration steps and continue to running the `get backups` and `restore` commands in the last two steps.

To restore a backup on an embedded cluster:

1. (New or Unhealthy Clusters Only) Provision an embedded cluster with Replicated kURL and install the application. See [Online Installation with kURL](installing-embedded-cluster).

1. (New or Unhealthy Clusters Only) Configure a storage destination that holds the backup you want to use:

    * **Host Path:** See [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath)
    * **NFS:** See [Configuring an NFS Storage Destination](snapshots-configuring-nfs) or  for the configuration steps and how to set up Velero.
    * **AWS, GCP, Azure, or other S3:** See [Configuring Other Storage Destinations](snapshots-storage-destinations).

1. Run the `kubectl kots get backups` command to get a list of backups.

1. Run the following command to restore a full backup: 

    ```bash
    kubectl kots restore --from-backup BACKUP
    ```
    Replace `BACKUP` with the the name of the backup to restore from.
    
    For more information about the available restore options, including application only and admin console only, see [restore](/reference/kots-cli-restore-index/) in _Reference_.

### Air Gapped Embedded Clusters {#air-gapped}

To restore a backup on an air gapped embedded cluster:

1. Run the following command to install a new cluster and provide kURL with the correct registry IP address. kURL must be able to assign the same IP address to the embedded private image registry in the new cluster.

    ```bash
    cat install.sh | sudo bash -s airgap kurl-registry-ip=IP
    ```

    Replace `IP` with the registry IP address.

1. Use the kots CLI to configure Velero to use a storage destination. The storage backend used for backups must be accessible from the new cluster. 

    * **Host Path:** See [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath)
    * **NFS:** See [Configuring an NFS Storage Destination](snapshots-configuring-nfs) or  for the configuration steps and how to set up Velero.
    * **S3-Compatible:** See [Configure S3-Compatible Storage for Air Gapped Environments](snapshots-storage-destinations#configure-s3-compatible-storage-for-air-gapped-environments) in _Configuring Other Storage Destinations_.

1. Run the `kubectl kots get backups` command to get a list of backups.

1. Run the following command to restore a full backup: 

    ```bash
    kubectl kots restore --from-backup BACKUP
    ```
    Replace `BACKUP` with the the name of the backup to restore from.
    
    For more information about the available restore options, including application only and admin console only, see [restore](/reference/kots-cli-restore-index/) in _Reference_.

## Restore the Application from the Admin Console {#admin-console}

You can restore the application only, known as a _partial restore_, from either a full backup or a partial backup in the admin console.

Alternatively, you can use the kots CLI to restore any type of backup. See [Restore Any Backup from the CLI](#full-cli).

### Use a Full Backup to do a Partial Restore

To use a full backup to do a partial restore in the admin console:

1. Select **Full Snapshots (Instance)** from the Snapshots tab.

    ![Full Snapshot tab](/images/full-snapshot-tab.png)

    [View a larger image](/images/full-snapshot-tab.png)

1. Click the **Restore from this backup** icon (the circular blue arrows) for the backup that you want to restore.

1. In the **Restore from backup** dialog, select **Partial restore**.

    ![Restore Full Snapshot dialog](/images/restore-backup-dialog.png)

    :::note
    You can also get the CLI commands for full restores or admin console only restores from this dialog.
    :::     

1. At the bottom of the dialog, enter the application slug provided by your software vendor. For more information, see [Get the Application Slug](/vendor/vendor-portal-maange-app#slug) in _Managing Applications_.

1. Click **Confirm and restore**.

### Use a Partial Backup to do a Partial Restore

To use a partial backup to do a partial restore in the admin console:

1. Select **Partial Snapshots (Application)** from the Snapshots tab.

    ![Partial Snapshot tab](/images/partial-snapshot-tab.png)

    [View a larger image](/images/partial-snapshot-tab.png)

1. Click the **Restore from this backup** icon (the circular blue arrows) for the backup that you want to restore.

    The **Restore from Partial backup (Application)** dialog opens.

1. Under **Type your application slug to continue**, enter the application slug provided by your software vendor. For more information, see [Get the Application Slug](/vendor/vendor-portal-maange-app#slug) in _Managing Applications_.

    ![Restore Partial Snapshot dialog](/images/restore-partial-dialog.png)

1. Click **Confirm and restore**.

## Additional Resources

[Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
