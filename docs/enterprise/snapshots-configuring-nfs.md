# Configuring an NFS Storage Destination

> Introduced in the Replicated app manager v1.33.0

You can configure a Network File System (NFS) as your storage destination for backups.

## Prerequisites

Complete the following items before you perform this task:

* Review the limitations and considerations. See [Limitations and Considerations](snapshots-understanding#limitations-and-considerations) in _How to Set Up and Use Snapshots_.
* Install the Velero CLI. See [Installing the Velero CLI](snapshots-velero-cli-installing).
* The NFS server must be configured to allow access from all the nodes in the cluster.
* The NFS directory must be writable by the user:group 1001:1001.
* Ensure that you configure the user:group 1001:1001 permissions for the directory on the NFS server.
* All the nodes in the cluster must have the necessary NFS client packages installed to be able to communicate with the NFS server. For example, the `nfs-common` package is a common package used on Ubuntu.
* Any firewalls must be properly configured to allow traffic between the NFS server and clients (cluster nodes).

## Install Velero and Configure NFS Storage

In this procedure, you install Velero and configure your initial storage destination.

:::note
If you already have Velero installed and want to update your storage destination, you can update settings in admin console. For more information about updating settings, see [Updating NFS Settings in the Admin Console](#updating-nfs-settings-in-the-admin-console).
:::

To install Velero and configure an NFS storage destination:

1. Run the following command to run Velero with restic in the Velero namespace:

    ```
    kubectl get pods -n velero
    ```

1. Run the following command to configure the Velero namespace and storage destination in the application. For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index).

    ```
    kubectl kots velero configure-nfs --namespace NAME --nfs-path PATH --nfs-server HOST
    ```

    Replace:

    - NAME with the name of the namespace where the admin console is installed and running
    - PATH with the path that is exported by the NFS server
    - HOST with the hostname or IP address of the NFS server

    You will get a message that the file system configuration for the admin console is successful, but that no Velero installation has been detected. Credentials and instructions are displayed for installing Velero.

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
    kubectl kots velero configure-nfs \
      --nfs-server <hostname-or-ip> \
      --nfs-path /path/to/directory \
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


## Updating NFS Settings in the Admin Console

If you want to update your NFS settings or want to change to another storage destination, you can use the admin console.

If you used a Kubernetes installer that included the Velero add-on, then an internal storage destination was created by default during the installation. However, the internal storage is not sufficient for full backups and you must configure a storage destination.

To update NFS settings:

1. Ensure that you meet the NFS prerequisites. See [Prerequisites](snapshots-configuring-hostpath#prerequisites).

1. In the admin console, select **Snapshots** > **Settings and Schedule**.

1. From the **Destination** dropdown list, select **NFS**.

  ![Snapshot Destination Dropdown NFS](/images/snapshot-destination-dropdown-nfs.png)

1. Edit the following fields:

  | Name   | Description                                  |
  |--------|----------------------------------------------|
  | Server | The hostname or IP address of the NFS server |
  | Path   | The path that is exported by the NFS server  |

1. Click **Update storage settings**. This update can take a couple of minutes.

## Next Step

Next, you can create or schedule backups. For more information, see [Creating Backups](snapshots-creating) and [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [How to Set Up Backup Storage](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
