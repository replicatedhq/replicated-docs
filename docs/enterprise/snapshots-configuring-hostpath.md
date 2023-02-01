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

1. Install Velero without a backup storage location:

  ```
  velero install \
    --no-default-backup-location \
    --no-secret \
    --use-restic \
    --use-volume-snapshots=false \
    --plugins velero/velero-plugin-for-aws:v1.5.3
  ```

  A confirmation message displays that the installation is successful.

1. If you're using RancherOS, OpenShift, Microsoft Azure, or VMware Tanzu Kubernetes Grid Integrated Edition (formerly VMware Enterprise PKS), please refer to the following Velero doc to complete restic configuration: https://velero.io/docs/v1.9/restic/#configure-restic-daemonset-spec

1. Run the following command to configure the Velero backup storage location. For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index).

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

  You get a message that the file system configuration for the admin console is successful. You can go to the Snapshots tab admin console and see the storage destination is configured.

## Configure Host Path Storage in Air Gapped Environments

The kots CLI can be used to configure host path storage in air gapped environments.

:::note
If you already have Velero installed and want to update your storage destination, you can use the admin console instead. In this procedure, you use the kots CLI to install Velero and configure your initial storage destination in online environments. For more information about using the admin console to update storage settings, see [Updating Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

To configure host path storage in an air gapped environment:

1. Prepare velero images (you will need `velero/velero-plugin-for-aws:v1.5.3` for plugins): https://velero.io/docs/v1.9/on-premises/#air-gapped-deployments

1. Install Velero without a backup storage location:

  ```
    velero install \
      --no-default-backup-location \
      --no-secret \
      --use-restic \
      --use-volume-snapshots=false \
      --image private.registry.host/velero:VELERO_VERSION \
      --plugins private.registry.host/velero-plugin-for-aws:v1.5.3
  ```

    Replace:

    - VELERO_VERSION with the actual velero version being used

1. Configure restic restore helper to use the prepared image: https://velero.io/docs/v1.9/restic/#customize-restore-helper-container

1. If you're using RancherOS, OpenShift, Microsoft Azure, or VMware Tanzu Kubernetes Grid Integrated Edition (formerly VMware Enterprise PKS), please refer to the following Velero doc to complete restic configuration: https://velero.io/docs/v1.9/restic/#configure-restic-daemonset-spec

1. Run the following command to configure the Velero backup storage location. For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index).

  ```bash
  kubectl kots velero configure-hostpath \
    --namespace NAME \
    --hostpath /PATH \
    --kotsadm-registry private.registry.host \
    --kotsadm-namespace application-name \
    --registry-username ro-username \
    --registry-password ro-password
  ```

    Replace:

    - NAME with the name of the namespace where the admin console is installed and running
    - PATH with the path to the directory where the backups will be stored

You get a message that the file system configuration for the admin console is successful. You can go to the Snapshots tab admin console and see the storage destination is configured.

## Configure Host Path Storage in the Admin Console

Alternatively, when the admin console and application are already installed, you can start in the admin console to install Velero and configure Host Path storage.

To install Velero and configure host path storage for existing clusters:

1. From the admin console, click **Snapshots > Settings and Schedule**.

1. Click **Add a new storage destination**.

  The Add a new destination dialog opens and shows instructions for setting up Velero with different providers.

1. Click **Host Path**.

  ![Snapshot Provider Host Path](/images/snapshot-provider-hostpath.png)

1. In the Configure Host Path dialog, enter the path to the directory where the backups will be stored. Click **Get instructions**.

  ![Snapshot Provider Host Path Fields](/images/snapshot-provider-hostpath-field.png)

  A dialog opens with instructions on how to set up Velero with the desired host path configuration.

1. Follow the steps that are displayed in the dialog to install Velero.

  ![Snapshot Provider File System Instructions](/images/snapshot-provider-hostpath-instructions.png)

1. Return to the admin console and either click **Check for Velero** or refresh the page to verify that the Velero installation is detected.


## Next Steps

Next, you can:

* Configure Velero namespace access and default memory limits, if needed. See [Configuring Namespace Access and Memory Limit](snapshots-velero-installing-config).
* Create or schedule backups. See [Creating Backups](snapshots-creating) and [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [How to Set Up Backup Storage](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
