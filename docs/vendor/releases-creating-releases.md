# Creating a Release

The Replicated [vendor portal](https://vendor.replicated.com) provides you with a location to create and release versions of your application to various release channels. The vendor portal hosts a built-in YAML editor and linter to help you write and validate manifest files.

We recommend that you bookmark the vendor portal because it is used to manage and deploy application releases.

To create a release:

1. Log in (or create a new team) on the vendor portal and create a new application. After signing up and activating your account, you will be prompted to create a new application. Name your application and click **Create Application**.

  **Note:** If you are logging in with an existing account, you are not prompted to create a new application. Instead, click https://vendor.replicated.com/new-application to create a new application.

  ![Create Application](/images/guides/kots/create-application.png)

  The Channels page opens and displays a list of your release channels, which are logical stacks for you to stage and promote releases to your customers.

1. Click **Releases** on the left menu, and then click **Create a release**.

  ![Create Release](/images/guides/kots/create-release.png)

  A YAML editor displays.

1. In the YAML editor, package your application by providing a set of Kubernetes manifest files or Helm charts. These can include standard manifests such as Deployment and Service resources, as well as several custom resources that invoke app manager functions.

  For more information about how to package and configure manifest files for a production application, see [How to Package an Aplicaiton for Production](packaging-workflow).

  For reference information about the custom resources, see [About custom resources](../reference/custom-resource-about).

  :::note
  You can manually edit the YAML for each manifest file on this page or use the replicated CLI and API to automate this. For more information about using the CLI, see [Installing the replicated CLI](../reference/replicated-cli-installing).
  :::

  ![Default YAML](/images/guides/kots/default-yaml.png)

1. Click **Save release**.

## Next Steps

[Promoting releases](releases-promoting)

## Additional Resources

[How to Distribute an Application](distributing-workflow)
[How to Package an Application for Production](packaging-workflow)
