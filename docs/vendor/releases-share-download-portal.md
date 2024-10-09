import DownloadPortal from "../partials/kots/_download-portal-about.mdx"

# Downloading Release Assets from the Download Portal

This topic describes how to share customer license files, air gap bundles, and other assets with customers through the Replicated download portal.

## Overview

<DownloadPortal/>

The most common use case for the download portal is for customers installing into air gap environments who must download both their license file as well as multiple air gap bundles. In this case, the download portal makes it easy for customers to find and download the correct KOTS admin console or kURL air gap bundle based on the selected application version to ensure compatibility.

The following is an example of the download portal for an air gap customer installing in their own existing cluster:

![download portal for existing cluster air gap installs](/images/download-portal-existing-cluster.png)

[View a larger version of this image](/images/download-portal-existing-cluster.png)

The following is an example of the download portal for an air gap customer installing in an embedded cluster with kURL:

![download portal for kURL air gap installs](/images/download-portal-kurl.png)

[View a larger version of this image](/images/download-portal-kurl.png)

### Limitation

Air gap bundles for the Replicated Embedded Cluster installer are not available in the Download Portal.

## Get the Customer-Specific Download Portal URL and Password

To share installation files with a customer, you can send the customer their unique link and password for the download portal.

To get the URL and generate a password for the download portal:

1. In the [Vendor Portal](https://vendor.replicated.com), on the **Customers** page, click on the name of the customer.

1. (Optional) On the **Manage customer** page, enable the **Airgap Download Enabled** option. This makes air gap bundles available in the Download Portal.

1. In the pop-up window, enter a password or click **Generate**.

1. Click **Copy** to copy the password to your clipboard.

   After the password is saved, it cannot be retrieved again. If you lose the password, you can generate a new one.

1. Click **Save** to set the password.

1. Click **Visit download portal** to log in to the Download Portal
and preview your customer's experience.

    The following is an example of the download portal for an air gap customer:

    ![download portal for existing cluster air gap installs](/images/download-portal-existing-cluster.png)

    [View a larger version of this image](/images/download-portal-existing-cluster.png)

   :::note
   By default, the Download Portal uses the domain `get.replicated.com`. You can optionally use a custom domain for the Download Portal. For more information, see [Using Custom Domains](/vendor/custom-domains-using).
   :::

1. Send the URL and password for the Download Portal to your customer.

## Download Assets from the Download Portal {#download-portal}

Users can download release assets, including air gap bundles and their licenses, from the Download Portal.

To download release assets from the Download Portal:


1. On the left side of the screen, select one of the following:
     * **Bring my own cluster**: View the air gap bundles for existing cluster installations with KOTS.
     * **Embedded cluster**: View the air gap bundles for kURL installations.

1. Under **Select application version**, use the dropdown to select the target application release version. The download portal automatically makes the correct air gap bundles available for download based on the selected application version.

1. Click the download button to download each asset.