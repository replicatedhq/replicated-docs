# Enabling Support Bundle Uploads (KOTS-only) (Beta)

:::note
Direct bundle uploads is in beta. The functionality, requirements, and limitations of direct bundle uploads are subject to change.
:::

When this feature is enabled, customers using online KOTS installations can upload support bundles directly through the Admin Console UI, eliminating the need to share the generated bundle with you manually.

When enabled, your customers can use the **Send bundle to vendor button** in the Admin Console to upload a generated support bundle.

<img alt="Send bundle to vendor screen" src="/images/send-bundle-to-vendor.png" width="600px"/>

After clicking this button, the bundle will be immediately available under the Troubleshoot tab in the Vendor Portal team account associated with this customer.

For more information on how your customer can use this feature, see [Generating Support Bundles](https://docs.replicated.com/enterprise/troubleshooting-an-app) in the KOTS documentation.

### How to Enable Direct Bundle Uploads

Direct bundle uploads are disabled by default. To enable this feature for your customer:

1. Log in to the Vendor Portal and navigate to your customer's **Manage Customer** page.
1. Under the **License options** section, make sure your customer has **KOTS Install Enabled** checked, and then check the **Support Bundle Upload Enabled (Beta)** option.
   <img alt="Customer license options: configure direct support bundle upload" src="/images/configure-direct-support-bundle-upload.png" width="400px"/>

   [View a larger version of this image](/images/configure-direct-support-bundle-upload.png)
1. Click **Save**.

### Limitations

- You will not receive a notification when a customer sends a support bundle to the Vendor Portal. To avoid overlooking these uploads, activate this feature only if there is a reliable escalation process already in place for the customer license.
- This feature only supports online KOTS installations. If enabled, but installed in air gap mode, the upload button will not appear.
- There is a 500mb limit for support bundles uploaded directly via the Admin Console.
