# Snapshots overview

Snapshots is the backup and restore feature for applications. This is an optional feature, and it requires that licenses have the Allow Snapshots feature enabled.

To enable snapshots, the Replicated app manager uses the [Velero open source project](https://velero.io/) on the backend to back up Kubernetes manifests and persistent volumes. Velero is a mature, fully-featured application.

In addition to the default functionality that Velero provides, the app manager provides a detailed interface in the [admin console](../enterprise/snapshots-scheduling) where end users can manage the storage destination and schedule, and perform and monitor the backup process. These details can also be managed using the kots CLI, the CLI for the app manager.

**Note**: The restore process is managed through the kots CLI only.

The app manager also exposes hooks that can be used to inject scripts to execute with Snapshots both [before and after a backup](snapshots-configuring-backups) and [before and after a restore](../enterprise/snapshots-understanding).

## Velero version compatibility

The following table lists which versions of Velero are compatible with each version of the app manager.

**Note**: The app manager is based on the open source KOTS project, which is maintained by Replicated.

| App manager and KOTS versions | Velero version |
|------|-------------|
| 1.15 to 1.20.2 | 1.2.0 |
| 1.20.3 and later | 1.6.2 |
