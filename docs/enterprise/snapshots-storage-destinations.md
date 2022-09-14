# Configuring Other Storage Destinations

This topic describes installing Velero and configuring storage for Amazon Web Service (AWS), Google Cloud Provide (GCP), Microsoft Azure, and S3-compatible providers.

To configure host path or NFS as a storage destination, see [Configuring a Host Path Storage Destination](snapshots-configuring-hostpath) and [Configuring an NFS Storage Destination](snapshots-configuring-nfs).

:::note
If you already have Velero installed and want to update your storage destination, you can use the admin console instead. In these procedures, you use the kots CLI to install Velero and configure your initial storage destination in online environments. For more information about using the admin console to update storage settings, see [Updating Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

## Configure AWS Storage for Online Environments

In this procedure, you install Velero and configure your initial storage destination in online environments.

Snapshots does not support Amazon Simple Storage Service (Amazon S3) buckets that have a bucket policy requiring the server-side encryption header. If you want to require server-side encryption for objects, you can enable default encryption on the bucket instead. For more information about Amazon S3, see the [Amazon S3](https://docs.aws.amazon.com/s3/?icmpid=docs_homepage_featuredsvcs) documentation.

To install Velero and configure an AWS storage destination:

1. Follow the instructions for [installing Velero with the AWS](https://github.com/vmware-tanzu/velero-plugin-for-aws#setup) in the Velero documentation.

1. Run the `velero install` command with the additional flags `--use-restic` and `--use-volume-snapshots=false`:

  **Example:**

  ```
  velero install
     --provider aws
     --plugins velero/velero-plugin-for-aws:v1.2.0
     --bucket $BUCKET
     --backup-location-config region=$REGION
     --secret-file CREDS_FILE
     --use-restic --use-volume-snapshots=false
  ```

1. Configure Velero namespace access and default memory limits, if needed. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).


## Configure GCP Storage for Online Environments

In this procedure, you install Velero and configure your initial storage destination in online environments.

To install Velero and configure a GCP storage destination:

1. Follow the instructions for [installing Velero with the GCP](https://github.com/vmware-tanzu/velero-plugin-for-gcp#setup) in the Velero documentation.

1. Run the `velero install` command with the additional flags `--use-restic` and `--use-volume-snapshots=false`:

  **Example:**

  ```
  velero install \
    --provider gcp \
    --plugins velero/velero-plugin-for-gcp:v1.5.0 \
    --bucket $BUCKET \
    --secret-file ./CREDS_FILE
    --use-restic --use-volume-snapshots=false
  ```

1. Configure Velero namespace access and default memory limits, if needed. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).

## Configure Azure Storage for Online Environments

In this procedure, you install Velero and configure your initial storage destination in online environments.

To install Velero and configure an Azure storage destination:

1. Follow the instructions for [installing Velero with Azure](https://github.com/vmware-tanzu/velero-plugin-for-microsoft-azure#setup) in the Velero documentation.

1. Run the `velero install` command with the additional flags `--use-restic` and `--use-volume-snapshots=false`:

  **Example:**

  ```
  velero install \
    --provider azure \
    --plugins velero/velero-plugin-for-microsoft-azure:v1.5.0 \
    --bucket $BLOB_CONTAINER \
    --secret-file ./CREDS_FILE \
    --backup-location-config resourceGroup=$AZURE_BACKUP_RESOURCE_GROUP,storageAccount=$AZURE_STORAGE_ACCOUNT_ID[,subscriptionId=$AZURE_BACKUP_SUBSCRIPTION_ID] \
    --snapshot-location-config apiTimeout=<YOUR_TIMEOUT>[,resourceGroup=$AZURE_BACKUP_RESOURCE_GROUP,subscriptionId=$AZURE_BACKUP_SUBSCRIPTION_ID]
    --use-restic --use-volume-snapshots=false
  ```

1. Configure Velero namespace access and default memory limits, if needed. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).

## Configure S3-Compatible Storage for Online Environments

Replicated supports the following S3-compatible object stores for storing backups with Velero:

- Ceph RADOS v12.2.7
- MinIO

In this procedure, you install Velero and configure your initial storage destination in online environments.

To install Velero and configure an S3-compatible storage destination:

1. Follow the instructions for installing Velero with these providers. For more information, see [S3-Compatible object store providers](https://velero.io/docs/v1.6/supported-providers/#s3-compatible-object-store-providers) in the Velero documentation.

1. Run the appropriate `velero install` command with the additional flags `--use-restic` and `--use-volume-snapshots=false`.

1. Configure Velero namespace access and default memory limits, if needed. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).

## Next Step

Next, you can create or schedule backups. For more information, see [Creating Backups](snapshots-creating) and [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [How to Set Up Snapshots](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
