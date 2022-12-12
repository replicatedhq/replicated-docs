# Creating and Promoting Releases

You can use the Replicated vendor portal to create and promote versions of your application to various release channels.

## Prerequisite​

If you are creating an initial production release and are using a private registry or the Replicated private registry, you must connect to the registry before _promoting_ the release. For more information, see [How to Package and Distribute a Production Application](distributing-workflow).

## Create and Promote a Release

To create and promote a release in the vendor portal:

1. From the **Applications** dropdown list, select **Create an app** or select an existing release to update.

1. Click **Releases** on the left menu, and click **Create release**.

  ![Create Release](/images/release-create-new.png)

  [View a larger image](/images/release-create-new.png)

1. In the YAML editor, do the following to import or add files:

  ![Default YAML](/images/guides/kots/default-yaml.png)

  [View a larger image](/images/guides/kots/default-yaml.png)

   - Drag and drop your application files into the file directory. These can be Kubernetes manifest files or Helm charts.
   - Click `+` to add an untitled YAML file to the directory. For example, you can use this to create a Replicated custom resource.

   For more information about how to package files for a production application, see [How to Package and Distribute a Production Application](distributing-workflow).

1. Edit the YAML files as needed. For example, you can edit a custom resource or change the number of replicas.

1. Click **Save release**, and click **Promote**.

1. In the Promote Release dialog, edit the fields:

    ![Promote release dialog](/images/release-promote.png)

    * **Channel**: Select the channel where you want to promote the release. The defaults are Stable, Beta, and Unstable. If you created custom channels, they are listed here also.
    * **Version label**: Enter a version label. If semantic versioning is enabled for the channel, you must use a valid semantic version. For more information, see [Enabling Semantic Versioning](releases-semantic-versioning).
    * **Requirements**: Select **Prevent this release from being skipped during upgrades** to mark the release as required. When a release is required, the admin console requires users to upgrade to that version before they can upgrade to a later version. For example, if you select **Prevent this release from being skipped during upgrades** for release v2.0.0, users with v1.0.0 deployed must upgrade to v2.0.0 before they can upgrade to a version later than v2.0.0, such as v2.1.0.

      :::note
      Required releases are supported in the app manager v1.68.0 and later.

      After users deploy a required version, they can no longer redeploy, or _roll back_ to, versions earlier than the required version, even if `allowRollback` is `true` in the Application custom resource manifest. For more information about rollbacks, see [allowRollback](../reference/custom-resource-application#allowrollback) in the _Application_ custom resource topic.
      :::

    * **Release notes**: Add detailed release notes. The release notes support markdown and are shown to your customer.

1. Click **Promote**.

  The release appears in an **Active** state on the Releases page.

## Next Step

Update and test the release in your development environment using the Replicated admin console. For more information about updating an application release in the admin console, see [Updating an Application](../enterprise/updating-apps).

## Related Topics

* [About Releases](releases-about)
* [About Release Channels](releases-about-channels)
