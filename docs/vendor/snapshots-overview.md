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

* **Full snapshots (Recommended)**: Backs up the admin console and all application data, including kots-specific object-stored data. For embedded clusters, this also backs up the Docker registry, which is required for air gapped installations.

  If other types of object-stored data (not kots-specific) is being used that does not use a PVC, then you must write custom backup and restore hooks for your users to be able to back up object-stored data. For example, Rook and Ceph do not use PVCs and require custom backup and restore hooks.

* **Partial snapshots**: Backs up the application volumes and manifests only. This is a legacy feature and does not support disaster recovery because it only backs up the application.

For limitations and considerations, see [Limitations and Considerations](/enterprise/snapshots-understanding#limitations-and-consoderations).


## How to Enable Backup and Restore

To enable the snapshots backup and restore feature for your users, you must:

- Have the snapshots entitlement enabled in your Replicated vendor account. For account entitlements, contact the Replicated TAM team.
- Define a manifest for executing snapshots and restoring previous snapshots. For more information, see [Configuring Backups](snapshots-configuring-backups).
- Enable the Allow Snapshot option in customer licenses. For more information, see [Creating a Customer](releases-creating-customer).

Additionally, your end users must install Velero to access the snapshot functionality in the Replicated admin console. For more information about the enterprise snapshots procedures, see [Understanding Snapshots](../enterprise/snapshots-understanding) in the _Enterprise_ documentation.

## Velero Version Compatibility

The following table lists which versions of Velero are compatible with each version of the app manager.

:::note
The app manager is based on the open source KOTS project, which is maintained by Replicated.
:::

| App manager and KOTS versions | Velero version |
|------|-------------|
| 1.15 to 1.20.2 | 1.2.0 |
| 1.20.3 and later | 1.5.1 through 1.9.x |
| 1.94.1 and later | 1.6.x and later |
