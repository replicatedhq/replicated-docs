import NativeHelmLimitations from "../partials/helm/_native-helm-limitations.mdx"
import TemplateLimitation from "../partials/helm/_helm-template-limitation.mdx"
import VersionLimitation from "../partials/helm/_helm-version-limitation.mdx"
import HelmCLILimitations from "../partials/helm/_helm-cli-limitations.mdx"
import ReplicatedHelmDeprecated from "../partials/helm/_replicated-deprecated.mdx"
import HooksLimitation from "../partials/helm/_hooks-limitation.mdx"

# About Distributing Helm Charts with Replicated

This topic describes the options and processes for using Replicated KOTS to deploy applications that are packaged with Helm charts.

## Overview

Helm is a popular package manager for Kubernetes applications. Using KOTS to distribute applications packaged with Helm provides additional functionality not available through Helm, such as preflight checks, support bundles, a user interface for collecting user configuration values, support for using private images, and more.

Replicated supports installing Helm charts with KOTS or with Helm directly. If you use KOTS to deploy your application, you can create a single release that supports both KOTS and Helm installations.

The following table show an overview of the Helm installation options:

<table>
<tr>
  <th width="20%">Type</th>
  <th width="15%">Installs with KOTS?</th>
  <th width="25%">Supported On</th>
  <th width="40">Highlights</th>
</tr>
<tr>
  <td><a href="helm-overview#helm-cli">Helm (Beta)</a></td>
  <td>No</td>
  <td>Existing online clusters</td>
  <td><ul><li>Uses Helm to deploy the chart</li><li>Additional Replicated features available through the Replicated SDK</li></ul></td>
</tr>
<tr>
  <td><a href="helm-overview#native">Native Helm</a></td>
  <td>Yes</td>
  <td><ul><li>Existing clusters</li><li>Embedded clusters</li><li>Air gap</li></ul></td>
  <td><ul><li>Recommended type for KOTS</li><li>Supports more Helm options, including hooks and weights</li></ul></td>
</tr>
<tr>
  <td><a href="helm-overview#replicated">Replicated Helm</a></td>
  <td>Yes</td>
  <td><ul><li>Existing clusters</li><li>Embedded clusters</li><li>Air gap</li></ul></td>
  <td><ul><li>Not recommended for new installations</li><li>Limited functionality for Helm hooks</li></ul></td>
</tr>
</table>

## Limitations

There are different limitations depending on if your customers install and manage the application with KOTS or if they use the helm CLI directly. For more information, see:

* [Limitations](helm-release#replicated-helm-limitations) in _Supporting Native Helm and Replicated Helm_
* [Limitations](helm-install#limitations) in _Supporting helm CLI Installations (Beta)_