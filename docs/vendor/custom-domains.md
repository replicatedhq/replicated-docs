import CustomDomainsAbout from "../partials/custom-domains/_custom-domains-about.mdx"

# Using Custom Domains for the Replicated Registry and Proxy (Beta)

This topic describes how to configure custom domains to alias the Replicated private registry and Replicated proxy service.

## About Custom Domains

<CustomDomainsAbout/>

By default, the Replicated private registry uses the domain `registry.replicated.com` and the proxy service uses the domain `proxy.replicated.com`. You can add one or more custom domains for the Replicated registry and proxy service.

## Limitations

Using custom domains has the following limitations:

- A single custom domain cannot be used for multiple endpoints. For example, a single domain can map to `registry.replicated.com` for any number of applications, but cannot map to both `registry.replicated.com` and `proxy.replicated.com`, even if the applications are different.

- Custom domains cannot be used to alias replicated.app (release manifests), api.replicated.com (platform market API), or other services.

## Add a Custom Registry or Proxy Domain

You can add custom domains for the Replicated private registry and the Replicated proxy service.

To configure a custom domain for one of these services:

1. Log in to the [vendor portal](https://vendor.replicated.com), select the target application, and click **Custom Domains**.

  ****CHANGE SCREENSHOT****
  <img src="/images/custom-domains-page.png" alt="Custom registry domains options in the vendor portal" width="600"/>

  [View a larger image](/images/custom-domains-page.png)

1. In the **Custom domains...** pane for either the Replicated registry or the proxy service, click **Add your first custom domain** for your first domain, or click **Add new domain** for additional domains.

  The **Configure a custom domain** wizard opens for the registry type you chose.

  <img src="/images/custom-domains-configure.png" alt="Configure custom domains wizard in the vendor portal" width="600"/>

1. For **Domain**, enter the custom domain to use for images pushed to the Replicated registry or to proxy using the proxy service. Click **Save & continue**.

1. For **Create CNAME**, copy the text string and use it to create a CNAME record in your DNS account. Click **Continue**.

1. For **Verify ownership**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

  Your changes can take up to 24 hours to propagate.

1. For **TLS cert creation verification**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

    Your changes can take up to 24 hours to propagate.

## Use a Custom Domain

After you add one or more custom domains to the vendor portal, you can use a custom domain by setting it as the default and by assigning it to an individual channel.

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