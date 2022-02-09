# Creating a release

We recommend that you bookmark the Replicated [vendor portal](https://vendor.replicated.com) because it is used to manage and deploy application releases.

1. Log in (or create a new team) on the vendor portal and create a new application. After signing up and activating your account, you will be prompted to create a new application. Name your application and click **Create Application**.

  **Note:** If you are logging in with an existing account, you are not prompted to create a new application. Instead, click https://vendor.replicated.com/new-application to create a new application.

  ![Create Application](/images/guides/kots/create-application.png)

  The Channels page opens and displays a list of your release channels, which are logical stacks for you to stage and promote releases to your customers.

1. Click **Releases** on the left menu, and then click **Create a release**.

  ![Create Release](/images/guides/kots/create-release.png)

  A YAML editor displays.

1. In the YAML editor, you can define how your application will work and define the integration with the Replicated app manager functionality. You can manually edit YAML on this page or use the replicated CLI and API to automate this. For more information about using the CLI, see [Installing the replicated CLI](replicated-cli-installing).

  The default YAML documents (`replicated-app.yaml`, `preflight.yaml`, `config.yaml`, `support-bundle.yaml`) contain information for the app manager, preflight checks, customer configuration screen options, and support bundle analyzers for troubleshooting installs.

  Additionally, you can add custom resource YAML files, such as Helm charts and snapshots backups. For more information about working with the custom resource YAML files, see [About custom resources](../reference/custom-resource-about).

  ![Default YAML](/images/guides/kots/default-yaml.png)

1. Click **Save release**.

## Next steps

[Promoting releases](releases-promoting)

## Additional resources

[How to release an application](releases-workflow)
