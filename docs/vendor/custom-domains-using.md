# Using Custom Domains

This topic describes how to add and manage custom domains to alias the Replicated private registry, Replicated proxy service, Replicated app service, and the download portal.

For an overview about custom domains and limitations, see [About Custom Domains](custom-domains-about).


## Configure a Custom Domain

Before you assign a custom domain for a registry or the download portal, you must first configure and verify the ownership and TLS certificate.

To add and configure a custom domain:

1. In the [vendor portal](https://vendor.replicated.com), go to **Custom Domains**. 

1. In the section for the target Replicated endpoint, click **Add your first custom domain** for your first domain, or click **Add new domain** for additional domains.

  The **Configure a custom domain** wizard opens.

  <img src="/images/custom-domains-download-configure.png" alt="custom domain wizard" width="600"/>

1. For **Domain**, enter the custom domain. Click **Save & continue**.

1. For **Create CNAME**, copy the text string and use it to create a CNAME record in your DNS account. Click **Continue**.

1. For **Verify ownership**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

  Your changes can take up to 24 hours to propagate.

1. For **TLS cert creation verification**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

    Your changes can take up to 24 hours to propagate.

1. For **Use Domain**, to set the new domain as the default, click **Yes, set as default**. Otherwise, click **Not now**.

  :::note
  Replicated recommends that you do _not_ set a domain as the default until you are ready for it to be used by customers.
  :::

The vendor portal marks the domain as **Configured** after the verification checks for ownership and TLS certificate creation are complete.

## Assign Custom Domains

After you configure one or more custom domains in the vendor portal, you assign a custom domain by setting it as the default for all channels and customers or by assigning it to an individual release channel. Both of these methods can be used for registries and the download portal.

### Set a Default Domain

Setting a default domain is useful for ensuring that the same domain is used across channels for all your customers.

When you set a custom domain as the default, it is used by default for all new releases promoted to any channel, as long as the channel does not have a different domain assigned in its channel settings.

Only releases that are promoted to a channel _after_ you set a default domain use the new default domain. Any existing releases that were promoted before you set the default continue to use the same domain that they used previously.

To set a custom domain as the default:

1. In the vendor portal, go to **Custom Domains**.

1. Next to the target domain, click **Set as default**.

1. In the confirmation dialog that opens, click **Yes, set as default**.

### Assign a Domain to a Channel {#channel-domain}

You can assign a domain to an individual channel by editing the channel settings. When you specify a domain in the channel settings, new releases promoted to the channel use the selected domain even if there is a different domain set as the default on the **Custom Domains** page.

Assigning a domain to a release channel is useful when you need to override either the default Replicated domain or a default custom domain for a specific channel. For example:
* You need to use a different domain for releases promoted to your Beta and Stable channels.
* You need to test a domain in a development environment before you set the domain as the default for all channels.

To assign a custom domain to a channel:

1. In the vendor portal, go to **Channels** and click the settings icon for the target channel.

1. Under **Custom domains**, in the drop-down for the target Replicated endpoint, select the domain to use for the channel. For more information about channel settings, see [Channel Settings](releases-about-channels#channel-settings) in _About Channels_.

   <img alt="channel settings dialog" src="/images/channel-settings.png" width="500px"/>

   [View a larger version of this image](/images/channel-settings.png)

## Reuse a Registry Custom Domain for Another Application

If you have configured a private registry custom domain for one application, you can reuse the custom domain for another application in the same team without going through the ownership and TLS certificate verification process again.

To reuse a registry custom domain for another application:

1. In the vendor portal, select the application from the dropdown list.

1. Click **Custom Domains**.

1. In the section for the target endpoint, click Add your first custom domain for your first domain, or click **Add new domain** for additional domains.

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