import Kots from "../docs/partials/kots/_kots-definition.mdx"

# Introduction to KOTS

This topic provides an introduction to the Replicated KOTS installer, including information about KOTS features, installation options, and user interfaces.

:::note
The Replicated KOTS entitlement is required to install applications with KOTS. For more information, see [Pricing](https://www.replicated.com/pricing) on the Replicated website.
:::

## Overview

<Kots/>

KOTS communicates securely with the Replicated vendor platform to synchronize customer licenses, check for available application updates, send instance data, share customer-generated support bundles, and more.

Installing an application with KOTS provides access to feautures such as:

* Support for air gap installations
* Support for installations on VMs or bare metal servers
* The KOTS Admin Console, which provides a user interface where customers can install and manage their application instances
* Instance telemetry automatically sent to the vendor portal for instances running in customer environments
* Strict preflight checks that block installation if environment requirements are not met
* Backup and restore with Replicated snapshots
* Support for marking releases as required to prevent users from skipping them during upgrades

KOTS is an open source project that is maintained by Replicated. For more information, see the [kots](https://github.com/replicatedhq/kots) repository in GitHub.

## About Installing with KOTS

KOTS can be used to install applications in Kubernetes clusters, including:
* Existing clusters brought by the user
* Online or air gapped clusters
* Embedded clusters provisioned on VMs or bare metal servers with Replicated Embedded Cluster or Replicated kURL

To install an application with KOTS, users first run an installation script to install KOTS in the target cluster and deploy the KOTS Admin Console. After KOTS is installed, users can log in to the KOTS Admin Console to upload their license file, configure the application, run preflight checks, and install and deploy the application.

The following diagram demonstrates how a single release promoted to the Stable channel in the Replicated vendor platform can be installed using KOTS in an embedded cluster on a VM, in an air gapped cluster, and in an existing internet-connected cluster:

<img alt="Embedded cluster, air gap, and existing cluster app installation workflows" src="/images/kots-installation-overview.png"/>

[View a larger version of this image](/images/kots-installation-overview.png)

As shown in the diagram above: 
* For installations in existing internet-connected clusters, users run a command to install KOTS in their cluster.
* For embedded cluster installations on VMs or bare metal servers, users run an installation script that both provisions a cluster in their environment and installs KOTS in the cluster.
* For installations in air gapped clusters, users download air gap bundles for KOTS and the application from the Replicated download portal and then provide the bundles during installation.

All users must provide a license file to install with KOTS. After KOTS is installed in the cluster, users can access the KOTS Admin Console to provide their license file and deploy the application.

For more information about how to install applications with KOTS, see the [Installing an Application](/enterprise/installing-overview) section.

## KOTS User Interfaces

This section describes the KOTS interfaces available to users for installing and managing applications.

### KOTS Admin Console

KOTS provides an Admin Console to make it easy for users to install, manage, update, configure, monitor, backup and restore, and troubleshoot their application instance from a GUI.

The following shows an example of the Admin Console dashboard for an application:

![Admin Console Dashboard](/images/guides/kots/application.png)

[View a larger version of this image](/images/guides/kots/application.png)

### KOTS CLI

The kots command-line interface (CLI) is a kubectl plugin. Customers can run commands with the KOTS CLI to install and manage their application instances with KOTS programmatically.

For information about getting started with the KOTS CLI, see [Installing the KOTS CLI](/reference/kots-cli-getting-started).

The KOTS CLI can also be used to install an application without needing to access the Admin Console. This can be useful for automating installations and upgrades. For information about how to run automated installations with the KOTS CLI, see [Installing with the CLI](/enterprise/installing-existing-cluster-automation).