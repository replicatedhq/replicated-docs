---
displayed_sidebar: kots
---

# Introduction to KOTS

This topic provides an introduction to the Replicated KOTS installer, including information about KOTS features, installation options, and user interfaces.

:::note
You must have the Replicated KOTS entitlement to use KOTS. For more information, see [Pricing](https://www.replicated.com/pricing) on the Replicated website.
:::

## Overview

The Replicated KOTS installer is a kubectl plugin that provides highly successful installs of Helm charts and Kubernetes applications into customer-controlled environments, including air gap environments. KOTS also provides an admin console, which can make application installation and management easier for customers that are less experienced with Kubernetes or Helm.

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

## About KOTS Installations

KOTS is installed into Kubernetes clusters. Customers can install into their own existing cluster 

### Existing Cluster

KOTS supports both online (internet-connected) and air gap installations into existing Kubernetes clusters.

### Embedded Cluster

_Embedded cluster_ installations are installations a c

The Replicated kURL installer allows customers that do not have their own Kubernetes cluster to install your application with KOTS by provisioning a cluster on a virtual machine (VM) or bare metal server.

kURL provisions an embedded cluster on a virtual machine (VM) or bare metal server for customers that do not have their own Kubernetes cluster. Then KOTS installs the application on the embedded cluster.

Replicated kURL provisions Kubernetes clusters, which allow customers who do not have an existing cluster to install your application without provisioning a cluster themselves. Clusters created by kURL are called _embedded clusters_. Embedded clusters can be provisioned in online or air gap environments.

kURL has a built-in integration with KOTS through its KOTS add-on. With this integration, customers can run a kURL installation script in their virtual machine (VM) or bare metal server, which creates a cluster and then automatically installs KOTS in the cluster. Your application is then deployed with KOTS. 

For information about how to install applications in embedded clusters, see [Installing with kURL](/enterprise/installing-embedded-cluster). For information about how to create a specification for kURL, see [Creating a Kubernetes Installer](/vendor/packaging-embedded-kubernetes).

kURL is an open source project that is maintained by Replicated. For more information, see the [kURL repository](https://github.com/replicatedhq/kURL) in GitHub and the [kURL documentation](https://kurl.sh).

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