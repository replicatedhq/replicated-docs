# Snapshots Overview

Snapshots is the backup and restore feature for applications. This is an optional feature.

To enable snapshots, the Replicated app manager uses the Velero open source project on the backend to back up Kubernetes manifests and persistent volumes. Velero is a mature, fully-featured application. For more information, see the [Velero documentation](https://velero.io/docs/).

In addition to the default functionality that Velero provides, the app manager provides a detailed interface in the [admin console](../enterprise/snapshots-scheduling) where end users can manage the storage destination and schedule, and perform and monitor the backup process. These details can also be managed using the kots CLI, the CLI for the app manager.
:::note
The restore process is managed through the kots CLI only.
:::

The app manager also exposes hooks that can be used to inject scripts to execute with Snapshots both [before and after a backup](snapshots-configuring-backups) and [before and after a restore](../enterprise/snapshots-understanding).

## How to Implement Snapshots

To implement this feature you must:

- Have access to the snapshots entitlement in your Replicated vendor account. For more information about entitlements, contact the Replicated TAM team.
- Enable the Allow Snapshot option in customer licenses.
- Define a manifest for executing snapshots and restoring previous snapshots. For more information, see [Configuring Backups](snapshots-configuring-backups).

Additionally, your end users must install Velero to access the snapshot functionality in the Replicated admin console. For more information about the enterprise snapshots procedures, see [Understanding Snapshots](../enterprise/snapshots-understanding).

## Velero Version Compatibility

The following table lists which versions of Velero are compatible with each version of the app manager.

:::note
The app manager is based on the open source KOTS project, which is maintained by Replicated.
:::

| App manager and KOTS versions | Velero version |
|------|-------------|
| 1.15 to 1.20.2 | 1.2.0 |
| 1.20.3 and later | 1.6.2 |
