# Creating and Promoting Releases

You can use the Replicated vendor portal to create and promote versions of your application to various release channels.

To create and promote a release in the vendor portal:

1. From the **Applications** dropdown list, select **Create an app** or select an existing release to update.

1. Click **Releases** on the left menu, and click **Create release**.

  ![Create Release](/images/release-create-new.png)

  [View a larger image](/images/release-create-new.png)

1. In the YAML editor, drag and drop your application files into the file directory. These can be Kubernetes manifest files or Helm charts. Click the plus icon to add a new YAML file, if needed.

   ![Default YAML](/images/guides/kots/default-yaml.png)

   [View a larger image](/images/guides/kots/default-yaml.png)

1. Edit the YAML files as needed. For example, you can edit a custom resource or map Helm chart values.

1. Click **Save release**, and then click **Promote**.

1. In the Promote Release dialog, edit the fields:

    ![Promote release dialog](/images/release-promote.png)

    <table>
      <tr>
        <th width="30%">Field</th>
        <th width="70%">Description</th>
      </tr>
      <tr>
        <td>Channel</td>
        <td>Select the channel where you want to promote the release. The defaults are Stable, Beta, and Unstable. If you created custom channels, they are listed here also.</td>
      </tr>
      <tr>
        <td>Version label</td>
        <td>Enter a version label. If semantic versioning is enabled for the channel, you must use a valid semantic version. For more information, see <a href="releases-semantic-versioning">Enabling Semantic Versioning</a>.</td>
      </tr>
      <tr>
        <td>Requirements</td>
        <td>Select <strong>Prevent this release from being skipped during upgrades</strong> to mark the release as required. When a release is required, the admin console requires users to upgrade to that version before they can upgrade to a later version.<br></br><br></br>For example, if you select <strong>Prevent this release from being skipped during upgrades</strong> for release v2.0.0, users with v1.0.0 deployed must upgrade to v2.0.0 before they can upgrade to a version later than v2.0.0, such as v2.1.0.<br></br><br></br>Required releases are supported in the app manager v1.68.0 and later.<br></br><br></br>After users deploy a required version, they can no longer redeploy (roll back to) versions earlier than the required version, even if <code>allowRollback</code> is <code>true</code> in the Application custom resource manifest. See <a href="../reference/custom-resource-application#allowrollback">allowRollback</a> in the <i>Application</i> custom resource topic.</td>
      </tr>
      <tr>
        <td>Release notes</td>
        <td>Add detailed release notes. The release notes support markdown and are shown to your customer.</td>
      </tr>
    </table>

1. Click **Promote**.

  The release appears in an **Active** state on the Releases page.

## Next Step

Update and test the release in your development environment using the Replicated admin console. For more information about updating an application release in the admin console, see [Updating an Application](../enterprise/updating-apps).

## Related Topics

* [About Releases](releases-about)
* [About Release Channels](releases-about-channels)
* [How to Package and Distribute a Production Application](distributing-workflow)
