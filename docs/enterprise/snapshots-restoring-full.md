# Restoring from Backups

This topic describes how to restore full backups for disaster recovery on online and air gapped clusters. It also explains how to restore a partial backup (application only) from the Replicated admin console.

## Restore Any Backup from the CLI {#full-cli}

Full backups are restored using the kots CLI. During restoration, the admin console gets recreated and the admin console UI is disconnected during this process.

Restoring full backups includes the admin console and the application with its metadata. You can also use the CLI to restore just the admin console or to do a partial restore of just the application and its metadata.

If you are restoring to a brand new environment, you must run the installer, install Velero, and set a storage destination before restoring the backup.

If you are restoring to an existing environment, 


### Existing Clusters

1. Begin with installing a version of Velero compatible with the one that was used to make the snapshot.
    * If restoring from an NFS or a host path storage destination, see [Configuring an NFS Storage Destination](snapshots-configuring-nfs) or [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath) for the configuration steps and how to set up Velero.
    * Otherwise, see [Basic Install](https://velero.io/docs/v1.9/basic-install/) and [Plugins](https://velero.io/plugins/) in the Velero documentation.

    **Note**: Restic is required and `--use-restic` flag must be used with `velero install` command.

1. Use the kots CLI to list backups and create restores. See [backup ls](../reference/kots-cli-backup-ls/) and [restore](../reference/kots-cli-restore-index/) in the kots CLI documentation.

### Online Kubernetes Installer Clusters

1. Set up the embedded cluster. See [Installing with the Kubernetes Installer](installing-embedded-cluster).
1. Use the kots CLI to configure the pre-installed Velero setup to point at the snapshot storage destination.
    Consult the relevant CLI documentation for your provider:
    * **AWS S3 Configuration**: See [velero configure-aws-s3](../reference/kots-cli-velero-configure-aws-s3/).
    * **Azure Configuration**: See [velero configure-azure](../reference/kots-cli-velero-configure-azure/).
    * **GCP Configuration**: See [velero configure-gcp](../reference/kots-cli-velero-configure-gcp/).
    * **S3-Other (e.g. MinIO) Configuration**: See [velero configure-other-s3](../reference/kots-cli-velero-configure-other-s3/).
    * **NFS Configuration**: See [velero configure-nfs](../reference/kots-cli-velero-configure-nfs/) and [Configuring an NFS Storage Destination](snapshots-configuring-nfs).
    * **HostPath Configuration**: See [velero configure-hostpath](../reference/kots-cli-velero-configure-hostpath/) and [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath).
1. Use the kots CLI to list backups and create restores. See [backup ls](../reference/kots-cli-backup-ls/) and [restore](../reference/kots-cli-restore-index/) in the kots CLI documentation.

### Air Gapped Kubernetes Installer Clusters

An air gapped Kubernetes installer-created cluster can be restored only if the store backend used for backups is accessible from the new cluster.

The Kubernetes installer must also be able to assign the same IP address to the embedded private image registry in the new cluster.

The Kubernetes installer must be provided with the correct registry IP address:

```bash
cat install.sh | sudo bash -s airgap kurl-registry-ip=<ip>
```

The registry from the old cluster does not need to be (and should not be) accessible.

1. Set up the cluster in accordance with the above guidance as well as the guidance in the air gap installation documentation. See [Install in an Air Gapped Environment](installing-embedded-cluster#air-gap).
1. Use the kots CLI to configure the pre-installed velero setup to point at the snapshot storage destination.
    Consult the relevant CLI documentation for your provider:
    * **AWS S3 Configuration**: See [velero configure-aws-s3](../reference/kots-cli-velero-configure-aws-s3/).
    * **Azure Configuration**: See [velero configure-azure](../reference/kots-cli-velero-configure-azure/).
    * **GCP Configuration**: See [velero configure-gcp](../reference/kots-cli-velero-configure-gcp/).
    * **S3-Other (e.g. Minio) Configuration**: See [velero configure-other-s3](../reference/kots-cli-velero-configure-other-s3/).
    * **NFS Configuration**: See [velero configure-nfs](../reference/kots-cli-velero-configure-nfs/) and [Configuring an NFS Storage Destination](snapshots-configuring-nfs).
    * **HostPath Configuration**: See [velero configure-hostpath](../reference/kots-cli-velero-configure-hostpath/) and [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath).
1. Use the kots CLI to list backups and create restores. See [backup ls](../reference/kots-cli-backup-ls/) and [restore](../reference/kots-cli-restore-index/) in the kots CLI documentation.

## Restore Partial Backups from the Admin Console

You can restore a partial backup from the admin console or from the kots CLI. Partial backups consist of the application and its metadata.

:::note
Additionally, you can use the admin console to get the commands to restore a full backup or to restore only the admin console. Alternatively, you can just use the kots CLI to restore any backup. See [Restore Any Backup from the CLI](#full-cli).
:::

To restore a partial backup from the admin console:

1. Select **Full Snapshots (Instance)** from the Snapshots tab.

    ![Full Snapshot tab](/images/full-snapshot-tab.png)

    [View a larger image](/images/full-snapshot-tab.png)

1. Click the **Restore from this backup** icon for the snapshot that you want to restore.

1. In the Restore from backup dialog, select **Partial restore**.

    ![Restore Full Snapshot dialog](/images/restore-backup-dialog.png)

1. In the list of available backups at the bottom of the dialog, enter the application slug in the **App Name** next to the snapshot that you want to restore. Click **Confirm and restore**.

  The admin console deletes the selected application. All existing application manifests are removed from the cluster, and all `PersistentVolumeClaims` are deleted. This action is not reversible.

  Then, all of the application manifests are redeployed to the namespace. All Pods are giving an extra `initContainer` and an extra directory named `.velero`, which are used to restore hooks. For more information about the restore process, see [Restore Reference](https://velero.io/docs/v1.9/restore-reference/) in the Velero documentation.

## Additional Resources

[Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)