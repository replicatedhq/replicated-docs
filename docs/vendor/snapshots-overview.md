import RestoreTable from "../partials/snapshots/_restoreTable.mdx"

# About Backup and Restore

Replicated's backup and restore feature for applications is called snapshots. You can optionally enable snapshots to support backup and restore for your users for disaster recovery scenarios.

Snapshots use the Velero open source project as the backend to back up Kubernetes manifests and persistent volumes. Velero is a mature, fully-featured application. For more information, see the [Velero documentation](https://velero.io/docs/).

In addition to the default functionality that Velero provides, the Replicated admin console provides a detailed interface where your users can manage storage destinations, schedule snapshots, and perform and monitor the backup process. For more information, see [About Backup and Restore](/enterprise/snapshots-understanding) in the _Enterprise_ documentation.

These details can also be managed using the kots CLI, which is the CLI for the Replicated app manager.

:::note
The restore process is managed through the kots CLI only.
:::

The app manager also exposes hooks that can be used to inject scripts to execute with snapshots both [before and after a backup](snapshots-configuring-backups) and [before and after a restore](../enterprise/snapshots-understanding).

## What Data is Backed Up

There are two types of snapshots available that back up different types of data:

* **Full snapshots (Recommended)**: Backs up the admin console and all application data, including KOTS-specific object-stored data. For embedded clusters, this also backs up the Docker registry, which is required for air gapped installations.

    If other types of object-stored data (not KOTS-specific) is being used that does not use a persistentVolumeClaim (PVC), then you must write custom backup and restore hooks for your users to be able to back up object-stored data. For example, Rook and Ceph do not use PVCs and require custom backup and restore hooks. For more information, see [Configuring Backup and Restore Hooks](snapshots-hooks).

* **Partial snapshots**: Backs up the application volumes and manifests only. This is a legacy feature and does not support disaster recovery because it only backs up the application.

For limitations and considerations, see [Limitations and Considerations](/enterprise/snapshots-understanding#limitations-and-considerations).

## Pod Volume Data

Replicated snapshots supports the restic backup program only.

By default, Velero requires that you opt-in to have pod volumes backed up. In the Backup resource that you configure to enable snapshots, you must annotate each specific volume that you want to back up. For more information about including and excluding pod volumes, see [Configuring Backups](snapshots-configuring-backups). 

## How to Enable Backup and Restore

To enable the snapshots backup and restore feature for your users, you must:

- Have the snapshots entitlement enabled in your Replicated vendor account. For account entitlements, contact the Replicated TAM team.
- Define a manifest for creating backups. See [Configuring Backups](snapshots-configuring-backups).
- When needed, configure backup and restore hooks. See [Configuring Backup and Restore Hooks](snapshots-hooks).
- Enable the **Allow Snapshot** option in customer licenses. See [Creating a Customer](releases-creating-customer).

## Understanding Backup and Restore for End Users {#how-users}

After vendors enable backup and restore, end users install Velero and configure a storage destination in the admin console. Then users can create backups manually or schedule automatic backups. For more information about how end users create and restore backups, see [About Backup and Restore](/enterprise/snapshots-understanding) in _Enterprise_.

Replicated recommends advising your users to make full backups for disaster recovery purposes. Additionally, full backups give users the flexibility to do a full restore, a partial restore (application only), or restore just the admin console.

From a full backup, users restore using the kots CLI or the admin console as indicated in the following table:

<RestoreTable/>

Partial backups are not recommended and can only be restored from the admin console.

## Troubleshooting Backup and Restore

To support end users with backup and restore, use the following resources:

- To help troubleshoot error messages, see [Troubleshooting Backup and Restore](/enterprise/snapshots-troubleshooting-backup-restore) in _Enterprise_. 

- Review the Limitations and Considerations section to make sure an end users system is compliant. See [Limitations and Considerations](/enterprise/snapshots-understanding#limitations-and-considerations) in _Enterprise_.

- Check that the installed Velero version and app manager version are compatible. See [Velero Version Compatibility](/enterprise/snapshots-understanding#velero-version-compatibility) in _Enterprise_.