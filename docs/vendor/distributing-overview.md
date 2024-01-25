---
pagination_prev: null
---

import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"
import ReplHelmValues from "../partials/helm/_repl-helm-values-description.mdx"
import HelmLimitations from "../partials/helm/_helm-install-limitations.mdx"

# About Distributing Applications with Replicated

This topic describes distributing applications with the Replicated platform.

## Overview

Independent software vendors (ISVs) can use features of the Replicated platform to distribute modern enterprise software into complex, customer-controlled environments, including on-prem and air gap.

_Distributing_ software with Replicated includes using Replicated features to enhance and support each phase of the software development cycle, as shown below:

<img alt="oftware development lifecycle wheel" src="/images/software-dev-lifecycle.png" width="600px"/>

[View a larger version of this image](/images/software-dev-lifecycle.png)

The following describes the phases of the software development lifecycle:

* **Develop**: Development teams quickly integrate and test new features.
* **Test**: Run automated tests in several customer-representative environments as part of continuous integration and continuous delivery (CI/CD) workflows.
* **License**: Customers have access to the correct features based on their license.
* **Release**: Use an single, automated release process to share new releases with both on-prem and SaaS customers.
* **Install**: Provide unique installation options depending on customers' preferences and experience levels.
* **Report**: Collect adoption and performance data for application instances running in customer environments.
* **Support**: Triage and resolve support issues quickly.

## Distribution Workflow with Replicated

The features of the Replicated platform can be used together to distribute enterprise software according to the software development lifecycle. The following diagram provides an example workflow of distributing an application with Replicated:

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

## About Distributing Helm Charts or Standard Kubernetes Manifests

Replicated recommends that applications are distributed as Helm charts.

KOTS supports installations for applications distributed as standard Kubernetes manifests.

### Distributing Helm Charts with KOTS

Helm is a popular package manager for Kubernetes applications. For vendors that support installations with KOTS, Replicated strongly recommends that you distribute your application as a Helm chart. When you distribute your application as a Helm chart, you can support both installations with the Helm CLI and with KOTS from the same release, without having to maintain separate sets of Helm charts or application manifests. This is important because many enterprise users expect to be able to install an application with Helm.

Also, using KOTS to distribute Helm charts provides additional functionality not directly available with the Helm CLI, such as a user interface for collecting user configuration values and backup and restore with snapshots.

For information about how to get started distributing your Helm chart with Replicated so that you can support both installations with the Helm CLI and with KOTS, see [Replicated Quick Start](replicated-onboarding).

For more information about how KOTS installs Helm charts, see [About Distributing Helm Charts with KOTS](helm-native-about).

The following diagram demonstrates installation options:

<img src="/images/installation-options.png" width="600px" alt="installation workflow"/>

## About Distributing the Replicated SDK

<SDKOverview/>