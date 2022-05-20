# How to Distribute a Production Application

The following workflow lists the required, recommended, and optional tasks to complete
to distribute your application with Replicated.

If you have questions about this workflow, you can contact the Customer Success
team by emailing success@replicated.com.

**Prerequisites**

- You have a Kubernetes-deployable application.
- You have set up a development server.

Complete the following procedures to distribute your application to your customers
with Replicated:

1. Create your account in the Replicated vendor portal. See [Creating a Vendor Account](vendor-portal-creating-account).
1. (Recommended) Complete a tutorial to package, distribute, and install a sample application. See:
   * [Managing Releases with the CLI](tutorial-installing-with-cli).
   * [Installing with an Existing Cluster](tutorial-installing-with-existing-cluster).
   * [Installing without an Existing Cluster](tutorial-installing-without-existing-cluster).
1. (Recommended) Learn about the application packaging process and begin to plan your deployment. See [How to Package an Application for Production](packaging-workflow) and the topics in the _Packaging Options_ section.
1. (Recommended) Send a questionnaire to your customers to gather information about their environments. See [Customer Application Deployment Questionnaire](planning-questionnaire).
1. (Optional) Create a custom channel or edit the default channels in the vendor portal. See [Creating and Editing Channels](releases-creating-channels).
1. Do the following to create, test, and edit a release:
    1. Create a release in the vendor portal and write the Kubernetes manifest files to package your application. See [Creating a Release](releases-creating-releases).
    1. Promote the release to a channel. See [Promoting Releases](releases-promoting).
    1. Create a license file in the vendor portal that contains entitlement information for your customer. See [Creating a Customer](releases-creating-customer).
    1. Test your release by installing it in a development environment with the license file that you created.

       You can use the environment that you created during one of the recommended tutorials in step 2. Alternatively, you can follow the application installation procedures in the _Enterprise_ documentation. See [Overview of Installing an Application](../enterprise/installing-overview).
    1. Continue to iterate by updating and promoting releases until you are ready to share the application with your customers.

       After you promote each new release, update the application in the admin console to test the changes. See [Updating Releases](releases-updating) and [Updating an Application](../enterprise/updating-apps).
1. When you are ready to distribute the application to your customers, promote the release to the desired channel in the vendor portal. Share the license file that you created and the installation script available in the vendor portal with each customer. See [Sharing the License File and Installation Script](releases-sharing-license-install-script).
