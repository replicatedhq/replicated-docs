# Onboarding with KOTS

This topic describes how to onboard with Replicated KOTS, including prerequisites and the list of custom resources to add to your releases in order to support KOTS installations.

## Prerequisites

If you are new to Replicated, complete the following prerequisites before you get started with KOTS:
* Create an account in the vendor portal. You can either create a new team or join an existing team. For more information, see [Creating a Vendor Account](vendor-portal-creating-account).
* Complete a basic Replicated onboarding workflow to create an application and then promote and install initial releases in a development environment: 
  * (Recommended) For Helm chart-based applications, see [Replicated Quick Start](/vendor/replicated-onboarding).
  
    Distributing your application as a Helm chart is recommended because you can support both installations with the Helm CLI and with KOTS from the same release, without having to maintain separate sets of Helm charts or application manifests. For more information, see [Helm Charts with KOTS](/vendor/distributing-overview#helm-charts-with-kots) in _About Distributing Applications with Replicated_.

  * Alternatively, if you do _not_ intend to distribute a Helm chart-based application with Replicated, see [KOTS Tutorial (UI)](tutorial-ui-setup) for a workflow that uses a sample application with standard Kubernetes manifests.
* Review the [Features Checklist](/vendor/replicated-onboarding#features-checklist) in _Replicated Quick Start_ for a list of features to integrate with your application to fully onboard onto the Replicated platform. You can integrate these platform features before, during, or after onboarding with KOTS.

## Custom Resources Checklist

To support installations with KOTS, you add custom resources to your releases. The custom resources are consumed by KOTS and are not deployed to the cluster. This section provides a checklist of the custom resources to add, including links to additional documentation about how to configure each one.

Replicated recommends that you configure and add one custom resource at a time by creating a release and then upgrading in a development environment to test. The custom resources are listed in a recommended order, though you can add them to releases in any order that you prefer.

For more information about creating releases, see [Managing Releases with the Vendor Portal](releases-creating-releases). For more information about installing and upgrading with KOTS, see [About Installing an Application](/enterprise/installing-overview) and [Updating Applications](/enterprise/updating-apps).

<table>
  <tr>
    <th width="25%">Custom Resource</th>
    <th width="50%">Description</th>
    <th width="25%">How To</th>
  </tr>
  <tr>
    <td>HelmChart</td>
    <td><p>Provides instructions for KOTS about how to deploy your Helm chart.</p><p><strong>Note:</strong> Required for supporting KOTS installations of Helm charts.</p></td>
    <td>
      <ul>
        <li><a href="helm-native-v2-using">Configuring the HelmChart Custom Resource</a></li>
        <li><a href="helm-kots-using-sdk">Using an SDK-Enabled Helm Chart for KOTS Installations</a></li>
      </ul>  
    </td>
  </tr>
  <tr>
    <td>Preflight and SupportBundle</td>
    <td><p>Define preflight checks to test for system compliance during the installation process and reduce the number of support escalations.</p><p>Enable customers to quickly collect and analyze troubleshooting data from their clusters to help you diagnose problems with application deployments.</p><p><strong>Note:</strong> If you are using Helm charts, define the preflight and support bundle specifications within the Helm chart rather than creating custom resources.</p></td>
    <td>
      <ul>
        <li><a href="/vendor/preflight-helm-defining">Define Preflight Checks for Helm Charts</a></li>
        <li><a href="/vendor/preflight-kots-defining">Define Preflight Checks for KOTS</a></li>
      </ul>  
    </td>
  </tr>
  <tr>
  <td>Config</td>
    <td>
      <p>Create a configuration screen in the admin console to collect required and optional configuration values from your users.</p>
      <p><strong>Note:</strong> This feature does not apply to Kubernetes Operators.</p>
    </td>
    <td>
        <a href="/vendor/admin-console-customize-config-screen">Creating and Editing Configuration Fields</a>
    </td>
  </tr>
  <tr>
    <td>Application</td>
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
    <td>Installer</td>
    <td>Create a kURL specification so that your customers can provision a cluster in their VM or bare metal server.</td>
    <td><a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a></td>
  </tr>
  <tr>
    <td>Backup</td>
    <td>Enable snapshots so that end users can back up and restore their application data.</td>
    <td>
      <a href="snapshots-configuring-backups">Configuring Backup and Restore</a>
    </td>
  </tr>
</table>