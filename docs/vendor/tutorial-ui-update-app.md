# Step 7: Update the Application

To install and test this new release, you must connect to the admin console on port :8800 using a web browser.
At this point, the UI likely shows that your test application is up-to-date and that no updates are available.
The admin console checks for new updates approximately every five hours, but for now you will trigger a check manually.

To check for updates manually:

1. Click **Check for Updates** on the Version History tab. You should see a new release in the history now. You can click **Diff versions** to review the differences in the YAML files.

  ![View Update](/images/guides/kots/view-update.png)

1. Click **Deploy** to apply the new YAML, which changes the number of NGINX replicas. The deployment takes only a few seconds.


## Next Steps

Now that you are familiar with the basics, we recommend that you run through the [CLI Quickstart Tutorial](tutorial-installing-with-cli) to start managing your release YAML in a git repository.

You can also head over to [How to Package and Distribute a Production Application](distributing-workflow) to learn how to integrate your application with other app manager features.
