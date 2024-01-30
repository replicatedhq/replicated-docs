---
pagination_prev: null
---

import Replicated from "../partials/getting-started/_replicated-definition.mdx"
import Helm from "../partials/getting-started/_helm-definition.mdx"
import KotsEntitlement from "../partials/kots/_kots-entitlement-note.mdx"
import SDKOverview from "../partials/replicated-sdk/_overview.mdx"

# About Distributing Applications with Replicated

This topic provides an overview of distributing applications with the Replicated platform.

## Overview

<Replicated/>

_Distributing_ software with Replicated refers to using Replicated features during each phase of the software development cycle. For more information about how Replicated defines the software development cycle and the Replicated features that support each phase of the lifecycle, see [Introduction to Replicated](../intro-replicated).

The following diagram demonstrates the process of distributing an application with the Replicated platform:

![replicated platform features workflow](/images/replicated-platform.png)

[View a larger version of this image](/images/replicated-platform.png)

As shown in the diagram above:
* The Replicated SDK can be distributed alongside an application to get access to an in-cluster API to more easily integrate key functionality.
* The Replicated compatibility matrix can be used to quickly generate Kubernetes clusters for running application tests as part of CI/CD workflows.
* After testing, application releases can be promoted to a channel in the Replicated vendor platform to be shared with customers or internal teams.
* Customers can be assigned to channels in order to control which application releases they are able to access and install.
* Customers' unique licenses grant proxy access to private application images through the Replicated proxy service.
* Before installation, customers can run preflight checks to verify that their environment meets installation requirements.
* After installation, instance telemtry is automatically sent back to the vendor platform by the Replicated SDK. If the application was installed using Replicated KOTS, then KOTS also sends telemetry data.
* If any issues occur during installation or at runtime, customers can generate a support bundle. Support bundles can also be uploaded in the vendor platform for analysis.

For more information about the Replicated features depicted in this diagram, see:
* [About the Replicated SDK](replicated-sdk-overview)
* [About the Compatibility Matrix](testing-about)
* [About Channels and Releases](releases-about)
* [About Customers](licenses-about)
* [About Installing an Application](/enterprise/installing-overview) in the KOTS documentation
* [Installing with Helm](install-with-helm)
* [About Preflight Checks and Support Bundles](preflight-support-bundle-about)
* [About Instance and Event Data](instance-insights-event-data)

## About Packaging an Application

This section describes the options for packaging an application that is distributed with the Replicated platform.
### Packaging with Helm

<Helm/>

Replicated strongly recommends that all applications are packaged using Helm because many enterprise users expect to be able to install an application with the Helm CLI. Helm-based applications distributed with Replicated can be deployed with the Helm CLI or with the Replicated KOTS installer:

* **Helm CLI**: For applications deployed with the Helm CLI, Replicated platform features such as licensing and the proxy service ensure that customers have access to the right features and application images. For more information about installing applications with the Helm CLI, see [Installing with Helm](install-with-helm).
* **KOTS**: Deploying Helm-based applications with KOTS provides additional functionality not directly available with the Helm CLI, such as the KOTS admin console and support for air gap installations. Additionally, when you package your application using Helm, you can support Helm CLI and KOTS installations from the same release without having to maintain separate sets of Helm charts and application manifests. 

  For more information about how to deploy Helm charts with KOTS, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about).

  :::note
  The Replicated KOTS entitlement is required to install applications with KOTS. For more information, see [Pricing](https://www.replicated.com/pricing) on the Replicated website.
  :::

### (KOTS Only) Packaging with Kubernetes

For ISVs that do not want to use Helm, applications distributed with Replicated can alternatively be packaged with standard Kubernetes manifests or with Kubernetes Operators. Replicated recommends that Operators are used only for specific use cases, as Operators can be difficult to build and maintain. For more information about the common use cases for Operators, see [Distributing Operators in KOTS](https://www.replicated.com/blog/operators-in-kots) in the _Replicated Blog_.

Applications packaged with Kubernetes manifests or Operators can be installed using the Replicated KOTS installer or any proprietary installer already used by the ISV. For more information about how to get started with KOTS, see [Onboarding with KOTS](distributing-workflow).

<KotsEntitlement/>

## About Distributing the Replicated SDK with an Application

<SDKOverview/>

For information about the Replicated SDK API endpoints, see [Replicated SDK API](/reference/replicated-sdk-apis). For information about developing against the SDK API locally, see [Developing Against the SDK API](replicated-sdk-development).