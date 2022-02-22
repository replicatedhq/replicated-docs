# How to Distribute an Application

Complete the following procedures to distribute your application to your customers with
Replicated:

1. Create your account in the Replicated vendor portal. See [Creating a Vendor Account](vendor-portal-creating-account).
1. (Recommended) Complete a tutorial to package, distribute, and install a sample application. See:
   * [Installing a Sample Application with the CLI](tutorial-installing-with-cli).
   * [Installing a Sample Application on an Existing Cluster](tutorial-installing-with-existing-cluster).
   * [Installing a Sample Application Without an Existing Cluster](tutorial-installing-without-existing-cluster).
1. Learn about the application packaging process and begin to plan your deployment. See [Understanding packaging with the app manager](packaging-an-app).
1. (Recommended) Send a questionnaire to your customers to gather information about their environments. See [Customer Application Deployment Questionnaire](planning-questionnaire).
1. (Optional) Create a custom channel or edit the default channels in the vendor portal. See [Creating and Editing Channels](releases-creating-channels).
1. Create a release in the vendor portal and write the Kubernetes manifest files to package your application. Then, promote the release to a channel. See [Creating a Release](releases-creating-releases) and [Promoting Releases](releases-promoting).
1. Create a license file in the vendor portal that contains entitlement information for your customer. Then, create references to the license fields that your application can query. See [Creating a Customer](releases-creating-customer) and [Referencing License Fields](licenses-referencing-fields).
1. Test your release by following the application installation procedures in the _Enterprise_ documentation. See [Overview of Installing an Application](../enterprise/installing-overview).
1. Continue to iterate by updating and promoting releases until you are ready to share the application with your customers. After you promote each new release, update the application in the admin console to test the changes. See [Updating Releases](releases-updating) and [Updating an Application](../enterprise/updating-apps).
1. Share the license file that you created and the installation script available in the vendor portal with each customer. See [Sharing the License File and Installation Script](releases-sharing-license-install-script).
