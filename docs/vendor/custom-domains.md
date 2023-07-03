import CustomDomainsAbout from "../partials/custom-domains/_custom-domains-about.mdx"
import UseCustomDomain from "../partials/custom-domains/_use-custom-domain.mdx"
import Limitations from "../partials/custom-domains/_limitations.mdx"
import Wizard from "../partials/custom-domains/_wizard.mdx"

# Using Custom Domains for Replicated Registries and the Proxy Service

This topic describes how to add and use custom domains to alias the Replicated private registry, Replicated proxy service, and replicated.app.

## About Custom Domains

<CustomDomainsAbout/>

You can configure custom domains for the following registries and services, so that customer-facing URLs reflect your company's brand:

- **Replicated registry:** Images and Helm charts can be pulled from the Replicated registry. By default, this registry uses the domain `registry.replicated.com`. For more information, see [Push Images to the Replicated Private Registry](private-images-replicated).

- **Proxy service:** Images can be proxied from external private registries. By default, the proxy service uses the domain `proxy.replicated.com`. For more information, see [About the Proxy Service](private-images-about#about-the-proxy-service) in _About Using an External Registry_.

- **replicated.app:** Upstream application YAML and metadata, including a license ID, are pulled from replicated.app. By default, this service uses the domain `replicated.app`. For more information, see [Firewall Openings for Online Installations](/enterprise/installing-general-requirements#firewall-openings-for-online-installations) in _Installation Requirements_.

- **Download portal:** The download portal can be used to share customer license files. For more information about customizing the download portal domain, see [Using a Custom Domain for the Download Portal](custom-domains-download-portal).


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