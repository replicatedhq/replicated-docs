# About the Compatibility Matrix (Beta)

This topic describes the Replicated compatibility matrix add-on, including limitations and billing details.

## Overview

The Replicated compatibility matrix quickly provisions ephemeral clusters of different Kubernetes distributions and versions, such as OpenShift, EKS, and Replicated kURL clusters. You can use the compatibility matrix to get access to customer-representative environments within minutes or less. This allows you to more easily test your application for compatability with a range of different environments before releasing to customers.

Example use cases for the compatiblity matrix include:
- Get access to a cluster to develop on and quickly test changes.
- Reproduce a reported issue on a customer-representative environment for troubleshooting.
- Run tests before releasing a new version of your application to validate compatibility with supported distributions.

You can use the compatibility matrix with the replicated CLI or the Replicated vendor portal. For more information about how to use the compatibility matrix, see [Using the Compatibility Matrix](testing-how-to).

## Limitations

:::note
The compatibility matrix add-on is Beta. The features, limitations, and requirements of the compatibility matrix are subject to change. As the compatiblity matrix add-on progresses towards general availability, many of its limitations will be removed.
:::

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

## Supported Kubernetes Distributions and Versions

The compatibility matrix can create clusters on VMs, such as kind, k3s, and Red Hat OpenShift OKD, and also create cloud-managed clusters, such as EKS and GKE.

Cloud-based Kubernetes distributions are run in a Replicated managed and controlled cloud account to optimize and deliver a clusters quickly and reliably. The Replicated account has control planes ready and adds a node group when you request it, making the cluster available much faster than if you try to create your own cluster with your own cloud account.

Virtual machines (VMs) run on Replicated bare metal servers located in several data centers, including data centers physically in the European Union.

For a complete list of supported clusters, Kubernetes versions, and the Kubernetes support policy, see [Supported Compatibility Matrix Cluster Types (Beta)](testing-supported-clusters).

## Compatibility Matrix Billing

The compatibility matrix is an add-on. To request access to the compatibility matrix, [open a product request](https://vendor.replicated.com/support?requestType=feature&productArea=vendor).

### Per-Minute Billing

Clusters that are created with the compatibility matrix are billed on a per-minute basis. Billing for a cluster begins when the cluster reaches a Ready state and ends when the cluster is deleted.

To help you manage costs, compatibility matrix clusters have a Time To Live (TTL) mechanism. By default, the TTL is one hour, but you can configure it to a minimum of 10 minutes and a maximum of 48 hours. When the TTL expires, the cluster is automatically deleted. The TTL countdown does not begin until a cluster is in the Ready state.

### Credits

The compatibility matrix add-on requires the purchase of credits at an additional cost.

You can request credits for the compatibility by going to the [Compatibility Matrix](https://vendor.replicated.com/compatibility-matrix) page in the vendor portal and clicking **Request more credits**.
