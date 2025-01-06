# Velero Backup Resource for Snapshots

This topic provides information about the supported fields in the Velero Backup resource for the Replicated KOTS snapshots feature. 

## Overview

The Velero Backup custom resource enables the KOTS snapshots backup and restore feature. The backend of this feature uses the Velero open source project to back up Kubernetes manifests and persistent volumes.

## Example

The following shows an example of the Velero Backup resource:

```yaml
apiVersion: velero.io/v1
kind: Backup
metadata:
  name: backup
  annotations:
  # `pvc-volume` will be the only volume included in the backup
    backup.velero.io/backup-volumes: pvc-volume
spec: 
  includedNamespaces:
  - '*'
  excludedNamespaces:
  - some-namespace
  orderedResources:
    pods: mysql/mysql-cluster-replica-0,mysql/mysql-cluster-replica-1
    persistentvolumes: pvc-12345,pvc-67890
  ttl: 720h
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
```

## Supported Fields for Full Backups with Snapshots

For partial backups with the snapshots feature, you can use all of the fields that Velero supports. See [Backups](https://velero.io/docs/v1.10/api-types/backup/) in the Velero documentation.

However, not all fields are supported for full backups. The table below lists the fields that are supported for full backups with snapshots: 

<table>
  <tr>
    <th width="50%">Field Name</th>
    <th width="50%">Description</th>
  </tr>
  <tr>
    <td><code>includedNamespaces</code></td>
    <td>(Optional) Specifies an array of namespaces to include in the backup. If unspecified, all namespaces are included.</td>
  </tr>
  <tr>
    <td><code>excludedNamespaces</code></td>
    <td>(Optional) Specifies an array of namespaces to exclude from the backup.</td>
  </tr>
  <tr>
    <td><code>orderedResources</code></td>
    <td>(Optional) Specifies the order of the resources to collect during the backup process. This is a map that uses a key as the plural resource. Each resource name has the format NAMESPACE/OBJECTNAME. The object names are a comma delimited list. For cluster resources, use OBJECTNAME only.</td>
  </tr>
  <tr>
    <td><code>ttl</code></td>
    <td> Specifies the amount of time before this backup is eligible for garbage collection. <b>Default:</b><code>720h</code> (equivalent to 30 days). This value is configurable only by the customer.</td>
  </tr>
  <tr>
    <td><code>hooks</code></td>
    <td>(Optional) Specifies the actions to perform at different times during a backup. The only supported hook is executing a command in a container in a pod (uses the pod exec API). Supports <code>pre</code> and <code>post</code> hooks.</td>
  </tr>
  <tr>
    <td><code>hooks.resources</code></td>
    <td>(Optional) Specifies an array of hooks that are applied to specific resources.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.name</code></td>
    <td>Specifies the name of the hook. This value displays in the backup log.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.includedNamespaces</code></td>
    <td>(Optional) Specifies an array of namespaces that this hook applies to. If unspecified, the hook is applied to all namespaces.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.excludedNamespaces</code></td>
    <td>(Optional) Specifies an array of namespaces to which this hook does not apply.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.includedResources</code></td>
    <td>Specifies an array of pod resources to which this hook applies.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.excludedResources</code></td>
    <td>(Optional) Specifies an array of resources to which this hook does not apply.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.labelSelector</code></td>
    <td>(Optional) Specifies that this hook only applies to objects that match this label selector.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.pre</code></td>
    <td>Specifies an array of <code>exec</code> hooks to run before executing custom actions.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.post</code></td>
    <td>Specifies an array of <code>exec</code> hooks to run after executing custom actions. Supports the same arrays and fields as <code>pre</code> hooks.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.[post/pre].exec</code></td>
    <td>Specifies the type of the hook. <code>exec</code> is the only supported type.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.[post/pre].exec.container</code></td>
    <td>(Optional) Specifies the name of the container where the specified command will be executed. If unspecified, the first container in the pod is used.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.[post/pre].exec.command</code></td>
    <td>Specifies the command to execute. The format is an array.</td>
  </tr>
  <tr>
    <td><code>hooks.resources.[post/pre].exec.onError</code></td>
    <td>(Optional) Specifies how to handle an error that might occur when executing the command. <b>Valid values:</b> <code>Fail</code> and <code>Continue</code> <b>Default:</b> <code>Fail</code></td>
  </tr>
  <tr>
    <td><code>hooks.resources.[post/pre].exec.timeout</code></td>
    <td>(Optional) Specifies how many seconds to wait for the command to finish executing before the action times out. <b>Default:</b> <code>30s</code></td>
  </tr>
</table>

## Limitations {#limitations}

- The following top-level Velero fields, or children of `spec`, are not supported in full backups:

  - `snapshotVolumes`
  - `volumeSnapshotLocations`
  - `labelSelector`
  - `includedResources`
  - `excludedResources`

  :::note
  Some of these fields are supported for hook arrays, as described in the previous field definition table. See [Fields](#fields).
  :::

- All resources are included in the backup by default. However, resources can be excluded by adding `velero.io/exclude-from-backup=true` to the manifest files that you want to exclude. For more information, see [Configuring Backups](/vendor/snapshots-configuring-backups).

