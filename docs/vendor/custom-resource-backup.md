# Backup

A Backup resource in an application causes the Admin Console to enable [snapshots](snapshots-overview) for the application.
This resource is fully documented on [velero.io](https://velero.io/docs/v1.5/api-types/backup/).

This custom resource supports optional resource installations. For more information, see [Include optional resources](packaging-include-resources).

```yaml
apiVersion: velero.io/v1
kind: Backup
metadata:
  name: backup
  annotations:
    "kots.io/when": '{{repl ConfigOptionEquals "postgres_type" "embedded_postgres" }}'
spec: {}
```

Refer to the Velero documentation for all options in this resource.

**Important Note**: the following top-level spec fields are not currently supported in [Full Snapshots](../enterprise/snapshots-understanding/#full-snapshots-recommended):

- `snapshotVolumes`
- `volumeSnapshotLocations`
- `labelSelector`, `includedResources` and `excludedResources`

All resources are included by default. To exclude resources from the backup, the [velero.io/exclude-from-backup=true](https://velero.io/docs/v1.5/resource-filtering/#veleroioexclude-from-backuptrue) label must be used and added to the resource instead.

- `includeClusterResources`: this will always be set to `true`.
- `ttl`: this is set to `720h` (1 month) by default and is only configurable by the customer.
