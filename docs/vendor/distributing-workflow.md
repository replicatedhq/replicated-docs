import SDKOverview from "../partials/replicated-sdk/_overview.mdx"
import Community from "../partials/getting-started/_community.mdx"

# KOTS Onboarding Checklist

This topic describes how to onboard with Replicated KOTS in order to support KOTS installations for your application.

## Prerequisites

Complete the following prerequisites before you get started with KOTS:

* If your application is packaged using Helm, complete the Replicated [Quick Start](replicated-onboarding) workflow and the Replicated platform [Onboarding Checklist](/vendor/replicated-onboarding-checklist) _before_ configuring KOTS.

  This ensures that your Helm chart is updated to support key Replicated platform functionality before you add support for KOTS installations. 

* Complete a KOTS tutorial to understand the basic workflows of creating KOTS-enabled releases in the Replicated vendor platform and installing with KOTS. See:
  * **Helm**: [Deploy a Helm Chart with KOTS and the Helm CLI](/vendor/tutorial-kots-helm-setup)
  * **Standard Kubernetes manifests**: [KOTS Tutorial (UI)](/vendor/tutorial-kots-ui-setup)

* If you have not done so already, connect your external image registry to the Replicated vendor platform. This allows the Replicated proxy service to pull your application images so that you can test your deployment. See [Connecting to an External Registry](/vendor/packaging-private-images).

## Workflow

To onboard with KOTS:

1. [Configure Custom Resources](#cr)
1. [(Recommended) Add the Replicated SDK](#sdk)

### Configure Custom Resources {#cr}

To support installations with KOTS, you add a set of custom resources to your releases. These custom resources are consumed by KOTS and are _not_ deployed to the cluster. 

Replicated recommends that you configure and add one custom resource at a time by creating a release and then installing or updating with KOTS in a development environment to test. For more information, see:
* [Managing Releases with the Vendor Portal](releases-creating-releases)
* [About Installing an Application](/enterprise/installing-overview)
* [Updating Applications](/enterprise/updating-apps)

The table below provides a checklist of the custom resources to configure in order to enable KOTS installations for your application.

:::note
The custom resources are listed in a recommended order, though you can configure them in any order that you prefer.
:::

<table>
  <tr>
    <th width="25%">Custom Resource</th>
    <th width="50%">Description</th>
    <th width="25%">How To</th>
  </tr>
  <tr>
    <th>HelmChart</th>
    <td><p>Provides instructions for KOTS about how to deploy your Helm chart.</p><p><strong>Note:</strong> Required for supporting KOTS installations of Helm charts. Does not apply for standard manifest-based applications.</p></td>
    <td>
      <a href="helm-native-v2-using">Configuring the HelmChart Custom Resource</a>
    </td>
  </tr>
  <tr>
    <th>Preflight and SupportBundle</th>
    <td><p>Define preflight checks to test for system compliance during the installation process and reduce the number of support escalations.</p><p>Enable customers to quickly collect and analyze troubleshooting data from their clusters to help you diagnose problems with application deployments.</p></td>
    <td>
      <a href="/vendor/preflight-defining">Define Preflight Checks</a>
    </td>
  </tr>
  <tr>
  <th>Config</th>
    <td>
      <p>Create a configuration screen in the admin console to collect required and optional configuration values from your users.</p>
      <p><strong>Note:</strong> This feature does not apply to Kubernetes Operators.</p>
    </td>
    <td><a href="/vendor/admin-console-customize-config-screen">Creating and Editing Configuration Fields</a></td>
  </tr>
  <tr>
    <th>Application</th>
    <td><p>Control the KOTS experience for your application, including:</p>
    <ul>
      <li>Specify the application icon displayed in the admin console and download portal</li>
      <li>Customize the functionality of the admin console, such as adding port forwarding, custom graphs, and more</li>
      <li>Specify the minimum or target versions of KOTS that are required for installation</li>
      <li>Add status informers to display the current application status in the admin console and vendor portal</li>
    </ul>  
    </td>
    <td>
      <ul>
        <li><a href="admin-console-customize-app-icon">Admin Console and Download Portal Customization</a></li>
        <li><a href="admin-console-display-app-status">Adding Resource Status Informers</a></li>
        <li><a href="packaging-kots-versions">Setting Minimum and Target Versions for KOTS</a></li>
      </ul>
    </td>  
  </tr>
  <tr>
    <th>Installer</th>
    <td>Create a kURL specification so that your customers can provision a cluster in their VM or bare metal server.</td>
    <td><a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a></td>
  </tr>
  <tr>
    <th>Backup</th>
    <td>Enable snapshots so that end users can back up and restore their application data.</td>
    <td>
      <a href="snapshots-configuring-backups">Configuring Backup and Restore</a>
    </td>
  </tr>
</table>

### (Recommended) Add the Replicated SDK {#sdk}

<SDKOverview/>

## Get Help from the Community

<Community/>