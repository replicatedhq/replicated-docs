# Creating and Promoting Releases

This topic describes how to use the Replicated vendor portal or the replicated CLI to create and promote versions of your application to various release channels.

## Prerequisites

Replicated recommends that you create a CI/CD platform or integrate with an existing platform. For more information, see [Repository Workflow and Tagging Releases](repository-workflow-and-tagging-releases) and [Tutorial: Integrating with an Existing CI/CD Platform] (tutorial-ci-cd-integration).

## Create and Promote in the Vendor Portal

To create and promote a release in the vendor portal:

1. From the **Applications** dropdown list, select **Create an app** or select an existing application to update.

1. Click **Releases** on the left menu, and click **Create release**.

  ![Create Release](/images/release-create-new.png)

  [View a larger image](/images/release-create-new.png)

1. If you are creating a release for the first time, drag and drop your application files into the file directory in the YAML editor. These can be Kubernetes manifest files or Helm charts.

  If this is an existing application, your existing files appear in the YAML editor, and you can drag and drop new manifest files as needed.

  You can also click the plus icon to add a new, untitled YAML file.

   ![Default YAML](/images/guides/kots/default-yaml.png)

   [View a larger image](/images/guides/kots/default-yaml.png)

1. Edit the YAML files as needed, and click **Save release**. This saves a draft that you can continue to edit until you promote it.

  :::note
  To edit a draft release, click **Edit YAML** from the Releases page.
  :::

1. Click **Promote**. In the Promote Release dialog that opens, edit the fields:

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

## Create and Promote with the CLI

To create and promote a release using the replicated CLI:

1. Install the replicated CLI and create an API token. See [Installing the replicated CLI](/reference/replicated-cli-installing).

1. Run the following command to create a new application:

    ```
    replicated app create APP_NAME
    ```

    Replace APP_NAME with the name of the application.

1. Export the application slug in the output of the `app create` command as an environment variable:

  ```
  export REPLICATED_APP=YOUR_SLUG
  ```
  Replace `YOUR_SLUG` with the slug for the application you created in the previous step.

1. Verify that both the `REPLICATED_API_TOKEN` environment variable that you created in step 1 and the `REPLICATED_APP` environment variable are set correctly:

  ```
  replicated release ls
  ```

  In the output of this command, you see an empty list of releases for the new application:

  ```
  SEQUENCE    CREATED    EDITED    ACTIVE_CHANNELS
  ```

1. Import your application files, depending on whether you are using standard manifest files or Helm charts. For Kubernetes Operators, see...

1. From your directory, lint the manifest files and ensure that there are no errors in the YAML:

  ```bash
  replicated release lint --yaml-dir=YAML_DIR
  ```

  Replace YAML_DIR with the root directory of the YAML application manifest files.

1. Initialize the project as a Git repository.

  **Example:**

  ```
  git init
  git add .
  git commit -m "Initial Commit: My Application"
  ```
  
  Initializing the project as a Git repository allows you to track your history. The replicated CLI also reads Git metadata to help with the generation of release metadata, such as version labels.

1. From your application root directory, create a release with the default settings, which includes the Unstable channel:

  ```bash
  replicated release create --auto
  ```

  The `--auto` flag generates release notes and metadata based on the Git status. 
  
  Alternatively, run the following command to customize your settings:

  ```bash
  replicated release create --yaml-dir YAML_DIR --promote CHANNEL
  ```

  Replace:

  - YAML_DIR with the root directory of the YAML application manifest files.
  - CHANNEL with the name of the channel that you want to promote to. Channel names are case sensitive.
  
  For more information about flag options, see [release create](/reference/replicated-cli-release-create) in _Reference_.

  **Example output:**

  ```
      • Reading Environment ✓

    Prepared to create release with defaults:

        yaml-dir        "./manifests"
        promote         "Unstable"
        version         "Unstable-ba710e5"
        release-notes   "CLI release of master triggered by exampleusername [SHA: d4173a4] [31 Oct 22 08:51 MDT]"
        ensure-channel  true
        lint-release    true

    Create with these properties? [Y/n]
  ```

1. Type `y` and press **Enter** to confirm the prompt.

  **Example output:**

  ```text
    • Reading manifests from ./manifests ✓
    • Creating Release ✓
      • SEQUENCE: 1
    • Promoting ✓
      • Channel VEr0nhJBBUdaWpPvOIK-SOryKZEwa3Mg successfully set to release 1
  ```
  The release is created and promoted to the specified or default channel.

1. Verify that the release was promoted to the channel:

  ```
  replicated release ls
  ```
  **Example output:**

  ```text
  SEQUENCE    CREATED                 EDITED                  ACTIVE_CHANNELS
  1           2022-10-31T14:55:35Z    0001-01-01T00:00:00Z    Unstable

## Next Steps

The following are the recommended next steps to test the application in your development environment:

- To add a customer, see [Creating a Customer](creating-a-customer).
- If you are installing for the first time, see [Overview of Installing an Application with the App Manager](/enterprise/installing-overview) in the _Enterprise_ section. 
- If you are updating an existing installation, see [Updating an Application](../enterprise/updating-apps) in the _Enterprise_ section.

## Related Topics

* [About Releases](releases-about)
* [About Release Channels](releases-about-channels)
* [How to Package and Distribute a Production Application](distributing-workflow)
