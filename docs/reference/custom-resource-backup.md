# Backup

The Backup custom resource enables the Replicated snapshots backup and restore feature. The backend of this feature uses the Velero open source project to back up Kubernetes manifests and persistent volumes.

Add a Backup custom resource (`kind: Backup`, `apiVersion: velero.io/v1`) to your release and configure it as needed. 

A Backup custom resource is required for each application that you deploy. Additionally, you must add annotations for each volume that you want to back up. For more information about configuring backups, see [Configuring Backups](/vendor/snapshots-configuring-backups).

The Backup custom resource also supports optional resource installations so that the feature can be dynamically enabled based on a license field or a config option. For more information, see [Include Optional and Conditional Resources](/vendor/packaging-include-resources).

 Full snapshots are recommended because they support disaster recovery, and can also be used to restore the application only or the app manager only. For an example and a list of the supported fields, see [Example](#example) and [Fields](#fields).

Partial backups (application only) are supported but not recommended. For partial backups, you can use all of the fields that Velero supports. For information about the supported fields for partial backups, see [Backups](https://velero.io/docs/v1.10/api-types/backup/) in the Velero documentation.

## Example

The following example shows the supported fields for a full backup.

The optional `annotations` field shows an example of a conditional resource. In this case, the volume for postgres will be backed up when the enterprise user selects the postgres config value for a Kubernetes installer-created cluster (embedded cluster).

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
    pods: mysql/mysql-cluster-replica-0,mysql/mysql-cluster-replica-1
    persistentvolumes: pvc-12345,pvc-67890
  includeClusterResources: true
  storageLocation: my-primary
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
  startTimestamp: 2023-02-29T15:58:43Z
  completionTimestamp: 2023-02-29T15:58:56Z
  volumeSnapshotsAttempted: 2
  volumeSnapshotsCompleted: 1
  warnings: 2
  errors: 0
  failureReason: ""
```

## Fields

The following fields are supported for full backups: 

<table>
  <tr>
    <th width="30%">Field Name</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td><code>csiSnapshotTimeout</code></td>
    <td>The timeout interval to wait for the CSI VolumeSnapshot status to become ReadyToUse during creation, before returning an error. <bold>Default:</bold> 10 minutes</td>
  </tr>
  <tr>
    <td><code>includedNamespaces</code></td>
    <td>(Optional) An array of namespaces to include in the backup. If unspecified, all namespaces are included.</td>
  </tr>
  <tr>
    <td><code>excludedNamespaces</code></td>
    <td>(Optional) An array of namespaces to exclude from the backup.</td>
  </tr>
  <tr>
    <td><code>orderedResources</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>includeClusterResources</code></td>
    <td>By default, this is set to <code>true</code> and cannot be reconfigured for full backups.</td>
  </tr>
  <tr>
    <td><code>storageLocations</code></td>
    <td></td>
  </tr>
  <tr>
    <td><code></code></td>
    <td></td>
  </tr>
  <tr>
    <td><code></code></td>
    <td></td>
  </tr>
  <tr>
    <td><code></code></td>
    <td></td>
  </tr>
  <tr>
    <td><code>ttl</code></td>
    <td> Specifies whether pod volume file system backups should be used for all volumes by default. By default, this is set to <code>720h</code> (which is one month) and is configurable only by the customer.</td>
  </tr>
  <tr>
    <td><code></code></td>
    <td></td>
  </tr>
</table>

## Limitations for Full Backups {#limitations}

The following top-level fields, or children of `spec`, are not supported in full backups. Therefore, these fields are not shown in the preceding example specification:

- `snapshotVolumes`
- `volumeSnapshotLocations`
- `labelSelector`
- `includedResources`
- `excludedResources`

:::note
Resources can be excluded adding `velero.io/exclude-from-backup=true` to the manifest files that you want to exclude. For more information, see [Configuring Backups](/vendor/snapshots-configuring-backups).