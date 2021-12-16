# Creating a release

We recommend that you bookmark the [vendor portal](https://vendor.replicated.com) because it used to manage and deploy application releases.
For additional information about deploying releases, see our [community](https://help.replicated.com/community/).

1. Log in (or create a new team) on the [vendor portal](https://vendor.replicated.com) and create a new application. After signing up and activating your account, you will be prompted to create a new application. Give it a name, and click the **Create Application** button.

  If you are logging in with an existing account, you are not prompted to create a new application. Instead, click https://vendor.replicated.com/new-application to create a new application.

  ![Create Application](/images/guides/kots/create-application.png)

  The Channels page opens and displays a list of your release channels, which are logical stacks for you to stage and promote releases to your customers.

1. Click **Releases** item on the left menu, and then click **Create a release**.

  ![Create Release](/images/guides/kots/create-release.png)

  A YAML editor displays.

1. In the YAML editor, you can define how your application will work and the integration with KOTS functionality. You can manually edit YAML on this page or use our [CLI and API](/vendor/cli) to automate this. For more information about using the CLI, see the [CLI setup guide](/vendor/guides/cli-quickstart/#2-setting-a-service-account-token).

  The default YAML documents (replicated-app.yaml, preflight.yaml, config.yaml, support-bundle.yaml) contain information for KOTS, preflight checks, customer configuration screen options, and support bundle analyzers for troubleshooting installs.

  Additionally, you can add custom resource YAML files, such as Helm charts and Snapshots backups. For more information about working with the custom resource YAML files, see the [Reference documentation](/reference/v1beta1).

  ![Default YAML](/images/guides/kots/default-yaml.png)

1. Click **Save release**.

## Next steps

Promote the release to a channel.

## Additional resources

[How to use the Replicated product](http://localhost:3000/docs/vendor/getting-started-how-to-use-replicated)
