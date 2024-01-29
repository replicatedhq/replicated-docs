---
pagination_prev: null
---

import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"
import HelmChartsKots from "../partials/helm/_helm-charts-kots.mdx"

# About Distributing Applications with Replicated

This topic provides an overview of distributing applications with the Replicated platform.

## Overview

Replicated is a commercial software distribution platform. Independent software vendors (ISVs) can use features of the Replicated platform to distribute modern enterprise software into complex, customer-controlled environments, including on-prem and air gap.

_Distributing_ software includes completing key tasks as part of each phase of the software development lifecycle, as shown below:

<img alt="software development lifecycle wheel" src="/images/software-dev-lifecycle.png" width="800px"/>

[View a larger version of this image](/images/software-dev-lifecycle.png)

The following describes the phases of the software development lifecycle:

* **Develop**: Application design and architecture decisions align with customer needs, and development teams quickly integrate and test new features.
* **Test**: Run automated tests in several customer-representative environments as part of continuous integration and continuous delivery (CI/CD) workflows.
* **License**: Licenses are customized to each customer and are easy to issue, manage, and update.
* **Release**: Use a single, automated release process to share new releases with both on-prem and SaaS customers.
* **Install**: Provide unique installation options depending on customers' preferences and experience levels.
* **Report**: Make more informed prioritization decisions by collecting adoption and performance data for application instances running in customer environments.
* **Support**: Diagnose and resolve support issues quickly.

## Application Distribution Workflow

Distributing software with Replicated includes using Replicated features to enhance and support each phase of the software development cycle.

The following diagram provides an example workflow of distributing an application using the Replicated platform:

![replicated platform features workflow](/images/replicated-platform.png)

[View a larger version of this image](/images/replicated-platform.png)

As shown in the diagram above:
* The Replicated SDK can be distributed alongside an application to get access to an in-cluster API to more easily integrate key functionality.
* The Replicated compatibility matrix can be used to quickly generate Kubernetes clusters for running application tests as part of CI/CD workflows.
* After testing, application releases can be promoted to a channel in the Replicated vendor platform to be shared with customers or internal teams.
* Customers can be assigned to channels in order to control which application releases they are able to access and install.
* Customers' unique licenses grant proxy access to private application images through the Replicated proxy service.
* Before installation, customers can install the kubectl preflight plugin (provided by the Troubleshoot open source project) to run preflight checks. Preflight checks verify the environment meets application requirements.
* After installation, instance telemtry is automatically sent back to the vendor platform by the Replicated SDK. If the application was installed using Replicated KOTS, then KOTS also sends telemetry data.
* If any issues occur during installation or at runtime, customers can install the kubectl support-bundle plugin (provided by the Troubleshoot open source project) to generate a support bundle. Support bundles can then be uploaded in the vendor platform for analysis.

For more information about how to get started with the features of the Replicated platform, see the Replicated [Onboarding Checklist](replicated-onboarding-checklist). 

## About Distributing Helm Charts

Helm is a popular open source package manager for Kubernetes applications. Many ISVs use Helm to configure and deploy Kubernetes applications because it provides a consistent, reusable, and sharable packaging format. For more information, see the [Helm documentation](https://helm.sh/docs).

Applications distributed with Replicated can be packaged using Helm, Kubernetes manifests, or Kubernetes Operators. Howevever, Replicated strongly recommends that all applications are packaged using Helm because many enterprise users expect to be able to install an application with the Helm CLI.

For more information about the installation options for Helm charts distributed with Replicated, see the sections below:
* [With the Helm CLI](#with-the-helm-cli)
* [With KOTS](#with-kots)

### With the Helm CLI

Helm charts distributed with Replicated can be installed with the Helm CLI. The following diagram shows how Helm charts distributed with Replicated are installed with Helm in customer environments:

<img src="/images/helm-install-diagram.png" alt="diagram of a helm chart in a custom environment" width="700px"/> 

[View a larger version of this image](/images/helm-install-diagram.png)

<HelmDiagramOverview/>

For more information, including limitations and installation instructions, see [Installing with Helm](install-with-helm).

### With KOTS

The Replicated KOTS installer provides highly successful installs of Kubernetes applications or Helm charts in diverse customer environments, including on-prem and air gap environments.

<HelmChartsKots/>

The following diagram demonstrates how a single release containing one or more Helm charts can be installed using either the Helm CLI or KOTS, including using KOTS to install into embedded clusters and air gap environments:

<img src="/images/helm-kots-install-options.png" width="600px" alt="One release being installed into three different customer environments"/>

[View a larger version of this image](/images/helm-kots-install-options.png)

For more information about how KOTS installs Helm charts, see [About Distributing Helm Charts with KOTS](helm-native-about).

## About Distributing the Replicated SDK

<SDKOverview/>