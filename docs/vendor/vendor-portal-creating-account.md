# Creating a Vendor Account

To get started with Replicated, you must create a Replicated vendor account. When you create your account, you are also prompted to create an application. To create additional applications in the future, log in to the vendor portal and select **Create new app** from the Applications drop-down list.

The vendor portal is the user interface where vendors define Kubernetes manifest files, including application manifests and custom resource manifests, for their application. These files describe to the app manager how to package the application for distribution. Vendors can also use the vendor portal to manage other artifacts, such as customer license files, image registries, and release channels.

To create a vendor account:

1. Go to the [vendor portal](https://vendor.replicated.com), where you can log in or create an account.
1. To create an account, select **Create a new team**.

    The Start a trial page opens.
1. Enter your name, email, and contact information.
1. Create a password, and click **Getting Started**.

    An activation code is sent to the email address you registered with, and the Activate account page opens.

    :::note
    To resend the code, click **Resend it**.
    :::

1. Copy and paste the activation code into the text box, and click **Activate**.

    The Create application page opens.

1. Enter a name for the application, such as `My-Application-Demo`. Click **Create application**.

    The application is created and the Channels page opens.

   :::important
   Replicated recommends that you use a temporary name for the application at this time such as `My-Application-Demo` or `My-Application-Test`.

   Only use an official name for your application, such as `My-Application`, when you have completed testing and are ready to distribute the application to your customers.

   Replicated recommends that you use a temporary application name for testing because you are not able to restore or modify previously-used application names or application slugs in the vendor portal.
   :::

# Next steps
* [Invite team members](https://docs.replicated.com/vendor/team-management#invite-members) to collaborate with you in vendor portal.
* Complete a tutorial to package, distribute, and install a sample application. See:
   * [Installing a Sample Application with the CLI](tutorial-installing-with-cli).
   * [Installing a Sample Application on an Existing Cluster](tutorial-installing-with-existing-cluster).
   * [Installing a Sample Application Without an Existing Cluster](tutorial-installing-without-existing-cluster).
* Learn about how to package, test, iterate, and distribute your production application. See [How to Distribute a Production Application](distributing-workflow).
