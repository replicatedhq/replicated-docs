# Promoting releases



To promote a release, you can use the [vendor portal](https://vendor.replicated.com) and click the **Promote** button:

![Promote Button](/images/promote-button.png)

When a release is promoted it should be given a version label and detailed release notes.
The release notes support markdown and will be shown to your customer.
Additionally, each promoted release must be given a required status (required or not required).

#### Notes

- Before you can create or install a license, a release must be promoted to the channel.
- Update checking defaults to every 15 minutes but can be configured by end customers.
- It is possible to change a license value to have updates automatically installed when detected by the running instance.
- License values are synced with the values set in the vendor portal when the customer syncs the license.
- Releases will not be editable after being promoted to a channel.
- Release notes, version numbers, and the required status may be edited after promotion by visiting the channel’s history.

## Using semantic versioning

Semantic versioning is available in KOTS v1.58.0 and later.

You can use the semantic version format for the version label that you assign to a release in the admin console. The version label lets you sequence releases on a channel.

To use semantic versioning, enable the `Require semver for releases promoted to this channel` toggle in the channel settings.

If you use semantic versioning on a channel, we recommend that you always use semantic versioning on that channel.
This toggle is disabled by default.

If the version label that you assign to a channel is in the semantic version format, the admin console uses the version label for sequencing of releases during updates.

For releases that do not use semantic versioning, the admin console sequences them in the order of their creation.

For more information about checking for updates in the admin console, see [Checking for Updates](/kotsadm/updating/updating-kots-apps/#checking-for-updates).

## Next steps

Create customers and download licenses.
