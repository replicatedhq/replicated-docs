import AirGapLicenseDownload from "../partials/install/_airgap-license-download.mdx"

# Downloading Customer Licenses

This topic describes how to download a license file from the Replicated Vendor Portal.

For information about how to download customer licenses with the Vendor API v3, see [Download a customer license file as YAML](https://replicated-vendor-api.readme.io/reference/downloadlicense) in the Vendor API v3 documentation.

## Download Licenses

You can download license files for your customers from the **Customer** page in the Vendor Portal.

To download a license:

1. In the [Vendor Portal](https://vendor.replicated.com), go to the **Customers** page.
1. In the row for the target customer, click the **Download License** button.

    ![Download license button](/images/download-license-button.png)

    [View a larger version of this image](/images/download-license-button.png)

## Enable and Download Air Gap Licenses {#air-gap-license}

The **Airgap Download Enabled** license option allows KOTS to install an application without outbound internet access using the `.airgap` bundle.

To enable the air gap entitlement and download the license:

<AirGapLicenseDownload/>