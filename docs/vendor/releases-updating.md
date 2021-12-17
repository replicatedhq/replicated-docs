# Updating Releases

You can deliver an update to an application after it has been released.

**Note:** Update checking defaults to every 15 minutes, but it can be configured by end customers.

To update a release:

1. From the Releases page in the [vendor portal](https://vendor.replicated.com), click **Create Release**.

  The YAML editor opens, and shows the contents of the most recently created release.

1. Edit the YAML files as needed.

1. Click **Save Release**.
1. From the **Releases** page, click **Promote** next to the newly created sequence.
1. Select the same channel again to promote this new release.

    Any license installed from the selected channel will start with this new release, and any installation already running is prompted to update to the new release.

1. To install and test this new release in a test server, connect to the admin console dashboard on port :8800 using a web browser.
  At this point, it will likely show that our test application is "Up To Date" and that "No Updates Are Available". The admin console checks for new updates about every five hours, but you can force it to check now.

1. To check for updates now, go to the Application or Version History tab and click **"Check For Updates**.
  On the version history page, you see that the **Deploy** button is enabled. Additionally, it should say how many files were changed and how many lines are different. You can click on that to view the changes in the YAML file.

  ![View Update](/images/guides/kots/view-update.png)

1. Click **Deploy** to apply the new YAML files. This should only take a few seconds to deploy.

## Additional resources

[How to release a packaged application](https://replicated-docs.netlify.app/docs/vendor/releases-workflow)
