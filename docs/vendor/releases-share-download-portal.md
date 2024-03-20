# Sharing Files Through the Download Portal

This topic describes how to share customer license files and air gap bundles with customers through the Replicated download portal.

## Overview

You can use the Replicated download portal to share license files and air gap bundles with customers. A unique download portal link is available for each customer. The download portal makes the relevant installation files available for download based on the customer's license, such as:
* The customer's license file
* `.airgap` bundles for the application releases that the customer has access to based on their channel assignment
* The Replicated KOTS admin console `kotsadm.tar.gz` air gap bundle
* The Replicated kURL `.tgz` air gap bundle
* Preflight, support bundle, and kots CLI kubectl plugins

The most common use case for the download portal is for customers installing into air gap environments who must download both their license file as well as multiple air gap bundles. In this case, the download portal makes it easy for customers to find and download the correct air gap bundles based on the selected application version to ensure compatibility.

The following is an example of the download portal for an air gap customer installing in their own existing cluster:

![download portal for existing cluster air gap installs](/images/download-portal-existing-cluster.png)

[View a larger version of this image](/images/download-portal-existing-cluster.png)

The following is an example of the download portal for an air gap customer installing in an embedded cluster with kURL:

![download portal for kURL air gap installs](/images/download-portal-kurl.png)

[View a larger version of this image](/images/download-portal-kurl.png)

## Get the Customer-Specific Download Portal URL and Password

To get the URL and generate a password for the download portal:

1. In the [vendor portal](https://vendor.replicated.com), on the **Customers** page, click on the name of the target customer.

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