# Configuring Other Storage Destinations

This topic describes installing Velero and configuring storage for Amazon Web Service (AWS), Google Cloud Provide (GCP), Microsoft Azure, and S3-compatible providers.

To configure host path or NFS as a storage destination, see [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath) and [Configuring an NFS Storage Destination](snapshots-configuring-nfs).

:::note
For existing or embedded clusters where Velero is already installed, you can update your storage destination in the admin console. For more information, see [Updating Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

## Configure AWS Storage for Online Environments

In this procedure, you install Velero and configure an AWS storage destination in online environments.

Snapshots does not support Amazon Simple Storage Service (Amazon S3) buckets that have a bucket policy requiring the server-side encryption header. If you want to require server-side encryption for objects, you can enable default encryption on the bucket instead. For more information about Amazon S3, see the [Amazon S3](https://docs.aws.amazon.com/s3/?icmpid=docs_homepage_featuredsvcs) documentation.

To install Velero and configure an AWS storage destination:

1. Follow the instructions for [installing Velero on AWS](https://github.com/vmware-tanzu/velero-plugin-for-aws#setup) in the Velero documentation.

1. Run the `velero install` command with these additional flags:
   * **Velero 1.10 and later**: Use the `--use-node-agent`, `--uploader-type=restic`, and `--use-volume-snapshots=false` flags.
   * **Velero versions earlier than 1.10**: Use the `--use-restic` and `--use-volume-snapshots=false` flags.

  **Example:**

  ```
  velero install \
     --provider aws \
     --plugins velero/velero-plugin-for-aws:v1.2.0 \
     --bucket $BUCKET \
     --backup-location-config region=$REGION \
     --secret-file CREDS_FILE \
     --use-node-agent --uploader-type=restic \
     --use-volume-snapshots=false
  ```

## Configure GCP Storage for Online Environments

In this procedure, you install Velero and configure a GCP storage destination in online environments.

To install Velero and configure a GCP storage destination:

1. Follow the instructions for [installing Velero on GCP](https://github.com/vmware-tanzu/velero-plugin-for-gcp#setup) in the Velero documentation.

1. Run the `velero install` command with these additional flags:
   * **Velero 1.10 and later**: Use the `--use-node-agent`, `--uploader-type=restic`, and `--use-volume-snapshots=false` flags.
   * **Velero versions earlier than 1.10**: Use the `--use-restic` and `--use-volume-snapshots=false` flags.

  **Example:**

  ```
  velero install \
    --provider gcp \
    --plugins velero/velero-plugin-for-gcp:v1.5.0 \
    --bucket $BUCKET \
    --secret-file ./CREDS_FILE
    --use-node-agent --uploader-type=restic \
    --use-volume-snapshots=false
  ```

## Configure Azure Storage for Online Environments

In this procedure, you install Velero and configure an Azure storage destination in online environments.

To install Velero and configure an Azure storage destination:

1. Follow the instructions for [installing Velero on Azure](https://github.com/vmware-tanzu/velero-plugin-for-microsoft-azure#setup) in the Velero documentation.

1. Run the `velero install` command with these additional flags:
   * **Velero 1.10 and later**: Use the `--use-node-agent`, `--uploader-type=restic`, and `--use-volume-snapshots=false` flags.
   * **Velero versions earlier than 1.10**: Use the `--use-restic` and `--use-volume-snapshots=false` flags.

  **Example:**

  ```
  velero install \
    --provider azure \
    --plugins velero/velero-plugin-for-microsoft-azure:v1.5.0 \
    --bucket $BLOB_CONTAINER \
    --secret-file ./CREDS_FILE \
    --backup-location-config resourceGroup=$AZURE_BACKUP_RESOURCE_GROUP,storageAccount=$AZURE_STORAGE_ACCOUNT_ID[,subscriptionId=$AZURE_BACKUP_SUBSCRIPTION_ID] \
    --snapshot-location-config apiTimeout=<YOUR_TIMEOUT>[,resourceGroup=$AZURE_BACKUP_RESOURCE_GROUP,subscriptionId=$AZURE_BACKUP_SUBSCRIPTION_ID]
    --use-node-agent --uploader-type=restic \
    --use-volume-snapshots=false
  ```

## Configure S3-Compatible Storage for Online Environments

Replicated supports the following S3-compatible object stores for storing backups with Velero:

- Ceph RADOS v12.2.7
- MinIO

Run the following command to install Velero and configure an S3-compatible storage destination in an online environment. For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index) in _Reference_.

```
kubectl kots velero configure-other-s3 \
  --namespace NAME \
  --endpoint ENDPOINT \
  --region REGION \
  --bucket BUCKET \
  --access-key-id ACCESS_KEY_ID \
  --secret-access-key SECRET_ACCESS_KEY
```

Replace:

- NAME with the name of the namespace where the admin console is installed and running
- ENDPOINT with the s3 endpoint
- REGION with the region where the bucket exists 
- BUCKET with the name of the object storage bucket where backups should be stored
- ACCESS_KEY_ID with the access key id to use for accessing the bucket
- SECRET_ACCESS_KEY with the secret access key to use for accessing the bucket

**Example:**

```
kubectl kots velero configure-other-s3 \
  --namespace default \
  --endpoint http://minio \
  --region minio \
  --bucket kots-snaps \
  --access-key-id XXXXXXXJTJB7M2XZUV7D \
  --secret-access-key mysecretkey
```

If no Velero installation is detected, instructions are displayed to install Velero and configure the storage destination.

## Configure S3-Compatible Storage for Air Gapped Environments

> Introduced in the Replicated app manager v1.94.0

The following S3-compatible object stores are supported for storing backups with Velero:

- Ceph RADOS v12.2.7
- MinIO

Run the following command to install Velero and configure an S3-compatible storage destination in an air gapped environment. For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index) in _Reference_.

```bash
kubectl kots velero configure-other-s3 \
  --namespace NAME \
  --endpoint ENDPOINT \
  --region REGION \
  --bucket BUCKET \
  --access-key-id ACCESS_KEY_ID \
  --secret-access-key SECRET_ACCESS_KEY \
  --kotsadm-registry REGISTRY_HOSTNAME \
  --kotsadm-namespace REGISTRY_NAMESPACE \
  --registry-username REGISTRY_USERNAME \
  --registry-password REGISTRY_PASSWORD
```

Replace:

- NAME with the name of the namespace where the admin console is installed and running
- ENDPOINT with the s3 endpoint
- REGION with the region where the bucket exists 
- BUCKET with the name of the object storage bucket where backups should be stored
- ACCESS_KEY_ID with the access key id to use for accessing the bucket
- SECRET_ACCESS_KEY with the secret access key to use for accessing the bucket
- REGISTRY_HOSTNAME with the registry endpoint where the images are hosted
- REGISTRY_NAMESPACE with the registry namespace where the images are hosted
- REGISTRY_USERNAME with the username to use to authenticate with the registry
- REGISTRY_PASSWORD with the password to use to authenticate with the registry

If no Velero installation is detected, instructions are displayed to install Velero and configure the storage destination.

## Next Steps

* (Existing clusters only) Configure Velero namespace access if you are using minimal RBAC, and optionally increase the default memory limits. See [Configuring Namespace Access and Memory Limit](snapshots-velero-installing-config).
* Create or schedule backups. See [Creating and Scheduling Backups](snapshots-creating).

## Additional Resources

* [How to Set Up Snapshots](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
