import DownloadPortal from "../partials/kots/_download-portal-about.mdx"

# Sharing Assets Through the Download Portal

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

## Get the Customer-Specific Download Portal URL and Password

To share installation files with a customer, you can send the customer their unique link and password for the download portal.

To get the URL and generate a password for the download portal:

1. In the [Vendor Portal](https://vendor.replicated.com), on the **Customers** page, click on the name of the target customer.

1. In the **Download portal** section, click **Generate new password**.

1. Save the password that appears in the pop-up window. Your customer uses
this password to log in to the download portal.

1. Click **Copy URL** to copy the URL to the download portal to your clipboard. This is the URL where your customer can access the download portal.

   :::note
   By default, the download portal uses the domain `get.replicated.com`. You can optionally use a custom domain for the download portal. For more information, see [Using Custom Domains](/vendor/custom-domains-using).
   :::

1. (Optional) Click **Visit download portal** to log in to the download portal
and preview your customer's experience.

1. Send the URL and password for the download portal to your customer.