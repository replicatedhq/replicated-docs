# CMX Overview

This topic describes Replicated Compatibility Matrix (CMX), including use cases, architecture, billing, and more.

## Overview

You can use CMX to quickly provision ephemeral VMs or clusters so you can develop and test against a customer-representative environment. Example use cases for CMX include:

* Quickly get a cluster or VM to develop on and quickly test changes
* Run tests to validate that your application will install smoothly in the customer environment
* Reproduce a reported issue on a customer-representative environment for troubleshooting


## Use Cases

The following table shows which CMX infrastructure option to use based on how your customers install your application:

| | Install in Customer VM | Install in Customer Cluster |
|-----------------|---------------------|----------------|
| **Customer Environment** | Linux VM, with no existing Kubernetes cluster | Customer-managed Kubernetes cluster |
| **Installer** | <ul><li>[Embedded Cluster](/vendor/embedded-overview)</li><li>[kURL (Legacy)](/vendor/kurl-about)</li></ul> | <ul><li>[Helm](/vendor/helm-install-overview)</li><li>[KOTS](/intro-kots)</li></ul> |
| **CMX Environment** | **[CMX Bare VM](cmx-vms)** | **[CMX Cluster Types](testing-supported-clusters)** |
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


## Billing and Credits

Clusters and VMs created with CMX are billed by the minute, plus a startup charge. Per-minute billing begins when a `running` status is reached and ends when the cluster or VM is deleted.

For more information about pricing, see [CMX Pricing](testing-pricing).

To create clusters with CMX, you must have credits in your Vendor Portal account.
If you have a contract, you can purchase credits by logging in to the Vendor Portal and going to [**Compatibility Matrix > Buy additional credits**](https://vendor.replicated.com/compatibility-matrix).
Otherwise, to request credits, log in to the Vendor Portal and go to [**Compatibility Matrix > Request more credits**](https://vendor.replicated.com/compatibility-matrix).


## Limitations

* Each team has a quota limit on resources. Contact your account representative to increase limits.
* Team actions with CMX are not logged in the [Vendor Team Audit Log](https://vendor.replicated.com/team/audit-log).


CMX VMs have the following limitations:

* Creating VMs with CMX is a Beta feature.
* Installing Embedded Cluster on a VM is supported for Embedded Cluster versions 1.21.0 or later.
* [GitHub Actions](/vendor/testing-ci-cd#replicated-github-actions) and the [cluster prepare](/reference/replicated-cli-cluster-prepare) command are not supported for CMX VMs or Embedded Cluster distributions.

CMX Clusters have the following limitations:

* Clusters cannot be resized or rebooted. Create a new cluster if you need to make changes.
* Cloud clusters (EKS, GKE, AKS) do not yet allow configuration of CNI, CSI, CRI, Ingress, or other plugins.
* Cloud clusters (EKS, GKE, AKS) do not yet support tunnels for exposing ports.
* The `cluster upgrade` feature is available only for kURL distributions. See [cluster upgrade](/reference/replicated-cli-cluster-upgrade).
* Multi-node, ARM, and GPU support varies by distribution. See [CMX Cluster Types](testing-supported-clusters).

