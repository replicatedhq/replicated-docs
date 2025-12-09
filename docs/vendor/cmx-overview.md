# CMX Overview

This topic describes Replicated Compatibility Matrix (CMX), including use cases, architecture, billing, and more.

## Overview

You can use CMX to quickly provision ephemeral VMs or clusters so you can develop and test against a customer-representative environment. Example use cases for CMX include:

* Quickly get a cluster or VM to develop on and quickly test changes
* Run tests to validate that your application will install smoothly in the customer environment
* Reproduce a reported issue on a customer-representative environment for troubleshooting


## Architecture

CMX uses two different infrastructure approaches to provision resources:

* **Custom VMs**: VMs and VM-based clusters (such as kind, k3s, RKE2, and Red Hat OpenShift OKD) run on Replicated bare metal servers located in several data centers, including data centers physically in the European Union. VMs give you full control over the operating system.

* **Warm Pool Cloud Clusters**: Cloud-based Kubernetes distributions (such as EKS, GKE, and AKS) are run in a Replicated managed and controlled cloud account to optimize and deliver clusters quickly and reliably. The Replicated account has control planes ready and adds a node group when you request it, making the cluster available much faster than if you try to create your own cluster with your own cloud account.

### Use Cases by Customer Installation Type

The following table shows which CMX infrastructure option to use based on how your customers install your application:

| | Install in Customer VM | Install in Customer Cluster |
|-----------------|---------------------|----------------|
| **Customer Environment** | Linux VM, with no existing Kubernetes cluster | Customer-managed Kubernetes cluster |
| **Installer** | <ul><li>[Embedded Cluster](/vendor/embedded-overview)</li><li>[kURL (Legacy)](/vendor/kurl-about)</li></ul> | <ul><li>[Helm](/vendor/helm-install-overview)</li><li>[KOTS](/intro-kots)</li></ul> |
| **CMX Environment** | **[CMX Bare VM](cmx-vms)** | **[CMX Clusters](testing-supported-clusters)** |
| **How to Test** | <ul><li>Create CMX VM</li><li>SSM into the VM</li><li>Install Embedded Cluster (to install Kubernetes and your application in one step)</li></ul> | <ul><li>Create CMX cluster</li><li>Shell into the Cluster</li><li>Run `helm install` or `kots install` commands to simulate customer installation in their Kubernetes clusters</li></ul>  |
| **CMX Notes** |  Can test on [Ubuntu or AlmaLinux](cmx-vms#supported-vm-types) <br />([Embedded Cluster](testing-supported-clusters#embedded-cluster) and [kURL](testing-supported-clusters#kurl) let you skip the cluster install step to test your application install more quickly) | Can test on [EKS, GKE, AKS, OpenShift, and more](testing-supported-clusters) |


**Key Differences:**

* **Warm Pool Cloud Clusters** (EKS, GKE, AKS, OKE) - Standard managed Kubernetes environments that are already running and ready for application installation. Use these to test installations where customers bring their own cloud-managed Kubernetes clusters. These clusters provision faster because control planes are pre-warmed.

* **VM-Based Clusters** (kind, k3s, RKE2, OpenShift OKD, Embedded Cluster, kURL) - Kubernetes distributions that run on Replicated bare metal servers with Kubernetes already installed. Use these for quick testing of automated installer workflows. For Embedded Cluster and kURL, CMX runs the installer behind the scenes and provides access to a ready cluster with your application already installed.

* **Custom VMs** (Ubuntu, AlmaLinux) - Bare Linux VMs without Kubernetes pre-installed. Use these when you need full control over the operating system to manually test the complete installation process. For Embedded Cluster and kURL installers, you run a single command that provisions Kubernetes and installs your application together. This is useful for detailed testing, troubleshooting installation issues, or validating the end-to-end customer experience.

You can run [`replicated cluster versions`](/reference/replicated-cli-cluster-versions) or [`replicated vm versions`](/reference/replicated-cli-vm-versions) for an up-to-date list of the available cluster distributions or VM types.

For more information about the supported cluster distributions, see [CMX Clusters](testing-supported-clusters).

For more information about supported VMs, see [CMX Bare VM](cmx-vms)

## Billing and Credits

Clusters and VMs created with CMX are billed by the minute, plus a startup charge. Per-minute billing begins when a `running` status is reached and ends when the cluster or VM is deleted.

For more information about pricing, see [CMX Pricing](testing-pricing).

To create clusters with CMX, you must have credits in your Vendor Portal account.
If you have a contract, you can purchase credits by logging in to the Vendor Portal and going to [**Compatibility Matrix > Buy additional credits**](https://vendor.replicated.com/compatibility-matrix).
Otherwise, to request credits, log in to the Vendor Portal and go to [**Compatibility Matrix > Request more credits**](https://vendor.replicated.com/compatibility-matrix).