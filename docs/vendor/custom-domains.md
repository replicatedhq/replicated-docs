import CustomDomainsAbout from "../partials/custom-domains/_custom-domains-about.mdx"
import UseCustomDomain from "../partials/custom-domains/_use-custom-domain.mdx"
import Limitations from "../partials/custom-domains/_limitations.mdx"
import Wizard from "../partials/custom-domains/_wizard.mdx"

# Using Custom Domains for the Replicated Registry and Proxy Service

This topic describes how to add and use custom domains to alias the Replicated registry and Replicated proxy service.

## About Custom Domains

<CustomDomainsAbout/>

By default, the Replicated registry uses the domain `registry.replicated.com` and the proxy service uses the domain `proxy.replicated.com`. You can add custom domains so that customer-facing URLs for images and Helm charts pulled from the Replicated registry, and images proxied from external private registries, reflect your company's brand.

## Limitations

<Limitations/>

## Configure a Custom Registry or Proxy Domain

To add and configure a custom domain for the Replicated registry or proxy service:

<Wizard/>

## Use a Custom Domain for the Replicated Registry or Proxy {#use}

<UseCustomDomain/>

## Reuse a Custom Domain for Another Application

If you have configured a custom domain for one application, you can reuse the custom domain for another application in the same team without going through the ownership and TLS certificate verification process again.

To reuse a custom domain for another application:

1. In the vendor portal, select the application from the dropdown list.

1. Click **Custom Domains**.

1. In the section for the target endpoint, click **Add your first custom domain** for your first domain.

  The **Configure a custom domain** wizard opens.

1. In the text box, enter the custom domain name that you want to reuse. Click **Save & continue**.
  
  The last page of the wizard opens because the custom domain was verified previously.

1. Do one of the following:

   - Click **Set as default**. In the confirmation dialog that opens, click **Yes, set as default**.
   
   - Click **Not now**. You can come back later to set the domain as the default. The vendor portal shows shows that the domain has a Configured status because it was configured for a previous application, though it is not yet assigned as the default for this application.


## Remove a Custom Registry or Proxy Domain

You can remove a custom domain for the Replicated registry or proxy service at any time, but you should plan the transition so that you do not break any existing installations.

To remove a registry custom domain:

1. Log in to the [vendor portal](https://vendor.replicated.com) and click **Custom Domains**.

1. Verify that the domain is not set as the default nor in use on any channels. You can edit the domains in use on a channel in the channel settings. For more information, see [Channel Settings](releases-about-releases#channel-settings) in _About Channels_.

1. After ensuring that no installations are using the domain, click **Remove** next to the unused domain in the list to remove it from the vendor portal. Click **Yes, remove domain**.

  :::important
  When you remove a registry custom domain from the vendor portal, any installations that reference that custom domain break. Ensure that a custom domain is no longer in use before you remove it from the vendor portal.
  :::