# Step 7: Update the Application

To deploy and test this updated release, you return to the admin console using a web browser.

At this point, the admin console likely shows that your test application is up-to-date and that no updates are available. The admin console checks for new updates approximately every four hours, but for now, you will trigger a check manually.

To update the application:

1. Log in to the admin console at `https://localhost:8800` for an existing cluster or `http://[ip-address]:8800` for an embedded cluster.

1. On the Version history tab, click **Check for update**. You should see a new release in the history now. You can click **Diff versions** to review the differences in the YAML files.

  ![View Update](/images/guides/kots/view-update.png)

1. Click **Deploy**. In the dialog that opens, click **Yes, deploy** to deploy the new version. The deployment takes only a few seconds.

1. On the Config tab, look for the **Another Text Example** field that you added is displayed.

1. In the new **Another Text Example** field, enter any text. Click **Save config**.

  The admin console notifies you that the configuration settings for the application have changed.

1. In the dialog, click **Go to updated version**.

  The updated version is loaded on the Version history page.

1. On the Version history page, click **Deploy** next to the latest version to deploy the configuration change.

1. After the admin console deploys the configuration change, go to the Dashboard page and click **Open App**.

  The application displays the text that you added to the field.

  :::note
  If you do not see the new text, refresh your browser.
  :::

## Next Steps

Congratulations! As part of this tutorial, you:

- Created and promoted a release for a Kubernetes application using the vendor portal
- Installed the application in a Kubernetes cluster
- Edited the manifest files for the application:
    - Added a preflight check
    - Added a new configuration field and used template functions to reference the field
- Promoted a new release with your changes
- Used the admin console to update the application to the latest version

As a next step you can:

- Learn how to use the CLI to perform these steps and manage your release YAML in a git repository. See the [CLI Quickstart Tutorial](tutorial-installing-with-cli).

- Continue to iterate on your sample application by integrating other app manager features. For ideas on features and functionality, see [Adding Functionality to Your Releases](distributing-workflow#adding-functionality-to-your-releases)  in _How to Package and Distribute a Production Application_.

- Make more customizations to the fields that appear on the Configure App screen in the admin console screen. This screen is used to collect the configuration that your application needs from the customer. Values are available to your app as text templates or input values to Helm Charts.
