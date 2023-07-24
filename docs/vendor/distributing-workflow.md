# Distributing with KOTS

This topic describes how to create releases for your application that support installations with Replicated KOTS.

## About Distributing your Application with KOTS

A release for your application can include a set of standard Kubernetes manifests, Helm charts, or Kubernetes Operators. (While an operator is technically deployed either using plain Kubernetes manifests or a Helm chart, we list it separately because of the advanced image management work needed to effectively deliver Operators into customer environments.) In addition to your application files, a release also includes [Replicated custom resources](/reference/custom-resource-about) that are used to invoke various Replicated KOTS functions.

After you create the first release for your application, you continue the process of authoring, testing, iterating on, and accepting a set of files for release to your customers. Replicated recommends that you create and test releases for your application in small iterations before sharing a release with your customers.

## Prerequisites

Before you begin integrating KOTS features with your application, complete the following prerequisites:

* If you are new to Replicated, see [Onboarding with Replicated](/vendor/replicated-onboarding) for a basic onboarding workflow, best practices, and a list of key Replicated features to integrate with your application before getting started with KOTS.
* For an introduction to installing with KOTS, complete the following tutorials with a sample Kubernetes application:
  * [KOTS Tutorial (CLI)](tutorial-cli-setup)
  * [KOTS Tutorial (UI)](tutorial-ui-setup)

## KOTS Feature Checklist

This section provides a checklist of functionality to integrate with your application to support installations with Replicated KOTS. These features are provided in order of less challenging to more challenging, though you can configure and test the features in any order. 

Replicated recommends that you integrate one feature at a time by creating a release and then upgrading in a development environment to test.

<table>
  <tr>
    <th width="30%">Functionality</th>
    <th width="50%">Description</th>
    <th width="20%">How To</th>
  </tr>
  <tr>
  <td>HelmChart custom resource</td>
  <td>Support KOTS installations of Helm charts</td>
  <td><a href="helm-native-v2-using">Configuring the HelmChart Custom Resource</a></td>
  </tr>
  <tr>
  <td>Configuration Screen</td>
      <td><p>Create a Configuration screen in the admin console to collect required and optional configuration values from your users. See <a href="admin-console-customize-config-screen">Creating and Editing Configuration Fields</a>.</p><p><strong>Note:</strong> This feature does not apply to Kubernetes Operators.</p></td>
  </tr>
  <tr>
    <td>Status Informers</td>
    <td>Add one or more status informers to display the current application status for your users on the admin console dashboard. Additionally, status informers allow you to get insights on the status of application instances running in customer environments. See <a href="admin-console-display-app-status">Adding Resource Status Informers</a>.</td>
  </tr>
  <tr>
    <td>Preflight Checks and Support Bundles</td>
    <td>Define preflight checks to test for system compliance during the installation process and reduce the number of support escalations. <br></br><br></br>Enable support bundles to collect and analyze troubleshooting data from your customers' clusters to help you diagnose problems with application deployments. See <a href="preflight-support-bundle-about">About Preflight Checks and Support Bundles</a></td>
  </tr>
  <tr>
    <td>Kubernetes Installers</td>
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