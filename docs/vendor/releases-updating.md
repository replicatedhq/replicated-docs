# Updating Releases

## Iterating and Updating

This guide will walk you through making a change and delivering an update to an application after it's been deployed.
It's assumed you have the environment from parts 1 and 2 of this guide ([creating a release](#creating-a-release) and [installing](#installing-and-testing)).
If you haven't completed these guides, head back and finish them first.

Now that we have a KOTS application running, a common task is to deliver updates.
Let's change the number of nginx replicas to show how to deliver an update.

### Create a New Release

On the Releases page of the [Vendor Portal](https://vendor.replicated.com), click the "Create Release" link on top.
Once again, you'll be taken to a YAML editor that shows the contents of the most recently created release.
This gives us everything we've done so far, and our task now is to only write the changes needed to increase the number of nginx replicas.

In the release YAML, find the nginx image to change.
The line is in the `deployment.yaml` file and looks like:

```yaml
replicas: 1
```

Change the number to `2` or more.

**Note**: If you've worked ahead and already completed the [CLI setup guide](/vendor/guides/cli-quickstart), you can make this `replicas` change in your locally checked-out git repo, and publish them with `replicated release create --auto`, then skip to [Update the Test Server](#update-the-test-server).

### Save and Promote the Release

Following the same process we did before, click the "Save Release" button, go back one screen and click "Promote" next to the newly created Sequence 2.
Choose the "Unstable" channel again to promote this new release.
Now, any license installed from the "Unstable" channel will start with this new release, and any installation already running will be prompted to update to the new release.

### Update the Test Server

To install and test this new release, we need to connect to the Admin Console dashboard on port :8800 using a web browser.
At this point, it will likely show that our test application is "Up To Date" and that "No Updates Are Available".
The Admin Console will check for new updates about every five hours but we can force it to check now.

In the "Application" or "Version History" tab click on the "Check For Updates" button.
On the version history page the faded "Deployed" button should become active and say "Deploy."
In addition, it should say how many files were changed and how many lines are different.
You can click on that to view what has changed in the yaml.


![View Update](/images/guides/kots/view-update.png)

Clicking the "Deploy" button will apply the new YAML which will change the number of nginx replicas.
This should only take a few seconds to deploy.

* * *

## Next Steps: Manage YAML in your Git Repo

Now that you're familiar with the basics, you should run through the [CLI Quickstart](/vendor/guides/cli-quickstart) so you can start managing your release YAML in a git repo.
