# About Releases

This topic describes concepts about creating and promoting releases, editing release properties, and information about the Releases page in the Replicated vendor portal.

## Overview of Releases

You can use the Replicated vendor portal to create and release versions of your application to various release channels. The vendor portal hosts a built-in YAML editor and linter to help you write and validate manifest files.

Alternatively, you can use the replicated CLI and API to automate releases. For more information about using the CLI, see [Installing the replicated CLI](../reference/replicated-cli-installing). For information about the API, see [Using the Vendor API v3](..reference/vendor-api-using).

Application files can be either Helm charts or Kubernetes manifest files, which can include standard manifests such as Deployment and Service resources.

### Custom Resources

Replicated includes several custom resources that you can add to your releases, which are packaged as part of the application but not deployed to the cluster. Custom resources are consumed by the app manager, the admin console, or by other kubectl plugins to control the application experience. For more information, see [About Custom Resources](../reference/custom-resource-about).

### Release Promotion

After you save a release, you can promote it to any of your release channels. While you are developing and testing an application release, Replicated recommends that you promote to a channel that does not have any customers assigned, such as the default Unstable channel. When you are ready to share your application with customers, you can then promote to a channel where customers are assigned, such as the default Beta or Stable channels. For more information about channels, see [About Channels](../vendor/releases-about-channels).

Every customer license file that you create in the Replicated vendor portal is assigned to a channel. Each time you promote a new release to a channel, customers assigned to that channel can update their installed application instance to the new release version.

### Release Properties

You cannot edit the YAML files in a release after the release is promoted to a channel. However, each release has properties, such as the release notes, the version label, and the required status, that you can edit from the channel Release History page in the vendor portal. For more information, see [About the Channels Page](/vendor/releases-about-channels#about-the-channels-page) in _About Release Channels_.

## About the Draft Release Page

You click **Releases > Create Release** in the vendor portal to open the **Draft** page. This page provides a YAML editor to add, edit, and delete your application files and Replicated custom resources.

The following shows an example of the **Draft** page in the vendor portal:

 ![Default YAML](/images/guides/kots/default-yaml.png)

  [View a larger image](/images/guides/kots/default-yaml.png)

You can do the following tasks on the **Draft** page:

- In the file directory, manage the file directory structure. Replicated custom resource files are grouped together above the white line of the file directory. Application files are grouped together underneath the white line in the file directory.

  Delete files using the trash icon that displays when you hover over a file. Create a new file or folder using the corresponding icons at the bottom of the file directory pane. You can also drag and drop files in and out of the folders.

    ![Manage File Directory](/images/new-file-and-trash.png)

- Edit the YAML files by selecting a file in the directory and making changes in the YAML editor.

- In the **Help** or **Config help** pane, view the linter for any errors. If there are no errors, you get an **Everything looks good!** message. If an error displays, you can click the **Learn how to configure** link. For more information, see [Using the Linter](../reference/linter#using-the-linter) in _Linter Rules_.

- Select the Config custom resource to preview how your application's Config page will look to your customers. The **Config preview** pane only appears when you select that file. For more information, see [About the Configuration Screen](../vendor/config-screen-about).

- Select the Application custom resource to preview how your application icon will look in the Replicated admin console. The **Application icon preview** appears when you select that file. For more information, see [Customizing the Application Icon](../vendor/admin-console-customize-app-icon).
