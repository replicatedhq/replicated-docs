# How to Distribute a Production Application

Your application can be packaged and distributed as a set of standard Kubernetes manifests, Helm charts, or Kubernetes Operators.
These manifests include your application manifests, and can include optional [custom resources](../reference/custom-resource-about) used to invoke various app manager functions. _Packaging_ means that you have configured the manifest files to integrate with Replicated.

We recommend packaging your application for production in iterations. It can be helpful to understand the priority order in which to iterate. Some configurations are required or highly recommended. Other configurations are optional and can be done in any order after the required and recommended configurations.

You will create and test several iterations of a release before you are ready to share the application with customers.

If you have questions about this workflow, you can contact the Customer Success
team by emailing success@replicated.com.

## Prerequisites

- You have a Kubernetes-deployable application that contains `deployment.yaml` and `services.yaml` files.
- You have set up a development server.
- Create your account in the Replicated vendor portal. See [Creating a Vendor Account](vendor-portal-creating-account).
- (Recommended) Complete a tutorial to package, distribute, and install a sample application:
  * [Managing Releases with the CLI](tutorial-installing-with-cli).
  * [Installing with an Existing Cluster](tutorial-installing-with-existing-cluster).
  * [Installing without an Existing Cluster](tutorial-installing-without-existing-cluster).
- (Recommended) Send a questionnaire to your customers to gather information about their environments. See [Customer Application Deployment Questionnaire](planning-questionnaire).

## Packaging and Distributing Your Application

Complete the following procedures to package and distribute your application to your customers
with Replicated:

1. Import your application files to Replicated using one of the following types:

    - **Standard manifest files** - We recommend using standard manifest YAML files unless you are already using Helm or Kubernetes Operators. Drag and drop the application files to the Replicated vendor portal or use the replicated CLI to import them.

    - **Helm charts** - If your application is already packaged using Helm charts, [install your application Helm chart files](helm-installing-replicated-helm).

    - **Kubernetes Operators** - If you are already using Kubernetes Operators, [Package the Kubernetes Operator application](operator-packaging-about). You must also pass URLs to the Operator using template functions. You can skip passing the URLs if you are using OSS or public images, unless you want to use an air gap environment. Then configure the optional manifests.

1. Configure the recommended manifests and iterate as needed. Skip these manifests if you are using Kubernetes Operators.

    1. (Required) [Connect to a private registry](packaging-private-images). If your images are open-source or public, skip this step.
    1. (Recommended) Create a basic Configuration screen in the Replicated admin console to collect required or optional values from your users that are used to access the application:
        1. [Define custom fields in the Config custom resource manifest file](admin-console-customize-config-screen).
        1. [Map the user-supplied values from the configuration screen to the application](config-screen-map-inputs).

1. Configure additional manifest items and iterate as needed. This is a suggested order, but you can configure these items in any order. These items can be used with Kubernetes Operators.

    <table>
      <tr>
        <th width="30%">Item</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td><a href="database-config-adding-opyions">Add database configuration options</a></td>
        <td>Lets you enable database options and set stateful services.</td>
      </tr>
      <tr>
        <td>Another Field Name</td>
        <td>Specify the maximum blah blah blah.</td>
      </tr>
    </table>


    - [Add database configuration options](database-config-adding-options)
    - [Customizing the admin console and download portal](admin-console-customize-app-icon)
    - [Create preflight checks](preflight-support-bundle-creating)
    - [Enable support bundles](preflight-support-bundle-creating)
    - [Configuring backup and restore](admin-console-customize-app-icon)
    - [Add cluster ingress](packaging-ingress) and [Port forwarding](admin-console-adding-buttons-links#additional-ports-and-port-forwarding)

1. Create a license file in the vendor portal that contains entitlement information for your customer. See [Creating a Customer](releases-creating-customer).

1. (Embedded Clusters) [Configure the Kubernetes Installer](packaging-embedded-kubernetes).

1. Test your release by installing it in a development environment with the license file that you created.

     You can use the environment that you created during one of the recommended tutorials in step 2. Alternatively, you can follow the application installation procedures in the _Enterprise_ documentation. See [Overview of Installing an Application](../enterprise/installing-overview).

1. Continue to iterate by packing additional features, promoting, and testing releases until you are ready to share the application with your customers. See [Updating Releases](releases-updating) and [Updating an Application](../enterprise/updating-apps).

1. When you are ready to distribute the application to your customers, promote the release to the desired channel in the vendor portal. You can use the default channels or edit them, or create a custom channel. See [Creating and Editing Channels](releases-creating-channels).

1. Share the license file that you created and the installation script available in the vendor portal with each customer. See [Sharing the License File and Installation Script](releases-sharing-license-install-script).
