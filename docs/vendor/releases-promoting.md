# Promoting releases

Semantic versioning is available in KOTS v1.58.0 and later. You can use the semantic version format for the version label that you assign to a release in the admin console. The version label lets you sequence releases on a channel. If the version label that you assign to a channel is in the semantic version format, the admin console uses the version label for sequencing of releases during updates.

For releases that do not use semantic versioning, the admin console sequences them in the order of their creation.

To promote a release:

1. From the [vendor portal](https://vendor.replicated.com), click **Releases**.

1. From the Releases list, find the release you want to promote and click **Promote**.

  ![Promote Button](/images/promote-button.png)

  The Promote Release dialog opens.

1. Edit the fields:
    * **Channel** Select which channel to promote the release to. The defaults are Stable, Beta, and Unstable. If you have created custom channels using the CLI, they are listed here also.
    * **Version label** Enter a version label. You can use the semantic version format if you are using KOTS v1.58.0 or later.
    * **Release notes** Add detailed release notes. The release notes support markdown and will be shown to your customer.
    * **Required status** Give the release a status, either required or not required.

1. Click **Promote**.

  **Note:**  Releases are not editable after being promoted to a channel. However, release notes, version numbers, and the required status can be edited by visiting the channel’s history.

1. If you are using semantic versioning, enable the `Require semver for releases promoted to this channel` toggle in the channel settings. This toggle is disabled by default.

  **Note:** If you use semantic versioning on a channel, we recommend that you always use semantic versioning on that channel.

#### This content needs to be moved to the Licenses content:

- Before you can create or install a license, a release must be promoted to the channel.
- It is possible to change a license value to have updates automatically installed when detected by the running instance.
- License values are synced with the values set in the vendor portal when the customer syncs the license.


## Next steps

Create customers and download licenses.

## Additional resources

* [Checking for Updates](/kotsadm/updating/updating-kots-apps/#checking-for-updates)
* Understanding releases and channels
