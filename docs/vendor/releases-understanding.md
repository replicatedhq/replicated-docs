# About Releases

The Replicated [vendor portal](https://vendor.replicated.com) provides you with a location to create and release versions of your application to various release channels. The vendor portal hosts a built-in YAML editor and linter to help you write and validate manifest files.

## Semantic Versioning

Semantic versioning is available with the Replicated app manager v1.58.0 and later.

When you enable semantic versioning on a channel in the vendor portal, the Replicated admin console uses the semantic version format to sequence releases assigned to the channel.

For more information, see [Enabling Semantic Versioning](releases-semantic-versioning).

## About Promoting Releases

After a release is ready to be installed, the release can be promoted to one or more release channels.

Every Replicated license points to a release channel.
When a license is installed, it will pull down and install the release that is currently at the top of its channel.
We recommend creating customer licenses on the Stable channel, and only promoting releases to Stable that are ready for all customers to install.

Once an application is installed, the active instance can be updated by promoting a release to the channel that instance is licensed to (likely Stable).

Each instance will periodically check for new releases. When a new release is found, the Replicated installation will show a button that allows end customers managing the instance to read the release notes and install the update.
A license only checks its own release channel.

For more information, see [Promoting Releases](releases-promoting).
