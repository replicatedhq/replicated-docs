# Updating Kubernetes Installers

This topic describes how to manage and update Kubernetes installers.

## About Updating Clusters 

The application vendor uses a Kubernetes installer specification to specify the add-ons and the version of Kubernetes that are deployed to your cluster. When you rerun the installation script, the script uses this Kubernetes installer specification to determine if any updates are required. For example, if the specification indicates that the cluster must use Kubernetes version 1.25.x and your cluster is running version 1.24, then the script begins to upgrade Kubernetes on each node. 

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


