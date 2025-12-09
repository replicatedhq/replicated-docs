import Prerequisites from "../partials/cmx/_prerequisites.mdx"

# Use CMX Clusters

This topic describes how to use Replicated Compatibility Matrix (CMX) to create and manage ephemeral clusters to test your applications across different Kubernetes distributions and versions.

This topic includes information about creating and managing clusters with CMX using the Replicated Vendor Portal or the Replicated CLI. For information about creating and managing clusters with the Vendor API v3, see the [clusters](https://replicated-vendor-api.readme.io/reference/listclusterusage) section in the Vendor API v3 documentation.

## About CMX Clusters

CMX supports both VM-based clusters (such as kind, k3s, RKE2, OpenShift, and Embedded Cluster) and cloud-managed clusters (such as EKS, GKE, and AKS). VM-based clusters run on Replicated bare metal servers, while cloud clusters are provisioned in Replicated-managed cloud accounts for faster delivery.

You can use CMX clusters for testing and troubleshooting Kubernetes-based deployments and Helm installations for your application.

For information about creating VMs with CMX to test Replicated Embedded Cluster installers or when you need full OS control, see [CMX VMs](cmx-vms).

For information about using the `cluster prepare` command to streamline development workflows, see [Develop with CMX](cmx-develop).

## Limitations

CMX has the following limitations:

- Clusters cannot be resized. Create another cluster if you want to make changes, such as add another node.
- Clusters cannot be rebooted. Create another cluster if you need to reset/reboot the cluster. 
- On cloud clusters, node groups are not available for every distribution. For distribution-specific details, see [Supported CMX Cluster Types](/vendor/testing-supported-clusters).
- Multi-node support is not available for every distribution. For distribution-specific details, see [Supported CMX Cluster Types](/vendor/testing-supported-clusters).
- ARM instance types are only supported on Cloud Clusters. For distribution-specific details, see [Supported CMX Cluster Types](/vendor/testing-supported-clusters).
- GPU instance types are only supported on Cloud Clusters. For distribution-specific details, see [Supported CMX Cluster Types](/vendor/testing-supported-clusters).
- There is no support for IPv6 as a single stack. Dual stack support is available on kind clusters.
- The `cluster upgrade` feature is available only for kURL distributions. See [cluster upgrade](/reference/replicated-cli-cluster-upgrade).
- Cloud clusters do not allow for the configuration of CNI, CSI, CRI, Ingress, or other plugins, add-ons, services, and interfaces.
- The node operating systems for clusters created with CMX cannot be configured nor replaced with different operating systems.
- The Kubernetes scheduler for clusters created with CMX cannot be replaced with a different scheduler.
- Each team has a quota limit on the amount of resources that can be used simultaneously. This limit can be raised by messaging your account representative.
- Team actions with CMX (for example, creating and deleting clusters and requesting quota increases) are not logged and displayed in the [Vendor Team Audit Log](https://vendor.replicated.com/team/audit-log). 

For additional distribution-specific limitations, see [Supported CMX Cluster Types](testing-supported-clusters).

## Prerequisites

Before you can use CMX clusters, you must complete the following prerequisites:

<Prerequisites/>

* Existing accounts must accept the TOS for the trial on the [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix) page in the Replicated Vendor Portal.

## Create Clusters

You can create clusters with CMX using the Replicated CLI or the Vendor Portal.

### With the Replicated CLI

To create a cluster using the Replicated CLI:

1. (Optional) View the available cluster distributions, including the supported Kubernetes versions, instance types, and maximum nodes for each distribution:

   ```bash
   replicated cluster versions
   ```
   For command usage, see [cluster versions](/reference/replicated-cli-cluster-versions).

1. Run the following command to create a cluster:


   ```bash
   replicated cluster create --distribution DISTRIBUTION
   ```

   To specify more options:

   ```bash
   replicated cluster create --name NAME --distribution K8S_DISTRO --version K8S_VERSION --disk DISK_SIZE --instance-type INSTANCE_TYPE [--license-id LICENSE_ID]
   ```
   Where:
   * `NAME` is any name for the cluster. If `--name` is excluded, a name is automatically generated for the cluster.
   * `K8S_DISTRO` is the Kubernetes distribution for the cluster.
   * `K8S_VERSION` is the Kubernetes version for the cluster if creating a standard Cloud or VM-based cluster. If creating an Embedded Cluster or kURL cluster type,`--version` is optional:
      * For Embedded Cluster types, `--verison` is the latest available release on the channel by default. Otherwise, to specify a different release, set `--version` to the `Channel release sequence` value for the release.  
      * For kURL cluster types, `--verison` is the `"latest"` kURL Installer ID by default.  Otherwise, to specify a different kURL Installer, set `--version` to the kURL Installer ID. 
   * `DISK_SIZE` is the disk size (GiB) to request per node.
   * `INSTANCE_TYPE` is the instance type to use for each node.
   * (Embedded Cluster Only) `LICENSE_ID` is a valid customer license. Required to create an Embedded Cluster.

   For command usage and additional optional flags, see [cluster create](/reference/replicated-cli-cluster-create).

   **Example:**

   The following example creates a kind cluster with Kubernetes version 1.27.0, a disk size of 100 GiB, and an instance type of `r1.small`. 

   ```bash
   replicated cluster create --name kind-example --distribution kind --version 1.27.0 --disk 100 --instance-type r1.small
   ```

1. Verify that the cluster was created:

   ```bash
   replicated cluster ls CLUSTER_NAME
   ```
   Where `CLUSTER_NAME` is the name of the cluster that you created.

   In the output of the command, you can see that the `STATUS` of the cluster is `assigned`. When the kubeconfig for the cluster is accessible, the cluster's status is changed to `running`.

### Vendor Portal

To create a cluster using the Vendor Portal:

1. Go to [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix/create-cluster).

1. Click **Create > Create Kubernetes cluster**.

    <img alt="Create a cluster page" src="/images/create-a-cluster.png" width="650px"/>

    [View a larger version of this image](/images/create-a-cluster.png)

1. On the **Create a Kubernetes cluster** page, complete the following fields:

   <table>
     <tr>
       <th>Field</th>
       <th>Description</th>
     </tr>
     <tr>
       <td>Kubernetes distribution</td>
       <td>Select the Kubernetes distribution for the cluster.</td>
     </tr>
     <tr>
       <td>Version</td>
       <td>Select the Kubernetes version for the cluster. The options available are specific to the distribution selected.</td>
     </tr>
     <tr>
       <td>Name (optional)</td>
       <td>Enter an optional name for the cluster.</td>
     </tr>
     <tr>
       <td>Tags</td>
       <td>Add one or more tags to the cluster as key-value pairs.</td>
     </tr>
     <tr>
       <td>Set TTL</td>
       <td>Select the Time to Live (TTL) for the cluster. When the TTL expires, the cluster is automatically deleted. TTL can be adjusted after cluster creation with [cluster update ttl](/reference/replicated-cli-cluster-update-ttl).</td>
     </tr>
   </table>  

1. For **Nodes & Nodes Groups**, complete the following fields to configure nodes and node groups for the cluster:

   <table>
   <tr>
       <td>Instance type</td>
       <td>Select the instance type to use for the nodes in the node group. The options available are specific to the distribution selected.</td>
     </tr>   
     <tr>
       <td>Disk size</td>
       <td>Select the disk size in GiB to use per node.</td>
     </tr>
     <tr>
       <td>Nodes</td>
       <td>Select the number of nodes to provision in the node group. The options available are specific to the distribution selected.</td>
     </tr>  
   </table>

1. (Optional) Click **Add node group** to add additional node groups.

1. Click **Create cluster**.

   The cluster is displayed in the list of clusters on the **Compatibility Matrix** page with a status of Assigned. When the kubeconfig for the cluster is accessible, the cluster's status is changed to Running.

   :::note
   If the cluster is not automatically displayed, refresh your browser window.
   :::

   <img alt="Cluster configuration dialog" src="/images/cmx-assigned-cluster.png" width="700px"/>

   [View a larger version of this image](/images/cmx-assigned-cluster.png)

## Create Air Gap Clusters (Beta)

For any VM-based cluster distributions, you can create a cluster that uses an air-gapped network by setting the network policy to `airgap`.

For more information, see [Test in Air Gap Environments](cmx-airgap).

To set the network policy of a VM-based cluster to `airgap`:

1. Create a cluster:

   ```bash
   replicated cluster create --distribution VM_BASED_DISTRIBUTION
   ```
   Where `VM_BASED_DISTRIBUTION` is the target VM-based cluster distribution. For a list of supported distributions, see [VM-Based Clusters](/vendor/testing-supported-clusters#vm-based-clusters).

1. Change the network policy to `airgap`:

   ```bash
   replicated network update NETWORK_ID --policy airgap
   ```
   Where `NETWORK_ID` is the ID of the network from the output of the `cluster ls` command.

## Prepare Clusters

For information about using the `cluster prepare` command to streamline development workflows, see [Develop with CMX](cmx-develop).

## Access Clusters

## Access Clusters

For information about accessing clusters to interact with kubectl, see [Access Clusters](/vendor/cmx-develop#access-clusters) in _Develop with CMX_.

## Upgrade Clusters (kURL Only)

For information about upgrading kURL clusters, see [Upgrade Clusters (kURL Only)](/vendor/cmx-develop#upgrade-clusters-kurl-only) in _Develop with CMX_.

## Delete Clusters

For information about deleting clusters, see [Delete Clusters](/vendor/cmx-develop#delete-clusters) in _Develop with CMX_. 