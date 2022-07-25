# Promoting Releases

After a release is ready to be installed, the release can be promoted to one or more release channels.

Every Replicated license points to a release channel.
When a license is installed, it pulls down and installs the release that is currently at the top of its channel.
We recommend creating customer licenses on the Stable channel, and only promoting releases to Stable that are ready for all customers to install.

After an application is installed, the active instance can be updated by promoting a release to the channel that instance is licensed to (likely Stable).

Each instance periodically checks for new releases. When a new release is found, the Replicated installation displays a button that allows end customers managing the instance to read the release notes and install the update. (Customers can also configure automatic updates for online environments.)
A license only checks its own release channel.

## Promote a Release

Releases are not editable after being promoted to a channel. However, release notes, the version label, and the required status can be edited by visiting the channel’s history.

To promote a release:

1. From the Replicated [vendor portal](https://vendor.replicated.com), click **Releases**.

1. From the Releases list, find the release you want to promote and click **Promote**.

  ![Promote Button](/images/promote-button.png)

  The Promote Release dialog opens.

1. Edit the fields:
    * **Channel**: Select the channel where you want to promote the release. The defaults are Stable, Beta, and Unstable. If you created custom channels using the CLI, they are listed here also.
    * **Version label**: Enter a version label. If semantic versioning is enabled for the channel, you must use a valid semantic version. For more information, see [Enabling Semantic Versioning](releases-semantic-versioning).
    * **Requirements**: Select **Prevent this release from being skipped during upgrades** to mark the release as required. When a release is required, the admin console requires users to upgrade to that version before they can upgrade to a later version. For example, if you select **Prevent this release from being skipped during upgrades** for release v2.0.0, users with v1.0.0 deployed must upgrade to v2.0.0 before they can upgrade to a version later than v2.0.0, such as v2.1.0.
      :::note
      Required releases are only supported in app manager v1.68.0+.
      :::
      :::note
      After users deploy a required version, they can no longer redeploy, or _roll back_ to, versions earlier than the required version, even if `allowRollback` is `true` in the Application custom resource manifest. For more information about rollbacks, see [allowRollback](../reference/custom-resource-application#allowrollback) in the _Application_ custom resource topic.
      :::

    * **Release notes**: Add detailed release notes. The release notes support markdown and are shown to your customer.

1. Click **Promote**.


## Next Steps

[Creating customers and downloading licenses](releases-creating-customer)

## Related Topics

* [About Releases](releases-understanding)
* [How to Package and Distribute a Production Application](distributing-workflow)
