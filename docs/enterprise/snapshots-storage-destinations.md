# Configuring Other Storage Destinations

This topic describes additional supported storage destinations and how to configure them for use with the snapshots backup feature. For information about configuring network file storage e (NFS) see 

## Install Velero on AWS

1. Follow the instructions for [installing Velero with the AWS](https://github.com/vmware-tanzu/velero-plugin-for-aws#setup) in the Velero documentation.

  The credentials look similar to this format:

  ```
  [default]
  aws_access_key_id = <access-key-id>
  aws_secret_access_key = <secret-access-key>
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
     --bucket <bucket-name>
     --backup-location-config region=<region>
     --secret-file <aws-creds-file>
     --use-restic --use-volume-snapshots=false
  ```
  Replace:

  - `<bucket-name>` with the name of the S3 bucket
  - `<aws-cred-file>` with the credentials file name you created in the previous step


## Install Velero on GCP

Following the instructions for [installing Velero with the GCP](https://github.com/vmware-tanzu/velero-plugin-for-gcp#setup) in the Velero documentation.


## Install Velero on Microsoft Azure

Following the instructions for [installing Velero with Azure](https://github.com/vmware-tanzu/velero-plugin-for-microsoft-azure#setup) in the Velero documentation.



## Install Velero on S3-Compatible Storage Providers

Replicated supports the following S3-compatible object stores for storing backups with Velero:

- Ceph RADOS v12.2.7
- MinIO

For information about installing Velero with these providers, see [S3-Compatible object store providers](https://velero.io/docs/v1.6/supported-providers/#s3-compatible-object-store-providers) in the Velero documentation.

## Next Step

After you configure a storage destination, you can create or schedule backups. For more information, see [Creating Backups](snapshots-creating) and [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [How to Set Up Snapshots](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
