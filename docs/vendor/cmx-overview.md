# CMX Overview

This topic describes Replicated Compatibility Matrix (CMX), including use cases, architecture, billing, and more.

## Overview

You can use CMX to quickly provision ephemeral clusters and VMs from a unified interface. CMX's networking features also provide kubectl or SSH access to clusters and VMs. This allows you to install and test your application in a range of different development environments before releasing to customers.

Example use cases for CMX include:
* Run tests before releasing a new version of your application to validate compatibility with supported Kubernetes distributions
* Get access to a cluster or VM to develop on and quickly test changes
* Reproduce a reported issue on a customer-representative environment for troubleshooting

You can use CMX with the Replicated CLI or the Replicated Vendor Portal. For more information about how to use CMX, see:
* [CMX Clusters](testing-supported-clusters) - Information about supported cluster distributions
* [Use CMX Clusters](testing-how-to) - How to create and manage clusters
* [CMX VMs](cmx-vms) - How to create and manage VMs

## Architecture

CMX uses two different infrastructure approaches to provision resources:

* **Custom VMs**: VMs and VM-based clusters (such as kind, k3s, RKE2, and Red Hat OpenShift OKD) run on Replicated bare metal servers located in several data centers, including data centers physically in the European Union. This architecture provides you with full control over the operating system and allows testing of installation methods that require direct OS access.

* **Warm Pool Cloud Clusters**: Cloud-based Kubernetes distributions (such as EKS, GKE, and AKS) are run in a Replicated managed and controlled cloud account to optimize and deliver clusters quickly and reliably. The Replicated account has control planes ready and adds a node group when you request it, making the cluster available much faster than if you try to create your own cluster with your own cloud account.

You can run [`replicated cluster versions`](/reference/replicated-cli-cluster-versions) or [`replicated vm versions`](/reference/replicated-cli-vm-versions) for an up-to-date list of the available cluster distributions or VM types.

For more information about the supported cluster distributions, see [CMX Clusters](testing-supported-clusters).

For more information about supported VMs, see [CMX VMs](cmx-vms)

## Billing and Credits

Clusters and VMs created with CMX are billed by the minute, plus a startup charge. Per-minute billing begins when a `running` status is reached and ends when the cluster or VM is deleted.

For more information about pricing, see [CMX Pricing](testing-pricing).

To create clusters with CMX, you must have credits in your Vendor Portal account.
If you have a contract, you can purchase credits by logging in to the Vendor Portal and going to [**Compatibility Matrix > Buy additional credits**](https://vendor.replicated.com/compatibility-matrix).
Otherwise, to request credits, log in to the Vendor Portal and go to [**Compatibility Matrix > Request more credits**](https://vendor.replicated.com/compatibility-matrix).