import Overview from "../partials/cmx/_overview.mdx"

# About Compatibility Matrix

This topic describes Replicated Compatibility Matrix, including use cases, billing, limitations, and more.

## Overview

<Overview/>

You can use Compatibility Matrix with the Replicated CLI or the Replicated Vendor Portal. For more information about how to use Compatibility Matrix, see [Use Compatibility Matrix](testing-how-to).

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

## Statuses

The following describes the possible statuses of clusters or VMs created with Compatibility Matrix:

* `assigned`/`queued`: The resources were requested and Compatibility Matrix is provisioning the environment. You are not billed for the time that a cluster or VM spends in the `assigned` status.

* `running`: For clusters, a working kubeconfig for the cluster is accessible. For VMs, an SSH endpoint is available. Billing begins when a `running` status is reached.

   Additionally, clusters are verified prior to transitioning to a `running` status. Verification includes checking that the cluster is healthy and running with the correct number of nodes, as well as passing [sonobuoy](https://sonobuoy.io/) tests in `--quick` mode.

* `terminated`: The cluster or VM is deleted or the TTL has been reached. Billing ends when the cluster status is changed from `running` to `terminated`.

* `error`: An error occurred when attempting to provision the cluster or VM.

You can view the status of clusters and VMs using the `replicated cluster ls` or `replicated vm ls` commands. For more information, see [cluster ls](/reference/replicated-cli-cluster-ls) or [vm ls](/reference/replicated-cli-vm-ls).