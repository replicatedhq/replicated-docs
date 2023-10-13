import Overview from "../partials/cmx/_overview.mdx"
import Billing from "../partials/cmx/_billing.mdx"
import SupportedClusters from "../partials/cmx/_supported-clusters-overview.mdx"

# About the Compatibility Matrix (Beta)

This topic describes the Replicated compatibility matrix. including use cases, billing, limitations, and more.

:::note
The compatibility matrix add-on is Beta. The features, limitations, and requirements of the compatibility matrix are subject to change. As the compatiblity matrix add-on progresses towards general availability, many of its limitations will be removed.
:::

## Overview

<Overview/>

You can use the compatibility matrix with the replicated CLI or the Replicated vendor portal. For more information about how to use the compatibility matrix, see [Using the Compatibility Matrix](testing-how-to).

### Supported Clusters

<SupportedClusters/>

### Billing and Credits

<Billing/>

### Cluster Status

Clusters created with the compatibility matrix can have the following statuses:

* `assigned`: The cluster resources were requested and the compatiblity matrix is provisioning the cluster. You are not billed for the time that a cluster spends in the `assigned` status.

* `running`: A working kubeconfig for the cluster is accessible. Billing begins when the cluster reaches a `running` status.

   Additionally, OpenShift, Kind, K3s, kURL and HelmVM clusters are verified prior to transitioning to a `running` status. Verification includes checking that the cluster is healthy and running with the correct number of nodes, as well as passing [sonobuoy](https://sonobuoy.io/) tests in `--quick` mode.

* `terminated`: The cluster is deleted. Billing ends when the cluster status is changed from `running` to `terminated`.

* `error`: An error occured when attempting to provision the cluster.

You can view the status of clusters using the `replicated cluster ls` command. For more information, see [cluster ls](/reference/replicated-cli-cluster-ls).

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