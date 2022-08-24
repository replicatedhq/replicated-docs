# Storage Destinations

This topic describes the supported storage destinations for use with the snapshots backup feature.

## Supported Storage Providers

You can use a storage provider that is compatible with Velero as the storage destination for backups created with the Replicated snapshots feature. For a list of the compatible storage providers, see [Providers](https://velero.io/docs/v1.9/supported-providers/) in the Velero documentation.

The Replicated admin console has built-in support for using the following as storage destinations for backups with the snapshots feature:

* Amazon Web Services (AWS). See [AWS](#aws).
* Google Cloud Platform (GCP). See [GCP](#gcp).
* Microsoft Azure. See [Azure](#azure).
* Ceph and MinIO S3-compatible object stores. See [S3-Compatible](#s3-compatible).
* Network File System (NFS) servers. See [Configuring a NFS](snapshots-configuring-nfs).
* Local host paths. See [Configuring a Host Path](snapshots-configuring-hostpath).

### AWS

When configuring the admin console to store snapshots on AWS, the following fields are available:

| Name                         | Description                                                                                                     |
|------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Region                       | The AWS region that the S3 bucket is available in                                                               |
| Bucket                       | The name of the S3 bucket to use                                                                                |
| Path (Optional)              | The path in the bucket to store all snapshots in                                                                |
| Access Key ID (Optional)     | The AWS IAM Access Key ID that can read from and write to the bucket                                            |
| Secret Access Key (Optional) | The AWS IAM Secret Access Key that is associated with the Access Key ID                                         |
| Use Instance Role            | When enabled, instead of providing an Access Key ID and Secret Access Key, Velero will use an instance IAM role |
| Add a CA Certificate         | (Optional) Upload a third-party issued (proxy) CA certificate used for trusting the authenticity of the snapshot storage endpoint. Only one file can be uploaded. However, it is possible to concatenate multiple certificates into one file. **Formats:** PEM, CER, CRT, CA, and KEY          |

### GCP

When configuring the admin console to store snapshots on GCP, the following fields are available:

| Name            | Description                                                                                               |
|-----------------|-----------------------------------------------------------------------------------------------------------|
| Bucket          | The name of the GCP storage bucket to use                                                                 |
| Path (Optional) | The path in the bucket to store all snapshots in                                                          |
| Service Account | The GCP IAM Service Account JSON file that has permissions to read from and write to the storage location |
| Add a CA Certificate         | (Optional) Upload a third-party issued (proxy) CA certificate used for trusting the authenticity of the snapshot storage endpoint. Only one file can be uploaded. However, it is possible to concatenate multiple certificates into one file. **Formats:** PEM, CER, CRT, CA, and KEY          |

### Azure

When configuring the admin console to store snapshots on a Azure, the following fields are available:

| Name                       | Description                                                                                                                                |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Bucket                     | The name of the Azure Blob Storage Container to use                                                                                        |
| Path (Optional)            | The path in the Blob Storage Container to store all snapshots in                                                                           |
| Resource Group             | The Resource Group name of the target Blob Storage Container                                                                               |
| Storage Account            | The Storage Account Name of the target Blob Storage Container                                                                              |
| Subscription ID            | The Subscription ID associated with the target Blob Storage Container (required only for access via Service Principle or AAD Pod Identity) |
| Tenant ID                  | The Tenant ID associated with the Azure account of the target Blob Storage container (required only for access via Service Principle)      |
| Client ID                  | The Client ID of a Service Principle with access to the target Container (required only for access via Service Principle)                  |
| Client Secret              | The Client Secret of a Service Principle with access to the target Container (required only for access via Service Principle)              |
| Cloud Name                 | The Azure cloud for the target storage (options: AzurePublicCloud, AzureUSGovernmentCloud, AzureChinaCloud, AzureGermanCloud)              |
| Add a CA Certificate         | (Optional) Upload a third-party issued (proxy) CA certificate used for trusting the authenticity of the snapshot storage endpoint. Only one file can be uploaded. However, it is possible to concatenate multiple certificates into one file. **Formats:** PEM, CER, CRT, CA, and KEY          |

Only connections with Service Principles are supported at this time.

For more information about authentication methods and setting up Azure, see [Velero plugins for Microsoft Azure](https://github.com/vmware-tanzu/velero-plugin-for-microsoft-azure) in the velero-plugin-for-microsoft-azure GitHub repository.

### S3-Compatible

Replicated supports the following S3-compatible object stores for storing backups with Velero:
* Ceph RADOS v12.2.7. For more information, see the [Ceph](https://docs.ceph.com/en/quincy/) documentation.
* MinIO. For more information, see the [MinIO](https://docs.min.io/docs/minio-quickstart-guide.html) documentation.

When configuring the admin console to store snapshots on S3-compatible storage, the following fields are available:

| Name                         | Description                                                                                                     |
|------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Region                       | The AWS region that the S3 bucket is available in                                                               |
| Endpoint                     | The endpoint to use to connect to the bucket                                                                    |
| Bucket                       | The name of the S3 bucket to use                                                                                |
| Path (Optional)              | The path in the bucket to store all snapshots in                                                                |
| Access Key ID (Optional)     | The AWS IAM Access Key ID that can read from and write to the bucket                                            |
| Secret Access Key (Optional) | The AWS IAM Secret Access Key that is associated with the Access Key ID                                         |
| Use Instance Role            | When enabled, instead of providing an Access Key ID and Secret Access Key, Velero will use an instance IAM role |
| Add a CA Certificate         | (Optional) Upload a third-party issued (proxy) CA certificate used for trusting the authenticity of the snapshot storage endpoint. Only one file can be uploaded. However, it is possible to concatenate multiple certificates into one file. **Formats:** PEM, CER, CRT, CA, and KEY          |

### Network File System (NFS) {#nfs}

> Introduced in the Replicated app manager v1.33.0

* [Configuring NFS](snapshots-configuring-nfs)

### Host Path

> Introduced in the app manager v1.33.0

* [Configuring a host path](snapshots-configuring-hostpath)

## Next Step

After you configure an external storage destination, you must create or schedule snapshots. For more information, see [Creating Snapshots](snapshots-creating) and [Scheduling Snapshots](snapshots-scheduling).

## Additional Resources

* [How to Set Up and Use Snapshots](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
