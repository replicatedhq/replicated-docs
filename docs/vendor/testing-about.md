import Prerequisites from "../partials/cmx/_prerequisites.mdx"
import InstanceTypes from "../partials/cmx/_instance-types.mdx"

# About CMX

This topic describes Replicated Compatibility Matrix (CMX), including use cases, billing, limitations, and more.

## Overview

You can use CMX to quickly provision ephemeral clusters and VMs. CMX's networking features also provide kubectl or SSH access to clusters and VMs. This allows you to install and test your application in a range of different development environments before releasing to customers.

Example use cases for CMX include:
* Run tests before releasing a new version of your application to validate compatibility with supported Kubernetes distributions
* Get access to a cluster or VM to develop on and quickly test changes
* Reproduce a reported issue on a customer-representative environment for troubleshooting
* Create air-gapped environments to test that your application makes no outbound requests outside of a user's allowlist
* You can use CMX VMs for testing and troubleshooting VM-based installations for your application with [Replicated Embedded Cluster](/intro-replicated#embedded-cluster).

You can use CMX with the Replicated CLI, the Replicated Vendor Portal, or the Vendor API.

## Billing and Credits

Clusters and VMs created with CMX are billed by the minute, plus a startup charge. Per-minute billing begins when a `running` status is reached and ends when the cluster or VM is deleted.

For more information about pricing, see [CMX Pricing](testing-pricing).

To use CMX, you must have credits in your Vendor Portal account.
If you have a contract, you can purchase credits by logging in to the Vendor Portal and going to [**Compatibility Matrix > Buy additional credits**](https://vendor.replicated.com/compatibility-matrix).
Otherwise, to request credits, log in to the Vendor Portal and go to [**Compatibility Matrix > Request more credits**](https://vendor.replicated.com/compatibility-matrix).

## Limitations

- Each team has a quota limit on the amount of resources that can be used simultaneously. This limit can be raised by messaging your account representative.
- Team actions with CMX (for example, creating and deleting clusters and requesting quota increases) are not logged and displayed in the [Vendor Team Audit Log](https://vendor.replicated.com/team/audit-log). 
- Creating VMs with CMX has the following limitations:
  - Creating VMs with CMX is a Beta feature.
  - Installing Embedded Cluster on a VM created with CMX is supported for Embedded Cluster versions 1.21.0 or later.
  - [GitHub Actions](/vendor/testing-ci-cd#replicated-github-actions) are not supported for CMX VMs. 
  - The [cluster prepare](/reference/replicated-cli-cluster-prepare) command is not supported for CMX VMs.
- Creating clusters with CMX has the following limitations:
  - Clusters cannot be resized. Create another cluster if you want to make changes, such as add another node.
  - Clusters cannot be rebooted. Create another cluster if you need to reset/reboot the cluster. 
  - On cloud clusters, node groups are not available for every distribution. For distribution-specific details, see [Supported CMX Cluster Types](/vendor/testing-supported-clusters).
  - Multi-node support is not available for every distribution. For distribution-specific details, see [Supported CMX Cluster Types](/vendor/testing-supported-clusters).
  - ARM instance types are only supported on Cloud Clusters. For distribution-specific details, see [Supported CMX Cluster Types](/vendor/testing-supported-clusters).
  - GPU instance types are only supported on Cloud Clusters. For distribution-specific details, see [Supported CMX Cluster Types](/vendor/testing-supported-clusters).
  - There is no support for IPv6 as a single stack. Dual stack support is available on kind clusters.
  - The `cluster upgrade` feature is available only for kURL distributions. See [cluster upgrade](/reference/replicated-cli-cluster-upgrade).
  - Cloud clusters do not allow for the configuration of CNI, CSI, CRI, Ingress, or other plugins, add-ons, services, and interfaces.
  - The node operating systems for clusters created with CMX cannot be configured nor replaced with different operating systems.
  - The Kubernetes scheduler for clusters created with CMX cannot be replaced with a different scheduler.
- For additional distribution-specific limitations, see [Supported CMX Cluster Types](testing-supported-clusters).