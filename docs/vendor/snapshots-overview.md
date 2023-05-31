import RestoreTable from "../partials/snapshots/_restoreTable.mdx"

# Understanding Backup and Restore

This topic describes how vendors enable the backup and restore feature, the type of data that is backed up, and how to troubleshoot issues for enterprise users. 

## About Backup and Restore

As a vendor, when you distribute your application with Replicated KOTS you can enable Replicated snapshots to support backup and restore for your enterprise users.

Snapshots uses the Velero open source project as the backend to back up Kubernetes manifests and persistent volumes. Velero is a mature, fully-featured application. For more information, see the [Velero documentation](https://velero.io/docs/).

In addition to the default functionality that Velero provides, KOTS exposes hooks that let you inject scripts that can execute both before and after a backup, and before and after a restore. For more information, see [Configuring Backup and Restore Hooks](snapshots-hooks).

KOTS provides the Replicated admin console and the Replicated kots CLI so that your users can fully manage the backup and restore process. For more information, see [Understanding Backup and Restore for Enterprise Users](#how-users).

## What Data is Backed Up

Full backups include the admin console and all application data, including KOTS-specific object-stored data. For Replicated kURL clusters (embedded clusters), this also backs up the Docker registry, which is required for air gapped installations.

### Other Object-Stored Data

For embedded clusters, you might be using object-stored data that is not specific to the kURL KOTS add-on. 

For object-stored data that is not KOTS-specific and does not use persistentVolumeClaims (PVCs), you must write custom backup and restore hooks to enable back ups for that object-stored data. For example, Rook and Ceph do not use PVCs and so require custom backup and restore hooks. For more information about writing custom hooks, see [Configuring Backup and Restore Hooks](snapshots-hooks).

### Pod Volume Data

Replicated supports only the restic backup program for pod volume data.

By default, Velero requires that you opt-in to have pod volumes backed up. In the Backup resource that you configure to enable snapshots, you must annotate each specific volume that you want to back up. For more information about including and excluding pod volumes, see [Configuring Backups](snapshots-configuring-backups). 

## How to Enable Backup and Restore

To enable the snapshots backup and restore feature for your users, you must:

- Have the snapshots entitlement enabled in your Replicated vendor account. For account entitlements, contact the Replicated TAM team.
- Define a manifest for creating backups. See [Configuring Backups](snapshots-configuring-backups).
- When needed, configure backup and restore hooks. See [Configuring Backup and Restore Hooks](snapshots-hooks).
- Enable the **Allow Snapshot** option in customer licenses. See [Creating a Customer](releases-creating-customer).

## Understanding Backup and Restore for Enterprise Users {#how-users}

After vendors enable backup and restore, enterprise users install Velero and configure a storage destination in the admin console. Then users can create backups manually or schedule automatic backups. For more information about how users create and restore backups, see [About Backup and Restore](/enterprise/snapshots-understanding) in _Enterprise_.

Replicated recommends advising your users to make full backups for disaster recovery purposes. Additionally, full backups give users the flexibility to do a full restore, a partial restore (application only), or restore just the admin console.

From a full backup, users restore using the kots CLI or the admin console as indicated in the following table:

<RestoreTable/>

Partial backups are not recommended as they are a legacy feature and only back up the application volumes and manifests. Partial backups can be restored only from the admin console.

## Troubleshooting Backup and Restore

To support end users with backup and restore, use the following resources:

- To help troubleshoot error messages, see [Troubleshooting Backup and Restore](/enterprise/snapshots-troubleshooting-backup-restore) in _Enterprise_. 

- Review the Limitations and Considerations section to make sure an end users system is compliant. See [Limitations and Considerations](/enterprise/snapshots-understanding#limitations-and-considerations) in _Enterprise_.

- Check that the installed Velero version and KOTS version are compatible. See [Velero Version Compatibility](/enterprise/snapshots-understanding#velero-version-compatibility) in _Enterprise_.