# Creating a Release

We recommend that you bookmark the Replicated [vendor portal](https://vendor.replicated.com) because it is used to manage and deploy application releases.

1. Log in (or create a new team) on the vendor portal and create a new application. After signing up and activating your account, you will be prompted to create a new application. Name your application and click **Create Application**.

  **Note:** If you are logging in with an existing account, you are not prompted to create a new application. Instead, click https://vendor.replicated.com/new-application to create a new application.

  ![Create Application](/images/guides/kots/create-application.png)

  The Channels page opens and displays a list of your release channels, which are logical stacks for you to stage and promote releases to your customers.

1. Click **Releases** on the left menu, and then click **Create a release**.

  ![Create Release](/images/guides/kots/create-release.png)

  A YAML editor displays.

1. In the YAML editor, package your application by providing a set of Kubernetes manifest files. These can include standard manifests such as Deployment and Service resources, as well as several custom resources that invoke app manager functions.

  The _Packaging Your Application_ section includes information about how to write the manifest files for these resources. For more information, see [Understanding packaging with the app manager](packaging-an-app).

  For reference information about the custom resources, see [About custom resources](../reference/custom-resource-about).

  :::note
  You can manually edit the YAML for each manifest file on this page or use the replicated CLI and API to automate this. For more information about using the CLI, see [Installing the replicated CLI](../reference/replicated-cli-installing).
  :::

  ![Default YAML](/images/guides/kots/default-yaml.png)

1. Click **Save release**.

## Next steps

[Promoting releases](releases-promoting)

## Additional resources

[How to Distribute an Application](distributing-workflow)
