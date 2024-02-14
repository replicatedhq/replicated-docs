# Configuring Backups

The snapshots feature is a backup and restore option that lets you define a manifest for creating backups and restoring previous backups. The backups include all of the annotated volumes in the archive. For more information, see [About Backup and Restore](snapshots-overview/).

:::note
If you are using multiple applications, repeat this procedure for each application. Every application must have its own Backup resource to be included in a full backup.
:::

To configure backups:

1. Enable backups:

    1. Add a Backup resource (`kind: Backup`) using `apiVersion: velero.io/v1` to the application manifest files. The following minimal YAML example enables backups in the application. For more information about Backup resource options, see [Velero Backup Custom Resource](/reference/custom-resource-backup).

        **Example:**

        ```yaml
        apiVersion: velero.io/v1
        kind: Backup
        metadata:
          name: backup
        spec: {}

        ```
    1. (Optional) Configure the resources annotation in the manifest so that it can be dynamically enabled based on a license field or a config option. For more information, see [Including Optional and Conditional Resources](packaging-include-resources/).

1. Configure backups for each volume that requires a backup. By default, no volumes are included in the backup. If any pods mount a volume that should be backed up, you must configure the backup with an annotation listing the specific volumes to include in the backup.

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
    
1. (Optional) If you are distributing your application with Replicated kURL, Replicated recommends that you include the kURL Velero add-on so that customers do not have to manually install Velero on their cluster. For more information about distributing with kURL, see [Creating a Kubernetes Installer Specification](packaging-embedded-kubernetes).

## Next Step

Next, you can configure backup and restore hooks. See [Configuring Backup and Restore Hooks](snapshots-hooks).