# Promoting Releases

After you create a release, it must be promoted to a channel to be active.

Releases are not editable after being promoted to a channel. However, release notes, version numbers, and the required status can be edited by visiting the channel’s history.

To promote a release:

1. From the Replicated [vendor portal](https://vendor.replicated.com), click **Releases**.

1. From the Releases list, find the release you want to promote and click **Promote**.

  ![Promote Button](/images/promote-button.png)

  The Promote Release dialog opens.

1. Edit the fields:
    * **Channel** - Select the channel you want to promote the release to. The defaults are Stable, Beta, and Unstable. If you have created custom channels using the CLI, they are listed here also.
    * **Version label** - Enter a version label. You can use the semantic version format if you are using the Replicated app manager v1.58.0 or later. If you are using semantic versioning, you must also enable the semantic versioning toggle in the channel settings. This toggle is disabled by default. If you use semantic versioning on a channel, we recommend that you always use semantic versioning on that channel.
    * **Release notes** - Add detailed release notes. The release notes support markdown and will be shown to your customer.
    * **Required status** - Give the release a status, either required or not required.

1. Click **Promote**.


## Next Steps

[Creating customers and downloading licenses](releases-creating-customer)

## Additional Resources

* [Understanding channels and releases](releases-understanding)
* [How to Distribute an Application](distributing-workflow)
