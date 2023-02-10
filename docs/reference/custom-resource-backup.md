# Backup

When you include a Backup custom resource in an application, the Replicated admin console enables [snapshots](../vendor/snapshots-overview) for the application.

For more information about the Backup custom resource, including all options for this custom resource, see [Backups](https://velero.io/docs/v1.10/api-types/backup/) in the Velero documentation.

This custom resource supports optional resource installations. For more information, see [Include optional resources](../vendor/packaging-include-resources).

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

The following top-level fields for Backup custom resources are not supported in [Full snapshots](../enterprise/snapshots-understanding/#full-snapshots-recommended):

- `snapshotVolumes`
- `volumeSnapshotLocations`
- `labelSelector`, `includedResources` and `excludedResources`

All resources are included by default. To exclude resources from the backup, the [`velero.io/exclude-from-backup=true`](https://velero.io/docs/v1.5/resource-filtering/#veleroioexclude-from-backuptrue) label must be used and added to the resource instead.

- `includeClusterResources`: this will always be set to `true`.
- `ttl`: this is set to `720h` (1 month) by default and is only configurable by the customer.
