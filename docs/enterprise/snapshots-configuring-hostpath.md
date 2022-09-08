# Configuring a Host Path Storage Destination

> Introduced in the Replicated app manager v1.33.0

You can configure a host path as your snapshots storage destination.

:::note
Clusters provisioned by a Replicated Kubernetes installer can include the Velero add-on. If your vendor has provided this add-on, you do not need to install Velero and you can configure the storage destination in the admin console. For more information about using the admin console to configure host path storage, see [Changing to Host Path Storage using the Admin Console](changing-to-host-path-storage-using-the-admin-console).
:::

## Prerequisites

Complete the following items before you perform this task:

* Review the limitations and considerations. See [Limitations and Considerations](snapshots-understanding#limitations-and-considerations) in _How to Set Up and Use Snapshots_.
* Install the Velero CLI. See [Installing the Velero CLI](snapshots-velero-cli-installing).
* The host path must be a dedicated directory. Do not use a partition used by a service like Docker or Kubernetes for ephemeral storage.
* The host path must exist and be writable by the user:group 1001:1001 on all nodes in the cluster.

   If you use a mounted directory for the storage destination, such as one that is created with the Common Internet File System (CIFS) or Server Message Block (SMB) protocols, ensure that you configure the user:group 1001:1001 permissions on all nodes in the cluster and from the server side as well.

   You cannot change the permissions of a mounted network shared filesystem from the client side. To reassign the user:group to 1001:1001 for a directory that is already mounted, you must remount the directory. For example, for a CIFS mounted directory, specify the `uid=1001,gid=1001` mount options in the CIFS mount command.

## Install Velero and Configure Host Path Storage

In this procedure, you install Velero and configure your first storage destination.

:::note
If you already have Velero installed and want to update or change your storage destination, you can use either the Replicated admin console or the kots CLI. For more information about using the admin console to update a storage destination, see [Changing to Host Path Storage using the Admin Console](changing-to-host-path-storage-using-the-admin-console).
:::

To configure your first storage destination:

1. Run the following command to run Velero with restic in the Velero namespace:

  ```
  kubectl get pods -n velero
  ```

  **Example output:**


1. Run the following command to configure the Velero namespace and storage destination in the application. For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index).

  ```
  kubectl kots velero configure-hostpath --namespace NAME --hostpath /PATH
  ```

  Replace PATH with the path to the location where the backups will be stored.

  **Example:**

  ```
  kubectl kots velero configure-hostpath --namespace default --hostpath /backups
  ```

  You will get a message that the file system configuration for the admin console is successful, but that no Velero installation has been detected. Creadentials and instructions are displayed for installing Velero.

1. Run the following commands on the cluster to make the credentials available:

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

  **Example:**

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
1. Replace `<path/to/credentials-file>` with the path to the credentials file. Then copy and paste this entire command from the notepad to the terminal, and run the command:

  **Example:**

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


\\! **Air gapped Installations**

\\!  ```bash
  kubectl kots velero configure-hostpath \
    --hostpath /path/to/directory \
    --namespace <namespace> \
    --kotsadm-registry private.registry.host \
    --kotsadm-namespace application-name \
    --registry-username ro-username \
    --registry-password ro-password
  ```

  A confirmation message displays that the installation is successful. You can go to the Snapshots tab admin console and see the storage destination is configured.

1. Configure Velero namespace access and default memory limits, if needed. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).


## Configure a Host Path on Kubernetes Installer Clusters





First, head to the "Snapshots" tab.
From there, head to the "Settings and Schedule" tab and choose the "Host Path" dropdown option.

![Snapshot Destination Dropdown Host Path](/images/snapshot-destination-dropdown-hostpath.png)

Enter the path to the directory on the node and click "Update storage settings".
This step might take a couple of minutes.

![Snapshot Destination Host Path Fields](/images/snapshot-destination-hostpath-field.png)

When configuring the admin console to store snapshots on a local host path, the following fields are available:

| Name      | Description                   |
|-----------|-------------------------------|
| Host Path | A local host path on the node |





## Configure a Host Path on Existing Clusters

If Velero is already installed in the cluster, follow the instructions in the [Configure a host path on Kubernetes installer-created clusters](#configure-a-host-path-on-kubernetes-installer-created-clusters) section above.

If Velero is not installed in the cluster, then the first step is to set up and deploy the necessary components that are going to be used to install and set up Velero with the provided host path.
This can be done in two ways:



### Using the Admin Console

First, head to the “Snapshots” tab.
From there, head to the “Settings and Schedule” tab.
Then, you'll be presented with a dialog which contains instructions for setting up Velero with different providers.
Click on the "Host Path" provider option (check screenshot below).

![Snapshot Provider Host Path](/images/snapshot-provider-hostpath.png)

Then, you'll be presented with another dialog for configuring the host path.
Enter the path to the directory on the node and click "Configure".

![Snapshot Provider Host Path Fields](/images/snapshot-provider-hostpath-field.png)

This step might take a few minutes.
Once the configuration is successful, you'll be presented with a different dialog which contains a CLI command that will print out instructions on how to set up Velero with the deployed host path configuration/components.

![Snapshot Provider File System Next Steps](/images/snapshot-provider-fs-next-steps.png)

After following the instructions from the above CLI command and successfully installing Velero, you can go back to the admin console and either click on the "Check for Velero" button to retry detecting Velero, or refresh the page.

## Next Steps

- Configure Velero namespace access and default memory limits, if needed. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).
- Create or schedule backups. See [Creating Backups](snapshots-creating) and [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [How to Set Up Snapshots](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
