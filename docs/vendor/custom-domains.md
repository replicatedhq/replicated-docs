# Using Custom Domains (Beta)

This topic describes using custom domains to alias Replicated endpoints, and how to configure them using the Replicated vendor portal. For information about using the API instead, see [Using the Vendor API v3](/reference/vendor-api-using) in _Reference_.

## About Custom Domains

You can use custom domains as aliases for the Replicated registry, the proxy service, and the download portal by creating Canonical Name (CNAME) records for your domains.

Replicated domains are external to your domain and require additional security reviews by your customer. Using custom domains as aliases can bring the domains inside an existing security review and reduce your exposure.

Using the Replicated vendor portal or the vendor API, you configure custom domains at the Team level.

Verification of the domain is required using TXT records that undergo separate verification checks for:

- Domain ownership: This verification is done when you initially add a record.
- TLS certificate creation: Each new domain must have a new TLS certificate to be verified.

The TXT records can be removed after the verification is complete.

For registry and proxy domains only, you also specify the domains in the Application custom resource manifest file for the release. This method lets you:

- Have different domains for your applications, if needed
- Roll out domain name changes in phases to prevent the application from breaking in production environments

For more information about registries, see [Connecting to a Private Registry](packaging-private-images).

For more information about the download portal, see [Share Files through the Download Portal](releases-sharing-license-install-script#download-portal) in _Share License Files and Releases_.

## Limitations

Using custom domains has the following limitations:

- A single custom domain cannot be used for multiple endpoints. For example, a single domain can map to registry.replicated.com for any number of applications, but cannot map to both registry.replicated.com and proxy.replicated.com, even if the applications are different.

- Custom domains cannot be used to alias replicated.app (release manifests), api.replicated.com (platform market API), or other services.

- Multiple custom domains for the download portal can be active at once, but only one custom domain can be the default. This default custom domain is used in the vendor portal for links to the download portal for all applications in the team. All active custom domains work whether or not they are the default.


## Configure Registry Domains

You can configure custom domains for the Replicated private registry and the proxy service.

To configure a custom domain for one of these services:

1. Log in to the [vendor portal](https://vendor.replicated.com), and click **Team > Custom Domains**.

1. In the **Custom domains...** pane for either the Replicated registry or the proxy service, click **Add your first custom domain** for your first domain, or click **Add new domain** for additional domains.

  The **Configure a custom domain** wizard opens.

1. For **Domain**, enter the custom domain to use for images pushed to the Replicated registry or to proxy using the proxy service. Click **Save & continue**.

1. For **Create CNAME**, copy the text string and use it to create a CNAME record in your DNS account. Click **Continue**.

1. For **Verify ownership**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

  Your changes can take up to 24 hours to propagate.

1. For **TLS cert creation verification**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

    Your changes can take up to 24 hours to propagate.

1. For **Use Domain**, copy the snippet to use as a template if needed. Click **Ok. got it!**.

1. Create a new release and create the new field for either `proxyRegistryDomain` or `replicatedRegistryDomain` in the Application custom resource manifest file. You can use the code snippet template from the previous step or manually code the field. For more information, see [proxyRegistryDomain](../reference/custom-resource-application#proxyRegistryDomain) and [replicatedRegistryDomain](../reference/custom-resource-application#replicatedRegistryDomain) in the _Application_ section.

## Transition to a Different Registry Custom Domain

You can create a release and specify a different custom registry domain at any time, but you should plan the transition so that you do not break any existing installations.

To transition to a different registry custom domain:

1. From the vendor portal, click **Teams > Custom Domains**.
1. Click **Add domain to a release** next to a domain in the Replicated registry or proxy service lists to begin using a newly configured domain. Then do the following:
    1. Copy the snippet from the **Configure a custom domain** dialog that opens, and click **Ok, got it!**.
    1. Create a new release and add the code snippet to the Application custom resource manifest file to create the new field for either `proxyRegistryDomain` or `replicatedRegistryDomain`. For more information, see [proxyRegistryDomain](../reference/custom-resource-application#proxyRegistryDomain) and [replicatedRegistryDomain](../reference/custom-resource-application#replicatedRegistryDomain) in the _Application_ section.
1. Ensure that all customers update to the new release so that they no longer use the old registry custom domain.
1. Click **Remove** next to the unused domain in the list to remove it from the vendor portal. Click **Yes, remove domain**.

    :::warning
    When you remove a registry custom domain from the vendor portal, any installations that still reference that custom domain will break. Ensure that a custom domain is no longer in use before you remove it from the vendor portal.
    :::

## Configure Download Portal Domains

You can configure the download portal to use a custom domain instead of the default get.replicated.com.

To configure a custom domain for the download portal:

1. Log in to the [vendor portal](https://vendor.replicated.com), and click **Team > Custom Domains**.

1. In the **Custom domain for the download portal** pane, click **Add your first custom domain** for your first domain, or click **Add new domain** for additional domains.

  The **Configure a custom domain** wizard opens.

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

You can set a download portal custom domain as the default at any time.

To set a download portal custom domain as the default:

1. From the vendor portal, click **Teams > Custom Domains**.
1. In the **Custom domain for the download portal** pane, click **Set as default domain** next to the domain that you want use as the default. Click **Yes, set as default**.
