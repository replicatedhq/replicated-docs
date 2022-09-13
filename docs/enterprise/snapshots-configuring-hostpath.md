# Configuring a Host Path Storage Destination

> Introduced in the Replicated app manager v1.33.0

You can configure a host path as your storage destination for backups.

## Prerequisites

Complete the following items before you perform this task:

* Review the limitations and considerations. See [Limitations and Considerations](snapshots-understanding#limitations-and-considerations) in _How to Set Up and Use Snapshots_.
* Install the Velero CLI. See [Installing the Velero CLI](snapshots-velero-cli-installing).
* The host path must be a dedicated directory. Do not use a partition used by a service like Docker or Kubernetes for ephemeral storage.
* The host path must exist and be writable by the user:group 1001:1001 on all nodes in the cluster.

   If you use a mounted directory for the storage destination, such as one that is created with the Common Internet File System (CIFS) or Server Message Block (SMB) protocols, ensure that you configure the user:group 1001:1001 permissions on all nodes in the cluster and from the server side as well.

   You cannot change the permissions of a mounted network shared filesystem from the client side. To reassign the user:group to 1001:1001 for a directory that is already mounted, you must remount the directory. For example, for a CIFS mounted directory, specify the `uid=1001,gid=1001` mount options in the CIFS mount command.

## Configure Host Path Storage

In this procedure, you install Velero and configure your initial storage destination.

:::note
If you already have Velero installed and want to update your storage destination, you can use the admin console instead. For more information, see [Updating Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

To install Velero and configure a host path storage destination:

1. Run the following command to run Velero with restic in the Velero namespace:

  ```
  kubectl get pods -n velero
  ```

1. Run the following command to configure the Velero namespace and storage destination in the application. For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index).

  ```
  kubectl kots velero configure-hostpath --namespace NAME --hostpath /PATH
  ```

    Replace:

    - NAME with the name of the namespace where the admin console is installed and running
    - PATH with the path to the location where the backups will be stored

    **Example:**

    ```
    kubectl kots velero configure-hostpath --namespace default --hostpath /backups
    ```

  You will get a message that the file system configuration for the admin console is successful, but that no Velero installation has been detected. Credentials and instructions are displayed for installing Velero.

1. Copy the credentials to a notepad. Then run the following commands on the cluster to make the credentials available:

    1. Copy the credentials into a notepad.
    1. Create a text file using a VIM editor and give it a name.

      **Example:**

      ```
      vi cred.txt
      ```

    1. Copy and paste the credentials into the VIM editor, and enter:

      ```
      :wq
      ```

1. Copy and paste the `velero install` command that displays earlier in the terminal into a notepad.

  **Example: Online Installation**

  ```
  velero install \
    --secret-file <path/to/credentials-file> \
    --provider aws \
    --plugins velero/velero-plugin-for-aws:v1.2.0 \
    --bucket velero \
    --backup-location-config region=minio,s3ForcePathStyle=true,s3Url=http://kotsadm-fs-minio.default:9000,publicUrl=http://10.96.0.243:9000 \
    --snapshot-location-config region=minio \
    --use-restic
  ```
  **Example: Air Gapped Installation**

  ```bash
  kubectl kots velero configure-hostpath \
    --hostpath /path/to/directory \
    --namespace <namespace> \
    --kotsadm-registry private.registry.host \
    --kotsadm-namespace application-name \
    --registry-username ro-username \
    --registry-password ro-password
  ```

1. Replace `<path/to/credentials-file>` with the path to the credentials file. Then copy and paste this entire command from the notepad to the terminal, and run the command:

  **Example: Online Installation**

  ```
  velero install \
      --secret-file creds.txt \
      --provider aws \
      --plugins velero/velero-plugin-for-aws:v1.2.0 \
      --bucket velero \
      --backup-location-config region=minio,s3ForcePathStyle=true,s3Url=http://kotsadm-fs-minio.default:9000,publicUrl=http://HOST:PORT \
      --snapshot-location-config region=minio \
      --use-restic
  ```

  A confirmation message displays that the installation is successful. You can go to the Snapshots tab admin console and see the storage destination is configured.

1. Configure Velero namespace access and default memory limits, if needed. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).

## Next Step

Next, you can create or schedule backups. See [Creating Backups](snapshots-creating) and [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [How to Set Up Backup Storage](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
