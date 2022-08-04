# Storage Destinations

This topic describes the supported storage destinations for backups with the Replicated snapshots feature. It includes the prerequisites for configuring storage destinations for snapshots, and lists the available fields for cloud storage destinations.

## Overview of Configuring Storage Destinations

You configure the snapshots feature to store backups on a supported storage provider backend using the kots CLI or the Snapshots page in the admin console. You configure a storage destination for both existing clusters and clusters provisioned by the Replicated Kubernetes installer.

Kubernetes installer provisioned clusters include a locally-provisioned object store. By default, Kubernetes installer clusters are preconfigured in the admin console to store backups in the locally-provisioned object store. This object store is sufficient for only rollbacks and downgrades and is not a suitable configuration for disaster recovery. Replicated recommends that you configure a snapshots storage destination that is external to the cluster in the admin console for Kubernetes installer clusters.

For more information about configuring snapshot storage destinations with the kots CLI, see the [velero](/reference/kots-cli-velero-index) section in the _kots CLI_ documentation.

## Prerequisites

* Velero must be installed on the cluster to use snapshots:
   * Existing clusters: Install Velero on the cluster. See [Basic Install](https://velero.io/docs/v1.9/basic-install/) in the Velero documentation.
   * Kubernetes installer clusters: Your application vendor can provide the Velero add-on in the Kubernetes installer cluster. If Velero is not already installed on the Kubernetes installer cluster, the snapshots configuration dialog in the admin console notifies you to install Velero before you can proceed with the configuration.

* Replicated recommends that you increase the default memory limit for the restic Pod on the Velero deployment.

   Velero sets default limits for the Velero Pod and the restic Pod during installation. There is a known issue with restic that causes high memory usage on the restic Pod, which can result in failures during snapshot creation when the restic Pod reaches the memory limit. For more information, see the [Restic backup — OOM-killed on raspberry pi after backing up another computer to same repo](https://github.com/restic/restic/issues/1988) issue in the restic GitHub repository.

   To avoid the restic Pod reaching the memory limit during snapshot creation, run the following kubectl command to increase the memory limit on the restic daemon set on the Velero deployment:

   ```
   kubectl -n velero set env daemonset/restic GOGC=1
   ```

   For more information, see [Customize resource requests and limits](https://velero.io/docs/main/customize-installation/#customize-resource-requests-and-limits) in the Velero documentation.

* The admin console requires access to the namespace where Velero is installed. If the admin console is running with minimal role-based-access-control (RBAC) privileges, you must run `kots velero ensure-permissions` to enable the admin console to access Velero:

   ```
   kubectl kots velero ensure-permissions --namespace ADMIN_CONSOLE_NAMESPACE --velero-namespace VELERO_NAMESPACE
   ```
   Replace:
   * `ADMIN_CONSOLE_NAMESPACE` with the namespace on the cluster where the admin console is running.
   * `VELERO_NAMESPACE` with the namespace on the cluster where Velero is installed.

  For more information, see [`velero ensure-permissions`](/reference/kots-cli-velero-ensure-permissions/) in the kots CLI documentation. For more information about RBAC privileges for the admin console, see [Kubernetes RBAC](../vendor/packaging-rbac).

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
