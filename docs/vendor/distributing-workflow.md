# How to Package and Distribute a Production Application

Your application can be packaged and distributed as a set of standard Kubernetes manifests, Helm charts, or Kubernetes Operators. (While an operator is technically deployed either using plain Kubernetes manifests or a Helm chart, we list it separately because of the advanced image management work needed to effectively deliver Operators into customer environments.)

These manifests include your application manifests, and can include [custom resources](../reference/custom-resource-about) used to invoke various app manager functions. _Packaging_ refers to the act of authoring, testing, iterating on, and accepting a set of Kubernetes manifests for release to your customers with Replicated.

Because of the depth and breadth of extensions available in the Replicated platform, we recommend packaging and testing your application in small iterations before releasing to customers. With the interdependencies and synergies among Replicated features, it can be helpful to know which ones to explore first. Some integrations, like image management and preflight checks, are required or highly recommended. From that point, other features can generally be integrated in any order.

If you have questions about this workflow, you can contact the Customer Success team by emailing success@replicated.com.

## Prerequisites

Complete the following items before you perform this task:

- Create a Kubernetes-deployable application that contains `deployment.yaml` and `services.yaml` files.
- Set up a development server.
- Create your account in the Replicated vendor portal. See [Creating a Vendor Account](vendor-portal-creating-account).
- (Recommended) Complete a tutorial to package, distribute, and install a sample application:
  * [Managing Releases with the CLI](tutorial-installing-with-cli).
  * [Packaging and Installing on an Existing Cluster](tutorial-installing-with-existing-cluster).
  * [Packaging and Installing on a Kubernetes Installer Cluster](tutorial-installing-without-existing-cluster).
- (Recommended) Send a questionnaire to your customers to gather information about their environments. See [Customer Application Deployment Questionnaire](planning-questionnaire).

## Creating and Testing Your Initial Release

The following diagram is a visual representation of the steps that follow for creating and testing your first release. You will iterate many times before distributing your application to customers.

![Initial Release Workflow](/images/packaging-first-iteration.png)

[View a larger version of this image](../../static/images/packaging-first-iteration.png)

Complete the following procedures to import your files, create, and test your first release:

1. Push your images to the Replicated private registry if you plan to host your images on that registry. See [Push Images to the Replicated Private Registry](packaging-private-images#push-images-to-the-replicated-private-registry) in _Connecting to an Image Registry_.

    If you are using a different image option, skip this step and proceed to the next step.

1. Import your application files to Replicated using one of the following types:

    <table>
      <tr>
        <th width="30%">Type</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td>Standard manifest files</td>
        <td>We recommend using standard manifest YAML files unless you are already using Helm or Kubernetes Operators. <br></br><br></br>To import using the Replicated vendor portal, see <a href="releases-creating-releases">Create a Release</a>. To import using the replicated CLI, see <a href="tutorial-installing-with-cli">Managing Releases with the CLI</a>.</td>
      </tr>
      <tr>
        <td>Helm charts</td>
        <td>If your application is already packaged using Helm charts, see <a href="helm-release">Adding Helm Charts to a Release</a>.</td>
      </tr>
      <tr>
        <td>Kubernetes Operators</td>
        <td>If you are already using Kubernetes Operators, see <a href="operator-packaging-about">Package the Kubernetes Operator Application</a>. <br></br><br></br>Skip connecting to a private registry and skip creating a Configuration screen in the admin console. <br></br><br></br>You can use any of the other packaging functions, depending on your needs. Create a license file, and promote and test each iteration.</td>
      </tr>
    </table>

1. (Required) If you are using private images, either connect to an external private registry or update the image tags to point to the Replicated private registry. See [Connecting to an Image Registry](packaging-private-images).

  :::note
  Skip this step if your images are open-source or public, or if you are using Kubernetes Operators.
  :::

1. If you are providing your users with a cluster hosted on a VM, you must configure and test a Kubernetes installer. See [Creating a Kubernetes Installer](packaging-embedded-kubernetes).

1. Create a license file in the vendor portal that contains entitlement information for your customer. You also need a license file to test your application in the admin console. See [Creating a Customer](releases-creating-customer).

1. Promote the release and test it by installing the release in a development environment with the license file that you created. You can use the environment that you created during one of the recommended tutorials. For information about promoting a release, see [Promoting Releases](releases-promoting). For information about installation, see [Overview of Installing an Application](../enterprise/installing-overview).

Next, iterate on your release.

## Iterating Your Releases

To iterate on the release of your production application:

1. (Recommended) Create a basic Configuration screen in the Replicated admin console to collect required or optional values from your users that are used to access the application:
      1. Define custom fields. See <a href="admin-console-customize-config-screen">Creating and Editing Configuration Fields</a>.
      1. Map the values to the application. See <a href="config-screen-map-inputs">Mapping User-Supplied Values</a>.
    :::note
    Skip this step if you are using Kubernetes Operators.
    :::

1. Promote the updated release. Update and test the application in your development environment. See [Updating Releases](releases-updating) and [Updating an Application](../enterprise/updating-apps).

1. Configure additional manifest functionality and custom resources, and iterate as needed. This is a suggested order, but you can configure these functions in any order. These functions can be used with Kubernetes Operators.

  Update the release and application, testing it in your development environment after each iteration.

    <table>
      <tr>
        <th width="30%">Functionality</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td><a href="database-config-adding-options">Adding Persistent Data Stores</a></td>
        <td><p>Integrate persistent stores, such as databases, queues, and caches. </p><p>Add options for your users to either embed a database instance with the application, or connect your application to an external database instance that they manage.</p></td>
      </tr>
      <tr>
        <td><a href="admin-console-customize-app-icon">Customizing the Admin Console and Download Portal</a></td>
        <td>Customize the appearance of the admin console for end users, including branding, application status, URLs, adding ports and port forwarding, and adding custom graphs.</td>
      </tr>
      <tr>
        <td><a href="packaging-rbac">Configuring Role-Based Access Control</a></td>
        <td>Limit access to a single namespace in a cluster.</td>
      </tr>
      <tr>
        <td><a href="preflight-support-bundle-creating">Defining Preflight Checks and Support Bundles</a></td>
        <td>Define preflight checks to test for system compliance during the installation process and reduce the number of support escalations. <br></br><br></br>Enable support bundles to collect and analyze troubleshooting data from your customers' clusters to help you diagnose problems with application deployments.</td>
      </tr>
      <tr>
        <td><a href="snapshots-configuring-backups">Configuring Backups</a></td>
        <td>Enable snapshots so that end users can backup and restore their application configuration and data.</td>
      </tr>
      <tr>
        <td><a href="packaging-ingress">Adding Cluster Ingress Options</a></td>
        <td>Configure how traffic gets to your application using cluster ingress options.</td>
      </tr>
      <tr>
        <td><a href="packaging-using-tls-certs">Using Kubernetes Installer TLS certificates</a></td>
        <td>Share the Kubernetes installer TLS certificate with other Kubernetes resources.</td>
      </tr>
      <tr>
        <td><a href="identity-service-configuring">Enabling and Configuring Identity Service (Beta)</a></td>
        <td>Control access to the application for Kubernetes installer-created clusters.</td>
      </tr>
      <tr>
        <td><a href="packaging-include-resources">Including Conditional Resources</a></td>
        <td>Include and exclude resources based on a customer's configuration choices, such as an external database or an embedded database.</td>
      </tr>
      <tr>
        <td><a href="packaging-cleaning-up-jobs">Cleaning Up Kubernetes Jobs</a></td>
        <td>Clean up completed Kubernetes jobs to prevent errors with future Kubernetes job updates.</td>
      </tr>
   </table>

  :::note
  Continue to iterate by updating the release and application, and then testing it in the admin console until you are ready to share the application with your customers.
  :::

## Distributing Your Application

To distribute your production application:

1. Promote the release to the desired channel in the vendor portal. You can use the default channels or edit them, or create a custom channel. See [Creating and Editing Channels](releases-creating-channels).

1. Share with each customer the license file that you created and the installation command available in the vendor portal. See [Sharing the License Files and Application Releases](releases-sharing-license-install-script).
