# About Releases

You can use the Replicated vendor portal to create and release versions of your application to various release channels. The vendor portal hosts a built-in YAML editor and linter to help you write and validate manifest files.

Alternatively, you can use the replicated CLI and API to automate releases. For more information about using the CLI, see [Installing the replicated CLI](../reference/replicated-cli-installing).

Replicated lets you add custom resources to your releases, which are packaged as part of the application but not deployed to the cluster. When included, custom resources are consumed by the app manager, the admin console, or by other kubectl plugins to control the application experience. For more information about the custom resources, see [About Custom Resources](../reference/custom-resource-about).

## About Promoting Releases

After you save a release, you can promote it to any of your release channels. While you are testing and developing an application release, Replicated recommends that you promote to a channel that does not have any customers assigned, such as the default Unstable channel. When you are ready to share your application with customers, you can then promote to a channel where customers are assigned, such as the default Beta or Stable channels.

Every customer license file that you create in the Replicated vendor portal is assigned to a channel. When a customer installs your application using their license file, the Replicated app manager installs the latest release that you promoted to the assigned channel. Each time you promote a new release to a channel, customers assigned to that channel can update their installed application instance to the new release version.

You cannot edit the YAML files in a release after the release is promoted to a channel. However, you can edit the release properties, including release notes, the version label, and the required status, from the Release History page for the channel in the vendor portal. For more information, see [About the Channels Page](/vendor/releases-about-channels#about-the-channels-page) in _About Release Channels_.

## About the Releases Page

The Release page in the vendor portal provides a YAML editor to add, edit, and delete your application files and Replicated custom resources. 

 ![Default YAML](/images/guides/kots/default-yaml.png)

  [View a larger image](/images/guides/kots/default-yaml.png)

Application files can be either Kubernetes manifest files or Helm charts, and can include standard manifests such as Deployment and Service resources. Application file are grouped together underneath the white line in the file directory.

  ![Custom Resource Manifest Files](/images/kots-custom-resources.png)

Replicated custom resource files are grouped together above the white line of the file directory. For more information about custom resources, see [About Custom Resources](../reference/custom-resource-about).

To manage the file directory structure, note the following options:

- To delete files, click the Trash icon that displays when you hover over a file.
- To create a new file or folder, click the corresponding icons at the bottom of the file directory pane.

    ![Manage File Directory](/images/new-file-and-trash.png)

The linter checks the manifest files to help ensure that there are no YAML syntax errors, that all required files are present, and other checks. The linter displays in the right pane of the YAML editor. If an error displays, you can click the error to get more information to help troubleshoot it. For more information about the linter, see [Using the Linter](../reference/linter#using-the-linter) in _Linter Rules_.


