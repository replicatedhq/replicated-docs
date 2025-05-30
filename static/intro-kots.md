# Introduction to KOTS

This topic provides an introduction to the Replicated KOTS installer, including information about KOTS features, installation options, and user interfaces.

:::note
The Replicated KOTS entitlement is required to install applications with KOTS. For more information, see [Pricing](https://www.replicated.com/pricing) on the Replicated website.
:::

## Overview

Replicated KOTS is a kubectl plugin and an in-cluster Admin Console that provides highly successful installations of Helm charts and Kubernetes applications into customer-controlled environments, including on-prem and air gap environments.

KOTS communicates securely with the Replicated Vendor Portal to synchronize customer licenses, check for available application updates, send instance data, share customer-generated support bundles, and more.

Installing an application with KOTS provides access to features such as:

* Support for air gap installations in environments with limited or no outbound internet access
* Support for installations on VMs or bare metal servers, when using Replicated Embedded Cluster or Replicated kURL
* The KOTS Admin Console, which provides a user interface where customers can install and manage their application instances
* Instance telemetry automatically sent to the Vendor Portal for instances running in customer environments
* Strict preflight checks that block installation if environment requirements are not met
* Backup and restore with Replicated snapshots
* Support for marking releases as required to prevent users from skipping them during upgrades

KOTS is an open source project that is maintained by Replicated. For more information, see the [kots](https://github.com/replicatedhq/kots) repository in GitHub.

## About Installing with KOTS

KOTS can be used to install Kubernetes applications and Helm charts in the following environments:
* Clusters provisioned on VMs or bare metal servers with Replicated Embedded Cluster or Replicated kURL
* Existing clusters brought by the user
* Online (internet-connected) or air-gapped (disconnected) environments

To install an application with KOTS, users first run an installation script that installs KOTS in the target cluster and deploys the KOTS Admin Console. After KOTS is installed, users can log in to the KOTS Admin Console to upload their license file, configure the application, run preflight checks, and install and deploy the application.

The following diagram demonstrates how a single release promoted to the Stable channel in the Vendor Portal can be installed with KOTS in an embedded cluster on a VM, in an existing air-gapped cluster, and in an existing internet-connected cluster:

<img alt="Embedded cluster, air gap, and existing cluster app installation workflows" src="/images/kots-installation-overview.png"/>

[View a larger version of this image](/images/kots-installation-overview.png)

As shown in the diagram above: 
* For installations in existing online (internet-connected) clusters, users run a command to install KOTS in their cluster.
* For installations on VMs or bare metal servers, users run an Embedded Cluster or kURL installation script that both provisions a cluster in their environment and installs KOTS in the cluster.
* For installations in air-gapped clusters, users download air gap bundles for KOTS and the application from the Replicated Download Portal and then provide the bundles during installation.

All users must have a valid license file to install with KOTS. After KOTS is installed in the cluster, users can access the KOTS Admin Console to provide their license and deploy the application.

For more information about how to install applications with KOTS, see the [Installing an Application](/enterprise/installing-overview) section.

## KOTS User Interfaces

This section describes the KOTS interfaces available to users for installing and managing applications.

### KOTS Admin Console

KOTS provides an Admin Console to make it easy for users to install, manage, update, configure, monitor, backup and restore, and troubleshoot their application instance from a GUI.

The following shows an example of the Admin Console dashboard for an application:

![Admin Console Dashboard](/images/guides/kots/application.png)

[View a larger version of this image](/images/guides/kots/application.png)

For applications installed with Replicated Embedded Cluster in a VM or bare metal server, the Admin Console also includes a **Cluster Management** tab where users can add and manage nodes in the embedded cluster, as shown below:

![Admin console dashboard with Cluster Management tab](/images/gitea-ec-ready.png)

[View a larger version of this image](/images/gitea-ec-ready.png)

### KOTS CLI

The KOTS command-line interface (CLI) is a kubectl plugin. Customers can run commands with the KOTS CLI to install and manage their application instances with KOTS programmatically.

For information about getting started with the KOTS CLI, see [Installing the KOTS CLI](/reference/kots-cli-getting-started).

The KOTS CLI can also be used to install an application without needing to access the Admin Console. This can be useful for automating installations and upgrades, such as in CI/CD pipelines. For information about how to perform headless installations from the command line, see [Install with the KOTS CLI](/enterprise/installing-existing-cluster-automation).