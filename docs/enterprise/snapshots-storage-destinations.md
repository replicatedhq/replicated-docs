import UpdateDefaultStorage from "../partials/snapshots/_updateDefaultStorage.mdx"
import RegistryCredNote from "../partials/snapshots/_registryCredentialsNote.mdx"
import CheckVersion from "../partials/snapshots/_checkVersion.mdx"
import KotsAvailability from "../partials/kots/_kots-availability.mdx"

# Configure other storage destinations

This topic describes installing Velero and configuring storage for Amazon Web Service (AWS), Google Cloud Provider (GCP), Microsoft Azure, and S3-compatible providers.

To configure host path or NFS as a storage destination, see [Configure a Host Path Storage Destination](snapshots-configuring-hostpath) and [Configure an NFS Storage Destination](snapshots-configuring-nfs).

:::note
<UpdateDefaultStorage/>
:::

<KotsAvailability/>

## Prerequisites

Complete the following items before you install Velero and configure a storage destination:

* Review the limitations and considerations. See [Limitations and Considerations](/vendor/snapshots-overview#limitations-and-considerations) in _About Backup and Restore_.
* Install the velero CLI. See [Install the Velero CLI](snapshots-velero-cli-installing).

## Configure AWS storage for online environments

In this procedure, you install Velero and configure an AWS storage destination in online environments.

Snapshots does not support Amazon Simple Storage Service (Amazon S3) buckets that have a bucket policy requiring the server-side encryption header. If you want to require server-side encryption for objects, you can enable default encryption on the bucket instead. For more information about Amazon S3, see the [Amazon S3](https://docs.aws.amazon.com/s3/?icmpid=docs_homepage_featuredsvcs) documentation.

To install Velero and configure an AWS storage destination:

1. Follow the instructions for [installing Velero on AWS](https://github.com/vmware-tanzu/velero-plugin-for-aws#setup) in the velero-plugin-for-aws repository in GitHub.

1. Run the `velero install` command with these additional flags:

   * **Velero 1.17 and later**: Use the `--use-node-agent` and `--use-volume-snapshots=false` flags.
   * **Velero 1.11 to 1.16**: Use the `--use-node-agent`, `--uploader-type=restic`, and `--use-volume-snapshots=false` flags.

   **Example:**

   ```
   velero install \
     --provider aws \
     --plugins velero/velero-plugin-for-aws:v1.14.2 \
     --bucket $BUCKET \
     --backup-location-config region=$REGION \
     --secret-file ./CREDS_FILE \
     --use-node-agent \
     --use-volume-snapshots=false
   ```

   Where `./CREDS_FILE` is the path to a credentials file in the AWS shared credentials format. Velero reads the `[default]` profile unless you set `profile` in `--backup-location-config`. For example:

   ```ini
   [default]
   aws_access_key_id=<AWS_ACCESS_KEY_ID>
   aws_secret_access_key=<AWS_SECRET_ACCESS_KEY>
   ```

   If you use temporary credentials, also add an `aws_session_token` line.

## Configure GCP storage for online environments

In this procedure, you install Velero and configure a GCP storage destination in online environments.

To install Velero and configure a GCP storage destination:

1. Follow the instructions for installing Velero on GCP in the [velero-plugin-for-gcp](https://github.com/vmware-tanzu/velero-plugin-for-gcp#setup) repository in GitHub.

1. Run the `velero install` command with these additional flags:
   * **Velero 1.17 and later**: Use the `--use-node-agent` and `--use-volume-snapshots=false` flags.
   * **Velero 1.11 to 1.16**: Use the `--use-node-agent`, `--uploader-type=restic`, and `--use-volume-snapshots=false` flags.

   **Example:**

   ```
   velero install \
     --provider gcp \
     --plugins velero/velero-plugin-for-gcp:v1.14.2 \
     --bucket $BUCKET \
     --secret-file ./CREDS_FILE \
     --use-node-agent \
     --use-volume-snapshots=false
   ```

   Where `./CREDS_FILE` is the path to the JSON key file for the GCP service account that Velero uses to access the bucket. You create this key file when you follow the setup instructions in the previous step. The file has the following format:

   ```json
   {
     "type": "service_account",
     "project_id": "<PROJECT_ID>",
     "private_key_id": "<PRIVATE_KEY_ID>",
     "private_key": "<PRIVATE_KEY>",
     "client_email": "<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com",
     "client_id": "<CLIENT_ID>",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<SERVICE_ACCOUNT_NAME>%40<PROJECT_ID>.iam.gserviceaccount.com"
   }
   ```

## Configure Azure storage for online environments

In this procedure, you install Velero and configure an Azure storage destination in online environments.

To install Velero and configure an Azure storage destination:

1. Follow the instructions for [Install Velero on Azure](https://github.com/vmware-tanzu/velero-plugin-for-microsoft-azure#setup) in the Velero documentation.

1. Run the `velero install` command with these additional flags:
   * **Velero 1.17 and later**: Use the `--use-node-agent` and `--use-volume-snapshots=false` flags.
   * **Velero 1.11 to 1.16**: Use the `--use-node-agent`, `--uploader-type=restic`, and `--use-volume-snapshots=false` flags.

   **Example:**

   ```
   velero install \
     --provider azure \
     --plugins velero/velero-plugin-for-microsoft-azure:v1.14.2 \
     --bucket $BLOB_CONTAINER \
     --secret-file ./CREDS_FILE \
     --backup-location-config resourceGroup=$AZURE_BACKUP_RESOURCE_GROUP,storageAccount=$AZURE_STORAGE_ACCOUNT_ID[,subscriptionId=$AZURE_BACKUP_SUBSCRIPTION_ID] \
     --snapshot-location-config apiTimeout=<YOUR_TIMEOUT>[,resourceGroup=$AZURE_BACKUP_RESOURCE_GROUP,subscriptionId=$AZURE_BACKUP_SUBSCRIPTION_ID] \
     --use-node-agent \
     --use-volume-snapshots=false
   ```

   Where `./CREDS_FILE` is the path to a file containing the Azure service principal credentials, as `KEY=value` lines. For example:

   ```text
   AZURE_SUBSCRIPTION_ID=<AZURE_SUBSCRIPTION_ID>
   AZURE_TENANT_ID=<AZURE_TENANT_ID>
   AZURE_CLIENT_ID=<AZURE_CLIENT_ID>
   AZURE_CLIENT_SECRET=<AZURE_CLIENT_SECRET>
   AZURE_RESOURCE_GROUP=<AZURE_RESOURCE_GROUP>
   AZURE_CLOUD_NAME=AzurePublicCloud
   ```

   If you use AKS, set `AZURE_RESOURCE_GROUP` to the name of the auto-generated resource group for the cluster's nodes (typically starting with `MC_`). This is not the same as `$AZURE_BACKUP_RESOURCE_GROUP` in the preceding command. For more information, see the [velero-plugin-for-microsoft-azure](https://github.com/vmware-tanzu/velero-plugin-for-microsoft-azure#setup) repository in GitHub.

## Configure s3-compatible storage for online environments

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

- NAME with the name of the namespace where the Replicated KOTS Admin Console is installed and running
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

## Configure s3-compatible storage for air-gapped environments

> Introduced in Replicated KOTS v1.94.0

The following S3-compatible object stores are supported for storing backups with Velero:

- Ceph RADOS v12.2.7
- MinIO

Run the following command to install Velero and configure an S3-compatible storage destination in an air-gapped environment. For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index) in _Reference_.

```bash
kubectl kots velero configure-other-s3 \
  --namespace NAME \
  --endpoint ENDPOINT \
  --region REGION \
  --bucket BUCKET \
  --access-key-id ACCESS_KEY_ID \
  --secret-access-key SECRET_ACCESS_KEY \
  --kotsadm-registry REGISTRY_HOSTNAME[/REGISTRY_NAMESPACE] \
  --registry-username REGISTRY_USERNAME \
  --registry-password REGISTRY_PASSWORD
```

Replace:

- `NAME` with the name of the namespace where the Admin Console is installed and running
- `ENDPOINT` with the s3 endpoint
- `REGION` with the region where the bucket exists 
- `BUCKET` with the name of the object storage bucket where backups should be stored
- `ACCESS_KEY_ID` with the access key id to use for accessing the bucket
- `SECRET_ACCESS_KEY` with the secret access key to use for accessing the bucket
- `REGISTRY_HOSTNAME` with the registry endpoint where the images are hosted
- `REGISTRY_NAMESPACE` with the registry namespace where the images are hosted (Optional)
- `REGISTRY_USERNAME` with the username to use to authenticate with the registry
- `REGISTRY_PASSWORD` with the password to use to authenticate with the registry

If no Velero installation is detected, instructions are displayed to install Velero and configure the storage destination.

<RegistryCredNote/>

## Next steps

* (Existing Clusters Only) Configure Velero namespace access if you are using minimal RBAC. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).
* (Optional) Increase the default memory limits. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).
* Create or schedule backups. See [Create and Schedule Backups](snapshots-creating).

## Additional resources

* [Troubleshoot Snapshots](snapshots-troubleshooting-backup-restore)
