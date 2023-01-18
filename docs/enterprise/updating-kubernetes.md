# Updating Kubernetes and Add-ons

This topic describes how to upgrade both the version of Kubernetes and any add-ons in a cluster created by the Replicated Kubernetes installer.

For more information about Kubernetes installer add-ons, see [Add-ons](https://kurl.sh/docs/add-ons/antrea) in the open source kURL documentation.

## How the Kubernetes Installer Updates Kubernetes and Add-ons {#overview}

When your application vendor updates the version of Kubernetes or any add-ons in the specification for the Kubernetes installer, you can re-run the Kubernetes installer installation script to update your cluster with the latest changes. The installation script is the same command that you ran when you installed the application with the Kubernetes installer for the first time. For more information, see [Installing with the Kubernetes Installer](installing-embedded-cluster).

The installation script automatically detects when the Kubernetes version in your cluster must be updated. When a Kubernetes upgrade is required, the script first drains and upgrades the local primary node where the script is running. Then, if there are any remote primary nodes to upgrade, the script drains each sequentially and prints a command that you must run on the node to upgrade.

The script polls the status of each remote node until it detects that the Kubernetes upgrade is complete. Then, it uncordons the node and proceeds to cordon and drain the next node. This process ensures that only one node is cordoned at a time. After upgrading all primary nodes, the script performs the same operation sequentially on all remote secondary nodes.

If the application vendor updated any add-ons in the Kubernetes installer specification, then the script automatically updates the add-ons in the cluster after any required Kubernetes update is complete.

For more information about how the Kubernetes installer updates Kubernetes and add-ons, see [Upgrading](https://kurl.sh/docs/install-with-kurl/upgrading) in the kURL documentation.

## Notes and Limitations

Consider the following notes and limitations before you update Kubernetes and add-ons in your cluster:

* The Kubernetes installer supports upgrading at most two minor versions of Kubernetes at a time. When upgrading two minor versions, the Kubernetes installer first installs the skipped minor version before installing the desired version. For example, if you upgrade directly from Kubernetes 1.22 to 1.24, the Kubernetes installer first completes the installation of 1.23 before installing 1.24.
* The Kubernetes scheduler automatically reschedules Pods to other nodes during maintenance. Any deployments or StatefulSets with a single replica experience downtime while being rescheduled.
* Existing versions of docker and containerd on the cluster are never upgraded by the installation script.

## Update Kubernetes and Add-ons

This section describes how to update Kubernetes and add-ons in online and air gap environments.

### Online Environments

To update Kubernetes and add-ons in an online environment:

1. Run the installation script on any primary node in the cluster. The installation script is the same command that you ran when you installed the application with the Kubernetes installer for the first time. For more information, see [Installing with the Kubernetes Installer](installing-embedded-cluster).

    **Example**

    ```
    curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash
    ```

1. If the script detects that the version of Kubernetes in your cluster must be upgraded, it prints a `Drain local node and apply upgrade?` prompt. Confirm the prompt to drain the local primary node and apply the Kubernetes upgrade to the control plane.

   The script continues to drain and upgrade nodes sequentially. For each node, the script prints a command that you must run on the node to upgrade Kubernetes. 

   **Example**

   ```
   curl -sSL https://kurl.sh/APP_SLUG/upgrade.sh | sudo bash -s hostname-check=master-node-2 kubernetes-version=v1.24.3
   ```

   After the Kubernetes upgrade on each node is complete, the script automatically updates any add-ons in your cluster.

   For more information about this update process, see [How the Kubernetes Installer Updates Kubernetes and Add-ons](#overview) above.
   

### Air Gap Environments

For air gap installations, you must load images on each node in the cluster before you can run the installation script to update Kubernetes and add-ons. This is because upgraded components might have Pods scheduled on any node in the cluster. 

To update Kubernetes and add-ons in an air gap environment:

1. Download and extract the `.airgap` bundle to every node in the cluster.

1. Run the following script to ensure all required images are available:

   ```
   cat tasks.sh | sudo bash -s load-images
   ```

   :::note
   When you run the installation script in the next step, the script also performs a check for required images and prompts you to run the `load-images` command if any images are missing.
   :::

1. Run the installation script to update Kubernetes and add-ons in the cluster. The installation script is the same command that you ran when you installed the application with the Kubernetes installer for the first time. For more information, see [Installing with the Kubernetes Installer](installing-embedded-cluster).

   **Example**

   ```
   cat install.sh | sudo bash -s airgap
   ```

1. If the script detects that the version of Kubernetes in your cluster must be upgraded, it prints a `Drain local node and apply upgrade?` prompt. Confirm the prompt to drain the local primary node and apply the upgrade to the control plane. 

    The script continues to drain and upgrade nodes sequentially. For each node, the script prints a command that you must run on the node to upgrade Kubernetes. 

   **Example**

   ```
   curl -sSL https://kurl.sh/APP_SLUG/upgrade.sh | sudo bash -s hostname-check=master-node-2 kubernetes-version=v1.24.3
   ```

   After the Kubernetes upgrade on each node is complete, the script automatically updates any add-ons in your cluster.

   For more information about this update process, see [How the Kubernetes Installer Updates Kubernetes and Add-ons](#overview) above.