# Adding Nodes to Embedded Clusters

This topic describes how to add primary and secondary nodes to an embedded cluster (provisioned by the Replicated kURL installer) using the Replicated admin console.

## Overview of Adding Nodes

You can generate commands in the admin console to join additional primary and secondary nodes to an embedded cluster. Primary nodes run services that control the cluster. Secondary nodes run services that control the pods that host the application containers. Adding nodes can help manage resources to ensure that your application runs smoothly.

For high availability clusters, Kubernetes recommends using at least 3 primary nodes, and that you use an odd number of nodes to help with leader selection if machine or zone failure occurs. For more information, see [Creating Highly Available Clusters with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/) in the Kubernetes documentation.

## Join Primary and Secondary Nodes

To add primary and secondary nodes:

1. (Air gap only) Download and extract the `.tar.gz` bundle on the remote node before running the join command.
1. In the admin console, click **Cluster Management > Add a node**.
1. Copy the command that displays in the text box and run it on the node that you are joining to the cluster.

     ![Join node in admin console](/images/join-node.png)

     [View a larger image](/images/join-node.png)