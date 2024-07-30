# Using Custom Domains

This topic describes how to use the Replicated Vendor Portal to add and manage custom domains to alias the Replicated registry, the Replicated proxy service, the Replicated app service, and the download portal.

For information about adding and managing custom domains with the Vendor API v3, see the [customHostnames](https://replicated-vendor-api.readme.io/reference/createcustomhostname) section in the Vendor API v3 documentation.

For an overview about custom domains and limitations, see [About Custom Domains](custom-domains).

## Configure a Custom Domain

Before you assign a custom domain for a registry or the download portal, you must first configure and verify the ownership and TLS certificate.

To add and configure a custom domain:

1. In the [Vendor Portal](https://vendor.replicated.com), go to **Custom Domains**. 

1. In the **Add custom domain** dropdown, select the target Replicated endpoint.

    The **Configure a custom domain** wizard opens.

    <img src="/images/custom-domains-download-configure.png" alt="custom domain wizard" width="500"/>

    [View a larger version of this image](/images/custom-domains-download-configure.png)

1. For **Domain**, enter the custom domain. Click **Save & continue**.

1. For **Create CNAME**, copy the text string and use it to create a CNAME record in your DNS account. Click **Continue**.

1. For **Verify ownership**, copy the text string and use it to create a TXT record in your DNS account if displayed. If a TXT record is not displayed, ownership will be validated automatically using an HTTP token. Click **Validate & continue**.

    Your changes can take up to 24 hours to propagate.

1. For **TLS cert creation verification**, copy the text string and use it to create a TXT record in your DNS account if displayed. If a TXT record is not displayed, ownership will be validated automatically using an HTTP token. Click **Validate & continue**.

    Your changes can take up to 24 hours to propagate.

    :::important
    If you set up a [CAA record](https://letsencrypt.org/docs/caa/) for this hostname, it might prevent TLS certificate renewal in the future. This can result in downtime for your customers.
    :::

1. For **Use Domain**, to set the new domain as the default, click **Yes, set as default**. Otherwise, click **Not now**.

    :::note
    Replicated recommends that you do _not_ set a domain as the default until you are ready for it to be used by customers.
    :::

The Vendor Portal marks the domain as **Configured** after the verification checks for ownership and TLS certificate creation are complete.

## Use Custom Domains

After you configure one or more custom domains in the Vendor Portal, you assign a custom domain by setting it as the default for all channels and customers or by assigning it to an individual release channel.

### Set a Default Domain

Setting a default domain is useful for ensuring that the same domain is used across channels for all your customers.

When you set a custom domain as the default, it is used by default for all new releases promoted to any channel, as long as the channel does not have a different domain assigned in its channel settings.

Only releases that are promoted to a channel _after_ you set a default domain use the new default domain. Any existing releases that were promoted before you set the default continue to use the same domain that they used previously.

To set a custom domain as the default:

1. In the Vendor Portal, go to **Custom Domains**.

1. Next to the target domain, click **Set as default**.

1. In the confirmation dialog that opens, click **Yes, set as default**.

### Assign a Domain to a Channel {#channel-domain}

You can assign a domain to an individual channel by editing the channel settings. When you specify a domain in the channel settings, new releases promoted to the channel use the selected domain even if there is a different domain set as the default on the **Custom Domains** page.

Assigning a domain to a release channel is useful when you need to override either the default Replicated domain or a default custom domain for a specific channel. For example:
* You need to use a different domain for releases promoted to your Beta and Stable channels.
* You need to test a domain in a development environment before you set the domain as the default for all channels.

To assign a custom domain to a channel:

1. In the Vendor Portal, go to **Channels** and click the settings icon for the target channel.

1. Under **Custom domains**, in the drop-down for the target Replicated endpoint, select the domain to use for the channel. For more information about channel settings, see [Settings](releases-about#settings) in _About Channels and Releases_.

    <img alt="channel settings dialog" src="/images/channel-settings.png" width="500px"/>

    [View a larger version of this image](/images/channel-settings.png)

## Reuse a Custom Domain for Another Application

If you have configured a custom domain for one application, you can reuse the custom domain for another application in the same team without going through the ownership and TLS certificate verification process again.

To reuse a custom domain for another application:

1. In the Vendor Portal, select the application from the dropdown list.

1. Click **Custom Domains**.

1. In the section for the target endpoint, click Add your first custom domain for your first domain, or click **Add new domain** for additional domains.

    The **Configure a custom domain** wizard opens.

1. In the text box, enter the custom domain name that you want to reuse. Click **Save & continue**.
  
    The last page of the wizard opens because the custom domain was verified previously.

1. Do one of the following:

    - Click **Set as default**. In the confirmation dialog that opens, click **Yes, set as default**.
   
    - Click **Not now**. You can come back later to set the domain as the default. The Vendor Portal shows shows that the domain has a Configured status because it was configured for a previous application, though it is not yet assigned as the default for this application.


## Remove a Custom Domain

You can remove a custom domain at any time, but you should plan the transition so that you do not break any existing installations or documentation.

Removing a custom domain for the Replicated registry, proxy service, or Replicated app service will break existing installations that use the custom domain. Existing installations need to be upgraded to a version that does not use the custom domain before it can be removed safely.

If you remove a custom domain for the download portal, it is no longer accessible using the custom URL. You will need to point customers to an updated URL.

To remove a custom domain:

1. Log in to the [Vendor Portal](https://vendor.replicated.com) and click **Custom Domains**.

1. Verify that the domain is not set as the default nor in use on any channels. You can edit the domains in use on a channel in the channel settings. For more information, see [Settings](releases-about#settings) in _About Channels and Releases_.

    :::important
    When you remove a registry or Replicated app service custom domain, any installations that reference that custom domain will break. Ensure that the custom domain is no longer in use before you remove it from the Vendor Portal.
    :::

1. Click **Remove** next to the unused domain in the list, and then click **Yes, remove domain**.  
