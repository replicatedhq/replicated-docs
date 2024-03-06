# Adding Nodes to kURL Clusters

This topic describes how to add primary and secondary nodes to an embedded cluster provisioned with Replicated kURL.

## Overview

You can generate commands in the admin console to join additional primary and secondary nodes to embedded kURL clusters. Primary nodes run services that control the cluster. Secondary nodes run services that control the pods that host the application containers. Adding nodes can help manage resources to ensure that the application runs smoothly.

For high availability clusters, Kubernetes recommends using at least three primary nodes, and that you use an odd number of nodes to help with leader selection if machine or zone failure occurs. For more information, see [Creating Highly Available Clusters with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/) in the Kubernetes documentation.

## Join Primary and Secondary Nodes

You can join primary and secondary nodes on the admin console **Cluster management** page.

To add primary and secondary nodes:

1. (Air Gap Only) For air gapped environments, download and extract the `.tar.gz` bundle on the remote node before running the join command.
1. In the admin console, click **Cluster Management > Add a node**.
1. Copy the command that displays in the text box and run it on the node that you are joining to the cluster.

     ![Join node in admin console](/images/join-node.png)

     [View a larger image](/images/join-node.png)