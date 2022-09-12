# Configuring Other Storage Destinations

This topic describes additional supported storage destinations and how to configure them for use with the snapshots backup feature. For information about configuring network file storage e (NFS) see

## Install Velero on AWS

1. Follow the instructions for [installing Velero with the AWS](https://github.com/vmware-tanzu/velero-plugin-for-aws#setup) in the Velero documentation.

  The credentials look similar to this format:

  ```
  [default]
  aws_access_key_id = ACCESS_KEY_ID
  aws_secret_access_key = SECRET_ACCESS_KEY
  ```

1. Copy the credentials to a notepad. Then run the following commands on the cluster to make the credentials available:

    1. Create a text file using a VIM editor and give it a name.

      **Example:**

      ```
      vi cred.txt
      ```

    1. Copy and paste the credentials into the VIM editor, and enter:

      ```
      :wq
      ```

1. For the `velero install` command, use this command:

  ```
  velero install
     --provider aws
     --plugins velero/velero-plugin-for-aws:v1.2.0
     --bucket BUCKET
     --backup-location-config region=REGION
     --secret-file AWS_CRED_FILE
     --use-restic --use-volume-snapshots=false
  ```
  Replace:

  - `BUCKET` with the name of the S3 bucket
  - `REGION` with the cluster region
  - `AWS_CREDS_FILE` with the name of the credentials file you created in the previous step


## Install Velero on GCP

Follow the instructions for [installing Velero with the GCP](https://github.com/vmware-tanzu/velero-plugin-for-gcp#setup) in the Velero documentation.


## Install Velero on Microsoft Azure

Follow the instructions for [installing Velero with Azure](https://github.com/vmware-tanzu/velero-plugin-for-microsoft-azure#setup) in the Velero documentation.



## Install Velero on S3-Compatible Storage Providers

Replicated supports the following S3-compatible object stores for storing backups with Velero:

- Ceph RADOS v12.2.7
- MinIO

Follow the instructions for installing Velero with these providers. For more information, see [S3-Compatible object store providers](https://velero.io/docs/v1.6/supported-providers/#s3-compatible-object-store-providers) in the Velero documentation.

## Next Step

You can create or schedule backups. For more information, see [Creating Backups](snapshots-creating) and [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [How to Set Up Snapshots](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
