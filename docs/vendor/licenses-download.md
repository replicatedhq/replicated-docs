# Downloading Customer Licenses

To install your application, your customer must provide a valid license file. This topic describes how to download a license file for online or air gap installations so that you can share it with your customer.

For information about how to download customer licenses with the Vendor API v3, see [Download a customer license file as YAML](https://replicated-vendor-api.readme.io/reference/downloadlicense) in the Vendor API v3 documentation.

## Download Online Licenses

To download a license file for online installations:

1. In the [vendor portal](https://vendor.replicated.com), open the **Customers** page.
1. Click the download license icon on the right side of a customer row.

## Download Air Gap Licenses {#air-gap-license}

The air gap license option lets you install the `.airgap` bundle. Without this enabled, you cannot use the `.airgap` bundle.

To enable the air gap entitlement and download the updated license:

1.  In the [vendor portal](https://vendor.replicated.com), click **[App Name] > Customer > [Customer Name]**.

    ![Airgap Customers](/images/guides/kots/airgap-customers.png)

1. Click **License options > Airgap Download Enabled**, and **Save Changes**. This lets KOTS use the `.airgap` bundle.

    ![Airgap Download License](/images/guides/kots/airgap-download-license.png)

1. Click **Download license** to download the updated air gapped enabled YAML license.