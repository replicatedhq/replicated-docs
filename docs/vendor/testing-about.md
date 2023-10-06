# About the Compatibility Matrix (Beta)

This topic describes the Replicated compatibility matrix feature and use cases for testing applications in customer-representative environments.

:::note
The compatibility matrix add-on is Beta. The features, limitations, and requirements of the compatibility matrix are subject to change. As the compatiblity matrix add-on progresses towards general availability, many of its limitations will be removed.
:::

## Overview

The Replicated compatibility matrix quickly provisions ephemeral clusters of different Kubernetes distributions and versions, such as OpenShift, EKS, and Replicated kURL clusters. You can use the compatibility matrix to get access to customer-representative environments within minutes or less. This allows you to more easily test your application for compatability with a range of different environments before releasing to customers.

Example use cases for the compatiblity matrix include:
* Get access to a cluster to develop on and quickly test changes.
* Reproduce a reported issue on a customer-representative environment for troubleshooting.
* Run tests before releasing a new version of your application to validate compatibility with supported distributions.

You can use the compatibility matrix with the replicated CLI or the Replicated vendor portal. For more information about how to use the compatibility matrix, see [Using the Compatibility Matrix](testing-how-to).

## Supported Clusters and Kubernetes Versions

The compatibility matrix can create clusters on VMs, such as kind, k3s, and Red Hat OpenShift OKD, and also create cloud-managed clusters, such as EKS and GKE.

* Cloud-based Kubernetes distributions are run in a Replicated managed and controlled cloud account to optimize and deliver a clusters quickly and reliably. The Replicated account has control planes ready and adds a node group when you request it, making the cluster available much faster than if you try to create your own cluster with your own cloud account.

* Virtual machines (VMs) run on Replicated bare metal servers located in several data centers, including data centers physically in the European Union.

For a complete list of supported clusters, Kubernetes versions, and the Kubernetes support policy, see [Supported Compatibility Matrix Cluster Types (Beta)](testing-supported-clusters).

## Billing and Credits

Clusters created with the compatiblity matrix are billed by the minute. Per-minute billing begins when the cluster reaches a Ready state and ends when the cluster is deleted. The compatibility matrix marks a cluster as ready when a working kubeconfig for the cluster is accessible.

You are billed only for the time that the cluster is in a Ready state. You are not billed for the time that it takes the compatibility matrix to create and tear down clusters.

To create clusters with the compatibility matrix, you must have credits in your vendor portal account. 
To request credits, log in to the vendor portal and go to [Compatibility Matrix > Request more credits](https://vendor.replicated.com/compatibility-matrix).

## Limitations

The compatibility matrix has the following limitations:

- Clusters cannot be resized. Create another cluster if you want to make changes, such as add another node.
- On cloud clusters, only one node group per cluster is supported.
- Multi-node support is available only for GKE and EKS.
- There is no support for IPv6.
- The `cluster upgrade` feature is available only for kURL distributions. See [cluster upgrade](/reference/replicated-cli-cluster-upgrade).
- Clusters have a maximum Time To Live (TTL) of 48 hours. See [Setting TTL](#setting-ttl) below.
- Cloud clusters do not allow for the configuration of CNI, CSI, CRI, Ingress, or other plugins, add-ons, services, and interfaces.
- The node operating systems for clusters created with the compatibility matrix cannot be configured nor replaced with different operating systems.
- The Kubernetes scheduler for clusters created with the compatibility matrix cannot be replaced with a different scheduler.
- Each team has a quota limit on the amount of resources that can be used simultaneously. This limit can be raised by messaging your account representative.

For additional distribution-specific limitations, see [Supported Compatibility Matrix Cluster Types (Beta)](testing-supported-clusters).
