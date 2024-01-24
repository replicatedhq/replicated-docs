---
pagination_prev: null
---

import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"
import ReplHelmValues from "../partials/helm/_repl-helm-values-description.mdx"
import HelmLimitations from "../partials/helm/_helm-install-limitations.mdx"

# About Distributing Applications with Replicated

This topic describes distributing applications with the Replicated platform, including information about how to support installations with the Helm CLI and with the Replicated KOTS installer.

## Overview

_Distributing_ an application includes:
* Developing
* Testing
* Releasing
* Installing
* Reporting
* Supporting

The following diagram demonstrates an example workflow of distributing an application using the Replicated platform and installing in an enterprise customer environment:

![replicated platform](/images/replicated-platform.png)

[View a larger version of this image](/images/replicated-platform.png)

As shown in the diagram above, an application can be tested on clusters created by the compatiblity matrix. After testing, a new release can be created and promoted to a channel in the Replicated vendor platform to be shared with customers or internal teams. When the release is promoted, any licensed customers assigned to the given channel are able to install or upgrade to the release.  

## Installation Options

<img alt="Distribution and installation workflow" src="/images/installation-options.png" width="500px"/>

[View a larger version of this image](/images/installation-options.png)

### Helm CLI {#helm}

You can distribute Helm charts with Replicated and allow your customers to install with the Helm CLI. You can add the Replicated SDK Helm chart as a subchart of your application to get access to Replicated functionality. For more information, see [About Distributing the Replicated SDK with an Application](#sdk) below.

The following diagram shows how Helm charts distributed with Replicated are installed with Helm in customer environments:

<img src="/images/helm-install-diagram.png" alt="diagram of a helm chart in a custom environment" width="600px"/> 

[View a larger version of this image](/images/helm-install-diagram.png)

<HelmDiagramOverview/>

For more information about how to install an application with Helm, see [Installing with Helm](install-with-helm).

For information about how to get started distributing your Helm chart with Replicated, see [Replicated Quick Start](replicated-onboarding).

#### Replicated Helm Values {#replicated-values}

<ReplHelmValues/>

#### Limitations

<HelmLimitations/>

### Replicated KOTS

:::note
You must have the Replicated KOTS entitlement to use the Replicated KOTS and kURL installers and features.
:::

The Replicated KOTS installer provides highly successful installs of Kubernetes manifest-based applications or Helm charts in diverse customer environments, including both on-prem and air gap environments. 

Additionally, the Replicated kURL installer allows customers that do not have their own Kubernetes cluster to install your application with KOTS by provisioning a cluster on a virtual machine (VM) or bare metal server.

KOTS provides access to feautures such as:
* Support for air gap installations
* Insights and telemetry sent to the vendor portal for instances running in online or air gap environments
* The Replicated admin console, which provides a user interface where your customers can enter their application configuration preferences, upgrade their instance, view performance metrics, and more 
* Strict preflight checks that block installation if environment requirements are not met
* Backup and restore with Replicated snapshots
* Required releases with the **Prevent this release from being skipped during upgrades** option

For more information about KOTS installations, see [About Installing an Application](/enterprise/installing-overview).

#### Helm Charts with KOTS

Helm is a popular package manager for Kubernetes applications. For vendors that support installations with KOTS, Replicated strongly recommends that you distribute your application as a Helm chart. When you distribute your application as a Helm chart, you can support both installations with the Helm CLI and with KOTS from the same release, without having to maintain separate sets of Helm charts or application manifests. This is important because many enterprise users expect to be able to install an application with Helm.

Also, using KOTS to distribute Helm charts provides additional functionality not directly available with the Helm CLI, such as a user interface for collecting user configuration values and backup and restore with snapshots.

For information about how to get started distributing your Helm chart with Replicated so that you can support both installations with the Helm CLI and with KOTS, see [Replicated Quick Start](replicated-onboarding).

For more information about how KOTS installs Helm charts, see [About Distributing Helm Charts with KOTS](helm-native-about).

## About Distributing the Replicated SDK {#sdk}

<SDKOverview/>