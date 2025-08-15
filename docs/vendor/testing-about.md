# About Compatibility Matrix

This topic describes Replicated Compatibility Matrix, including use cases, billing, limitations, and more.

## Overview

You can use Replicated Compatibility Matrix to quickly provision ephemeral clusters and VMs. Compatibility Matrix's networking features also provide kubectl or SSH access to clusters and VMs. This allows you to install and test your application in a range of different development environments before releasing to customers.

Example use cases for Compatibility Matrix include:
* Run tests before releasing a new version of your application to validate compatibility with supported Kubernetes distributions
* Get access to a cluster or VM to develop on and quickly test changes
* Reproduce a reported issue on a customer-representative environment for troubleshooting

You can use Compatibility Matrix with the Replicated CLI or the Replicated Vendor Portal. For more information about how to use Compatibility Matrix, see [Create Clusters](testing-how-to) and [Create VMs](testing-vm-create).

## Supported Clusters and VMs

Compatibility Matrix can create VMs, VM-based clusters (such as kind, k3s, RKE2, and Red Hat OpenShift OKD), and cloud-managed clusters (such as EKS, GKE and AKS):

* Cloud-based Kubernetes distributions are run in a Replicated managed and controlled cloud account to optimize and deliver a clusters quickly and reliably. The Replicated account has control planes ready and adds a node group when you request it, making the cluster available much faster than if you try to create your own cluster with your own cloud account.

* VMs and VM-based clusters run on Replicated bare metal servers located in several data centers, including data centers physically in the European Union.

You can run [`replicated cluster versions`](/reference/replicated-cli-cluster-versions) or [`replicated vm versions`](/reference/replicated-cli-vm-versions) for an up-to-date list of the available cluster distributions or VM types.

For more information about the supported cluster distributions, see [Supported Compatibility Matrix Cluster Types](testing-supported-clusters).

For more information about supported VMs, see [Supported VM Types](/vendor/testing-vm-create#supported-vm-types.)

## Billing and Credits

Clusters and VMs created with Compatibility Matrix are billed by the minute, plus a startup charge. Per-minute billing begins when a `running` status is reached and ends when the cluster or VM is deleted.

For more information about pricing, see [Compatibility Matrix Pricing](testing-pricing).

To create clusters with Compatibility Matrix, you must have credits in your Vendor Portal account.
If you have a contract, you can purchase credits by logging in to the Vendor Portal and going to [**Compatibility Matrix > Buy additional credits**](https://vendor.replicated.com/compatibility-matrix).
Otherwise, to request credits, log in to the Vendor Portal and go to [**Compatibility Matrix > Request more credits**](https://vendor.replicated.com/compatibility-matrix).