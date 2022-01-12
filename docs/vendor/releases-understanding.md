# Understanding channels and releases

Every Replicated license points to a release channel.
When a license is installed, it will pull down and install the release that is currently at the top of its channel.
We recommend creating customer licenses on the Stable channel, and only promoting releases to Stable that are ready for all customers to install.

The [Replicated vendor portal](https://vendor.replicated.com) provides you with a location to create and release versions of your application to various release channels. The vendor portal hosts a built-in YAML editor and linter to help you write and validate YAML.

Once an application is installed, the active instance can be updated by promoting a release to the channel that instance is licensed to (likely Stable).
Each instance will periodically check for new releases. When a new release is found, the Replicated installation will show a button that allows end customers managing the instance to read the release notes and install the update.
A license only checks it’s own release channel.


## Versioning
Semantic versioning is available in KOTS v1.58.0 and later. You can use the semantic version format for the version label that you assign to a release in the admin console. For more information about semantic versioning, see [Semantic Versioning 2.0.0](https://semver.org).

**Note:** If you use semantic versioning on a channel, we recommend that you always use semantic versioning on that channel.

If the version label that you assign to a channel is in the semantic version format, the admin console uses the version label for sequencing of releases during updates.

For releases that do not use semantic versioning, the admin console sequences them in the order of their creation.

## Promoting Releases
After a release is ready to be installed, the release can be promoted to one or more release channels.
For more information, see [Promoting Releases](releases-promoting).

## Manage Release Channels
By default, there are 3 release channels: Stable, Beta and Unstable. When you first log in to Replicated and select the Channels tab, you’ll see these default release channels created.
You can delete, edit, or create new channels at any time.

You assign a customer to one or more of these channels. When you assign a customer to multiple channels, the customer selects the channel when they install your application. The customer can later change the release channel in the management console.
For installations in air gapped environments, the customer selects the channel during download.

The channels Replicated creates by default are commonly used for:

### Unstable
The Unstable channel is designed for you to constantly push releases to, much in the same way that you continuously deploy new versions to your cloud product.
This is the channel that your development environment should have a license assigned to.
This channel is designed to be internal and for testing, not for your customers to be licensed against.

### Beta
The Beta channel is created for release candidates and early adopting customers.
We recommend you promote a release to the Beta channel once it’s passed automated testing in the Unstable channel.
You can also choose to license some early-adopting customers against this channel.

### Stable
For most of your customers, you will create a license that assigns them to the Stable channel.
By doing so, they’ll only receive updates when you push a new version to this channel.
