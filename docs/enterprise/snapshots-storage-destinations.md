# Storage Destinations

The Replicated snapshot feature supports any compatible Velero storage provider. For more information, see [Providers](https://velero.netlify.app/docs/main/supported-providers/) in the Velero documentation.

The Replicated admin console has built-in support for configuring AWS, GCP, Azure, S3-Compatible object store, NFS Server, or local host path as destinations.

Although clusters created by the Replicated Kubernetes installer are preconfigured in the admin console to store backups in the locally-provisioned object store, this is sufficient for only rollbacks and downgrades. It is not a suitable configuration for disaster recovery. We recommend that you configure a storage destination that is external to the cluster in the admin console.

If the admin console is running with minimal role-based-access-control (RBAC) privileges, you must use the `kots velero ensure-permissions` command because the admin console requires access to the namespace in which Velero is installed.

For more information, see [`velero ensure-permissions`](../reference/kots-cli-velero-ensure-permissions/) in the kots CLI documentation.

For more information about RBAC priviledges for the admin console, see [Kubernetes RBAC](../vendor/packaging-rbac).

## Prerequisites for Cloud Configurations

* Existing clusters: Customers must install Velero before configuring snapshots. See [Basic Install](https://velero.netlify.app/docs/v1.6/basic-install/) in the Velero documentation.
* Kubernetes installer-created clusters: The vendor can provide the Velero add-on in the embedded cluster installation. If it is not provided, the snapshots configuration dialog in the admin console notifies you to install Velero before you can proceed with the configuration.

## AWS

When configuring the admin console to store snapshots on AWS, the following fields are available:

| Name                         | Description                                                                                                     |
|------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Region                       | The AWS region that the S3 bucket is available in                                                               |
| Bucket                       | The name of the S3 bucket to use                                                                                |
| Path (Optional)              | The path in the bucket to store all snapshots in                                                                |
| Access Key ID (Optional)     | The AWS IAM Access Key ID that can read from and write to the bucket                                            |
| Secret Access Key (Optional) | The AWS IAM Secret Access Key that is associated with the Access Key ID                                         |
| Use Instance Role            | When enabled, instead of providing an Access Key ID and Secret Access Key, Velero will use an instance IAM role |
| Add a CA Certificate         | (Optional) Upload a third-party issued proxy CA certificate used for trusting the authenticity of the snapshot storage endpoint. Only one file can be uploaded. However, it is possible to concatenate multiple certificates into one file. **Formats:** PEM, CER, CRT, CA, and KEY          |

## GCP

When configuring the admin console to store snapshots on GCP, the following fields are available:

| Name            | Description                                                                                               |
|-----------------|-----------------------------------------------------------------------------------------------------------|
| Bucket          | The name of the GCP storage bucket to use                                                                 |
| Path (Optional) | The path in the bucket to store all snapshots in                                                          |
| Service Account | The GCP IAM Service Account JSON file that has permissions to read from and write to the storage location |
| Add a CA Certificate         | (Optional) Upload a third-party issued proxy CA certificate used for trusting the authenticity of the snapshot storage endpoint. Only one file can be uploaded. However, it is possible to concatenate multiple certificates into one file. **Formats:** PEM, CER, CRT, CA, and KEY          |

## Azure

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
| Add a CA Certificate         | (Optional) Upload a third-party issued proxy CA certificate used for trusting the authenticity of the snapshot storage endpoint. Only one file can be uploaded. However, it is possible to concatenate multiple certificates into one file. **Formats:** PEM, CER, CRT, CA, and KEY          |

Only connections with Service Principles are supported at this time.

For more information about authentication methods and setting up Azure, see [Velero plugins for Microsoft Azure](https://github.com/vmware-tanzu/velero-plugin-for-microsoft-azure) in the velero-plugin-for-microsoft-azure GitHub repository.

## S3 Compatible

When configuring the admin console to store snapshots on an S3-Compatible storage, the following fields are available:

| Name                         | Description                                                                                                     |
|------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Region                       | The AWS region that the S3 bucket is available in                                                               |
| Endpoint                     | The endpoint to use to connect to the bucket                                                                    |
| Bucket                       | The name of the S3 bucket to use                                                                                |
| Path (Optional)              | The path in the bucket to store all snapshots in                                                                |
| Access Key ID (Optional)     | The AWS IAM Access Key ID that can read from and write to the bucket                                            |
| Secret Access Key (Optional) | The AWS IAM Secret Access Key that is associated with the Access Key ID                                         |
| Use Instance Role            | When enabled, instead of providing an Access Key ID and Secret Access Key, Velero will use an instance IAM role |
| Add a CA Certificate         | (Optional) Upload a third-party issued proxy CA certificate used for trusting the authenticity of the snapshot storage endpoint. Only one file can be uploaded. However, it is possible to concatenate multiple certificates into one file. **Formats:** PEM, CER, CRT, CA, and KEY          |

## Network File System (NFS)

> Introduced in the Replicated app manager v1.33.0

* [Configuring NFS](snapshots-configuring-nfs)

## Host Path

> Introduced in the app manager v1.33.0

* [Configuring a host path](snapshots-configuring-hostpath)
