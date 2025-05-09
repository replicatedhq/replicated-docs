# Restore from Backups

This topic describes how to restore from full or partial backups using Replicated snapshots.

## Overview

Snapshots supports the following types of restores:
* Restore both the application and the KOTS Admin Console (also referred to as a _full_ restore)
* Restore the KOTS Admin Console only
* Restore the application only (also referred to as a _partial_ restore)

You can do any type of restore from a full backup using the KOTS CLI. You can also restore an application from a full or partial backup using the Admin Console.

## Limitations

The following limitations apply to restoring from backups using snapshots:

* Only full backups that include both the application and the Admin Console can be restored to a new cluster in disaster recovery scenarios. Partial backups that include the application only _cannot_ be restored to a new cluster, and are therefore not useable for disaster recovery.
* Snapshots must be restored on the same operating system that the snapshot was taken on. For example, snapshots taken on a CentOS cluster must be restored on a CentOS cluster.
* Snapshots can be restored only to clusters that use the same installation method as the cluster the snapshot was taken from. For example, snapshots taken in an online (internet-connected) cluster must be restored to an online cluster.
* Only full backups can be restored using the KOTS CLI. To restore an application from a partial backup, use the Admin Console. See [Restore the Application Only Using the Admin Console](/enterprise/snapshots-restoring-full#admin-console).

For a full list of limitations and considerations related to the snapshots feature, see  [Limitations and Considerations](/vendor/snapshots-overview#limitations-and-considerations) in _About Backup and Restore_. 

## Restore From a Full Backup Using the CLI {#full-cli}

You can use the KOTS CLI to restore both the Admin Console and the application, the Admin Console only, or the application only. If you need to restore the Admin Console, you must use the KOTS CLI because the Admin Console gets recreated and is disconnected during the restore process.

:::note
Only full backups can be restored using the KOTS CLI. To restore an application from a partial backup, use the Admin Console. See [Restore the Application Only Using the Admin Console](/enterprise/snapshots-restoring-full#admin-console).
:::

To restore using the CLI, see the corresponding procedure for your environment:

- [Existing Clusters](#existing)
- [Online kURL Clusters](#online)
- [Air Gap kURL Clusters](#air-gapped)

### Existing Clusters {#existing}

:::note
If you are restoring to a healthy cluster, you can skip reinstalling Velero and continue to running the `get backups` and `restore` commands in the last two steps.
:::

To restore a full backup in an existing cluster:

1. (New or Unhealthy Clusters Only) In the cluster where you will do the restore, install a version of Velero that is compatible with the version that was used to make the snapshot backup.

    The Velero installation command varies depending on the storage destination for the backup. For the Velero installation command, see one of the following:

    * **Host Path:** See [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath)
    * **NFS:** See [Configuring an NFS Storage Destination](snapshots-configuring-nfs) or  for the configuration steps and how to set up Velero.
    * **AWS, GCP, Azure, or other S3:** See [Configuring Other Storage Destinations](snapshots-storage-destinations). 

1. Run the [`kubectl kots get backups`](/reference/kots-cli-get-backups) command to get the list of full backups for the instance.

1. Run the following command to restore a full backup: 

    ```bash
    kubectl kots restore --from-backup BACKUP
    ```
    Replace `BACKUP` with the the name of the backup to restore from.
    
    For more information about the available options for the `kots restore` command, including application-only and Admin Console-only options, see [restore](/reference/kots-cli-restore-index/).

### Online Embedded kURL Clusters {#online}

:::note
If you are restoring to a healthy cluster, you can skip the installation and configuration steps and continue to running the `get backups` and `restore` commands in the last two steps.
:::

To restore a full backup in a kURL cluster:

1. (New or Unhealthy Clusters Only) Provision a cluster with kURL and install the target application in the cluster. See [Online Installation with kURL](installing-kurl).

1. (New or Unhealthy Clusters Only) In the new kURL cluster, configure a storage destination that holds the backup you want to use:

    * **Host Path:** See [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath)
    * **NFS:** See [Configuring an NFS Storage Destination](snapshots-configuring-nfs) or  for the configuration steps and how to set up Velero.
    * **AWS, GCP, Azure, or other S3:** See [Configuring Other Storage Destinations](snapshots-storage-destinations).

1. Run the [`kubectl kots get backups`](/reference/kots-cli-get-backups) command to get the list of full backups for the instance.

1. Run the following command to restore a full backup: 

    ```bash
    kubectl kots restore --from-backup BACKUP
    ```
    Replace `BACKUP` with the the name of the backup to restore from.
    
    For more information about the available options for the `kots restore` command, including application-only and Admin Console-only options, see [restore](/reference/kots-cli-restore-index/).

### Air Gap kURL Clusters {#air-gapped}

To restore a full backup in an air gap kURL cluster:

1. Run the following command to install a new cluster and provide kURL with the correct registry IP address. kURL must be able to assign the same IP address to the embedded private image registry in the new cluster.

    ```bash
    cat install.sh | sudo bash -s airgap kurl-registry-ip=IP
    ```

    Replace `IP` with the registry IP address.

1. Use the KOTS CLI to configure Velero to use a storage destination. The storage backend used for backups must be accessible from the new cluster. 

    * **Host Path:** See [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath)
    * **NFS:** See [Configuring an NFS Storage Destination](snapshots-configuring-nfs) or  for the configuration steps and how to set up Velero.
    * **S3-Compatible:** See [Configure S3-Compatible Storage for Air Gapped Environments](snapshots-storage-destinations#configure-s3-compatible-storage-for-air-gapped-environments) in _Configuring Other Storage Destinations_.

1. Run the [`kubectl kots get backups`](/reference/kots-cli-get-backups) command to get the list of full backups for the instance.

1. Run the following command to restore a full backup: 

    ```bash
    kubectl kots restore --from-backup BACKUP
    ```
    Replace `BACKUP` with the the name of the backup to restore from.
    
    For more information about the available options for the `kots restore` command, including application-only and Admin Console-only options, see [restore](/reference/kots-cli-restore-index/).

## Restore the Application Only Using the Admin Console {#admin-console}

You can restore an application from a full or partial backup using the Admin Console.

### Restore an Application From a Full Backup

To restore an application from a full backup:

1. Select **Full Snapshots (Instance)** from the Snapshots tab.

    ![Full Snapshot tab](/images/full-snapshot-tab.png)

    [View a larger version of this image](/images/full-snapshot-tab.png)

1. Click the **Restore from this backup** icon (the circular blue arrows) for the backup that you want to restore.

1. In the **Restore from backup** dialog, select **Partial restore**.

    ![Restore Full Snapshot dialog](/images/restore-backup-dialog.png)

    [View a larger version of this image](/images/restore-backup-dialog.png)

    :::note
    You can also get the CLI commands for full restores or Admin Console only restores from this dialog.
    :::     

1. At the bottom of the dialog, enter the application slug provided by your software vendor. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Applications_.

1. Click **Confirm and restore**.

### Restore an Application From a Partial Backup 

To restore an application from a partial backup:

1. Select **Partial Snapshots (Application)** from the Snapshots tab.

    ![Partial Snapshot tab](/images/partial-snapshot-tab.png)

    [View a larger version of this image](/images/partial-snapshot-tab.png)

1. Click the **Restore from this backup** icon (the circular blue arrows) for the backup that you want to restore.

    The **Restore from Partial backup (Application)** dialog opens.

1. Under **Type your application slug to continue**, enter the application slug provided by your software vendor. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug) in _Managing Applications_.

    ![Restore Partial Snapshot dialog](/images/restore-partial-dialog.png)

    [View a larger version of this image](/images/restore-partial-dialog.png)

1. Click **Confirm and restore**.

## Additional Resources

[Troubleshooting Snapshots](snapshots-troubleshooting-backup-restore)