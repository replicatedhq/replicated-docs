# Step 2: Create a Release

Now that you have created an application object that contains example YAML manifest files, you can create a release and promote it to the Unstable channel.

By default, Replicated includes Unstable, Beta, and Stable release channels. The Unstable channel is intended for software vendors to use for internal testing, before promoting a release to the Beta or Stable channels for distribution to customers. For more information about channels, see [About Release Channels](releases-about-channels).

To create a release:

1. Click **Releases** from the left menu, and click **Create a release**.

  ![Create Release](/images/guides/kots/create-release.png)

  A YAML editor opens, where you can define how your application will work and the integration with the app manager functionality. The files below the white line are the sample NGINX application files.

  The default YAML manifest files above the white line contain information for the app manager, preflight checks, customer configuration screen options, and support bundle analyzers for troubleshooting installations. For more information, see the [About Custom Resources](../reference/custom-resource-about).

  ![Default YAML](/images/guides/kots/default-yaml.png)


1. Click **Save release** to proceed using the default values. For this example, you can skip editing the YAML. (You will make some changes later in this tutorial.)

  :::note
  When you are familiar with these concepts, you can use the replicated CLI and the Replicated Vendor API to automate this task rather than manually editing the YAML on this page. For more information, see [Installing the replicated CLI](../reference/replicated-cli-installing) and [Using the Vendor API v3](../reference/vendor-api-using).
  :::

1. Click **Releases > Promote**.

  In the Promote Release dialog that opens, select the Unstable channel and click **Promote**. Promoting a release makes it available for installation.

  ![Create Application](/images/guides/kots/promote-release.png)

## Next Step

Continue to [Step 3: Create a Customer](tutorial-ui-create-customer) to create a customer license file that you will upload when installing the application.
