# Creating a Vendor Account

To get started with Replicated, you must create a Replicated vendor account. When you create your account, you are also prompted to create an application. To create additional applications in the future, log in to the vendor portal and select **Create new app** from the Applications drop-down list.

The vendor portal is the user interface where vendors define Kubernetes manifest files, including application manifests and custom resource manifests, for their application. These files describe to the app manager how to package the application for distribution. Vendors can also use the vendor portal to manage other artifacts, such as customer license files, image registries, and release channels.

To create a vendor account:

1. Go to the [vendor portal](https://vendor.replicated.com), and select **Sign up**.

    The sign up page opens.
3. Enter your email address or continue with Google authentication.

    - If registering with an email, the Activate account page opens and you will receive an activation code in your email.

      :::note
      To resend the code, click **Resend it**.
      :::

    - Copy and paste the activation code into the text box and click **Activate**. Your account is now activated.

      :::note
      After your account is activated, you might have the option to accept a pending invitation, or to automatically join an existing team if the auto-join feature is enabled by your administrator. For more information about enabling the auto-join feature, see [Enable Users to Auto-join Your Team](https://docs.replicated.com/vendor/team-management#enable-users-to-auto-join-your-team).
      :::

4. On the Create your team page, enter you first name, last name, and company name. Click **Continue** to complete the setup.

    :::note
    The company name you provide is used as your team name in vendor portal.
    :::

     The Create application page opens.

5. Enter a name for the application, such as `My-Application-Demo`. Click **Create application**.

    The application is created and the Channels page opens.

   :::important
   Replicated recommends that you use a temporary name for the application at this time such as `My-Application-Demo` or `My-Application-Test`.

   Only use an official name for your application when you have completed testing and are ready to distribute the application to your customers.

   Replicated recommends that you use a temporary application name for testing because you are not able to restore or modify previously-used application names or application slugs in the vendor portal.
   :::

# Next steps
* Invite team members to collaborate with you in vendor portal. See [Invite Members](team-management#invite-members).
* Learn about how to package, test, iterate, and distribute your production application. See [How to Package and Distribute a Production Application](distributing-workflow).
