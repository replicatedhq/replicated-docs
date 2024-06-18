import DownloadPortal from "../partials/kots/_download-portal-about.mdx"

# Sharing Assets Through the Download Portal

This topic describes how to share customer license files, air gap bundles, and other release artifacts with customers through the Replicated Download Portal.

## Overview

<DownloadPortal/>

The most common use case for the Download Portal is for customers installing into air gap environments who must download both their license file as well as multiple air gap bundles. In this case, the Download Portal makes it easy for customers to find and download the correct KOTS Admin Console or kURL air gap bundle based on the selected application version to ensure compatibility.

The following is an example of the Download Portal for an air gap customer installing in their own existing cluster:

![Download Portal for existing cluster air gap installs](/images/download-portal-existing-cluster.png)

[View a larger version of this image](/images/download-portal-existing-cluster.png)

The following is an example of the Download Portal for an air gap customer installing with kURL:

![Download Portal for kURL air gap installs](/images/download-portal-kurl.png)

[View a larger version of this image](/images/download-portal-kurl.png)

## Limitation

The binary required to install with [Replicated Embedded Cluster](/vendor/embedded-overview) is not shareable through the Download Portal.

## Get the Customer-Specific Download Portal URL and Password

To share installation files with a customer, you can send the customer their unique link and password for the Download Portal.

To get the URL and generate a password for the Download Portal:

1. In the [Vendor Portal](https://vendor.replicated.com), on the **Customers** page, click on the name of the target customer.

1. In the **Download portal** section, click **Generate new password**.

1. Save the password that appears in the pop-up window. Your customer uses
this password to log in to the Download Portal.

1. Click **Copy URL** to copy the URL to the Download Portal to your clipboard. This is the URL where your customer can access the Download Portal.

   :::note
   By default, the Download Portal uses the domain `get.replicated.com`. You can optionally use a custom domain for the Download Portal. For more information, see [Using Custom Domains](/vendor/custom-domains-using).
   :::

1. (Optional) Click **Visit Download Portal** to log in to the Download Portal
and preview your customer's experience.

1. Send the URL and password for the Download Portal to your customer.