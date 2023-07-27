import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import HelmDiagramOverview from "../partials/helm/_helm-diagram-overview.mdx"

# About Distributing Applications with Replicated

This topic describes the options for using Replicated to distribute applications, including information about supporting installation with the Helm CLI and with Replicated KOTS.

## About Supporting Installations with the Helm CLI {#helm}

You can distribute your Helm chart-based application with Replicated and allow your customers to install with the Helm CLI. The following diagram shows how Helm charts distributed with Replicated are installed with Helm in customer environments:

<img src="/images/helm-install-diagram.png" alt="diagram of a helm chart in a custom environment" width="600px"/> 

<HelmDiagramOverview/>

For more information about how to install an application with Helm, see [Installing an Application with Helm](install-with-helm).

For information about how to get started distributing your Helm chart with Replicated, see [Package a Helm Chart for a Release](helm-install-release).

### Replicated SDK

<SDKOverview/>

For more information, see [About the Replicated SDK (Beta)](replicated-sdk-overview).
### Limitations

The following limitations apply when using Helm to install applications distributed with Replicated:

* Replicated does not support Helm installations into air gap environments.

* Helm installations do not provide access to any of the features of the Replicated KOTS installer, including:
  * The Replicated admin console
  * Strict preflight checks that block installation
  * Backup and restore with snapshots
  * Required releases with the **Prevent this release from being skipped during upgrades** option

## About Supporting Installations with KOTS

:::note
You must have the Replicated KOTS entitlement to use the Replicated KOTS and kURL installers and features.
:::

The Replicated KOTS installer provides highly successful installs of Kubernetes applications or Helm charts in diverse customer environments, including on-prem and air gap environments. Additionally, the Replicated kURL installer allows customers that do not have their own Kubernetes cluster to install your application with KOTS by provisioning a cluster on a virtual machine (VM) or bare metal server. For more information, see [About KOTS and kURL](../intro-kots).

The following diagram demonstrates how applications distributed with Replicated are installed into an existing cluster or VM with KOTS and kURL:

![KOTS and kURL deployments](/images/replicated-components-diagram.png)

[View larger image](/images/replicated-components-diagram.png)

As shown in the diagram above, customers can install an application by first installing KOTS in their existing cluster or in the cluster provisioned by kURL. Then, they can use KOTS to configure and install the application. For more information about installing with KOTS and kURL, see [About Installing an Application](/enterprise/installing-overview).

### About Installing Helm Charts with KOTS

Helm is a popular package manager for Kubernetes applications. For vendors that support installation with Replicated KOTS, Replicated strongly recommends that you distribute your application as a Helm chart. When you distribute your application as a Helm chart, you can support both installations with the Helm CLI and with KOTS from the same release, without having to maintain separate sets of Helm charts or application manifests. This is important because many enterprise users expect to be able to install an application with Helm.

Additionally, using KOTS to distribute applications packaged with Helm provides additional functionality not directly available with the Helm CLI, such as a user interface for collecting user configuration values and backup and restore with snapshots.

The following table shows an overview of the installation options when you distribute a Helm chart-based application with Replicated:

<table>
<tr>
  <th width="20%">Installation Method</th>
  <th width="30%">Highlights</th>
  <th width="30%">How To</th>
</tr>
<tr>
  <td><a href="helm-native-about">kots.io/v1beta2</a></td>
  <td><ul><li>Supports most Helm features</li><li>Supports air gap and kURL clusters</li></ul></td>
  <td><p>Add your Helm chart and a <code>apiVersion: kots.io/v1beta2</code> Replicated HelmChart custom resource to a release.</p><p>See <a href="/vendor/helm-native-v2-using">Configuring the HelmChart Custom Resource</a>.</p></td>
</tr>
<tr>
  <td><a href="helm-native-about">kots.io/v1beta1</a> (Native Helm)</td>
  <td><ul><li>Deprecated. Not recommended for new installations</li><li>Supports some Helm features like hooks and weights</li><li>Supports air gap and kURL clusters</li></ul></td>
  <td>
    <p>Add your Helm chart and a <code>apiVersion: kots.io/v1beta1</code> Replicated HelmChart custom resource with <code>useHelmInstall: true</code> to a release.</p>
    <p>See <a href="/reference/custom-resource-helmchart">HelmChart v1</a>.</p>
  </td>
</tr>
<tr>
  <td><a href="helm-native-about">Replicated Helm</a></td>
  <td>Deprecated. Not recommended for new installations</td>
  <td><p>Add your Helm chart and a <code>apiVersion: kots.io/v1beta1</code> Replicated HelmChart custom resource with <code>useHelmInstall: false</code> to a release.</p><p>See <a href="/reference/custom-resource-helmchart">HelmChart v1</a>.</p></td>
</tr>
</table>  