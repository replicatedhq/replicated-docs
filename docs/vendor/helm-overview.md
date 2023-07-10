# About Distributing Helm Charts with Replicated

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
  <td><p>Add your Helm chart to a release.</p>
  <p>See <a href="/vendor/helm-install-release">Creating a Release with Your Helm Chart (Beta)</a>.</p></td>  
</tr>
<tr>
  <td><a href="helm-native-about">kots.io/v1beta2</a></td>
  <td>Yes</td>
  <td><ul><li>Recommended type for KOTS</li><li>Supports Helm templating</li><li>Supports air gap and kURL clusters</li></ul></td>
  <td><p>Add your Helm chart and a <code>apiVersion: kots.io/v1beta2</code> Replicated HelmChart custom resource to a release.</p><p>See <a href="/vendor/helm-release">Creating a Release with Your Helm Chart for KOTS</a>.</p></td>
</tr>
<tr>
  <td><a href="helm-native-about">kots.iov1beta1</a> (Native Helm)</td>
  <td>Yes</td>
  <td><ul><li>Deprecated. Not recommended for new installations</li><li>Supports some Helm features like hooks and weights</li><li>Supports air gap and kURL clusters</li></ul></td>
  <td>
    <p>Add your Helm chart and a <code>apiVersion: kots.io/v1beta1</code> Replicated HelmChart custom resource with <code>useHelmInstall: true</code> to a release.</p>
    <p>See <a href="/reference/custom-resource-helmchart">HelmChart v1</a>.</p>
  </td>
</tr>
<tr>
  <td><a href="helm-native-about">Replicated Helm</a></td>
  <td>Yes</td>
  <td>Deprecated. Not recommended for new installations</td>
  <td><p>Add your Helm chart and a <code>apiVersion: kots.io/v1beta1</code> Replicated HelmChart custom resource with <code>useHelmInstall: false</code> to a release.</p><p>See <a href="/reference/custom-resource-helmchart">HelmChart v1</a>.</p></td>
</tr>
</table>