# Snapshots overview

KOTS Snapshots is the backup and restore feature for applications deployed with KOTS. This is an optional feature, and it requires that licenses have the Allow Snapshots feature enabled.

To enable Snapshots, KOTS uses the [Velero open source project](https://velero.io/) on the backend to back up Kubernetes manifests and persistent volumes. Velero is a mature, fully-featured application.

In addition to the default functionality that Velero provides, KOTS provides a detailed interface in the [admin console](../enterprise/snapshots-scheduling) where end users can manage the storage destination and schedule, and perform and monitor the backup process. These details can also be managed using the KOTS CLI.

Note: The restore process is managed through the KOTS CLI only.

KOTS also exposes hooks that can be used to inject scripts to execute with Snapshots both [before and after a backup](snapshots-configuring-backups) and [before and after a restore](../enterprise/snapshots-understanding).

## Velero version compatibility

| KOTS Version(s) | Velero Version |
|------|-------------|
| 1.15 to 1.20.2 | 1.2.0 |
| 1.20.3+ | 1.6.2 |
