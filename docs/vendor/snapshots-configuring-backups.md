# Configure Snapshots

This topic provides information about how to configure the Velero Backup resource to enable Replicated KOTS snapshots for an application.

For more information about snapshots, see [About Backup and Restore with snapshots](/vendor/snapshots-overview).

## Configure Snapshots

Add a Velero Backup custom resource (`kind: Backup`, `apiVersion: velero.io/v1`) to your release and configure it as needed. After configuring the Backup resource, add annotations for each volume that you want to be included in backups.

To configure snapshots for your application:

1. In a new release containing your application files, add a Velero Backup resource (`kind: Backup` and `apiVersion: velero.io/v1`):

    ```yaml
    apiVersion: velero.io/v1
    kind: Backup
    metadata:
      name: backup
    spec: {}
    ```

1. Configure the Backup resource to specify the resources that will be included in backups.

    For more information about the Velero Backup resource, including limitations, the list of supported fields for snapshots, and an example, see [Velero Backup Resource for Snapshots](/reference/custom-resource-backup).

1. (Optional) Configure backup and restore hooks. For more information, see [Configure Backup and Restore Hooks for Snapshots](snapshots-hooks).

1. For each volume that requires a backup, add the `backup.velero.io/backup-volumes` annotation. The annotation name is `backup.velero.io/backup-volumes` and the value is a comma separated list of volumes to include in the backup.

   <details>
    <summary>Why do I need to use the backup annotation?</summary>
    <p>By default, no volumes are included in the backup. If any pods mount a volume that should be backed up, you must configure the backup with an annotation listing the specific volumes to include in the backup.</p>
   </details>

   **Example:**

   In the following Deployment manifest file, `pvc-volume` is the only volume that is backed up. The `scratch` volume is not included in the backup because it is not listed in annotation on the pod specification.

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

1. For any Helm charts in your release that are deployed with the [HelmChart v2](/reference/custom-resource-helmchart-v2) custom resource, configure the HelmChart custom resource `optionalValues` key to conditionally add the following labels to all resources that you want to be included in backups:
   * `kots.io/backup: velero`
   * `kots.io/app-slug: APP_SLUG`, where `APP_SLUG` is the unique slug of the application. You can inject the application slug using the `repl{{ LicenseFieldValue "appSlug" }}` template function. 

   Use the following `when` statement so that the labels are only applied to resources when the customer license has the `isSnapshotSupported` entitlement:

   ```yaml
   when: repl{{ LicenseFieldValue "isSnapshotSupported" }}
   ```
   
   For more information about working with the `optionalValues` key, see [optionalValues](/reference/custom-resource-helmchart-v2#optionalvalues) in _HelmChart v2_.

    **Example:**

    ```yaml
    # kots.io/v1beta2 HelmChart custom resource

    apiVersion: kots.io/v1beta2
    kind: HelmChart
    metadata:
      name: samplechart
    spec:
      optionalValues:
      # add kots backup labels only when the
      # license supports snapshots
      - when: repl{{ LicenseFieldValue "isSnapshotSupported" }}
        recursiveMerge: true
        values:
          mariadb:
            commonLabels:
              kots.io/backup: velero
              kots.io/app-slug: repl{{ LicenseFieldValue "appSlug" }}
            podLabels:
              kots.io/backup: velero
              kots.io/app-slug: repl{{ LicenseFieldValue "appSlug" }}
    ```

1. (Optional) Configure exclusions. By default, Velero includes backups of all of the Kubernetes objects in the namespace.

    To exclude a resource from backups, add the [`velero.io/exclude-from-backup=true`](https://velero.io/docs/v1.5/resource-filtering/#veleroioexclude-from-backuptrue) label. The following example shows a Secret with the `velero.io/exclude-from-backup` label:

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

1. If you distribute multiple applications with Replicated, repeat these steps for each application. Each application must have its own Backup resource to be included in a full backup with snapshots.

1. (kURL Only) If your application supports installation with Replicated kURL, Replicated recommends that you include the kURL Velero add-on so that customers do not have to manually install Velero in the kURL cluster. For more information, see [Create a kURL Installer](packaging-embedded-kubernetes).