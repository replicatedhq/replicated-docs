# Getting Started with KOTS

This topic provides information for new users about how to get started with Replicated KOTS. 

## Prerequisites

## KOTS Checklist

The following table describes the KOTS functionality to integrate with your application to support installations with KOTS.

<table>
  <tr>
    <th width="50%">Task</th>
    <th width="20">How To</th>
  </tr>
  <tr>
    <td><p>Configure the HelmChart custom resource to install Helm charts with KOTS.</p></td>
    <td><a href="helm-native-v2-using">Configuring the HelmChart Custom Resource</a></td>
  </tr> 
  <tr>
    <td><p>Create a Configuration screen in the admin console to collect required and optional configuration values from your users.</p><p><strong>Note:</strong> This feature does not apply to Kubernetes Operators.</p></td>
    <td><a href="admin-console-customize-config-screen">Creating and Editing Configuration Fields</a></td>
  </tr> 
  <tr>
    <td>Status informers are supported Kubernetes resources that KOTS watches for changes in state. Add one or more status informers to display the current application status for your users on the admin console dashboard. Additionally, status informers allow you to get insights on the status of application instances running in customer environments. See <a href="admin-console-display-app-status">Adding Resource Status Informers</a>.</td>
    <td></td>
  </tr>
  <tr>
    <td>kURL Installer</td>
    <td>Create a Kubernetes installer specification file (or add to an existing specification) so that your customers can provision a cluster in their VM or bare metal server. See <a href="packaging-embedded-kubernetes">Creating a Kubernetes Installer</a>.</td>
  </tr>
  <tr>
    <td>Backup and Restore (Snapshots)</td>
    <td>Enable snapshots so that end users can back up and restore their application data. See <a href="snapshots-configuring-backups">Configuring Backup and Restore</a>.</td>
  </tr>
  <tr>
    <td>KOTS Annotations</td>
    <td>
    <p>Add annotations to manage resources and objects in your release:</p>
    <ul>
      <li>Include and exclude resources, such as an embedded database, based on a customers' license entitlements or configuration choices. See <a href="packaging-include-resources">Including Optional and Conditional Resources</a>.</li>
      <li>Add a delete hook policy to delete jobs after they successfully complete. See <a href="packaging-cleaning-up-jobs">Cleaning Up Kubernetes Jobs</a>.</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>Admin Console and Download Portal Customization</td>
    <td>Customize the branding and application icon displayed in the admin console and the download portal. You can also customize the functionality of the admin console, such as adding ports and port forwarding, adding custom graphs, and more. See the <a href="admin-console-customize-app-icon">Admin Console and Download Portal Customization</a> section.</td>
  </tr>
  <tr>
    <td>Minimum and Target KOTS Versions</td>
    <td>
    <p>Specify the minimum or target versions of KOTS that are required for users to install your application release. See <a href="packaging-kots-versions">Setting Minimum and Target Versions for KOTS</a>.</p>
    </td>
  </tr>
</table>
