import CustomDomainsAbout from "../partials/custom-domains/_custom-domains-about.mdx"
import UseCustomDomain from "../partials/custom-domains/_use-custom-domain.mdx"
import Limitations from "../partials/custom-domains/_limitations.mdx"

# Using Custom Domains for the Replicated Registry and Proxy (Beta)

This topic describes how to add and use custom domains to alias the Replicated private registry and Replicated proxy service.

## About Custom Domains

<CustomDomainsAbout/>

By default, the Replicated private registry uses the domain `registry.replicated.com` and the proxy service uses the domain `proxy.replicated.com`. You can add one or more custom domains for the Replicated registry and proxy service.

## Limitations

<Limitations/>

## Add a Custom Registry or Proxy Domain

You can add custom domains for the Replicated private registry and the Replicated proxy service.

To configure a custom domain for one of these services:

1. Log in to the [vendor portal](https://vendor.replicated.com) and go to **Custom Domains**.

  ****CHANGE SCREENSHOT****
  <img src="/images/custom-domains-page.png" alt="Custom registry domains options in the vendor portal" width="600"/>

  [View a larger image](/images/custom-domains-page.png)

1. Under **Custom domains for the Replicated registry** or **Custom domains for the proxy service**, click **Add your first custom domain** for your first domain, or click **Add new domain** for additional domains.

  The **Configure a custom domain** wizard opens for the registry type you chose.

  <img src="/images/custom-domains-configure.png" alt="Configure custom domains wizard in the vendor portal" width="600"/>

1. For **Domain**, enter the custom domain to use for images pushed to the Replicated registry or to proxy using the proxy service. Click **Save & continue**.

1. For **Create CNAME**, copy the text string and use it to create a CNAME record in your DNS account. Click **Continue**.

1. For **Verify ownership**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

  Your changes can take up to 24 hours to propagate.

1. For **TLS cert creation verification**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

    Your changes can take up to 24 hours to propagate.

1. For **Use domain**, do one of the following:
   * To set the new domain as the default, click **Yes, set as default**.

     :::note
     Replicated recommends that you do _not_ set a domain as the default until you are ready for it to be used by customers. To test a domain before you set it as the default, you can first assign the domain to a release channel used for development.
     :::

   * To make the new custom domain active without setting it as the default, click **Not now**.  

   For more information about the options for using custom domains, see [Use a Custom Domain](#use) below. 

## Use a Custom Domain {#use}

<UseCustomDomain/>

## Remove a Custom Registry or Proxy Domain

You can remove a custom domain for the Replicated private registry or proxy service at any time, but you should plan the transition so that you do not break any existing installations.

To remove a registry custom domain:

1. Log in to the [vendor portal](https://vendor.replicated.com), select the target application, and click **Custom Domains**.

1. If the domain to remove is set as the default, set a different new or existing domain as the default. 

1. Verify that the domain is not in use on any channels. You can edit the domains in use on a channel in the channel settings. For more information, see [Channel Settings](releases-about-releases#channel-settings) in _About Channels_.

1. After ensuring that no installations are using the target domain, click **Remove** next to the unused domain in the list to remove it from the vendor portal. Click **Yes, remove domain**.

  :::important
  When you remove a registry custom domain from the vendor portal, any installations that reference that custom domain break. Ensure that a custom domain is no longer in use before you remove it from the vendor portal.
  :::