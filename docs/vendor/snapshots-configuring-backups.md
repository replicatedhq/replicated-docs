# Configuring the Velero Backup Resource for Snapshots

This topic provides information about how to configure the Velero Backup resource to enable Replicated KOTS snapshots for an application.

For more information about snapshots, see [About Backup and Restore with snapshots](/vendor/snapshots-overview).

## Configure the Velero Backup Resource

Add a Velero Backup custom resource (`kind: Backup`, `apiVersion: velero.io/v1`) to your release and configure it as needed. After configuring the Backup resource, add annotations for each volume that you want to be included in backups.

To configure the Velero Backup Resource for snapshots:

1. Log in to the[ Vendor Portal](https://vendor.replicated.com) and create a new release containing your application files.

1. In the new release, add a Velero Backup resource (`kind: Backup` and `apiVersion: velero.io/v1`):

    ```yaml
    apiVersion: velero.io/v1
    kind: Backup
    metadata:
      name: backup
    spec: {}
    ```

1. Configure the Backup resource to specify the resources that will be included in backups.

    For more information about the Velero Backup resource, including an example, limitations, and the list of supported fields for snapshots, see [About the Velero Backup Resource](/reference/custom-resource-backup) below.

1. (Optional) Configure backup and restore hooks in the Velero Backup resource. For more information, see [Configuring Velero Backup and Restore Hooks for Snapshots](snapshots-hooks).

1. For each volume that requires a backup, add and configure the `backup.velero.io/backup-volumes` annotation.

    By default, no volumes are included in the backup. If any pods mount a volume that should be backed up, you must configure the backup with an annotation listing the specific volumes to include in the backup.

    The annotation name is `backup.velero.io/backup-volumes` and the value is a comma separated list of volumes to include in the backup.

    For example, in the following Deployment manifest file, `pvc-volume` is the only volume that is backed up. The `scratch` volume is not included in the backup because it is not listed in annotation on the pod specification.

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: sample
      labels:
        app: foo
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: foo
      template:
        metadata:
          labels:
            app: foo
          annotations:
            backup.velero.io/backup-volumes: pvc-volume
        spec:
          containers:
          - image: k8s.gcr.io/test-webserver
            name: test-webserver
            volumeMounts:
            - name: pvc-volume
              mountPath: /volume-1
            - name: scratch
              mountPath: /volume-2
          volumes:
          - name: pvc-volume
            persistentVolumeClaim:
              claimName: test-volume-claim
          - name: scratch
            emptyDir: {}

    ```

1. (Optional) Configure manifest exclusions. By default, Velero also includes backups of all of the Kubernetes objects in the namespace.

    To exclude any manifest file, add a [`velero.io/exclude-from-backup=true`](https://velero.io/docs/v1.5/resource-filtering/#veleroioexclude-from-backuptrue) label to the manifest to be excluded. The following example shows the Secret manifest file with the `velero.io/exclude-from-backup` label:

    ```yaml
    apiVersion: apps/v1
    kind: Secret
    metadata:
      name: sample
      labels:
        velero.io/exclude-from-backup: "true"
    stringData:
      uri: Secret To Not Include

    ```

1. If you distribute multiple applications with Replicated, repeat these steps for each application. Each application must have its own Backup resource to be included in a full backup.

1. (kURL Only) If your application supports installation with Replicated kURL, Replicated recommends that you include the kURL Velero add-on so that customers do not have to manually install Velero in the kURL cluster. For more information, see [Creating a kURL Installer](packaging-embedded-kubernetes).

## About the Velero Backup Resource

This section provides information about the supported fields in the Velero Backup resource for the KOTS snapshots feature.

The Velero Backup custom resource enables the KOTS snapshots backup and restore feature. The backend of this feature uses the Velero open source project to back up Kubernetes manifests and persistent volumes.

### Example

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
  orLabelSelectors:
  - matchLabels:
      app: my-app
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

### Supported Fields for Full Backups with Snapshots

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
    <td><code>orLabelSelectors</code></td>
    <td>(Optional) A list of metav1.LabelSelector to filter with when adding individual objects to the backup. If multiple are provided, they will be joined by the OR operator.</td>
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

### Limitations {#limitations}

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