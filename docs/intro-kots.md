---
displayed_sidebar: kots
---

# Introduction to KOTS

This topic provides an introduction to the Replicated KOTS installer, including information about KOTS features, installation options, and user interfaces.

:::note
You must have the Replicated KOTS entitlement to use KOTS. For more information, see [Pricing](https://www.replicated.com/pricing) on the Replicated website.
:::

## Overview

Replicated KOTS is a kubectl plugin that provides highly successful installations of Helm charts and Kubernetes applications into customer-controlled environments, including on-prem and air gap environments. KOTS also supports installations onto VMs or bare metal servers through _embedded clusters_, which are clusters built from a customized Kubernetes distribution embedded with an application and provisioned in the customer environment at the time of installation.

KOTS communicates securely with the Replicated vendor platform to synchronize customer licenses, check for available application updates, send instance data, share customer-generated support bundles, and more.

Installing an application with KOTS provides access to feautures such as:

* Support for air gap installations
* Support for installations onto VMs or bare metal servers
* The KOTS admin console, which provides a user interface where your customers can install and manage their application instance
* Instance telemetry automatically sent to the vendor portal for instances running in customer environments
* Strict preflight checks that block installation if environment requirements are not met
* Backup and restore with Replicated snapshots
* Required releases with the **Prevent this release from being skipped during upgrades** option in the vendor portal

KOTS is an open source project that is maintained by Replicated. For more information, see the [kots](https://github.com/replicatedhq/kots) repository in GitHub.

## About Installing with KOTS

KOTS is installed in Kubernetes clusters. Customers can install in their own existing cluster. Or, for customers that do not have a cluster or that have less experience with Kubernetes, KOTS can also be installed in an embedded cluster on a VM or bare metal server.

<img alt="Embedded cluster, air gap, and existing cluster app installation workflows" src="/images/kots-installation-overview.png" width="700px"/>

[View a larger version of this image](/images/kots-installation-overview.png)

As shown in the diagram above, customers can install an application with KOTS by first installing KOTS in the cluster. Then, they can use KOTS to configure and install the application. 

### Existing Cluster Installations

KOTS supports installation into existing Kubernetes clusters. To install an application with KOTS in an existing cluster, users first install the kots CLI

For more information about existing cluster installations with KOTS, see:
* [Existing Cluster Requirements](/enterprise/installing-general-requirements#existing-cluster-requirements)
* [Online Installation in Existing Clusters](/enterprise/installing-existing-cluster)
* [Air Gap Installation in Existing Clusters](/enterprise/installing-existing-cluster-airgapped)

### Embedded Cluster Installations

KOTS supports installations onto VMs or bare metal servers through embedded clusters, which are clusters built from a customized Kubernetes distribution embedded with an application and provisioned in the customer environment at the time of installation.

Replicated kURL provisions Kubernetes clusters, which allow customers who do not have an existing cluster to install your application without provisioning a cluster themselves. Clusters created by kURL are called embedded clusters.

kURL has a built-in integration with KOTS through its KOTS add-on. With this integration, customers can run a kURL installation script in their virtual machine (VM) or bare metal server, which creates a cluster and then automatically installs KOTS in the cluster. Your application is then deployed with KOTS.

For information about how to install applications in embedded clusters, see Installing with kURL. For information about how to create a specification for kURL, see Creating a Kubernetes Installer.

kURL is an open source project that is maintained by Replicated. For more information, see the kURL repository in GitHub and the kURL documentation.

### Air Gap Installations

KOTS supports both online (internet-connected) and air gap installations into existing or embedded clusters.

Most Kubernetes clusters are able to make outbound internet requests. Inbound access is never recommended or required.
As such, most cluster operators are able to perform an online installation.

If the target cluster does not have outbound internet access, the application can also be delivered through an air gap installation.

To install an application in an air gapped environment, the cluster must have access to an image registry. In this case, KOTS re-tags and pushes all images to the target registry. KOTS supports installations in air gapped environments on both existing clusters and on clusters created by the kURL installer.

## KOTS User Interfaces

This section describest the interfaces that users can use to install and manage applications with KOTS.

### KOTS Admin Console

KOTS provides an admin console to make it easy for customers to install, upgrade, and manage their application instance.

The admin console is a user interface for KOTS that includes built-in functionality allowing users to install, manage, update, configure, monitor, backup and restore, and troubleshoot their application instances.

![Admin Console Dashboard](/images/guides/kots/application.png)

[View a larger version of this image](/images/guides/kots/application.png)

### kots CLI

The kots command-line interface (CLI) is a kubectl plugin. Customers can run commands with the kots CLI to install and manage their application instances with KOTS programmatically.

For information about getting started with the kots CLI, see [Installing the kots CLI](/reference/kots-cli-getting-started).

For information about how to run automated installations with the kots CLI, see [Installing with Automation](/enterprise/installing-existing-cluster-automation).