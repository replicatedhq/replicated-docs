# Backup

The Backup custom resource enables the Replicated snapshots backup and restore feature. A Backup custom resource is required for each application that you deploy. Additionally, you must add annotations for each volume that you want to back up. For more information about configuring backups, see [Configuring Backups](/vendor/snapshots-configuring-backups).

The Backup custom resource also supports optional resource installations so that the feature can be dynamically enabled based on a license field or a config option. For more information, see [Include Optional and Conditional Resources](/vendor/packaging-include-resources).

## Example

You can add the following Backup custom resource (`kind: Backup`, `apiVersion: velero.io/v1`) to your release and configure it as needed. The backend of this feature uses the Velero open source project to back up Kubernetes manifests and persistent volumes. For field descriptions, see [Backups](https://velero.io/docs/v1.10/api-types/backup/) in the Velero documentation.

The default values for some fields differ from Velero, and some Velero fields are not supported by the app manager for full backups. For more information, see [Fields](#fields) and [Limitations for Full Backups](#limitations).

In the following example, the `annotations` field shows a conditional resource. In this case, the volume for postgres will be backed up when the enterprise user selects the postgres config value for a Kubernetes installer-created cluster (embedded cluster).

```yaml
apiVersion: velero.io/v1
kind: Backup
metadata:
  name: backup
  namespace: velero
  annotations:
    "kots.io/when": '{{repl ConfigOptionEquals "postgres_type" "embedded_postgres" }}'
spec: 
  csiSnapshotTimeout: 10m
  includedNamespaces:
  - '*'
  excludedNamespaces:
  - some-namespace
  orderedResources:
    pods: mysql/mysql-cluster-replica-0,mysql/mysql-cluster-replica-1,mysql/mysql-cluster-source-0
    persistentvolumes: pvc-87ae0832-18fd-4f40-a2a4-5ed4242680c4,pvc-63be1bb0-90f5-4629-a7db-b8ce61ee29b3
  includeClusterResources: true
  storageLocation: aws-primary
  ttl: 720h
  defaultVolumesToFsBackup: true
  hooks:
    resources:
      -
        name: my-hook
        includedNamespaces:
        - '*'
        excludedNamespaces:
        - some-namespace
        includedResources:
        - pods
        excludedResources: []
        labelSelector:
          matchLabels:
            app: velero
            component: server
        pre:
          -
            exec:
              container: my-container
              command:
                - /bin/uname
                - -a
              onError: Fail
              timeout: 10s
        post:
status:
  version: 1
  expiration: null
  phase: ""
  validationErrors: null
  startTimestamp: 2019-04-29T15:58:43Z
  completionTimestamp: 2019-04-29T15:58:56Z
  volumeSnapshotsAttempted: 2
  volumeSnapshotsCompleted: 1
  warnings: 2
  errors: 0
  failureReason: ""
```

## Fields

The following field settings differ from the default Velero field settings: 

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
    <td> Specifies whether pod volume file system backups should be used for all volumes by default. By default, this is set to <code>720h</code> (which is one month) and is configurable only by the customer.</td>
  </tr>
</table>

## Limitations for Full Backups {#limitations}

_Top-level fields_ are children of `spec`. The following top-level fields are not supported in full backups, and so are not shown in the preceding example specification:

- `snapshotVolumes`
- `volumeSnapshotLocations`
- `labelSelector`
- `includedResources`
- `excludedResources`