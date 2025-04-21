# Generate Support Bundles from the Admin Console

This topic describes how to generate support bundles from the KOTS Admin Console.

## Generate a Bundle from the Admin Console

The Replicated KOTS Admin Console includes a **Troubleshoot** page where you can generate a support bundle and review remediation suggestions for troubleshooting. You can also download the support bundle from the Admin Console.

To generate a support bundle in the KOTS Admin Console:

1. Log in to the Admin Console and go to the **Troubleshoot** tab.

1. Click **Analyze** to start analyzing the application. Or, copy the command provided to generate a bundle from the CLI.

   The analysis executes the support bundle plugin. After the analysis completes, the bundle is available on the **Troubleshoot** tab in the Admin Console. If any known issues are detected, they are highlighted with possible remediation suggestions.

   :::note
   No data leaves the cluster. Data is never sent across the internet or to anyone else.
   :::

1. (Optional) If enabled for your online installation, you might also see a **Send bundle to vendor** button available. Clicking this button will send the support bundle directly to your vendor. Replicated recommendeds following up with your vendor to let them know the bundle has been provided.
    <img alt="Send bundle to vendor screen" src="/images/send-bundle-to-vendor.png" width="800px"/>

    [View a larger version of this image](/images/send-bundle-to-vendor.png)

1. (Optional) Click **Download bundle** to download the support bundle. You can send the bundle to your vendor for assistance.