import NativeHelmLimitations from "../partials/helm/_native-helm-limitations.mdx"
import TemplateLimitation from "../partials/helm/_helm-template-limitation.mdx"
import VersionLimitation from "../partials/helm/_helm-version-limitation.mdx"
import ReplicatedHelmDeprecated from "../partials/helm/_replicated-deprecated.mdx"
import HooksLimitation from "../partials/helm/_hooks-limitation.mdx"

# About Distributing Helm Charts

This topic describes the options and processes for using Replicated to distribute applications that are packaged with Helm charts.

## Overview

Helm is a popular package manager for Kubernetes applications. Replicated supports installing Helm charts with KOTS or with Helm directly. If you use KOTS to deploy your application, you can create a single release that supports both KOTS and Helm installations.

Using KOTS to distribute applications packaged with Helm provides additional functionality not available through Helm, such as a user interface for collecting user configuration values and backup and restore with snapshots.

The following table shows an overview of the Helm installation options:

<table>
<tr>
  <th width="20%">Type</th>
  <th width="20%">Installs with KOTS?</th>
  <th width="30%">Highlights</th>
  <th width="30%">How To</th>
</tr>
<tr>
  <td><a href="helm-install">Helm (Beta)</a></td>
  <td>No</td>
  <td><ul><li>Install and manage the chart with Helm</li><li>Additional Replicated features available through the Replicated SDK</li></ul></td>
  <td>Promote a release with your Helm chart. See <a href="/vendor/helm-install-release">Adding Your Helm Chart to a Release</a>.</td>  
</tr>
<tr>
  <td><a href="helm-native-about">Native Helm</a></td>
  <td>Yes</td>
  <td><ul><li>Recommended type for KOTS</li><li>Supports more Helm options, including hooks and weights</li><li>Supports air gap and kURL clusters</li></ul></td>
  <td>Set <code>useHelmInstall</code> to <code>true</code> in the Replicated HelmChart custom resource. See <a href="/vendor/helm-release">Creating a Release with Your Helm Chart for KOTS</a>.</td>
</tr>
<tr>
  <td><a href="helm-native-about">Replicated Helm</a></td>
  <td>Yes</td>
  <td><ul><li>Not recommended for new installations</li><li>Limited functionality for Helm hooks</li><li>Supports air gap and kURL clusters</li></ul></td>
  <td>Set <code>useHelmInstall</code> to <code>false</code> in the Replicated HelmChart custom resource. See <a href="/vendor/helm-release">Creating a Release with Your Helm Chart for KOTS</a>.</td>
</tr>
</table>