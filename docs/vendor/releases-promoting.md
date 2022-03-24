# Promoting Releases

After you create a release, it must be promoted to a channel to be active.

Releases are not editable after being promoted to a channel. However, release notes, version numbers, and the required status can be edited by visiting the channel’s history.

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
      When you mark a version as required and `allowRollback` is set to `true` in the Application custom resource manifest, users can no longer re-deploy, or _roll back_ to, versions earlier than the required version. For more information about rollbacks, see [allowRollback](../reference/custom-resource-application#allowrollback) in the _Application_ custom resource topic.

    * **Release notes**: Add detailed release notes. The release notes support markdown and are shown to your customer.

1. Click **Promote**.


## Next Steps

[Creating customers and downloading licenses](releases-creating-customer)

## Additional Resources

* [Understanding channels and releases](releases-understanding)
* [How to Distribute an Application](distributing-workflow)
