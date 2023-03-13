# Configuring Backups

The snapshots feature is a backup and restore option that lets you define a manifest for creating snapshots and restoring previous snapshots. The backups include all of the annotated volumes in the archive. For more information, see [About Backup and Restore](snapshots-overview/).

**Note:** If you are using multiple applications, repeat this procedure for each application. Every application must have its own Backup resource to be included in a full backup.

To configure backups:

1. Enable snapshots:

    1. Add a Backup resource (`kind: Backup`) using `apiVersion: velero.io/v1` to the application manifest files. The following minimal YAML example enables snapshots in the application. For more information about Backup resource options, see [backup resource](/reference/custom-resource-backup) in _Reference_.

        **Example:**

        ```yaml
        apiVersion: velero.io/v1
        kind: Backup
        metadata:
          name: backup
        spec: {}

        ```
    1. (Optional) Configure the resources annotation in the manifest so that it can be dynamically enabled based on a license field or a config option. For more information, see [Including Optional and Conditional Resources](packaging-include-resources/).

1. Configure backups for each volume that requires a backup. By default, no volumes are included in the backup. If any pods mount a volume that should be backed up, you must configure the backup with an annotation listing the specific volumes to include in the snapshot.

    The annotation name is `backup.velero.io/backup-volumes` and the value is a comma separated list of volumes to include in the backup.

    For example, in the following deployment, `pvc-volume` is the only volume that is backed up. The `scratch` volume is not included in the backup because it is not listed in annotation on the pod specification.

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

1. (Optional) Configure manifest exclusions. By default, Velero also includes snapshots of all of the Kubernetes objects in the namespace.

  :::note
  If you are using a Velero-compatible plug-in, such as the VMware Tanzu `velero-plugin-for-gcp`, add a label to exclude volumes that you do not want to backup. Otherwise, Velero backups up all volumes even if you only annotated a few volumes for inclusion, which can cause incomplete restores. For more information about plug-ins, see [Pod Volume Data](snapshots-overview/#pod-volume-data) in _About Backup and Restore_.
  :::

  To exclude any manifest, add a `velero.io/exclude-from-backup` label to the manifest to be excluded.

    **Example:**

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
1. (Optional) If you are distributing your application with the Kubernetes installer, Replicated recommends that you include the Velero add-on so that customers do not have to manually install Velero on their cluster. For more information about the Kubernetes installer, see [Creating a Kubernetes Installer Specification](packaging-embedded-kubernetes).

## Next Step

Next, you can configure backup and restore hooks. See [Configuring Backup and Restore Hooks](snapshots-hooks).