---
pagination_prev: null
---

import Replicated from "../partials/getting-started/_replicated-definition.mdx"
import Helm from "../partials/helm/_helm-definition.mdx"
import Kots from "../partials/kots/_kots-definition.mdx"
import KotsEntitlement from "../partials/kots/_kots-entitlement-note.mdx"
import SDKOverview from "../partials/replicated-sdk/_overview.mdx"

# About Distributing Applications

This topic provides an overview of distributing applications with Replicated. It includes information about the Replicated platform features used to distribute applications, as well as the options for packaging applications to be distributed with Replicated.

## About Distributing with Replicated

<Replicated/>

_Distributing_ software with Replicated refers to using Replicated features to enhance and support each phase of the commercial software distribution life cycle:
* Develop
* Test
* License
* Release
* Install
* Report
* Support

For more information about how Replicated defines the commercial software distribution life cycle, see [Introduction to Replicated](../intro-replicated).

The following diagram demonstrates the process of distributing an application with Replicated and then installing the application in an enterprise customer environment:

![replicated platform features workflow](/images/replicated-platform.png)

[View a larger version of this image](/images/replicated-platform.png)

As shown in the diagram above:
* The Replicated SDK can be distributed alongside an application to get access to an in-cluster API to more easily integrate key features.
* The Replicated compatibility matrix can be used to quickly generate Kubernetes clusters for running application tests as part of continuous integration and continuous delivery (CI/CD) workflows.
* After testing, application releases can be promoted to a channel in the Replicated vendor platform to be shared with customers or internal teams.
* Customers can be assigned to channels in order to control which application releases they are able to access and install.
* Customers' unique licenses grant proxy access to private application images through the Replicated proxy service.
* Before installation, customers can run preflight checks to verify that their environment meets installation requirements.
* Customers can install using any method, including the Helm CLI, Replicated KOTS, or any proprietary installation method already used by the ISV.
* Instance data is automatically sent to the vendor platform by the Replicated SDK. If the application was installed using KOTS, then KOTS also sends instance data.
* If any issues occur during installation or at runtime, customers can generate and send a support bundle. Support bundles can be uploaded in the vendor platform for analysis.

For more information about the Replicated features depicted in this diagram, see:
* [About the Replicated SDK](replicated-sdk-overview)
* [About the Compatibility Matrix](testing-about)
* [About Channels and Releases](releases-about)
* [About Customers](licenses-about)
* [About Installing an Application](/enterprise/installing-overview) in the KOTS documentation
* [Installing with Helm](install-with-helm)
* [About Preflight Checks and Support Bundles](preflight-support-bundle-about)
* [About Instance and Event Data](instance-insights-event-data)

## About Packaging Applications

This section describes the options for packaging an application that is distributed with the Replicated platform.
### Packaging with Helm (Recommended)

<Helm/>

Replicated strongly recommends that all applications are packaged using Helm because many enterprise users expect to be able to install an application with the Helm CLI. 

Helm-based applications distributed with Replicated can be installed with the Helm CLI or with the Replicated KOTS installer.

#### Helm CLI Installations

Helm-based applications distributed with the Replicated platform can be installed with the Helm CLI. This allows you to continue to support Helm CLI installations for your customers, while also having access to Replicated features such as tools for licensing, releasing, and supporting applications.

For more information about installing applications distributed with Replicated using the Helm CLI, see [Installing with Helm](install-with-helm).

#### KOTS Installations

<Kots/>

Deploying Helm-based applications with KOTS provides additional functionality not directly available with the Helm CLI, such as the KOTS admin console and support for air gap installations. Additionally, when you package your application using Helm, you can support Helm CLI and KOTS installations from the same release without having to maintain separate sets of Helm charts and application manifests.

For more information about how to distribute and install Helm charts with KOTS, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about).

<KotsEntitlement/>

### Packaging with Kubernetes

For ISVs that do not want to use Helm, applications distributed with Replicated can be packaged as standard Kubernetes manifest files. Applications packaged as Kubernetes manifests can be installed using Replicated KOTS or any proprietary installer already used by the ISV.

<Kots/>

For more information about how to distribute and install Kubernetes manifest-based applications with KOTS, see the [KOTS documentation](../intro-kots).

<KotsEntitlement/>

## About Distributing the Replicated SDK with an Application {#sdk}

<SDKOverview/>

For information about the Replicated SDK API endpoints, see [Replicated SDK API](/reference/replicated-sdk-apis). For information about developing against the SDK API locally, see [Developing Against the SDK API](replicated-sdk-development).