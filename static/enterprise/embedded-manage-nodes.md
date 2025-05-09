# Manage Multi-Node Clusters with Embedded Cluster

This topic describes managing nodes in clusters created with Replicated Embedded Cluster, including how to add nodes and enable high-availability for multi-node clusters.

## Limitations

Multi-node clusters with Embedded Cluster have the following limitations:

* Support for multi-node clusters with Embedded Cluster is Beta. Only single-node embedded clusters are Generally Available (GA).

* High availability for Embedded Cluster in an Alpha feature. This feature is subject to change, including breaking changes. For more information about this feature, reach out to Alex Parker at [alexp@replicated.com](mailto:alexp@replicated.com).

* The same Embedded Cluster data directory used at installation is used for all nodes joined to the cluster. This is either the default `/var/lib/embedded-cluster` directory or the directory set with the [`--data-dir`](/reference/embedded-cluster-install#flags) flag. You cannot choose a different data directory for Embedded Cluster when joining nodes.

* More than one controller node should not be joined at the same time. When joining a controller node, a warning is printed that explains that the user should not attempt to join another node until the controller node joins successfully.

## Add Nodes to a Cluster (Beta) {#add-nodes}

You can add nodes to create a multi-node cluster in online (internet-connected) and air-gapped (limited or no outbound internet access) environments. The Admin Console provides the join command that you use to join nodes to the cluster.

:::note
Multi-node clusters are not highly available by default. For information about enabling high availability, see [Enable High Availability for Multi-Node Clusters (Alpha)](#ha) below.
:::

To add nodes to a cluster:

1. (Optional) In the Embedded Cluster Config, configure the `roles` key to customize node roles. For more information, see [roles](/reference/embedded-config#roles) in _Embedded Cluster Config_. When you are done, create and promote a new release with the updated Config.

1. Do one of the following to get the join command from the Admin Console:

   1. To add nodes during the application installation process, follow the steps in [Online Installation with Embedded Cluster](/enterprise/installing-embedded) or [Air Gap Installation with Embedded Cluster](/enterprise/installing-embedded-air-gap) to install. A **Nodes** screen is displayed as part of the installation flow in the Admin Console that allows you to choose a node role and copy the relevant join command.

   1. Otherwise, if you have already installed the application:

         1. Log in to the Admin Console.
         
         1. If you promoted a new release that configures the `roles` key in the Embedded Cluster Config, update the instance to the new version. See [Perform Updates in Embedded Clusters](/enterprise/updating-embedded).
         
         1. Go to **Cluster Management > Add node** at the top of the page.

            <img alt="Add node page in the Admin Console" src="/images/admin-console-add-node.png" width="600px"/>

            [View a larger version of this image](/images/admin-console-add-node.png)
   
1. Either on the Admin Console **Nodes** screen that is displayed during installation or in the **Add a Node** dialog, select one or more roles for the new node that you will join. Copy the join command.

     Note the following:

     * If the Embedded Cluster Config [roles](/reference/embedded-config#roles) key is not configured, all new nodes joined to the cluster are assigned the `controller` role by default. The `controller` role designates nodes that run the Kubernetes control plane. Controller nodes can also run other workloads, such as application or Replicated KOTS workloads.

     * Roles are not updated or changed after a node is added. If you need to change a node's role, reset the node and add it again with the new role.

     * For multi-node clusters with high availability (HA), at least three `controller` nodes are required. You can assign both the `controller` role and one or more `custom` roles to the same node. For more information about creating HA clusters with Embedded Cluster, see [Enable High Availability for Multi-Node Clusters (Alpha)](#ha) below.

     * To add non-controller or _worker_ nodes that do not run the Kubernetes control plane, select one or more `custom` roles for the node and deselect the `controller` role.

1. Do one of the following to make the Embedded Cluster installation assets available on the machine that you will join to the cluster:

    * **For online (internet-connected) installations**: SSH onto the machine that you will join. Then, use the same commands that you ran during installation to download and untar the Embedded Cluster installation assets on the machine. See [Online Installation with Embedded Cluster](/enterprise/installing-embedded).

    * **For air gap installations with limited or no outbound internet access**: On a machine that has internet access, download the Embedded Cluster installation assets (including the air gap bundle) using the same command that you ran during installation. See [Air Gap Installation with Embedded Cluster](/enterprise/installing-embedded-air-gap). Then, move the downloaded assets to the air-gapped machine that you will join, and untar. 

    :::important
    The Embedded Cluster installation assets on each node must all be the same version. If you use a different version than what is installed elsewhere in the cluster, the cluster will not be stable. To download a specific version of the Embedded Cluster assets, select a version in the **Embedded cluster install instructions** dialog.
    :::

1. On the machine that you will join to the cluster, run the join command that you copied from the Admin Console.

    **Example:**

    ```bash
    sudo ./APP_SLUG join 10.128.0.32:30000 TxXboDstBAamXaPdleSK7Lid
    ```
    **Air Gap Example:**

    ```bash
    sudo ./APP_SLUG join --airgap-bundle APP_SLUG.airgap 10.128.0.32:30000 TxXboDstBAamXaPdleSK7Lid
    ```

1. In the Admin Console, either on the installation **Nodes** screen or on the **Cluster Management** page, verify that the node appears. Wait for the node's status to change to Ready.

1. Repeat these steps for each node you want to add.    

## Enable High Availability for Multi-Node Clusters (Alpha) {#ha}

Multi-node clusters are not highly available by default. The first node of the cluster is special and holds important data for Kubernetes and KOTS, such that the loss of this node would be catastrophic for the cluster. Enabling high availability (HA) requires that at least three controller nodes are present in the cluster. Users can enable HA when joining the third node.

:::important
High availability for Embedded Cluster in an Alpha feature. This feature is subject to change, including breaking changes. For more information about this feature, reach out to Alex Parker at [alexp@replicated.com](mailto:alexp@replicated.com).
:::

### HA Architecture

The following diagram shows the architecture of an HA multi-node Embedded Cluster installation:

![Embedded Cluster multi-node architecture with high availability](/images/embedded-architecture-multi-node-ha.png)

[View a larger version of this image](/images/embedded-architecture-multi-node-ha.png)

As shown in the diagram above, in HA installations with Embedded Cluster:
* A single replica of the Embedded Cluster Operator is deployed and runs on a controller node.
* A single replica of the KOTS Admin Console is deployed and runs on a controller node.
* Three replicas of rqlite are deployed in the kotsadm namespace. Rqlite is used by KOTS to store information such as support bundles, version history, application metadata, and other small amounts of data needed to manage the application.
* For installations that include disaster recovery, the Velero pod is deployed on one node. The Velero Node Agent runs on each node in the cluster. The Node Agent is a Kubernetes DaemonSet that performs backup and restore tasks such as creating snapshots and transferring data during restores.
* For air gap installations, two replicas of the air gap image registry are deployed.

Any Helm [`extensions`](/reference/embedded-config#extensions) that you include in the Embedded Cluster Config are installed in the cluster depending on the given chart and whether or not it is configured to be deployed with high availability.

For more information about the Embedded Cluster built-in extensions, see [Built-In Extensions](/vendor/embedded-overview#built-in-extensions) in _Embedded Cluster Overview_.

### Requirements

Enabling high availability has the following requirements:

* High availability is supported with Embedded Cluster 1.4.1 or later.

* High availability is supported only for clusters where at least three nodes with the `controller` role are present.

### Limitations

Enabling high availability has the following limitations:

* High availability for Embedded Cluster in an Alpha feature. This feature is subject to change, including breaking changes. For more information about this feature, reach out to Alex Parker at [alexp@replicated.com](mailto:alexp@replicated.com).

* The `--enable-ha` flag serves as a feature flag during the Alpha phase. In the future, the prompt about migrating to high availability will display automatically if the cluster is not yet HA and you are adding the third or more controller node. 

* HA multi-node clusters use rqlite to store support bundles up to 100 MB in size. Bundles over 100 MB can cause rqlite to crash and restart.

### Best Practices for High Availability

Consider the following best practices and recommendations for creating HA clusters:

* At least three _controller_ nodes that run the Kubernetes control plane are required for HA. This is because clusters use a quorum system, in which more than half the nodes must be up and reachable. In clusters with three controller nodes, the Kubernetes control plane can continue to operate if one node fails because a quorum can still be reached by the remaining two nodes. By default, with Embedded Cluster, all new nodes added to a cluster are controller nodes. For information about customizing the `controller` node role, see [roles](/reference/embedded-config#roles) in _Embedded Cluster Config_.

* Always use an odd number of controller nodes in HA clusters. Using an odd number of controller nodes ensures that the cluster can make decisions efficiently with quorum calculations. Clusters with an odd number of controller nodes also avoid split-brain scenarios where the cluster runs as two, independent groups of nodes, resulting in inconsistencies and conflicts.

* You can have any number of _worker_ nodes in HA clusters. Worker nodes do not run the Kubernetes control plane, but can run workloads such as application or Replicated KOTS workloads.

### Create a Multi-Node HA Cluster

To create a multi-node HA cluster:

1. Set up a cluster with at least two controller nodes. You can do an online (internet-connected) or air gap installation. For more information, see [Online Installation with Embedded Cluster](/enterprise/installing-embedded) or [Air Gap Installation with Embedded Cluster](/enterprise/installing-embedded-air-gap).

1. SSH onto a third node that you want to join to the cluster as a controller.

1. Run the join command provided in the Admin Console **Cluster Management** tab and pass the `--enable-ha` flag. For example:

     ```bash
     sudo ./APP_SLUG join --enable-ha 10.128.0.80:30000 tI13KUWITdIerfdMcWTA4Hpf
     ```

1. After the third node joins the cluster, type `y` in response to the prompt asking if you want to enable high availability.

    ![high availability command line prompt](/images/embedded-cluster-ha-prompt.png)
    [View a larger version of this image](/images/embedded-cluster-ha-prompt.png)

1. Wait for the migration to complete.