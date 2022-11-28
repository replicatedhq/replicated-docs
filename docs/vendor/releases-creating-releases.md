# Creating a Release

You can use the Replicated vendor portal to create and release versions of your application to various release channels. The vendor portal hosts a built-in YAML editor and linter to help you write and validate manifest files.

Alternatively, you can use the replicated CLI and API to automate releases. For more information about using the CLI, see [Installing the replicated CLI](../reference/replicated-cli-installing).

Replicated lets you add custom resources to your releases, which are packaged as part of the application but not deployed to the cluster. When included, custom resources are consumed by the app manager, the admin console, or by other kubectl plugins to control the application experience. For more information about the custom resources, see [About Custom Resources](../reference/custom-resource-about).

To create a release:

1. Log in (or create a new team) on the [vendor portal](https://vendor.replicated.com) and create a new application. After signing up and activating your account, you are prompted to create a new application. Name your application and click **Create Application**.

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

1. To manage the file directory structure, note the following options:

    - To delete files, click the Trash icon that displays when you hover over a file.
    - To create a new file or folder, click the corresponding icons at the bottom of the file directory pane.

      ![Manage File Directory](/images/new-file-and-trash.png)

1. (Optional) Add custom resource manifest files to your application. For example, Replicated recommends that you add Preflight and Support Bundle custom resources to help with troubleshooting.

  When viewing a release in the YAML editor, the custom resources are grouped together at the top of the manifests list:

  ![Custom Resource Manifest Files](/images/kots-custom-resources.png)

1. Click **Save release**.

## Next Steps

[Promoting and Editing Releases](releases-promoting)
