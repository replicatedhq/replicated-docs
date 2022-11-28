# Promoting and Editing Releases

This topic describes how to promote releases, including information about release channels and how to edit the properties of promoted releases.

## About Promoting Releases

After you save a release, you can promote it to any of your release channels. While you are testing and developing an application release, Replicated recommends that you promote to a channel that does not have any customers assigned, such as the default Unstable channel. When you are ready to share your application with customers, you can then promote to a channel where customers are assigned, such as the default Beta or Stable channels.

Every customer license file that you create in the Replicated vendor portal is assigned to a channel. When a customer installs your application using their license file, the Replicated app manager installs the latest release that you promoted to the assigned channel. Each time you promote a new release to a channel, customers assigned to that channel can update their installed application instance to the new release version.

For more information about working with release channels, see [About Release Channels](releases-about-channels).

## Promote a Release

To promote a release:

1. From the Replicated [vendor portal](https://vendor.replicated.com), click **Releases**.

1. From the Releases list, find the release you want to promote and click **Promote**.

  ![Promote Button](/images/promote-button.png)

  The Promote Release dialog opens.

1. Edit the fields:
    * **Channel**: Select the channel where you want to promote the release. The defaults are Stable, Beta, and Unstable. If you created custom channels, they are listed here also.
    * **Version label**: Enter a version label. If semantic versioning is enabled for the channel, you must use a valid semantic version. For more information, see [Enabling Semantic Versioning](releases-semantic-versioning).
    * **Requirements**: Select **Prevent this release from being skipped during upgrades** to mark the release as required. When a release is required, the admin console requires users to upgrade to that version before they can upgrade to a later version. For example, if you select **Prevent this release from being skipped during upgrades** for release v2.0.0, users with v1.0.0 deployed must upgrade to v2.0.0 before they can upgrade to a version later than v2.0.0, such as v2.1.0.

      :::note
      Required releases are supported in the app manager v1.68.0 and later.
      :::
      :::note
      After users deploy a required version, they can no longer redeploy, or _roll back_ to, versions earlier than the required version, even if `allowRollback` is `true` in the Application custom resource manifest. For more information about rollbacks, see [allowRollback](../reference/custom-resource-application#allowrollback) in the _Application_ custom resource topic.
      :::

    * **Release notes**: Add detailed release notes. The release notes support markdown and are shown to your customer.

1. Click **Promote**.

## Edit Release Properties {#edit}

You cannot edit the YAML files in a release after the release is promoted to a channel. However, you can edit the release properties, including release notes, the version label, and the required status, from the Release History page in the vendor portal.

To edit release properties:

1. Log in to the vendor portal and click **Channels**.
1. On the Channels page, in the Latest release section, click **Release history**.

   The Release History page lists all releases previously promoted to the channel.

1. On the Release History page, click the **Edit release** icon for the release version that you want to edit.
1. Edit one or more of the properties for the release.
1. Click **Update Release**.

## Related Topics

* [Creating a Customer](releases-creating-customer)
* [How to Package and Distribute a Production Application](distributing-workflow)
