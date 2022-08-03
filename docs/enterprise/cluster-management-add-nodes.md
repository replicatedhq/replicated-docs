# Adding Nodes to Kubernetes Installer Clusters

This topic describes how to add primary and secondary nodes to a Kubernetes installer provisioned cluster in the Replicated admin console.

## Overview of Adding Nodes

You can generate commands in the admin console to join additional primary and secondary nodes to a Kubernetes installer provisioned cluster. Primary nodes run services that control the cluster. Secondary nodes run services that control the pods that host the application containers. Adding nodes can help manage resources to ensure that your application runs smoothly.

For high availability clusters, Kubernetes recommends using at least 3 primary nodes, and that you use an odd number of nodes to help with leader selection if machine or zone failure occurs. For more information, see [Creating Highly Available Clusters with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/) in the Kubernetes documentation.

## Join Primary and Secondary Nodes

To add primary and secondary nodes:

1. (Air gap only) Download and extract the `.tar.gz` bundle on the remote node before running the join command.
1. In the admin console, click **Cluster Management > Add Node**.
1. Copy the command and run it on the node that you are joining to the cluster.

  **Example:**

  ```
  curl -sSL https://k8s.kurl.sh/my-test-app-unstable/join.sh | sudo bash -s \
  kubernetes-master-address=192.0.2.0:6443 \
  kubeadm-token=8z0hjv.s9wru9z \
  kubeadm-token-ca-hash=sha256:289f5c0d61775edec20d4e980602deeeeeeeeeeeeeeeeffffffffffggggggg \
  docker-registry-ip=198.51.100.3 \
  kubernetes-version=v1.19.16 \
  primary-host=203.0.113.6
  ```
