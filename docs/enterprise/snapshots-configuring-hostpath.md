# Configuring a Host Path Storage Destination

> Introduced in the Replicated app manager v1.33.0

You can configure a host path as your storage destination for backups.

## Prerequisites

Complete the following items before you perform this task:

* Review the limitations and considerations. See [Limitations and Considerations](snapshots-config-workflow#limitations-and-considerations) in _How to Set Up Backup Storage_.
* Install the Velero CLI. See [Installing the Velero CLI](snapshots-velero-cli-installing).
* The host path must be a dedicated directory. Do not use a partition used by a service like Docker or Kubernetes for ephemeral storage.
* The host path must exist and be writable by the user:group 1001:1001 on all nodes in the cluster.

   If you use a mounted directory for the storage destination, such as one that is created with the Common Internet File System (CIFS) or Server Message Block (SMB) protocols, ensure that you configure the user:group 1001:1001 permissions on all nodes in the cluster and from the server side as well.

   You cannot change the permissions of a mounted network shared filesystem from the client side. To reassign the user:group to 1001:1001 for a directory that is already mounted, you must remount the directory. For example, for a CIFS mounted directory, specify the `uid=1001,gid=1001` mount options in the CIFS mount command.

## Configure Host Path Storage in Online Environments

In this procedure, you install Velero and configure your initial storage destination in online environments.

:::note
If you already have Velero installed and want to update your storage destination, you can use the admin console instead. In this procedure, you use the kots CLI to install Velero and configure your initial storage destination in online environments. For more information about using the admin console to update storage settings, see [Updating Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

To install Velero and configure a host path storage destination:

1. Run the following command to configure the Velero namespace and storage destination in the application. For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index).

  ```
  kubectl kots velero configure-hostpath --namespace NAME --hostpath /PATH
  ```

    Replace:

    - NAME with the name of the namespace where the admin console is installed and running
    - PATH with the path to the directory where the backups will be stored

  **Example:**

  ```
  kubectl kots velero configure-hostpath --namespace default --hostpath /backups
  ```

  You get a message that the file system configuration for the admin console is successful, but that no Velero installation has been detected. Credentials and instructions are displayed for installing Velero.

1. Run the `velero install` command that displays in the previous step:

  **Example:**

  ```
  velero install \
    --secret-file PATH/TO/CREDENTIALS_FILE \
    --provider aws \
    --plugins velero/velero-plugin-for-aws:v1.2.0 \
    --bucket velero \
    --backup-location-config region=minio,s3ForcePathStyle=true,s3Url=http://kotsadm-fs-minio.default:9000,publicUrl=http://10.96.0.243:9000 \
    --snapshot-location-config region=minio \
    --use-restic
  ```

  Replace:

   `PATH/TO/CREDENTIALS_FILE` with the path to the credentials file.

  A confirmation message displays that the installation is successful. You can go to the Snapshots tab admin console and see the storage destination is configured.

## Configure Host Path Storage in Air Gapped Environments

The `velero configure-hostpath` CLI command can be used to configure NFS in air gapped environments.

To configure host path storage in an air gapped environment, run the following command:

```bash
kubectl kots velero configure-hostpath \
  --hostpath /PATH \
  --namespace NAMESPACE \
  --kotsadm-registry private.registry.host \
  --kotsadm-namespace application-name \
  --registry-username ro-username \
  --registry-password ro-password
```

After this command runs successfully, it detects whether Velero is already installed. If Velero is not installed, the command output provides specific instructions on how to install and set up Velero.

## Configure Host Path Storage in the Admin Console

Alternatively, when the admin console and application are already installed, you can start in the admin console to install Velero and configure Host Path storage.

To install Velero and configure Host Path storage for existing clusters:

1. From the admin console, click **Snapshots > Settings and Schedule**.

1. Click **Add a new storage destination**.

  The Add a new destination dialog opens and shows instructions for setting up Velero with different providers.

1. Click **Host Path**.

  ![Snapshot Provider NFS](/images/snapshot-provider-hostpath.png)

1. In the Configure Host Path dialog, enter the path to the directory where the backups will be stored. Click **Configure**.

  ![Snapshot Provider NFS Fields](/images/snapshot-provider-hostpath-field.png)

  This step can take a few minutes. When the configuration is successful, the Next Steps dialog opens with a CLI command to print out instructions on how to set up Velero with the deployed host path configuration.

1. Run the command that displays in the previous step and follow the instructions to install Velero.

  ![Snapshot Provider File System Next Steps](/images/snapshot-provider-fs-next-steps.png)

1. Return to the admin console and either click **Check for Velero** or refresh the page to verify that the Velero installation is detected.


## Next Steps

Next, you can:

* Configure Velero namespace access and default memory limits, if needed. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).
* Create or schedule backups. See [Creating Backups](snapshots-creating) and [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [How to Set Up Backup Storage](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
