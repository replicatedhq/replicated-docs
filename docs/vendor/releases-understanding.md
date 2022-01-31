# About releasing an application

The [Replicated vendor portal](https://vendor.replicated.com) provides you with a location to create and release versions of your application to various release channels. The vendor portal hosts a built-in YAML editor and linter to help you write and validate manifest files.

## Semantic versioning
Semantic versioning is available in the app manager v1.58.0 and later. You can use the semantic version format for the version label that you assign to a release in the admin console. For more information about semantic versioning, see [Semantic Versioning 2.0.0](https://semver.org).

**Note:** If you use semantic versioning on a channel, we recommend that you always use semantic versioning on that channel.

If the version label that you assign to a channel is in the semantic version format, the admin console uses the version label for sequencing of releases during updates.

For releases that do not use semantic versioning, the admin console sequences them in the order of their creation.

## About promoting releases
After a release is ready to be installed, the release can be promoted to one or more release channels.

Every Replicated license points to a release channel.
When a license is installed, it will pull down and install the release that is currently at the top of its channel.
We recommend creating customer licenses on the Stable channel, and only promoting releases to Stable that are ready for all customers to install.

Once an application is installed, the active instance can be updated by promoting a release to the channel that instance is licensed to (likely Stable).

Each instance will periodically check for new releases. When a new release is found, the Replicated installation will show a button that allows end customers managing the instance to read the release notes and install the update.
A license only checks it’s own release channel.

For more information, see [Promoting Releases](releases-promoting).
