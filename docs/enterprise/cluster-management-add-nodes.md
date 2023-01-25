# Adding Nodes to Kubernetes Installer Clusters

This topic describes how to add primary and secondary nodes to a Kubernetes installer provisioned cluster in the Replicated admin console.

## Overview of Adding Nodes

The node where you first run the Kubernetes installer installation script is the primary node, which runs Kubernetes control-plane components including etcd. After you install, you can generate commands in the admin console to join additional primary and secondary nodes to your cluster.

Primary nodes run services that control the cluster. Secondary nodes run services that control the pods that host the application containers. Adding nodes can help manage resources to ensure that your application runs smoothly.

Adding additional nodes is also important for high availability. To ensure that your cluster has high availability, Kubernetes recommends that you use at least three primary nodes. Kubernetes also recommends that you use an odd number of nodes to help with leader selection if machine or zone failure occurs. For more information, see [Creating Highly Available Clusters with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/) in the Kubernetes documentation.

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
  labels=gpu=enabled,type=data
  ```

## About Using Dedicated Primary Nodes

After you add sufficient secondary nodes for the application to your cluster, you can taint primary nodes to prevent the Kubernetes scheduler from scheduling most pods on the primary nodes.

Tainting allows you to create _dedicated_ nodes, where the scheduler can only schedule certain pods on the tainted node. You define which pods can be scheduled on the node using _tolerations_. For more information about common use cases for taints and tolerations, see [Taints and Tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) in the Kubernetes documentation.

By default, the Kubernetes installer does not automatically taint primary nodes because many clusters, such as single-node clusters, must be capable of scheduling all pods. For more information about how to create dedicated primary nodes using tainting, see [Dedicated Primary](https://kurl.sh/docs/install-with-kurl/dedicated-primary) in the kURL documentation.
