# Configuring an NFS Storage Destination

> Introduced in the Replicated app manager v1.33.0

You can configure a Network File System (NFS) as your storage destination for backups.

## Prerequisites

Complete the following items before you perform this task:

* Review the limitations and considerations. See [Limitations and Considerations](snapshots-understanding#limitations-and-considerations) in _How to Set Up Backup Storage_.
* Install the Velero CLI. See [Installing the Velero CLI](snapshots-velero-cli-installing).
* The NFS server must be configured to allow access from all the nodes in the cluster.
* The NFS directory must be writable by the user:group 1001:1001.
* Ensure that you configure the user:group 1001:1001 permissions for the directory on the NFS server.
* All the nodes in the cluster must have the necessary NFS client packages installed to be able to communicate with the NFS server. For example, the `nfs-common` package is a common package used on Ubuntu.
* Any firewalls must be properly configured to allow traffic between the NFS server and clients (cluster nodes).

## Configure NFS Storage in Online Environments

In this procedure, you install Velero and configure your initial storage destination in online environments for either existing clusters or a Kubernetes installer clusters. This procedure uses the kots CLI to install Velero and configure your initial storage destination.

:::note
If you already have Velero installed and just want to update your storage destination settings, you can use the admin console instead. For more information about using the admin console to update storage settings, see [Updating Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

To install Velero and configure an NFS storage destination:

1. Install velero without a backup storage location:

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
    kubectl kots velero configure-nfs --namespace NAME --nfs-path PATH --nfs-server HOST
    ```

    Replace:

    - NAME with the name of the namespace where the admin console is installed and running
    - PATH with the path that is exported by the NFS server
    - HOST with the hostname or IP address of the NFS server

    You get a message that the file system configuration for the admin console is successful. You can go to the Snapshots tab admin console and see the storage destination is configured.

## Configure NFS Storage in Air Gapped Environments

The kots CLI can be used to configure NFS in air gapped environments.

:::note
If you already have Velero installed and want to update your storage destination, you can use the admin console instead. In this procedure, you use the kots CLI to install Velero and configure your initial storage destination in online environments. For more information about using the admin console to update storage settings, see [Updating Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

To configure NFS in an air gapped environment:

1. Prepare velero images (you will need `velero/velero-plugin-for-aws:v1.5.3` for plugins): https://velero.io/docs/v1.9/on-premises/#air-gapped-deployments

1. Install velero without a backup storage location:

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
  kubectl kots velero configure-nfs \
    --nfs-server HOST \
    --nfs-path PATH \
    --namespace NAME \
    --kotsadm-registry private.registry.host \
    --kotsadm-namespace application-name \
    --registry-username ro-username \
    --registry-password ro-password
  ```

    Replace:

    - NAME with the name of the namespace where the admin console is installed and running
    - PATH with the path that is exported by the NFS server
    - HOST with the hostname or IP address of the NFS server

You get a message that the file system configuration for the admin console is successful. You can go to the Snapshots tab admin console and see the storage destination is configured.

## Configure NFS Storage in the Admin Console

Alternatively, when the admin console and application are already installed, you can start in the admin console to install Velero and configure NFS storage.

To install Velero and configure NFS storage for existing clusters:

1. From the admin console, click **Snapshots > Settings and Schedule**.

1. Click **Add a new storage destination**.

  The Add a new destination dialog opens and shows instructions for setting up Velero with different providers.

1. Click **NFS**.

  ![Snapshot Provider NFS](/images/snapshot-provider-nfs.png)

1. In the Configure NFS dialog, enter the NFS server hostname or IP Address, and the path that is exported by the NFS server. Click **Get instructions**.

  ![Snapshot Provider NFS Fields](/images/snapshot-provider-nfs-fields.png)

  A dialog opens with instructions on how to set up Velero with the desired NFS configuration.

1. Follow the steps that are displayed in the dialog to install Velero.

  ![Snapshot Provider File System Instructions](/images/snapshot-provider-nfs-instructions.png)

1. Return to the admin console and either click **Check for Velero** or refresh the page to verify that the Velero installation is detected.

## Next Steps

Next, you can:

* Configure Velero namespace access and default memory limits, if needed. See [Configuring Namespace Access and Memory Limit](snapshots-velero-installing-config).
* Create or schedule backups. See [Creating Backups](snapshots-creating) and [Scheduling Automatic Backups](snapshots-scheduling).

## Additional Resources

* [How to Set Up Backup Storage](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
