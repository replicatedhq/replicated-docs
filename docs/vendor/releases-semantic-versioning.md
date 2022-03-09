# Enabling Semantic Versioning

Semantic versioning is available with the Replicated app manager v1.58.0 and later.

When you create a new channel for an application in the vendor portal, semantic versioning is disabled by default.

For applications created in the vendor portal on or after February 23, 2022, semantic versioning is enabled by default on the Stable and Beta channels. Semantic versioning is disabled on the Unstable channel by default.

For existing applications created before February 23, 2022, semantic versioning is disabled by default on all channels.

## About Semantic Versioning

When you enable semantic versioning on a channel, the version label for a release promoted to that channel is verified to ensure that it is a valid semantic version. For more information about valid semantic versions, see [Semantic Versioning 2.0.0](https://semver.org).

For channels with semantic versioning enabled, the Replicated admin console sequences releases by their semantic versions instead of their creation dates. The admin console does not sort any releases already promoted to the channel that do not use a valid semantic version.

If releases that do not use a valid semantic version are already promoted to a channel, the admin console sorts the releases that do have semantic versions starting with the earliest version and proceeding to the latest. For example, assume that you promote these releases in the following order to a channel: 1.0.0, abc, 0.1.0, xyz, and 2.0.0. Then, you enable semantic versioning on that channel. The admin console would sequence the version history as follows for the channel: 0.1.0, 1.0.0, abc, xyz, 2.0.0.

For more information about how enterprise application users check for application updates in the admin console, see [Checking for Updates](../enterprise/updating-apps#checking-for-updates).

## Enable Semantic Versioning

You enable semantic versioning on a per-channel basis. If you enable semantic versioning for a channel and then promote releases to it, Replicated recommends that you do not later disable semantic versioning for that channel.

To enable semantic versioning on a channel, do one of the following:

* **In the vendor portal**: Select **Enable semantic versioning** when creating a channel or editing an existing channel on the Channels page.

* **With the replicated CLI**: Run `replicated channel enable-semantic-versioning CHANNEL_ID` to enable semantic versioning. Replace `CHANNEL_ID` with the ID of the target channel.

   For more information, see [channel enable-semantic-versioning](../reference/replicated-cli-channel-enable-semver) and [channel disable-semantic-versioning](../reference/replicated-cli-channel-disable-semver).
