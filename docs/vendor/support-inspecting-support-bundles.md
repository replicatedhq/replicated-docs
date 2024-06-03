# Inspecting Support Bundles

You can use the Vendor Portal to get a visual analysis of customer support bundles and use the file inspector to drill down into the details and logs files. Use this information to get insights and help troubleshoot your customer issues.

## Inspect a support bundle in the Vendor Portal

1. In the Vendor Portal, go to the [**Troubleshoot**](https://vendor.replicated.com/troubleshoot) page and click **Add support bundle > Upload a support bundle**.

1. In the **Upload a support bundle** dialog, drag and drop or use the file selector to upload a support bundle file to the Vendor Portal.

   <img alt="Upload a support bundle dialog" src="/images/support-bundle-analyze.png" width="500px"/>

   [View a larger version of this image](/images/support-bundle-analyze.png)

1. (Optional) If the support bundle relates to an open support issue, select the support issue from the dropdown to share the bundle with Replicated.

1. Click **Upload support bundle**.

   The **Support bundle analysis** page opens. The **Support bundle analysis** page includes information about the bundle, any available instance reporting data from the point in time when the bundle was collected, an analysis overview that can be filtered to show errors and warnings, and a file inspector.

   ![Support bundle analysis overview](/images/support-bundle-analysis-overview.png)

   [View a larger version of this image](/images/support-bundle-analysis-overview.png)

1. On the **File inspector** tab, select any files from the directory tree to inspect the details of any files included in the support bundle, such as log files.

1. (Optional) Click **Download bundle** to download the bundle. This can be helpful if you want to access the bundle from another system or if other team members want to access the bundle and use other tools to examine the files.

1. (Optional) Navigate back to the [**Troubleshoot**](https://vendor.replicated.com/troubleshoot) page and click **Create cluster** to provision a cluster with Replicated Compatibility Matrix. This can be helpful for creating customer-representative environments for troubleshooting. For more information about creating clusters with Compatibility Matrix, see [Using Compatibility Matrix](testing-how-to).

    <img alt="Cluster configuration dialog" src="/images/cmx-cluster-configuration.png" width="400px"/>

    [View a larger version of this image](/images/cmx-cluster-configuration.png)

1. If you cannot resolve your customer's issue and need to submit a support request, go to the [**Support**](https://vendor.replicated.com/) page and click **Open a support request**. For more information, see [Submitting a Support Request](support-submit-request).

   :::note
   The **Share with Replicated** button on the support bundle analysis page does _not_ open a support request. You might be directed to use the **Share with Replicated** option when you are already interacting with a Replicated team member.
   :::

   ![Submit a Support Request](/images/support.png)

   [View larger version of this image](/images/support.png)

## Sending a support bundle to the Vendor Portal from the Admin Console

You can also inspect a support bundle in the Vendor Portal by sending the bundle from the Admin Console.

1. In the Replicated admin console, go to the **Troubleshoot** tab and click **Generate a support bundle**.
1. In the **Generate a support bundle** dialog, drag and drop or use the file selector to upload a support bundle file, or click **Analayze** to generate a support bundle for your application.
2. Once your bundle finishes generating or being uploaded, click **Send bundle to vendor** to send the bundle directly to the Vendor Portal.
    <img alt="Send bundle to vendor screen" src="/images/send-bundle-to-vendor.png" width="600px"/>

    [View a larger version of this image](/images/send-bundle-to-vendor.png)
3. (Optional) Click **Download bundle** to download the bundle. This can be helpful if you want to access the bundle from another system or if other team members want to access the bundle and use other tools to examine the files.
4. Once you've sent the bundle to the Vendor Portal, you can navigate to the [**Troubleshoot**](https://vendor.replicated.com/troubleshoot) page in the Vendor Portal to view the bundle and analyze it.

   ![Support bundle analysis overview](/images/support-bundle-analysis-overview.png)

   [View a larger version of this image](/images/support-bundle-analysis-overview.png)

   :::note
   If you need to submit a support request, go to the [**Support**](https://vendor.replicated.com/) page and click **Open a support request**. For more information, see [Submitting a Support Request](support-submit-request).
   :::

   ![Submit a Support Request](/images/support.png)

   [View larger version of this image](/images/support.png)
