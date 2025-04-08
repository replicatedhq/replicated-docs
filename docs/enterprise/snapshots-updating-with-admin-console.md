# Update Storage Settings

This topic describes how to update existing storage destination settings using the Replicated Admin Console.

## Prerequisite
If you are changing from one provider to another provider, make sure that you meet the prerequisites for the storage destination. For information about prerequisites, see:

- [Configure a Host Path Storage Destination](snapshots-configuring-hostpath)
- [Configure an NFS Storage Destination](snapshots-configuring-nfs)
- [Configure Other Storage Destinations](snapshots-storage-destinations)

## Update Storage Settings

You can update storage destination settings for online and air gapped environments at any time using the Admin Console. 

Additionally, if Velero was automatically installed by Replicated kURL, then Replicated recommends that you change the default internal storage because it is not sufficient for disaster recovery.

To update storage destination settings:

1. In the Admin Console, select **Snapshots** > **Settings and Schedule**.

1. Under storage, you can edit the existing settings or click **Add a new storage destination** and select a storage destination type.

    ![Snapshot Destination Dropdown Host Path](/images/snapshot-destination-dropdown-hostpath.png)

    The configuration fields that display depend on the type of storage destination. See the following storage destination sections for field descriptions:

    - [AWS](#aws-fields)
    - [GCP](#gcp-fields)
    - [Azure](#azure-fields)
    - [S3-compatible](#s3-compatible-fields)
    - [NFS](#nfs-fields)
    - [Host Path](#host-path-fields)

1. Click **Update storage settings**. The update can take several minutes.

### AWS Fields

When configuring the Admin Console to store backups on Amazon Web Services (AWS), the following fields are available:

| Name                         | Description                                                                                                     |
|------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Region                       | The AWS region that the S3 bucket is available in                                                               |
| Bucket                       | The name of the S3 bucket to use                                                                                |
| Path (Optional)              | The path in the bucket to store all backups in                                                                |
| Access Key ID (Optional)     | The AWS IAM Access Key ID that can read from and write to the bucket                                            |
| Secret Access Key (Optional) | The AWS IAM Secret Access Key that is associated with the Access Key ID                                         |
| Use Instance Role            | When enabled, instead of providing an Access Key ID and Secret Access Key, Velero will use an instance IAM role |
| Add a CA Certificate         | (Optional) Upload a third-party issued (proxy) CA certificate used for trusting the authenticity of the snapshot storage endpoint. Only one file can be uploaded. However, it is possible to concatenate multiple certificates into one file. **Formats:** PEM, CER, CRT, CA, and KEY          |

### GCP Fields

When configuring the Admin Console to store backups on Google Cloud Provide (GCP), the following fields are available:

| Name            | Description                                                                                               |
|-----------------|-----------------------------------------------------------------------------------------------------------|
| Bucket          | The name of the GCP storage bucket to use                                                                 |
| Path (Optional) | The path in the bucket to store all backups in                                                          |
| Service Account | The GCP IAM Service Account JSON file that has permissions to read from and write to the storage location |
| Add a CA Certificate         | (Optional) Upload a third-party issued (proxy) CA certificate used for trusting the authenticity of the snapshot storage endpoint. Only one file can be uploaded. However, it is possible to concatenate multiple certificates into one file. **Formats:** PEM, CER, CRT, CA, and KEY          |

### Azure Fields

When configuring the Admin Console to store backups on Microsoft Azure, the following fields are available:

| Name                       | Description                                                                                                                                |
|----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| Bucket                     | The name of the Azure Blob Storage Container to use                                                                                        |
| Path (Optional)            | The path in the Blob Storage Container to store all backups in                                                                           |
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

### S3-Compatible Fields

Replicated supports the following S3-compatible object stores for storing backups with Velero:

* Ceph RADOS v12.2.7. For more information, see the [Ceph](https://docs.ceph.com/en/quincy/) documentation.
* MinIO. For more information, see the [MinIO](https://docs.min.io/docs/minio-quickstart-guide.html) documentation.

When configuring the Admin Console to store backups on S3-compatible storage, the following fields are available:

| Name                         | Description                                                                                                     |
|------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Region                       | The AWS region that the S3 bucket is available in                                                               |
| Endpoint                     | The endpoint to use to connect to the bucket                                                                    |
| Bucket                       | The name of the S3 bucket to use                                                                                |
| Path (Optional)              | The path in the bucket to store all backups in                                                                |
| Access Key ID (Optional)     | The AWS IAM Access Key ID that can read from and write to the bucket                                            |
| Secret Access Key (Optional) | The AWS IAM Secret Access Key that is associated with the Access Key ID                                         |
| Use Instance Role            | When enabled, instead of providing an Access Key ID and Secret Access Key, Velero will use an instance IAM role |
| Add a CA Certificate         | (Optional) Upload a third-party issued (proxy) CA certificate used for trusting the authenticity of the snapshot storage endpoint. Only one file can be uploaded. However, it is possible to concatenate multiple certificates into one file. **Formats:** PEM, CER, CRT, CA, and KEY          |

### NFS Fields

When configuring the Admin Console to store backups on network file system (NFS) storage, the following fields are available:

| Name   | Description                                  |
|--------|----------------------------------------------|
| Server | The hostname or IP address of the NFS server |
| Path   | The path that is exported by the NFS server  |

### Host Path Fields

When configuring the Admin Console to store backups on host path storage, the following fields are available:

**Host path**: Enter the path to the directory on the node. Although the path can be local, Replicated recommends that you use an external host path.
