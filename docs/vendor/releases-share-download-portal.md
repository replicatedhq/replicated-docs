import DownloadPortal from "../partials/kots/_download-portal-about.mdx"

# Downloading Assets from the Download Portal

This topic describes how to download customer license files, air gap bundles, and other assets from the Replicated Download Portal.

For information about downloading air gap bundles and licenses with the Vendor API v3, see the following pages in the Vendor API v3 documentation:
* [Download a customer license file as YAML](https://replicated-vendor-api.readme.io/reference/downloadlicense)
* [Trigger airgap build for a channel's release](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbuild)
* [Get airgap bundle download URL for the active release on the channel](https://replicated-vendor-api.readme.io/reference/channelreleaseairgapbundleurl)

## Overview

<DownloadPortal/>

The most common use case for the Download Portal is for customers installing into air gap environments who need to download both their license file as well as multiple air gap bundles.

The following is an example of the Download Portal for an air gap customer installing in their own existing cluster:

![Download Portal for existing cluster air gap installs](/images/download-portal-existing-cluster.png)

[View a larger version of this image](/images/download-portal-existing-cluster.png)

## Limitations

* Installation assets for [Replicated Embedded Cluster](/vendor/embedded-overview) are not available for download in the Download Portal.

* Sessions in the Download Portal are valid for 72 hours. After the session expires, your customer must log in again. The Download Portal session length is not configurable.

## Download Assets from the Download Portal

To log in to the Download Portal and download assets:

1. In the [Vendor Portal](https://vendor.replicated.com), on the **Customers** page, click on the name of the customer.

1. (Optional) On the **Manage customer** tab, enable the **Airgap Download Enabled** option. This makes air gap bundles available in the Download Portal.

   ![airgap download enabled license option](/images/airgap-download-enabled.png)

   [View a larger version of this image](/images/airgap-download-enabled.png)

1. On the **Reporting** tab, in the **Download portal** section, click **Manage customer password**.

   ![download portal section](/images/download-portal-link.png)

   [View a larger version of this image](/images/download-portal-link.png)

1. In the pop-up window, enter a password or click **Generate**.

   <img alt="download portal password pop-up" src="/images/download-portal-password-popup.png" width="450px"/>

   [View a larger version of this image](/images/download-portal-password-popup.png)

1. Click **Copy** to copy the password to your clipboard.

   After the password is saved, it cannot be retrieved again. If you lose the password, you can generate a new one.

1. Click **Save** to set the password.

1. Click **Visit download portal** to log in to the Download Portal
and preview your customer's experience.

   :::note
   By default, the Download Portal uses the domain `get.replicated.com`. You can optionally use a custom domain for the Download Portal. For more information, see [Using Custom Domains](/vendor/custom-domains-using).
   :::

1. In the Download Portal, on the left side of the screen, select one of the following:
     * **Bring my own Kubernetes**: View the downloadable assets for existing cluster installations with KOTS.
     * **Embedded Kubernetes**:  View the downloadable assets for Replicated kURL installations.

     :::note
     Installation assets for [Replicated Embedded Cluster](/vendor/embedded-overview) are not available for download in the Download Portal.
     :::

     The following is an example of the Download Portal for an air gap customer:

     ![download portal for existing cluster air gap installs](/images/download-portal-existing-cluster.png)

     [View a larger version of this image](/images/download-portal-existing-cluster.png)

1. Under **Select application version**, use the dropdown to select the target application release version. The Download Portal automatically makes the correct air gap bundles available for download based on the selected application version.

1. Click the download button to download each asset.   

1. To share installation files with a customer, send the customer their unique link and password for the Download Portal.
