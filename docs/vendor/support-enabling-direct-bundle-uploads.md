# Enabling Direct Bundle Uploads (KOTS-only) (Beta)

:::note
Direct bundle uploads is in beta. The functionality, requirements, and limitations of direct bundle uploads are subject to change.
:::

For online KOTS installations with this feature enabled, customers can generate support bundles from the Admin Console UI or CLI, and provide those to you in order to assist in application troubleshooting.

When enabled, your customer will see a **Send bundle to vendor** button in the Admin Console. Once this button is clicked, the support bundle will be immediately uploaded and made available in the Vendor Portal team account for this customer under the **Troubleshoot** tab. For more information on how your customer can use this feature, see [Generating Support Bundles](troubleshooting-an-app) in the KOTS documentation.

### How to Enable Direct Bundle Uploads

Direct bundle uploads are disabled by default. To enable this feature for your customer:

1. Log in to the Vendor Portal and navigate to your customer's **Manage Customer** page.
1. Under the **License options** section, make sure your customer has **KOTS Install Enabled** checked, and then check the **Support Bundle Upload Enabled (Beta)** option.
   <img alt="Customer license options: configure direct support bundle upload" src="/images/configure-direct-support-bundle-upload.png" width="400px"/>

   [View a larger version of this image](/images/configure-direct-support-bundle-upload.png)
1. Click **Save**.

### Limitations

- There is no notification provided when your customer sends a bundle to the Vendor Portal. You should not enable this feature for a given customer license unless you already have an existing escalation process to avoid potentially missing the directly uploaded customer support bundle.
- This feature only supports online KOTS installations. If enabled, but installed in air gap mode, the upload button will not appear.
- There is a 500mb limit for support bundles uploaded directly via the Admin Console.
