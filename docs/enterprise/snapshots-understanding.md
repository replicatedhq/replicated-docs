import VeleroCompatibility from "../partials/install/_velero-compatibility.mdx" 

# About Backup and Restore

An important part of the lifecycle of an application is backup and restore. The Replicated snapshots feature creates and restores backups. The Replicated admin console can be used to create and manage your storage destination and schedule, and to perform and monitor the backup and restore process.

Velero and restic are the underlying technologies for snapshots.

## About Backups

Full backups, or _instance snapshots_, back up the admin console and all application data, including application volumes and manifest files.

If you manage multiple applications with the admin console, data from all applications that support backups is included in a full backup. Each application must include a manifest file with `kind: Backup` and `apiVersion: velero.io/v1`, which you can check for in the admin console.

There are two types of backups:
  * **Full snapshots (Recommended)**: Backs up the admin console and all application data. For embedded clusters, this also backs up the Docker registry, which is required for air gapped installations.

  * **Partial snapshots**: Backs up the application volumes and manifest files only. See [Create a Partial Backup](snapshots-creating#partial) in _Creating and Scheduling Backups_.

Full backups are recommended because they support all types of restores. For example, you can restore your instance from full backups in disaster recovery scenarios. Or you can use a full backup to restore only application data to roll back after you deploy a new version of an application. For more information about restores, see [About Restores](#restores).

## About Restores {#restores}

You can restore backups to existing healthy clusters or to new clusters. Additionally, you can restore to an existing cluster when the admin console or the application are unhealthy.

From a full backup, you can perform any of the following types of restores from the Replicated kots CLI:

- **Full restore:** Restores the admin console and the application
- **Partial restore:** Restores the application only
- **Admin console:** Restores the admin console only

When you do a full or partial restore, the admin console deletes the selected application. All existing application manifests are removed from the cluster, and all `PersistentVolumeClaims` are deleted. This action is not reversible.

Then, the restore process redeploys all of the application manifests. All Pods are given an extra `initContainer` and an extra directory named `.velero`, which are used for restore hooks. For more information about the restore process, see [Restore Reference](https://velero.io/docs/v1.9/restore-reference/) in the Velero documentation.

When you restore only the admin console, no changes are made to the application.

You can also use the admin console to do a partial restore (application only) from either a full backup or a partial backup. The admin console also displays the CLI commands to do a full restore or to restore the admin console only.

## About Storage Destinations

For disaster recovery snapshots, backups should be configured to use a storage destination that exists outside of the cluster. This is especially true for installations on cluster created with the Replicated kURL, because the default storage location on these clusters is internal.

You can use a storage provider that is compatible with Velero as the storage destination for backups created with the Replicated snapshots feature. For a list of the compatible storage providers, see [Providers](https://velero.io/docs/v1.9/supported-providers/) in the Velero documentation.

You initially configure backups on a supported storage provider backend using the kots CLI. If you want to change the storage destination after the initial configuration, you can use the the Snapshots page in the admin console, which has built-in support for the following storage destinations:

- Amazon Web Services (AWS)
- Google Cloud Provider (GCP)
- Microsoft Azure
- S3-Compatible
- Network File System (NFS)
- Host Path

kURL installers that include the Velero add-on also include a locally-provisioned object store. By default, embedded clusters are preconfigured in the admin console to store backups in the locally-provisioned object store. This object store is sufficient for only rollbacks and downgrades and is not a suitable configuration for disaster recovery. Replicated recommends that you configure a snapshots storage destination that is external to the cluster in the admin console for embedded clusters.

## Limitations

The snapshots feature has the following limitations:

- The snapshots feature is available only for licenses that have the Allow Snapshots feature enabled. 

- Snapshots are useful for rollback and disaster recovery scenarios. They are not intended to be used for application migration scenarios.

- Only full snapshots are usable in disaster recovery scenarios.

- Snapshots must be restored on the same operating system that the snapshot was taken on. For example, snapshots taken on a CentOS cluster must be restored on a CentOS cluster.

- Snapshots can be restored only to clusters that use the same installation method as the cluster the snapshot was taken from. For example, online cluster snapshots must be restored to an online cluster.

- Snapshots does not support Amazon Simple Storage Service (Amazon S3) buckets that have a bucket policy requiring the server-side encryption header. If you want to require server-side encryption for objects, you can enable default encryption on the bucket instead. For more information about Amazon S3, see the [Amazon S3](https://docs.aws.amazon.com/s3/?icmpid=docs_homepage_featuredsvcs) documentation.

- Removing data from the snapshot storage itself results in data corruption and the loss of snapshots. Instead, use the Snapshots tab in the admin console to cleanup and remove snapshots.

- In order to use NFS or hostpath backup storage locations when KOTS is installed without object storage (either by passing the `--with-minio=false` flag for existing cluster installations or the `--disable-s3` flag for embedded cluster installations with Replicated kURL), the underlying host mounts must point to either external s3-compatible object storage or ReadWriteMany (RWX) persistent volume storage.

By default, KOTS stores any backups that are configured to NFS or host path storage destinations in s3-compatible object storage. KOTS attempts to store backups with NFS or host path storage destination in local PVs instead of object storage using the `local-volume-provider` Velero plugin. The `local-volume-provider` plugin has the following limitations:
    
    - Hostpath volumes are not designed to work on multi-node clusters unless the underlying host mounts point to shared storage. Volume snapshots performed in this configuration without shared storage can result in fragmented backups.

    - Customized deployments of Velero (RBAC, container names), may not be supported.

    - When BackupStorageLocations are removed, they are NOT cleaned up from the Velero and Node Agent pods.

    - This plugin relies on a sidecar container at runtime to provide signed-url access to storage data.

  For more information, see [local-volume-provider](https://github.com/replicatedhq/local-volume-provider) in GitHub.  

## Velero Version Compatibility

The following table lists which versions of Velero are compatible with each version of KOTS.

<VeleroCompatibility/>
