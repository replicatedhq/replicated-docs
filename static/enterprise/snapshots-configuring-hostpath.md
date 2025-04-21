# Configure a Host Path Storage Destination

This topic describes how to install Velero and configure a host path as your storage destination for backups.  

:::note
If Velero is already installed, you can update your storage destination in the Replicated Admin Console. 

For embedded clusters with the Velero add-on, you must update the default internal storage settings in the Admin Console because internal storage is insufficient for full backups. 

For more information about updating storage, see [Updating Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

## Requirements

* The host path must be a dedicated directory. Do not use a partition used by a service like Docker or Kubernetes for ephemeral storage.
* The host path must exist and be writable by the user:group 1001:1001 on all nodes in the cluster. For example, in a Linux environment you might run `sudo chown -R 1001:1001 /backups` to change the user:group permissions.

   If you use a mounted directory for the storage destination, such as one that is created with the Common Internet File System (CIFS) or Server Message Block (SMB) protocols, ensure that you configure the user:group 1001:1001 permissions on all nodes in the cluster and from the server side as well.

   You cannot change the permissions of a mounted network shared filesystem from the client side. To reassign the user:group to 1001:1001 for a directory that is already mounted, you must remount the directory. For example, for a CIFS mounted directory, specify the `uid=1001,gid=1001` mount options in the CIFS mount command.

## Prerequisites

Complete the following items before you perform this task:

* Review the limitations and considerations. See [Limitations and Considerations](/vendor/snapshots-overview#limitations-and-considerations) in _About Backup and Restore_.
* Install the velero CLI. See [Install the Velero CLI](snapshots-velero-cli-installing).

## Install Velero and Configure Host Path Storage in Online Environments

To install Velero and configure host path storage in online environments:

1. Run one of the following commands to install Velero, depending on the version of the velero CLI you are using:

   * **Velero v1.10 and later**:

     ```bash
     velero install \
       --no-default-backup-location \
       --no-secret \
       --use-node-agent --uploader-type=restic \
       --use-volume-snapshots=false \
       --plugins velero/velero-plugin-for-aws:v1.5.3
     ```

   * **Velero versions earlier than v1.10**:

     ```bash
     velero install \
       --no-default-backup-location \
       --no-secret \
       --use-restic \
       --use-volume-snapshots=false \
       --plugins velero/velero-plugin-for-aws:v1.5.3
     ```

1. Configure the Restic DaemonSet specification if your cluster uses one of the following Kubernetes distributions:
  * RancherOS 
  * OpenShift 
  * Microsoft Azure 
  * VMware Tanzu Kubernetes Grid Integrated Edition

For information about how to configure the Restic DaemonSet for these distributions, see [Configure Restic DaemonSet spec](https://velero.io/docs/v1.9/restic/#configure-restic-daemonset-spec) in the Velero documentation.

1. Run the following command to configure the host path storage destination:

    ```
    kubectl kots velero configure-hostpath --namespace NAME --hostpath /PATH
    ```

    Replace:
      - `NAME` with the namespace where the Replicated KOTS Admin Console is installed and running
      - `PATH` with the path to the directory where the backups will be stored

    For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index) in _Reference_.

## Install Velero and Configure Host Path Storage in Air Gapped Environments

To install Velero and configure host path storage in air gapped environments:

1. Run `velero version --client-only` to check the version of the velero CLI that you installed as part of [Installing the Velero CLI](snapshots-velero-cli-installing).

1. Run one of the following commands to install Velero, depending on the version of the velero CLI you are using:

   * **Velero v1.10 and later**:

     ```bash
     velero install \
       --no-default-backup-location \
       --no-secret \
       --use-node-agent --uploader-type=restic \
       --use-volume-snapshots=false \
       --plugins velero/velero-plugin-for-aws:v1.5.3
     ```

   * **Velero versions earlier than v1.10**:

     ```bash
     velero install \
       --no-default-backup-location \
       --no-secret \
       --use-restic \
       --use-volume-snapshots=false \
       --plugins velero/velero-plugin-for-aws:v1.5.3
     ```

     :::note
It is typical for the velero and node-agent (restic) Pods to be in the `ErrImagePull` or `ImagePullBackOff` state after you run the `velero install` command because Velero does not support passing registry credentials during installation. In Replicated KOTS v1.94.0 and later, this situation resolves itself after you complete the instructions to configure the storage destination.

If you are on an earlier version of KOTS, Replicated recommends that you upgrade to KOTS v1.94.0 or later. Otherwise, you must patch the Velero deployment manually and add the image pull secret to access the registry.
:::

1. Configure the Restic DaemonSet specification if your cluster uses one of the following Kubernetes distributions:
  * RancherOS 
  * OpenShift 
  * Microsoft Azure 
  * VMware Tanzu Kubernetes Grid Integrated Edition

For information about how to configure the Restic DaemonSet for these distributions, see [Configure Restic DaemonSet spec](https://velero.io/docs/v1.9/restic/#configure-restic-daemonset-spec) in the Velero documentation.

1. Run the following command to configure the host path storage destination:

   ```
   kubectl kots velero configure-hostpath \
     --namespace NAME \
     --hostpath /PATH \
     --kotsadm-registry REGISTRY_HOSTNAME[/REGISTRY_NAMESPACE] \
     --registry-username REGISTRY_USERNAME \
     --registry-password REGISTRY_PASSWORD
   ```

   Replace:
     - `NAME` with the namespace where the Admin Console is installed and running
     - `PATH` with the path to the directory where the backups will be stored
     - `REGISTRY_HOSTNAME` with the registry endpoint where the images are hosted
     - `REGISTRY_NAMESPACE` with the registry namespace where the images are hosted (Optional)
     - `REGISTRY_USERNAME` with the username to use to authenticate with the registry
     - `REGISTRY_PASSWORD` with the password to use to authenticate with the registry

   For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index) in _Reference_.

## Configure Host Path Storage in the Admin Console

Alternatively, when the Admin Console and application are already installed, you can start in the Admin Console to install Velero and configure a host path storage destination.

To install Velero and configure host path storage for existing clusters:

1. From the Admin Console, click **Snapshots > Settings and Schedule**.

1. Click **Add a new storage destination**.

   The Add a new destination dialog opens and shows instructions for setting up Velero with different providers.

1. Click **Host Path**.

   ![Snapshot Provider Host Path](/images/snapshot-provider-hostpath.png)

1. In the Configure Host Path dialog, enter the path to the directory where the backups will be stored. Click **Get instructions**.

   ![Snapshot Provider Host Path Fields](/images/snapshot-provider-hostpath-field.png)

   A dialog opens with instructions on how to set up Velero with the specified host path configuration.

1. Follow the steps in the dialog to install Velero and configure the storage destination.

   ![Snapshot Provider File System Instructions](/images/snapshot-provider-hostpath-instructions.png)

1. Return to the Admin Console and either click **Check for Velero** or refresh the page to verify that the Velero installation is detected.


## Next Steps

* (Existing Clusters Only) Configure Velero namespace access if you are using minimal RBAC. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).
* (Optional) Increase the default memory limits. See [Configure Namespace Access and Memory Limit](snapshots-velero-installing-config).
* Create or schedule backups. See [Create and Schedule Backups](snapshots-creating).

## Additional Resources

* [Troubleshoot Snapshots](/enterprise/snapshots-troubleshooting-backup-restore)