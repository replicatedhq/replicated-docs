import InstallVelero from "../partials/snapshots/_installVelero.mdx"
import RegistryCredNote from "../partials/snapshots/_registryCredentialsNote.mdx"
import ResticDaemonSet from "../partials/snapshots/_resticDaemonSet.mdx"

# Configuring an NFS Storage Destination

This topic describes how to install Velero and configure a Network File System (NFS) as your storage destination for backups.

:::note
For existing or embedded clusters where Velero is already installed, you can update your storage destination in the admin console. For more information, see [Updating Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

## Prerequisites

Complete the following items before you perform this task:

* Review the limitations and considerations. See [Limitations and Considerations](snapshots-understanding#limitations-and-considerations) in _How to Set Up Backup Storage_.
* Install the velero CLI. See [Installing the Velero CLI](snapshots-velero-cli-installing).
* The NFS server must be configured to allow access from all of the nodes in the cluster.
* The NFS directory must be writable by the user:group 1001:1001.
* Ensure that you configure the user:group 1001:1001 permissions for the directory on the NFS server.
* All of the nodes in the cluster must have the necessary NFS client packages installed to be able to communicate with the NFS server. For example, the `nfs-common` package is a common package used on Ubuntu.
* Any firewalls must be properly configured to allow traffic between the NFS server and clients (cluster nodes).

## Install Velero and Configure NFS Storage in Online Environments

To install Velero and configure NFS storage in an online environment:

1. <InstallVelero/>

1. <ResticDaemonSet/>

1. Run the following command to configure the NFS storage destination:

  ```
  kubectl kots velero configure-nfs --namespace NAME --nfs-path PATH --nfs-server HOST
  ```

  Replace:
    - `NAME` with the namespace where the admin console is installed and running
    - `PATH` with the path that is exported by the NFS server
    - `HOST` with the hostname or IP address of the NFS server

  For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index) in _Reference_.

## Install Velero and Configure NFS Storage in Air Gapped Environments

To install Velero and configure NFS storage in air gapped environments:

1. <InstallVelero/>

      <RegistryCredNote/>

1. <ResticDaemonSet/>

1. Run the following command to configure the NFS storage destination: 

  ```
  kubectl kots velero configure-nfs \
    --namespace NAME \
    --nfs-server HOST \
    --nfs-path PATH \
    --kotsadm-registry REGISTRY_HOSTNAME \
    --kotsadm-namespace REGISTRY_NAMESPACE \
    --registry-username REGISTRY_USERNAME \
    --registry-password REGISTRY_PASSWORD
  ```

  Replace:
    - `NAME` with the namespace where the admin console is installed and running
    - `HOST` with the hostname or IP address of the NFS server
    - `PATH` with the path that is exported by the NFS server
    - `REGISTRY_HOSTNAME` with the registry endpoint where the images are hosted
    - `REGISTRY_NAMESPACE` with the registry namespace where the images are hosted
    - `REGISTRY_USERNAME` with the username to use to authenticate with the registry
    - `REGISTRY_PASSWORD` with the password to use to authenticate with the registry

  For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index) in _Reference_.

## Configure NFS Storage in the Admin Console

Alternatively, when the admin console and application are already installed, you can start in the admin console to install Velero and configure an NFS storage destination.

To install Velero and configure NFS storage for existing clusters:

1. From the admin console, click **Snapshots > Settings and Schedule**.

1. Click **Add a new storage destination**.

  The Add a new destination dialog opens and shows instructions for setting up Velero with different providers.

1. Click **NFS**.

  ![Snapshot Provider NFS](/images/snapshot-provider-nfs.png)

1. In the Configure NFS dialog, enter the NFS server hostname or IP Address, and the path that is exported by the NFS server. Click **Get instructions**.

  ![Snapshot Provider NFS Fields](/images/snapshot-provider-nfs-fields.png)

  A dialog opens with instructions on how to set up Velero with the specified NFS configuration.

1. Follow the steps in the dialog to install Velero and configure the storage destination.

  ![Snapshot Provider File System Instructions](/images/snapshot-provider-nfs-instructions.png)

1. Return to the admin console and either click **Check for Velero** or refresh the page to verify that the Velero installation is detected.

## Next Steps

* (Existing clusters only) Configure Velero namespace access if you are using minimal RBAC, and optionally increase the default memory limits. See [Configuring Namespace Access and Memory Limit](snapshots-velero-installing-config).
* Create or schedule backups. See [Creating and Scheduling Backups](snapshots-creating).

## Additional Resources

* [How to Set Up Backup Storage](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
