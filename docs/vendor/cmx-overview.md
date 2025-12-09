# CMX Overview

This topic describes Replicated Compatibility Matrix (CMX), including use cases, architecture, billing, and more.

## Overview

You can use CMX to quickly provision ephemeral VMs or clusters so you can develop and test against a customer-representative environment. Example use cases for CMX include:

* Quickly get a cluster or VM to develop on and quickly test changes
* Run tests to validate that your application will install smoothly in the customer environment
* Reproduce a reported issue on a customer-representative environment for troubleshooting


### Use Cases by Customer Installation Type

The following table shows which CMX infrastructure option to use based on how your customers install your application:

| | Install in Customer VM | Install in Customer Cluster |
|-----------------|---------------------|----------------|
| **Customer Environment** | Linux VM, with no existing Kubernetes cluster | Customer-managed Kubernetes cluster |
| **Installer** | <ul><li>[Embedded Cluster](/vendor/embedded-overview)</li><li>[kURL (Legacy)](/vendor/kurl-about)</li></ul> | <ul><li>[Helm](/vendor/helm-install-overview)</li><li>[KOTS](/intro-kots)</li></ul> |
| **CMX Environment** | **[CMX Bare VM](cmx-vms)** | **[CMX Cluster](testing-supported-clusters)** |
| **How to Test** | <ul><li>Create CMX VM</li><li>SSM into the VM</li><li>Install Embedded Cluster (to install Kubernetes and your application in one step)</li></ul> | <ul><li>Create CMX cluster</li><li>Shell into the Cluster</li><li>Run `helm install` or `kots install` commands to simulate customer installation in their Kubernetes clusters</li></ul>  |
| **CMX Notes** |  Can test on [Ubuntu or AlmaLinux](cmx-vms#supported-vm-types) <br />([Embedded Cluster](testing-supported-clusters#embedded-cluster) and [kURL](testing-supported-clusters#kurl) help automate your application install) <br /> Run [`replicated vm versions`](/reference/replicated-cli-vm-versions) for current VM options | Can test on [EKS, GKE, AKS, OpenShift, and more](testing-supported-clusters) <br /> Run [`replicated cluster versions`](/reference/replicated-cli-cluster-versions) for current cluster options |


## Architecture

CMX uses two different infrastructure approaches to provision resources:



* **Warm Pool Cloud Clusters** (EKS, GKE, AKS, OKE): Cloud-based Kubernetes distributions run in Replicated-managed cloud accounts. Control planes are pre-warmed and a node group is added when you request a cluster, delivering clusters faster than provisioning your own. Use these to test installations where customers bring their own cloud-managed Kubernetes clusters.

* **VMs**: VMs run on Replicated bare metal servers located in several data centers, including data centers physically in the European Union.

    * **Bare VMs** (Ubuntu, AlmaLinux): Linux VMs without Kubernetes pre-installed. Use these when you need full control over the operating system to test the complete installation process, including cluster install.
    
    * **VM-based clusters**: VMs with Kubernetes already installed. Use these for a quick development environment (kind, k3s), to simualte end customer enivronments (RKE2, OpenShift OKD), or our automations for Embedded Cluster and kURL to run the installer behind the scenes and provide a ready cluster with your application already installed.




## Prerequisites

Before you can use CMX, you must complete the following prerequisites:

* Create an account in the Replicated Vendor Portal. See [Create a Vendor Account](/vendor/vendor-portal-creating-account).

* Install the Replicated CLI and then authorize the CLI using your vendor account. See [Install the Replicated CLI](/reference/replicated-cli-installing).

* If you have a contract, you can purchase more credits by going to [**Compatibility Matrix > Buy additional credits**](https://vendor.replicated.com/compatibility-matrix). Otherwise, you can request credits by going to [**Compatibility Matrix > Request more credits**](https://vendor.replicated.com/compatibility-matrix) in the Vendor Portal. For more information, see [Billing and Credits](#billing-and-credits) below.

* Existing accounts must accept the TOS for the trial on the [**Compatibility Matrix**](https://vendor.replicated.com/compatibility-matrix) page in the Replicated Vendor Portal.

## Limitations

CMX has the following limitations:

### General Limitations

* Creating VMs with CMX is a Beta feature.
* Clusters cannot be resized. Create another cluster if you want to make changes, such as add another node.
* Clusters cannot be rebooted. Create another cluster if you need to reset/reboot the cluster.
* Cloud clusters do not allow for the configuration of CNI, CSI, CRI, Ingress, or other plugins, add-ons, services, and interfaces.
* The node operating systems for clusters created with CMX cannot be configured nor replaced with different operating systems.
* The Kubernetes scheduler for clusters created with CMX cannot be replaced with a different scheduler.
* Each team has a quota limit on the amount of resources that can be used simultaneously. This limit can be raised by messaging your account representative.
* Team actions with CMX (for example, creating and deleting clusters and requesting quota increases) are not logged and displayed in the [Vendor Team Audit Log](https://vendor.replicated.com/team/audit-log).
* There is no support for IPv6 as a single stack. Dual stack support is available on kind clusters.
* The `cluster upgrade` feature is available only for kURL distributions. See [cluster upgrade](/reference/replicated-cli-cluster-upgrade).

### Distribution-Specific Limitations

* On cloud clusters, node groups are not available for every distribution. For distribution-specific details, see [CMX Cluster Types](testing-supported-clusters).
* Multi-node support is not available for every distribution. For distribution-specific details, see [CMX Cluster Types](testing-supported-clusters).
* ARM instance types are only supported on Cloud Clusters. For distribution-specific details, see [CMX Cluster Types](testing-supported-clusters).
* GPU instance types are only supported on Cloud Clusters. For distribution-specific details, see [CMX Cluster Types](testing-supported-clusters).

### Feature Limitations

* Installing Embedded Cluster on a VM created with CMX is supported for Embedded Cluster versions 1.21.0 or later.
* [GitHub Actions](/vendor/testing-ci-cd#replicated-github-actions) are not supported for CMX VMs.
* The [cluster prepare](/reference/replicated-cli-cluster-prepare) command is not supported for CMX VMs or Embedded Cluster distributions.

### Networking Limitations

* Creating wildcard DNS entries for VMs is not supported.
* Tunnels for exposing ports are not supported for cloud distributions (EKS, GKE, AKS).
* A tunnel can only connect to one service. If you need fanout routing into different services, consider installing the nginx ingress controller as a `NodePort` service and exposing it.

### File Transfer Limitations

* When transferring files using the CMX Forwarder, `scp` with flag `-O` (legacy scp protocol) is not supported.
* When transferring files using the CMX Forwarder, relative paths are not supported.
* When transferring files using the CMX Forwarder, file permissions are not inherited.

For additional distribution-specific limitations, see [CMX Cluster Types](testing-supported-clusters).

## Billing and Credits

Clusters and VMs created with CMX are billed by the minute, plus a startup charge. Per-minute billing begins when a `running` status is reached and ends when the cluster or VM is deleted.

For more information about pricing, see [CMX Pricing](testing-pricing).

To create clusters with CMX, you must have credits in your Vendor Portal account.
If you have a contract, you can purchase credits by logging in to the Vendor Portal and going to [**Compatibility Matrix > Buy additional credits**](https://vendor.replicated.com/compatibility-matrix).
Otherwise, to request credits, log in to the Vendor Portal and go to [**Compatibility Matrix > Request more credits**](https://vendor.replicated.com/compatibility-matrix).