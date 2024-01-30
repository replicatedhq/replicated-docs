---
pagination_prev: null
---

import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"
import Replicated from "../partials/getting-started/_replicated-definition.mdx"
import Helm from "../partials/getting-started/_helm-definition.mdx"

# About Distributing Applications with Replicated

This topic provides an overview of distributing applications with the Replicated platform.

## Overview

<Replicated/>

_Distributing_ software with Replicated involves using Replicated features to enhance and support the key tasks as part of the software development cycle.

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

## About the Application Packaging Options

Applications distributed with Replicated can be packaged using Helm, Kubernetes manifests, or Kubernetes Operators. Howevever, Replicated strongly recommends that all applications are packaged using Helm because many enterprise users expect to be able to install an application with the Helm CLI.

<Helm/>

<table>
  <tr>
    <th>Packager</th>
    <th>Installer</th>
  </tr>
  <tr>
    <td>Helm</td>
    <td>Helm CLI</td>
  </tr>
  <tr>
    <td>Helm</td>
    <td>KOTS</td>
  </tr>
  <tr>
    <td>Kubernetes manifests</td>
    <td>KOTS</td>
  </tr>
</table>

## About Distributing the Replicated SDK

<SDKOverview/>