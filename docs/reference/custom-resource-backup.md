# Backup

The Backup custom resource enables the Replicated snapshots backup and restore feature. The backend of this feature uses the Velero open source project to back up Kubernetes manifests and persistent volumes.

A Backup custom resource is required for each application that you deploy. You must add annotations for each volume that you want to back up. You can also configure manifest exclusions. For more information about configuring backups, see [Configuring Backups](/vendor/snapshots-configuring-backups).

This custom resource supports optional resource installations. For more information, see [Include Optional and Conditional Resources](/vendor/packaging-include-resources).

## Basic Manifest File

You can add the following basic Backup custom resource (kind: Backup) to your release. For information about all of the the options for this custom resource, see [Backups](https://velero.io/docs/v1.10/api-types/backup/) in the Velero documentation.

```yaml
apiVersion: velero.io/v1
kind: Backup
metadata:
  name: backup
  annotations:
    "kots.io/when": '{{repl ConfigOptionEquals "postgres_type" "embedded_postgres" }}'
spec: {}
```

## Limitations for Full Snapshots

The following top-level fields for Backup custom resources are not supported in full backups.

- `snapshotVolumes`
- `volumeSnapshotLocations`
- `labelSelector`, `includedResources` and `excludedResources`

All resources are included by default. To exclude resources from the backup, the [`velero.io/exclude-from-backup=true`](https://velero.io/docs/v1.5/resource-filtering/#veleroioexclude-from-backuptrue) label must be used and added to the resource instead.

- `includeClusterResources`: this will always be set to `true`.
- `ttl`: this is set to `720h` (1 month) by default and is only configurable by the customer.
