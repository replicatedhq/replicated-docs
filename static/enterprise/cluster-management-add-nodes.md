# Add Nodes to kURL Clusters

:::note
Replicated kURL is available only for existing customers. If you are not an existing kURL user, use Replicated Embedded Cluster instead. For more information, see [Use Embedded Cluster](/vendor/embedded-overview).

kURL is a Generally Available (GA) product for existing customers. For more information about the Replicated product lifecycle phases, see [Support Lifecycle Policy](/vendor/policies-support-lifecycle).
:::

This topic describes how to add primary and secondary nodes to a Replicated kURL cluster.

## Overview

You can generate commands in the Replicated KOTS Admin Console to join additional primary and secondary nodes to kURL clusters. Primary nodes run services that control the cluster. Secondary nodes run services that control the pods that host the application containers. Adding nodes can help manage resources to ensure that the application runs smoothly.

For high availability clusters, Kubernetes recommends using at least three primary nodes, and that you use an odd number of nodes to help with leader selection if machine or zone failure occurs. For more information, see [Creating Highly Available Clusters with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/) in the Kubernetes documentation.

## Join Primary and Secondary Nodes

You can join primary and secondary nodes on the Admin Console **Cluster management** page.

To add primary and secondary nodes:

1. (Air Gap Only) For air gapped environments, download and extract the `.tar.gz` bundle on the remote node before running the join command.
1. In the Admin Console, click **Cluster Management > Add a node**.
1. Copy the command that displays in the text box and run it on the node that you are joining to the cluster.

     ![Join node in Admin Console](/images/join-node.png)

     [View a larger image](/images/join-node.png)