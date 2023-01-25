import InstallerRequirements from "../partials/updating/_installerRequirements.mdx"
import UpgradePrompt from "../partials/updating/_upgradePrompt.mdx"

# Updating Kubernetes Installer Clusters

This topic describes how to upgrade the versions of Kubernetes, the Replicated app manager, and add-ons in a cluster created by the Replicated Kubernetes installer.

For more information about how the Kubernetes installer updates Kubernetes and add-ons, see [Upgrading](https://kurl.sh/docs/install-with-kurl/upgrading) in the kURL documentation.

## About Updating Kubernetes Installer Clusters {#overview}

You re-run the Kubernetes installer installation script to update the versions of Kubernetes, the app manager, and any additional add-ons running in your cluster. The installation script is the same command that you ran when you installed the application with the Kubernetes installer for the first time. For more information, see [Installing with the Kubernetes Installer](installing-embedded-cluster).

The application vendor uses a Kubernetes installer specification to specify the add-ons and the version of Kubernetes that are deployed to your cluster. When you re-run the installation script, the script uses this Kubernetes installer specification to determine if any updates are required. For example, if the specification indicates that the cluster must use Kubernetes version 1.25.x and your cluster is running version 1.24, then the script begins to upgrade Kubernetes on each node. 

For more information about how the installation script makes these updates to your cluster, see the sections below:
* [Updating Kubernetes](#kubernetes)
* [Updating Add-ons and the App Manager](#add-ons)

### Kubernetes Updates {#kubernetes}

The installation script automatically detects when the Kubernetes version in your cluster must be updated. When a Kubernetes upgrade is required, the script first prints a prompt: `Drain local node and apply upgrade?`. When you confirm the prompt, it drains and upgrades the local primary node where the script is running.

Then, if there are any remote primary nodes to upgrade, the script drains each sequentially and prints a command that you must run on the node to upgrade. For example, the command that that script prints might look like the following: `curl -sSL https://kurl.sh/supergoodtool/upgrade.sh | sudo bash -s hostname-check=master-node-2 kubernetes-version=v1.24.3`.

The script polls the status of each remote node until it detects that the Kubernetes upgrade is complete. Then, it uncordons the node and proceeds to cordon and drain the next node. This process ensures that only one node is cordoned at a time. After upgrading all primary nodes, the script performs the same operation sequentially on all remote secondary nodes.

The Kubernetes installer supports upgrading at most two minor versions of Kubernetes at a time. When upgrading two minor versions, the installation script first installs the skipped minor version before installing the desired version. For example, if you upgrade directly from Kubernetes 1.22 to 1.24, the script first completes the installation of 1.23 before installing 1.24.

### Add-ons and App Manager Updates {#add-ons}

If the application vendor updated any add-ons in the Kubernetes installer specification since the last time that you ran the installation script in your cluster, the script automatically updates the add-ons after completing any required Kubernetes upgrade.

The version of the KOTS add-on provided in the Kubernetes installer specification determines the version of the app manager installed in your cluster. For example, if the version of the app manager running in your cluster is 1.92.0, and the vendor updates the KOTS add-on in the Kubernetes installer specification to use 1.92.1, then the app manager version in your cluster is updated to 1.92.1 when you run the installation script.

The installation script never updates existing versions of Docker and containerd on the cluster.

For a complete list of add-ons that can be included in the Kubernetes installer specification, including the KOTS add-on, see [Add-ons](https://kurl.sh/docs/add-ons/antrea) in the kURL documentation.
## Update Kubernetes, the App Manager, and Add-ons

This section describes how to update Kubernetes, the app manager, and any add-ons in your cluster. It includes instructions for both online and air gap environments.

:::note
The Kubernetes scheduler automatically reschedules Pods to other nodes during maintenance. Any deployments or StatefulSets with a single replica experience downtime while being rescheduled.
:::
### Online Environments

To update the cluster in an online environment:

1. Run the installation script on any primary node in the cluster. The installation script is the same command that you ran when you installed the application with the Kubernetes installer for the first time. For more information, see [Installing with the Kubernetes Installer](installing-embedded-cluster).

   Consider the following requirements and recommendations before you run the script:

   <InstallerRequirements/>

1. If the script detects that the version of Kubernetes in your cluster must be upgraded, it prints a `Drain local node and apply upgrade?` prompt. Confirm the prompt to drain the local primary node and apply the Kubernetes upgrade to the control plane.

   The script continues to drain and upgrade nodes sequentially. For each node, the script prints a command that you must run on the node to upgrade Kubernetes. 

   After the Kubernetes upgrade on each node is complete, the script automatically updates any add-ons in your cluster.

   For more information about this update process, see [About Updating Kubernetes Installer Clusters](#overview) above.
   

### Air Gap Environments

For air gap installations, you must load images on each node in the cluster before you can run the installation script to update Kubernetes and any add-ons. This is because upgraded components might have Pods scheduled on any node in the cluster. 

To update the cluster in an air gap environment:

1. Download and extract the `.airgap` bundle to every node in the cluster.

1. Run the following script to ensure all required images are available:

   ```
   cat tasks.sh | sudo bash -s load-images
   ```

   :::note
   When you run the installation script in the next step, the script also performs a check for required images and prompts you to run the `load-images` command if any images are missing.
   :::

1. Run the installation script on any primary node in the cluster. The installation script is the same command that you ran when you installed the application with the Kubernetes installer for the first time. For more information, see [Installing with the Kubernetes Installer](installing-embedded-cluster).

   Consider the following requirements and recommendations before you run the script:

   <InstallerRequirements/>

1. <UpgradePrompt/>
