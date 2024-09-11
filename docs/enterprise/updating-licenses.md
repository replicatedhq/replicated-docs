# Updating Licenses

This topic describes how to update a license from the KOTS Admin Console.

## Update Online Licenses

To update licenses in online environments:

1. In the Admin Console, go to the **License** tab.

1. Click **Sync license** to get the latest updates.

   ![Online License](/images/online-license-tab.png)

   [View a larger version of this image](/images/online-license-tab.png)

   When the license is updated, KOTS makes a new version available that includes the license changes and a dialog is displayed:

   ![License updated successfully](/images/kots-license-update-message.png)

   [View a larger version of this image](/images/kots-license-update-message.png)

   :::note
   If no changes are detected, a **License is already up to date** message appears.
   :::

1. In the dialog, click **Go to new version** to navigate to the **Version history** page.

1. On the **Version history** page, next to the new version labeled **License Change**, click **Deploy** then **Yes, Deploy**.

    ![Deploy license change](/images/kots-deploy-license-change.png)

    [View a larger version of this image](/images/kots-deploy-license-change.png)

    The version with the license change is then displayed as the currently deployed version, as shown belowå: 

    ![Currently deployed version](/images/kots-license-change-currently-deployed.png)

    [View a larger version of this image](/images/kots-license-change-currently-deployed.png)

## Update Air Gap Licenses

Click **Upload license** on the right side of the license pane and select the latest license from your machine.

![Airgap License](/images/airgap-license-tab.png)

- A **License is already up to date** note appears if no changes are detected.
- A **License uploaded successfully** note appears when the changes are successfully applied.

## Upgrade from a Community License

If you have a community license, you can change your license by uploading a new one. This allows you to upgrade from a community version of the software without having to reinstall the Admin Console and the application.

To change a community license to another license:

1. In the **License** tab of the Admin Console, click **Change license**.
1. In the dialog, upload the new license file.
