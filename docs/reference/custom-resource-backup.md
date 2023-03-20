# Backup

The Backup custom resource enables the Replicated snapshots backup and restore feature. The backend of this feature uses the Velero open source project to back up Kubernetes manifests and persistent volumes.

A Backup custom resource is required for each application that you deploy. Additionally, you must add annotations for each volume that you want to back up. For more information about configuring backups, see [Configuring Backups](/vendor/snapshots-configuring-backups).

All resources are included by default. To exclude resources from the backup, the [`velero.io/exclude-from-backup=true`](https://velero.io/docs/v1.5/resource-filtering/#veleroioexclude-from-backuptrue) label must be used and added to the resource instead.

This custom resource also supports optional resource installations so that the feature can be dynamically enabled based on a license field or a config option. For more information, see [Include Optional and Conditional Resources](/vendor/packaging-include-resources).

## Basic Manifest File

You can add the following basic Backup custom resource (`kind: Backup`, `apiVersion: velero.io/v1`) to your release. 

```yaml
apiVersion: velero.io/v1
kind: Backup
metadata:
  name: backup
  annotations:
    "kots.io/when": '{{repl ConfigOptionEquals "postgres_type" "embedded_postgres" }}'
spec: {}
```

## Fields

Note the following field settings. For information about all of the the options for this custom resource, see [Backups](https://velero.io/docs/v1.10/api-types/backup/) in the Velero documentation.

<table>
  <tr>
    <th width="30%">Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><code>includeClusterResources</code></td>
    <td>Always set to <code>true</code>.</td>
  </tr>
  <tr>
    <td><code>ttl</code></td>
    <td>Set to <code>720h</code> (1 month) by default and is configurable only by the customer.</td>
  </tr>
</table>

There are some top-level field limitations for full backups. For information about limitations, see [Limitations for Full Backups](#limitations).

## Limitations for Full Backups {#limitations}

The following top-level fields for Backup custom resources are not supported in full backups.

- `snapshotVolumes`
- `volumeSnapshotLocations`
- `labelSelector`
- `includedResources`
- `excludedResources`