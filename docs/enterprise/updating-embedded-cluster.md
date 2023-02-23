import InstallerRequirements from "../partials/updating/_installerRequirements.mdx"
import UpgradePrompt from "../partials/updating/_upgradePrompt.mdx"

# Updating Kubernetes Installer Clusters

This topic describes how to upgrade the versions of Kubernetes, the Replicated app manager, and add-ons in a cluster created by the Replicated Kubernetes installer.

## About Updating Clusters 

The application vendor uses a Kubernetes installer specification to specify the add-ons and the version of Kubernetes that are deployed to your cluster. You use the Kubernetes installer installation script to update your cluster based on the versions listed in this installer specification file.

For more information about how the script updates the versions of Kubernetes, the app manager, and any additional add-ons running in your cluster, see the following sections:
* [Kubernetes Updates](#kubernetes)
* [Multi-version Kubernetes Updates](#kubernetes)
* [Add-ons and App Manager Updates](#add-ons)

### Kubernetes Updates {#kubernetes}

The installation script automatically detects when the Kubernetes version in your cluster must be updated. When a Kubernetes upgrade is required, the script first prints a prompt: `Drain local node and apply upgrade?`. When you confirm the prompt, it drains and upgrades the local primary node where the script is running.

Then, if there are any remote primary nodes to upgrade, the script drains each sequentially and prints a command that you must run on the node to upgrade. For example, the command that that script prints might look like the following: `curl -sSL https://kurl.sh/myapp/upgrade.sh | sudo bash -s hostname-check=master-node-2 kubernetes-version=v1.24.3`.

The script polls the status of each remote node until it detects that the Kubernetes upgrade is complete. Then, it uncordons the node and proceeds to cordon and drain the next node. This process ensures that only one node is cordoned at a time. After upgrading all primary nodes, the script performs the same operation sequentially on all remote secondary nodes.

### Multi-version Kubernetes Updates {#kubernetes-multi}

The Kubernetes installer supports upgrading at most two minor versions of Kubernetes at a time. When upgrading two minor versions, the installation script first installs the skipped minor version before installing the desired version. For example, if you upgrade directly from Kubernetes 1.22 to 1.24, the script first completes the installation of 1.23 before installing 1.24. 

If the script detects that the version of Kubernetes in your cluster is more than two minor versions earlier than the target version, it prints an error message like the following:

```
The currently installed kubernetes version is 1.23.16. The requested version to upgrade to is 1.26.0. Kurl can only be upgraded two minor versions at time. Please install 1.25.x. first.
```

### Add-ons and App Manager Updates {#add-ons}

If the application vendor updated any add-ons in the Kubernetes installer specification since the last time that you ran the installation script in your cluster, the script automatically updates the add-ons after completing any required Kubernetes upgrade.

The version of the KOTS add-on provided in the Kubernetes installer specification determines the version of the app manager installed in your cluster. For example, if the version of the app manager running in your cluster is 1.92.0, and the vendor updates the KOTS add-on in the Kubernetes installer specification to use 1.92.1, then the app manager version in your cluster is updated to 1.92.1 when you run the installation script.

The installation script never updates existing versions of Docker and containerd on the cluster.

For a complete list of add-ons that can be included in the Kubernetes installer specification, including the KOTS add-on, see [Add-ons](https://kurl.sh/docs/add-ons/antrea) in the kURL documentation.

### Application Updates

You can also update the version of your application at the same time that you update your cluster.

## Update

This section includes procedures for updating Kubernetes installer clusters in online and air gapped environments. It also lists important requirements and considerations before you update.

### Requirements and Considerations

Review the following requirements and recommendations before you attempt to update the cluster:

<InstallerRequirements/>

### Online Environments

To update the cluster in an online environment:

1. Run the Kubernetes installer script on any primary node in the cluster:

   ```
   curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash -s ADVANCED_OPTIONS
   ```
   Replace:
   * `APP_SLUG` with the unique slug for the application from your application vendor.
   * `ADVANCED_OPTIONS` with the flags for any desired advanced options. For a complete list of the available installation flags, see [Advanced Options](https://kurl.sh/docs/install-with-kurl/advanced-options) in the kURL documentation.

     :::note
     To use no advanced installation options, remove `-s ADVANCED_OPTIONS` from the command. 
     :::

1. <UpgradePrompt/>

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

1. Run the Kubernetes installer script on any primary node in the cluster:

   ```
   curl -sSL https://k8s.kurl.sh/APP_SLUG | sudo bash -s airgap OTHER_ADVANCED_OPTIONS
   ```
   Replace:
   * `APP_SLUG` with the unique slug for the application from your application vendor.
   * `OTHER_ADVANCED_OPTIONS` with the flags for any desired advanced options. For a complete list of the available installation flags, see [Advanced Options](https://kurl.sh/docs/install-with-kurl/advanced-options) in the kURL documentation.

1. <UpgradePrompt/>
