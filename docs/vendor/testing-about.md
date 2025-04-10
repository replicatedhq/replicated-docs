import Overview from "../partials/cmx/_overview.mdx"
import SupportedClusters from "../partials/cmx/_supported-clusters-overview.mdx"

# About Compatibility Matrix

This topic describes Replicated Compatibility Matrix, including use cases, billing, limitations, and more.

## Overview

<Overview/>

You can use Compatibility Matrix with the Replicated CLI or the Replicated Vendor Portal. For more information about how to use Compatibility Matrix, see [Use Compatibility Matrix](testing-how-to).

### Supported Clusters

<SupportedClusters/>

### Billing and Credits

Clusters created with Compatibility Matrix are billed by the minute. Per-minute billing begins when the cluster reaches a `running` status and ends when the cluster is deleted. Compatibility Matrix marks a cluster as `running` when a working kubeconfig for the cluster is accessible.

You are billed only for the time that the cluster is in a `running` status. You are _not_ billed for the time that it takes Compatibility Matrix to create and tear down clusters, including when the cluster is in an `assigned` status.

For more information about pricing, see [Compatibility Matrix Pricing](testing-pricing).

To create clusters with Compatibility Matrix, you must have credits in your Vendor Portal account.
If you have a contract, you can purchase credits by logging in to the Vendor Portal and going to [**Compatibility Matrix > Buy additional credits**](https://vendor.replicated.com/compatibility-matrix).
Otherwise, to request credits, log in to the Vendor Portal and go to [**Compatibility Matrix > Request more credits**](https://vendor.replicated.com/compatibility-matrix).

### Quotas and Capacity

By default, Compatibility Matrix sets quotas for the capacity that can be used concurrently by each vendor portal team. These quotas are designed to ensure that Replicated maintains a minimum amount of capacity for provisioning both VM and cloud-based clusters.

By default, the quota for cloud-based cluster distributions (AKS, GKE, EKS) is three clusters running concurrently.

VM-based cluster distributions (such as kind, OpenShift, and Replicated Embedded Cluster) have the following default quotas:
* 32 vCPUs
* 128 GiB memory
* 800 GiB disk size 

You can request increased quotas at any time with no additional cost. To view your team's current quota and capacity usage, or to request a quota increase, go to [**Compatibility Matrix > Settings**](https://vendor.replicated.com/compatibility-matrix/settings) in the vendor portal:

![Compatibility matrix settings page](/images/compatibility-matrix-settings.png)

[View a larger version of this image](/images/compatibility-matrix-settings.png)

### Cluster Status

Clusters created with Compatibility Matrix can have the following statuses:

* `assigned`: The cluster resources were requested and Compatibility Matrix is provisioning the cluster. You are not billed for the time that a cluster spends in the `assigned` status.

* `running`: A working kubeconfig for the cluster is accessible. Billing begins when the cluster reaches a `running` status.

   Additionally, clusters are verified prior to transitioning to a `running` status. Verification includes checking that the cluster is healthy and running with the correct number of nodes, as well as passing [sonobuoy](https://sonobuoy.io/) tests in `--quick` mode.

* `terminated`: The cluster is deleted. Billing ends when the cluster status is changed from `running` to `terminated`.

* `error`: An error occured when attempting to provision the cluster.

You can view the status of clusters using the `replicated cluster ls` command. For more information, see [cluster ls](/reference/replicated-cli-cluster-ls).

### Cluster Add-ons

The Replicated Compatibility Matrix enables you to extend your cluster with add-ons, to make use of by your application, such as an AWS S3 object store.
This allows you to more easily provision dependencies required by your application.

For more information about how to use the add-ons, see [Compatibility Matrix Cluster Add-ons](testing-cluster-addons).

## Limitations

Compatibility Matrix has the following limitations:

- Clusters cannot be resized. Create another cluster if you want to make changes, such as add another node.
- Clusters cannot be rebooted. Create another cluster if you need to reset/reboot the cluster. 
- On cloud clusters, node groups are not available for every distribution. For distribution-specific details, see [Supported Compatibility Matrix Cluster Types](/vendor/testing-supported-clusters).
- Multi-node support is not available for every distribution. For distribution-specific details, see [Supported Compatibility Matrix Cluster Types](/vendor/testing-supported-clusters).
- ARM instance types are only supported on Cloud Clusters. For distribution-specific details, see [Supported Compatibility Matrix Cluster Types](/vendor/testing-supported-clusters).
- GPU instance types are only supported on Cloud Clusters. For distribution-specific details, see [Supported Compatibility Matrix Cluster Types](/vendor/testing-supported-clusters).
- There is no support for IPv6 as a single stack. Dual stack support is available on kind clusters.
- There is no support for air gap testing. 
- The `cluster upgrade` feature is available only for kURL distributions. See [cluster upgrade](/reference/replicated-cli-cluster-upgrade).
- Cloud clusters do not allow for the configuration of CNI, CSI, CRI, Ingress, or other plugins, add-ons, services, and interfaces.
- The node operating systems for clusters created with Compatibility Matrix cannot be configured nor replaced with different operating systems.
- The Kubernetes scheduler for clusters created with Compatibility Matrix cannot be replaced with a different scheduler.
- Each team has a quota limit on the amount of resources that can be used simultaneously. This limit can be raised by messaging your account representative.
- Team actions with Compatibility Matrix (for example, creating and deleting clusters and requesting quota increases) are not logged and displayed in the [Vendor Team Audit Log](https://vendor.replicated.com/team/audit-log). 

For additional distribution-specific limitations, see [Supported Compatibility Matrix Cluster Types](testing-supported-clusters).
