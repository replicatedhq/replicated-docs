# Promoting releases

Every Replicated license points to a Release Channel.
When a license is installed, it will pull down and install the release that is currently at the top of its channel.
It’s recommended to create customer licenses on the Stable channel, and only promote releases to Stable that are ready for all customers to install.

Once an application is installed, the active instance can be updated by promoting a release to the channel that instance is licensed to (likely Stable).
Each instance will periodically check for new releases.
When a new release is found, the Replicated installation will show a button that allows end customers managing the instance to read the release notes and install the update.
A license only checks it’s own release channel.

To promote a release, you can use the [vendor portal](https://vendor.replicated.com) and click the Promote button:

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

## Semantic Versioning

Semantic versioning is available in KOTS v1.58.0 and later.

You can use the semantic version format for the version label that you assign to a release in the admin console. For more information about semantic versioning, see [Semantic Versioning 2.0.0](https://semver.org).
In order for this label to be used to sequence releases on a channel, semantic versioning must be enabled by turning on the `Require semver for releases promoted to this channel` toggle in the channel settings.
If you use semantic versioning on a channel, we recommend that you always use semantic versioning on that channel.
This toggle is disabled by default.

If the version label that you assign to a channel is in the semantic version format, the admin console uses the version label for sequencing of releases during updates.
For releases that do not use semantic versioning, the admin console sequences them in the order of their creation.
For more information about checking for updates in the admin console, see [Checking for Updates](/kotsadm/updating/updating-kots-apps/#checking-for-updates).
