import CustomDomainsAbout from "../partials/custom-domains/_custom-domains-about.mdx"
import UseCustomDomain from "../partials/custom-domains/_use-custom-domain.mdx"
import Limitations from "../partials/custom-domains/_limitations.mdx"
import Wizard from "../partials/custom-domains/_wizard.mdx"

# Using Custom Domains for Private Registries

This topic describes how to add and use custom domains to alias the Replicated private registry, Replicated proxy service, and replicated.app.

## Limitations

<Limitations/>

## Configure a Custom Domain for Registries or Services

To add and configure a custom domain for the Replicated registry, proxy service, or replicated.app:

<Wizard/>

## Use a Custom Domain for the Replicated Registry or Proxy {#use}

<UseCustomDomain/>

## Remove a Custom Registry or Proxy Domain

You can remove a custom domain for the Replicated registry or proxy service at any time, but you should plan the transition so that you do not break any existing installations.

To remove a registry custom domain:

1. Log in to the [vendor portal](https://vendor.replicated.com) and click **Custom Domains**.

1. Verify that the domain is not set as the default nor in use on any channels. You can edit the domains in use on a channel in the channel settings. For more information, see [Channel Settings](releases-about-releases#channel-settings) in _About Channels_.

1. After ensuring that no installations are using the domain, click **Remove** next to the unused domain in the list to remove it from the vendor portal. Click **Yes, remove domain**.

  :::important
  When you remove a registry custom domain from the vendor portal, any installations that reference that custom domain break. Ensure that a custom domain is no longer in use before you remove it from the vendor portal.
  :::