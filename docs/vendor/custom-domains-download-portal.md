import CustomDomainsAbout from "../partials/custom-domains/_custom-domains-about.mdx"

# Using a Custom Domain for the Download Portal (Beta)

This topic describes how to configure a custom domain for the Replicated download portal.

## About Custom Domains

<CustomDomainsAbout/>

By default, the download portal uses the domain get.replicated.com. You can add one or more custom domains for the download portal. If you add more than one custom domain, you can specify which domain to use as the default for the download portal for all of your customers.

For more information about the download portal, see [Share Files through the Download Portal](releases-sharing-license-install-script#download-portal) in _Share License Files and Releases_.

## Limitation

Using a custom domain for the download portal has the following limitation:

* Multiple custom domains for the download portal can be active at once, but only one custom domain can be the default. This default custom domain is used in the vendor portal for links to the download portal for all customers. All active custom domains work whether or not they are the default.

## Configure Download Portal Domains

You can configure the download portal to use a custom domain instead of the default get.replicated.com.

To configure a custom domain for the download portal:

1. Log in to the [vendor portal](https://vendor.replicated.com), select the target application, and click **Custom Domains**. Scroll down to the **Custom domain for the download portal** pane. 

  <img src="/images/custom-domains-download-portal.png" alt="Download portal custom domains pane in the vendor portal" width="600"/>

  [View a larger image](/images/custom-domains-download-portal.png)

1. Click **Add your first custom domain** for your first domain, or click **Add new domain** for additional domains.

  The **Configure a custom domain** wizard opens.

  <img src="/images/custom-domains-download-configure.png" alt="Configure download portal custom domain dialog in the vendor portal" width="600"/>

1. For **Domain**, enter the custom domain to use for the download portal. Click **Save & continue**.

1. For **Create CNAME**, copy the text string and use it to create a CNAME record in your DNS account. Click **Continue**.

1. For **Verify ownership**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

  Your changes can take up to 24 hours to propagate.

1. For **TLS cert creation verification**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

    Your changes can take up to 24 hours to propagate.

1. For **Use Domain**, do one of the following:

    - Click **Yes, set as default** to set the domain as the default so that the vendor portal uses it for links to the download portal.
    - Click **Not now** to make the domain active without setting it as the default.

## Set a Default Download Portal Custom Domain

You can set a download portal custom domain as the default at any time. When you set a domain as the default for the download portal, that domain is used for all customers by default.

To set a download portal custom domain as the default:

1. From the vendor portal, click **Custom Domains**.
1. In the **Custom domain for the download portal** pane, click **Set as default domain** next to the domain that you want use as the default. 
1. In the confirmation dialog that opens, click **Yes, set as default**.