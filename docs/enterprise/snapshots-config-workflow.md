# How to Set Up Backup Storage

This topic describes the process of setting up backup storage for the Replicated snapshots feature.

## Configuring Backup Storage for Embedded Clusters

You must configure a backup storage destination before you can create backups. This procedure describes how to configure backup storage for snapshots for _embedded clusters_ created by Replicated kURL.

To configure snapshots for embedded clusters:

1. On the Snapshots tab in the Admin Console, click **Check for Velero** to see whether kURL already installed Velero in the embedded cluster.

1. If Velero was installed, update the default internal storage settings in the Admin Console because internal storage is insufficient for full backups. See [Update Settings in the Admin Console](snapshots-updating-with-admin-console).

1. If Velero was not installed:

    1. Install the Velero CLI. See [Install the Velero CLI](snapshots-velero-cli-installing).

    1. Install Velero and configure a storage destination using one of the following procedures.

        - [Configure a Host Path Storage Destination](snapshots-configuring-hostpath)
        - [Configure an NFS Storage Destination](snapshots-configuring-nfs)
        - [Configure Other Storage Destinations](snapshots-storage-destinations)

1. Optionally increase the default memory for the node-agent (restic) Pod. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).

## Configuring Backup Storage for Existing Clusters

You must configure a backup storage destination before you can create backups.

Follow this process to install Velero and configure the snapshots feature:

1. Install the Velero CLI. See [Install the Velero CLI](snapshots-velero-cli-installing).

1. Install Velero and configure a storage destination using one of the following procedures.

    - [Configure a Host Path Storage Destination](snapshots-configuring-hostpath)
    - [Configure an NFS Storage Destination](snapshots-configuring-nfs)
    - [Configure Other Storage Destinations](snapshots-storage-destinations)

1. Enable access to the Velero namespace if you are using RBAC and optionally increase the default memory for the node-agent (restic) Pod. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).

## Next Step

After you configure a storage destination, you can create a backup. See [Create and Schedule Backups](snapshots-creating).

## Additional Resources

* [Restore Full Backups](snapshots-restoring-full)
* [Troubleshoot Snapshots](snapshots-troubleshooting-backup-restore)
