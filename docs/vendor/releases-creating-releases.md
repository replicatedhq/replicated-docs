# Creating a Release

We recommend that you bookmark the Replicated [vendor portal](https://vendor.replicated.com) because it is used to manage and deploy application releases.

1. Log in (or create a new team) on the vendor portal and do one of the following:

    - If you are activating a new account: In the prompt, name your application and click **Create application**.

    ![Create Application](/images/guides/kots/create-application.png)

    - If you are logging in with an existing account: From the Applications drop-down list, click **Create new app** or select an existing application.

  The Channels page for the release opens and displays a list of your release channels, which are logical stacks for you to stage and promote releases to your customers.

1. Click **Releases** on the left menu, and click **Create release**.

  ![Create Release](/images/guides/kots/create-release.png)

  A YAML editor displays.

1. In the YAML editor, package your application by providing a set of Kubernetes manifest files. These can include standard manifest files or Helm charts, as well as custom resources that invoke app manager functions.

  The _Packaging Your Application_ section includes information about how to write the manifest files for these resources.

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
