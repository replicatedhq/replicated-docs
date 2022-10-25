# Step 2: Create a Release

To create a release:

1. Click **Releases** from the left menu, and click **Create a release**.

  ![Create Release](/images/guides/kots/create-release.png)

  A YAML editor opens, where you can define how your application will work and the integration with the app manager functionality. The default YAML documents above the white line contain information for the app manager, preflight checks, customer configuration screen options, and support bundle analyzers for troubleshooting installations.
  For more information, see the [custom resources reference docs](../reference/custom-resource-about).

1. Click **Save release** to proceed using the default values. For this example, you can skip editing the YAML. (You will make some changes later in this tutorial.)

  :::note
  When you are familiar with these concepts, you can use the replicated CLI and the Replicated Vendor API to automate this task rather than manually editing the YAML on this page. For more information, see [Installing the replicated CLI](../reference/replicated-cli-installing) and [Using the Vendor API v3](../reference/vendor-api-using).
  :::

  ![Default YAML](/images/guides/kots/default-yaml.png)


## Promote a Release

After the release is saved, promote it to the Unstable channel to make this release available for installation.

To promote the release:

1. Click **Releases** from the top left menu.
1. Click **Promote** on the row for the release that you just created.

  ![Create Application](/images/guides/kots/promote-release.png)

  The Promote Release dialog opens.

1. Choose the Unstable channel, and click **Promote**.


Now that you have a release promoted, you can create a license and install the sample NGINX application on a test server.
