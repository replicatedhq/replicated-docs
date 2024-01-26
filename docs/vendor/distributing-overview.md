---
pagination_prev: null
---

import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"
import ReplHelmValues from "../partials/helm/_repl-helm-values-description.mdx"
import HelmLimitations from "../partials/helm/_helm-install-limitations.mdx"
import SDLC from "../partials/getting-started/_sdlc-phases.mdx"

# About Distributing Applications with Replicated

This topic provides an overview of distributing applications with the Replicated platform.

## Overview

Independent software vendors (ISVs) can use features of the Replicated platform to distribute modern enterprise software into complex, customer-controlled environments, including on-prem and air gap.

_Distributing_ software with Replicated includes using Replicated features to enhance and support each phase of the software development cycle, as shown below:

<img alt="software development lifecycle wheel" src="/images/software-dev-lifecycle.png" width="800px"/>

[View a larger version of this image](/images/software-dev-lifecycle.png)

The following describes the phases of the software development lifecycle:

<SDLC/>

## Distribution Workflow with Replicated

The features of the Replicated platform can be used to distribute enterprise software according to the software development lifecycle. The following diagram provides an example workflow of distributing an application with Replicated:

![replicated platform features workflow](/images/replicated-platform.png)

[View a larger version of this image](/images/replicated-platform.png)

As shown in the diagram above:
* The Replicated SDK can be distributed alongside an application to get access to an in-cluster API for more easily integrating key functionality
* Test on compatibility matrix as part of CI/CD workflows
* Automatically create releases after tests pass and promote to a channel in the vendor platform to share the release with customers or internal teams
* Create and assign customers to channels to control which customers have access to which releases
* Customers can use their unqiue license to get proxy access to private iages through the Replicated proxy service and then install
* During installation, customers can run customized preflight checks to be confident that installation will succeed
* After installation, either KOTS, the SDK, or both are running in the cluster alongside the application. Both KOTS and the SDK automatically send instance telemetry back to the vendor platform
* Customers can generate and send customized support bundles, which can then be uploaded in the vendor platform for analysis

## About Distributing Helm Charts

Helm is a popular open source package manager for Kubernetes applications. Many ISVs use Helm to configure and deploy Kubernetes applications because it provides a consistent, reusable, and sharable packaging format. For more information, see the [Helm documentation](https://helm.sh/docs).

Replicated strongly recommends that all applications are packaged using Helm because many enterprise users expect to be able to install an application with the Helm CLI.

### With the Helm CLI

The following diagram shows how Helm charts distributed with Replicated are installed with Helm in customer environments:

<img src="/images/helm-install-diagram.png" alt="diagram of a helm chart in a custom environment" width="700px"/> 

[View a larger version of this image](/images/helm-install-diagram.png)

<HelmDiagramOverview/>

### With KOTS

For vendors that support installations with Replicated KOTS, you can support both with the Helm CLI and with KOTS from the same release without having to maintain separate sets of Helm charts or application manifests, as shown in the diagram below:

<img src="/images/installation-options.png" width="600px" alt="One release being installed into three different customer environments"/>

[View a larger version of this image](/images/installation-options.png)

Using KOTS to distribute Helm charts also provides additional functionality not directly available with the Helm CLI, such as a user interface for collecting user configuration values and backup and restore with snapshots.

For more information about how KOTS installs Helm charts, see [About Distributing Helm Charts with KOTS](helm-native-about).

## About Distributing the Replicated SDK with an Application

<SDKOverview/>