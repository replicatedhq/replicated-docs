# Restoring from Backups

This topic describes how to restore any type of backup from the kots CLI, and how to restore a partial backup (application only) from the Replicated admin console.

Backups can be restored to healthy or unhealthy clusters, or brand new clusters.


## About the Restore Process

During any full or partial restore, the admin console deletes the selected application. All existing application manifests are removed from the cluster, and all `PersistentVolumeClaims` are deleted. This action is not reversible.

Then, all of the application manifests are redeployed. All Pods are given an extra `initContainer` and an extra directory named `.velero`, which are used to restore hooks. For more information about the restore process, see [Restore Reference](https://velero.io/docs/v1.9/restore-reference/) in the Velero documentation.

## Restore Any Backup from the CLI {#full-cli}

Using the kots CLI, you can do any of the following types of restores:

- **Full restore:** Restores the admin console and the application
- **Partial restore:** Restores the application
- **Admin console:** Restores only the admin console

Full restores are only done with the CLI, although you can get the `restore` command from either the admin console or using the following procedures. 

During a full restore or admin console restore, the admin console gets recreated and the admin console UI is disconnected during this process.

Partial restores can be done using the CLI or the admin console. For more information about using the admin console, see [Restore the Application from the Admin Console](#admin-console). 

For CLI procedures, see the following sections:

- [Existing Clusters](#existing)
- [Online Kubernetes Installer Clusters](#online)
- [Air Gapped Kubernetes Installer Clusters](#air-gapped)


### Existing Clusters {#existing}

If you are restoring to a healthy cluster, you can skip reinstalling Velero and continue to running the `backup ls` and `restore` commands in the last two steps.

To restore a backup on an existing cluster:

1. (For new or unhealthy clusters) Install a version of Velero compatible with the one that was used to make the snapshot backup.
    * For restoring from an NFS or a host path storage destination, see [Configuring an NFS Storage Destination](snapshots-configuring-nfs) or [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath) for the configuration steps and how to set up Velero.
    * For restoring from other storage destinations, see [Basic Install](https://velero.io/docs/v1.9/basic-install/) and [Plugins](https://velero.io/plugins/) in the Velero documentation.

    When you install, you must include these additional flags with the `velero install` command:

    - **Velero 1.10 and later:** Use the `--use-node-agent`, `--uploader-type=restic`, and `--use-volume-snapshots=false` flags.
    - **Velero versions earlier than 1.10:** Use the `--use-restic` and `--use-volume-snapshots=false` flags. 

1. Run the `kubectl kots backup ls` command to get a list of backups.

1. Run the following command to restore a full backup: 

    ```bash
    kubectl kots restore --from-backup BACKUP
    ```
    Replace `BACKUP` with the the name of the backup to restore from.
    
    For more information about the available restore options, including application only and admin console only, see [restore](/reference/kots-cli-restore-index/) in _Reference_.

### Online Kubernetes Installer Clusters {#online}

If you are restoring to a healthy cluster, you can skip the installation and configuration steps and continue to running the `backup ls` and `restore` commands in the last two steps.

To restore a backup on a Kubernetes installer-created cluster:

1. (For new or unhealthy clusters) Provision a Kubernetes installer cluster and install the application. See [Installing with the Kubernetes Installer](installing-embedded-cluster).

1. (For new or unhealthy clusters) Run the following command to check whether Velero was installed as part of your installation script:

    ```bash
    velero version
    ```
1. (For new or unhealthy clusters) Do one of the following to configure a storage destination:
    - If Velero is not installed, install Velero and configure an external storage destination. To start, see [Installing the Velero CLI](snapshots-velero-cli-installing).
    - If Velero is installed, configure an external storage destination. See the following CLI documentation for your storage type:
        * **AWS S3 Configuration**: See [velero configure-aws-s3](/reference/kots-cli-velero-configure-aws-s3/)
        * **Azure Configuration**: See [velero configure-azure](/reference/kots-cli-velero-configure-azure/)
        * **GCP Configuration**: See [velero configure-gcp](/reference/kots-cli-velero-configure-gcp/)
        * **Other S3 Configuration (such as MinIO)**: See [velero configure-other-s3](/reference/kots-cli-velero-configure-other-s3/)
        * **NFS Configuration**: See [velero configure-nfs](/reference/kots-cli-velero-configure-nfs/)
        * **Host Path Configuration**: See [velero configure-hostpath](/reference/kots-cli-velero-configure-hostpath/)

1. Run the `kubectl kots backup ls` command to get a list of backups.

1. Run the following command to restore a full backup: 

    ```bash
    kubectl kots restore --from-backup BACKUP
    ```
    Replace `BACKUP` with the the name of the backup to restore from.
    
    For more information about the available restore options, including application only and admin console only, see [restore](/reference/kots-cli-restore-index/) in _Reference_.

### Air Gapped Kubernetes Installer Clusters {#air-gapped}

To restore a backup on an air gapped Kubernetes installer cluster:

1. Run the following command to provide the Kubernetes installer with the correct registry IP address. The Kubernetes installer must be able to assign the same IP address to the embedded private image registry in the new cluster.

    ```bash
    cat install.sh | sudo bash -s airgap kurl-registry-ip=IP
    ```

    Replace `IP` with the registry IP address.

1. Use the kots CLI to configure Velero to use a storage destination. The storage backend used for backups must be accessible from the new cluster. 

    See the following CLI documentation for your storage type: 

    * **Other S3 Configuration (such as MinIO)**: See [velero configure-other-s3](/reference/kots-cli-velero-configure-other-s3/)
    * **NFS Configuration**: See [velero configure-nfs](/reference/kots-cli-velero-configure-nfs/)
    * **Host Path Configuration**: See [velero configure-hostpath](/reference/kots-cli-velero-configure-hostpath/)

1. Run the `kubectl kots backup ls` command to get a list of backups.

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

1. At the bottom of the dialog, enter the application slug.

1. Click **Confirm and restore**.

### Use a Partial Backup to do a Partial Restore

To use a partial backup to do a partial restore in the admin console:

1. Select **Partial Snapshots (Application)** from the Snapshots tab.

    ![Partial Snapshot tab](/images/partial-snapshot-tab.png)

    [View a larger image](/images/partial-snapshot-tab.png)

1. Click the **Restore from this backup** icon (the circular blue arrows) for the backup that you want to restore.

    The **Restore from Partial backup (Application)** dialog opens.

1. Under **Type your application slug to continue**, enter the application slug next to the backup that you want to restore.

    ![Restore Partial Snapshot dialog](/images/restore-partial-dialog.png)

1. Click **Confirm and restore**.

## Additional Resources

[Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
