# How to Create Releases for Your Application

This topic provides prerequisites and a workflow for creating the first release for your application, iterating, and testing.

## About Releasing your Application

A release for your application can include a set of standard Kubernetes manifests, Helm charts, or Kubernetes Operators. (While an operator is technically deployed either using plain Kubernetes manifests or a Helm chart, we list it separately because of the advanced image management work needed to effectively deliver Operators into customer environments.) In addition to your application files, a release also includes [Replicated custom resources](/reference/custom-resource-about) that are used to invoke various Replicated KOTS functions.

For more information about releases, see [About Releases](releases-about).

After you create the first release for your application, you continue the process of authoring, testing, iterating on, and accepting a set of files for release to your customers. Replicated recommends that you create and test releases for your application in small iterations before sharing a release with your customers. To begin, see [Prerequisites](#prerequisites) below.

If you have questions about this workflow, you can post a question on our [Community site](https://community.replicated.com/).

## Prerequisites

Complete the following items before you create the first release for your application:

- Ensure that you have a Kubernetes application or Helm chart that includes at least one Deployment and one Service. Replicated recommends that you architect the application to deploy into a single namespace. For more information, see [Application Namespaces](namespaces).
- Set up a development server that you can use to install and test each release.
- Create an account in the Replicated vendor portal. See [Creating a Vendor Account](vendor-portal-creating-account).
- Complete a tutorial to create a release for a sample application and then install the application in a development environment:
  * [CLI Tutorial](tutorial-cli-setup)
  * [UI Tutorial](tutorial-ui-setup)
- (Recommended) To help you plan, Replicated recommends that you send a questionnaire to your customers to gather information about their environments. See [Customer Application Deployment Questionnaire](planning-questionnaire).

## Plan, Promote, and Test Your Initial Release

Because of the depth and breadth of extensions available in the Replicated platform, Replicated recommends that you create and test releases for your application in small iterations before releasing to customers. With the interdependencies and synergies among Replicated features, it can be helpful to know which features to explore first. Some integrations, like image management and preflight checks, are required or highly recommended. Other features can be integrated in any order after you create your first releases.

The following diagram is a visual representation of the steps that follow for creating and testing your first release. You will iterate many times before distributing your application to customers.

![Initial Release Workflow](/images/packaging-first-iteration.png)

[View a larger version of this image](/images/packaging-first-iteration.png)

Complete the following procedures to import your application files then create and test your first release:

1. Push your images to the Replicated registry if you plan to host your images on that registry. See [Push Images to the Replicated Registry](packaging-private-images#push-images-to-the-replicated-private-registry) in _Connecting to an Image Registry_.

    If you are using a different image option, skip this step and proceed to the next step.

1. Import your application files to Replicated using one of the following types:

    <table>
      <tr>
        <th width="30%">Type</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td>Helm charts</td>
        <td>To create a release with your Helm chart, add your Helm chart and a Replicated HelmChart custom resource to the release. See <a href="releases-creating-release">Managing Releases with the Vendor Portal</a> and <a href="helm-release">Creating a Release with Your Helm Chart for KOTS</a>.</td>
      </tr>
      <tr>
        <td>Standard manifest files</td>
        <td><p>To import using the Replicated vendor portal, see <a href="releases-creating-releases">Managing Releases with the Vendor Portal</a>.</p></td>
      </tr>
      <tr>
        <td>Kubernetes Operators</td>
        <td>If you are already using Kubernetes Operators, see <a href="operator-packaging-about">Package the Kubernetes Operator Application</a>. <br></br><br></br>Skip connecting to a private registry and skip creating a Configuration screen in the admin console. <br></br><br></br>You can use any of the other packaging functions, depending on your needs. Create a license file, and promote and test each iteration.</td>
      </tr>
    </table>

1. If you are using private images, either connect to an external private registry or update the image tags to point to the Replicated registry. See [Connecting to an Image Registry](packaging-private-images).

  :::note
  Skip this step if your images are open-source or public, or if you are using Kubernetes Operators.
  :::

1. If you intend to provide a Replicated kURL specification that your users can run to provision a cluster in their environment, create a Kubernetes installer. See [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

1. Promote the release to the default Unstable channel. For information about promoting releases, see [Managing Releases with the Vendor Portal](releases-creating-releases).

1. Create a license file in the vendor portal and assign the license to the Unstable channel. You need a license file to test your releases. See [Creating and Managing Customers](releases-creating-customer).

1. Test the release by installing in a development environment with the license file that you created. For information about how to install an application, see [Overview of Installing an Application](/enterprise/installing-overview).

After you install the first release for your application, return to the vendor portal to create a new release with additional functionality. See [Add Functionality to Your Releases](#iterate) below. 

## Add Functionality to Your Releases {#iterate}

You integrate with KOTS features and add additional functionality to your application by creating and promoting additional releases on the Unstable channel. Test each release in your development environment until you are ready to share the application with your customers. 

The following table gives a suggested order, but you can add functionality in any order. The functionality described in the table can be used with Kubernetes Operators, except where noted.

<table>
  <tr>
    <th width="30%">Functionality</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
  <td>Configuration Screen</td>
      <td><p>Create a Configuration screen in the admin console to collect required and optional configuration values from your users. See <a href="admin-console-customize-config-screen">Creating and Editing Configuration Fields</a>.</p><p><strong>Note:</strong> This feature does not apply to Kubernetes Operators.</p></td>
  </tr>
  <tr>
    <td>Status Informers</td>
    <td>Status informers are supported Kubernetes resources that KOTS watches for changes in state. Add one or more status informers to display the current application status for your users on the admin console dashboard. Additionally, status informers allow you to get insights on the status of application instances running in customer environments. See <a href="admin-console-display-app-status">Adding Resource Status Informers</a>.</td>
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
