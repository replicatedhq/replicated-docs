import InstallVelero from "../partials/snapshots/_installVelero.mdx"
import RegistryCredNote from "../partials/snapshots/_registryCredentialsNote.mdx"
import ResticDaemonSet from "../partials/snapshots/_resticDaemonSet.mdx"

# Configuring a Host Path Storage Destination

This topic describes how to install Velero and configure a host path as your storage destination for backups.  

:::note
For existing or embedded clusters where Velero is already installed, you can update your storage destination in the admin console. For more information, see [Updating Settings in the Admin Console](snapshots-updating-with-admin-console).
:::

## Prerequisites

Complete the following items before you perform this task:

* Review the limitations and considerations. See [Limitations and Considerations](snapshots-config-workflow#limitations-and-considerations) in _How to Set Up Backup Storage_.
* Install the velero CLI. See [Installing the Velero CLI](snapshots-velero-cli-installing).
* The host path must be a dedicated directory. Do not use a partition used by a service like Docker or Kubernetes for ephemeral storage.
* The host path must exist and be writable by the user:group 1001:1001 on all nodes in the cluster. For example, in a Linux environment you might run `sudo chown -R 1001:1001 /backups` to change the user:group permissions.

   If you use a mounted directory for the storage destination, such as one that is created with the Common Internet File System (CIFS) or Server Message Block (SMB) protocols, ensure that you configure the user:group 1001:1001 permissions on all nodes in the cluster and from the server side as well.

   You cannot change the permissions of a mounted network shared filesystem from the client side. To reassign the user:group to 1001:1001 for a directory that is already mounted, you must remount the directory. For example, for a CIFS mounted directory, specify the `uid=1001,gid=1001` mount options in the CIFS mount command.

## Install Velero and Configure Host Path Storage in Online Environments

To install Velero and configure host path storage in online environments:

1. <InstallVelero/>

1. <ResticDaemonSet/>

1. Run the following command to configure the host path storage destination:

    ```
    kubectl kots velero configure-hostpath --namespace NAME --hostpath /PATH
    ```

    Replace:
      - `NAME` with the namespace where the admin console is installed and running
      - `PATH` with the path to the directory where the backups will be stored

    For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index) in _Reference_.

## Install Velero and Configure Host Path Storage in Air Gapped Environments

To install Velero and configure host path storage in air gapped environments:

1. <InstallVelero/>

     <RegistryCredNote/>

1. <ResticDaemonSet/>

1. Run the following command to configure the host path storage destination:

  ```
  kubectl kots velero configure-hostpath \
    --namespace NAME \
    --hostpath /PATH \
    --kotsadm-registry REGISTRY_HOSTNAME \
    --kotsadm-namespace REGISTRY_NAMESPACE \
    --registry-username REGISTRY_USERNAME \
    --registry-password REGISTRY_PASSWORD
  ```

  Replace:
    - `NAME` with the namespace where the admin console is installed and running
    - `PATH` with the path to the directory where the backups will be stored
    - `REGISTRY_HOSTNAME` with the registry endpoint where the images are hosted
    - `REGISTRY_NAMESPACE` with the registry namespace where the images are hosted
    - `REGISTRY_USERNAME` with the username to use to authenticate with the registry
    - `REGISTRY_PASSWORD` with the password to use to authenticate with the registry

  For more information about required storage destination flags, see [`velero`](/reference/kots-cli-velero-index) in _Reference_.

## Configure Host Path Storage in the Admin Console

Alternatively, when the admin console and application are already installed, you can start in the admin console to install Velero and configure a host path storage destination.

To install Velero and configure host path storage for existing clusters:

1. From the admin console, click **Snapshots > Settings and Schedule**.

1. Click **Add a new storage destination**.

  The Add a new destination dialog opens and shows instructions for setting up Velero with different providers.

1. Click **Host Path**.

  ![Snapshot Provider Host Path](/images/snapshot-provider-hostpath.png)

1. In the Configure Host Path dialog, enter the path to the directory where the backups will be stored. Click **Get instructions**.

  ![Snapshot Provider Host Path Fields](/images/snapshot-provider-hostpath-field.png)

  A dialog opens with instructions on how to set up Velero with the specified host path configuration.

1. Follow the steps in the dialog to install Velero and configure the storage destination.

  ![Snapshot Provider File System Instructions](/images/snapshot-provider-hostpath-instructions.png)

1. Return to the admin console and either click **Check for Velero** or refresh the page to verify that the Velero installation is detected.


## Next Steps

* (Existing clusters only) Configure Velero namespace access if you are using minimal RBAC, and optionally increase the default memory limits. See [Configuring Namespace Access and Memory Limit](snapshots-velero-installing-config).
* Create or schedule backups. See [Creating and Scheduling Backups](snapshots-creating).

## Additional Resources

* [How to Set Up Backup Storage](snapshots-understanding)
* [Troubleshooting Backup and Restore](snapshots-troubleshooting-backup-restore)
