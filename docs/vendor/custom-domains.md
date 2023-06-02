import CustomDomainsAbout from "../partials/custom-domains/_custom-domains-about.mdx"
import UseCustomDomain from "../partials/custom-domains/_use-custom-domain.mdx"
import Limitations from "../partials/custom-domains/_limitations.mdx"
import Wizard from "../partials/custom-domains/_wizard.mdx"

# Using Custom Domains for the Replicated Registry and Proxy Service

This topic describes how to add and use custom domains to alias the Replicated private registry and Replicated proxy service.

## About Custom Domains

<CustomDomainsAbout/>

By default, the Replicated private registry uses the domain `registry.replicated.com` and the proxy service uses the domain `proxy.replicated.com`. You can add custom domains so that customer-facing URLs for images and Helm charts pulled from the Replicated private registry, and images proxied from external private registries, reflect your company's brand.

## Limitations

<Limitations/>

## Configure a Custom Registry or Proxy Domain

To add and configure a custom domain for the Replicated private registry or proxy service:

<Wizard/>

## Use a Custom Domain for the Replicated Registry or Proxy {#use}

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