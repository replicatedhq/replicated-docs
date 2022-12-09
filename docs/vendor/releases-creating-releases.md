# Creating a Release

You can use the Replicated vendor portal to create and release versions of your application to various release channels.

To create a release:

1. From the [vendor portal](https://vendor.replicated.com) and create a new application. After signing up and activating your account, you are prompted to create a new application. Name your application and click **Create Application**.

 :::note
 If you are logging in with an existing account, you can update an existing application or select **Create new app** from the application drop-down list.
 :::

  ![Create Application](/images/guides/kots/create-application.png)

  The Channels page opens and displays a list of your release channels, which are logical stacks for you to stage and promote releases to your customers.

1. Click **Releases** on the left menu, and then click **Create a release**.

  ![Create Release](/images/guides/kots/create-release.png)

  [View a larger image](/images/guides/kots/create-release.png)

  A YAML editor displays.

1. In the YAML editor, drag and drop your application files into the file directory. These can be Kubernetes manifest files or Helm charts, and can include standard manifests such as Deployment and Service resources. For more information about how to package and configure manifest files for a production application, see [How to Package and Distribute a Production Application](distributing-workflow).

  ![Default YAML](/images/guides/kots/default-yaml.png)

  [View a larger image](/images/guides/kots/default-yaml.png)

1. Click **Save release**.

click **Promote**.

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

## Related Topics

* [About Release Channels](releases-about-channels)
* [How to Package and Distribute a Production Application](distributing-workflow)
