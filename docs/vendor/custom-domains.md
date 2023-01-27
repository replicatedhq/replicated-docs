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

You can configure custom domains for the Replicated private registry or the proxy service.

To configure a custom domain for a registry:

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

## Assign a Registry Custom Domain

You can add or change the assignment of an existing custom registry domain to an application at any time.

To assign a registry custom domain to an application:

1. From the vendor portal, click **Teams > Custom Domains**.
1. Click **Use custom domain in an application** next to the domain that you want to use.
1. Copy the snippet from the **Use custom domain in an application** dialog that opens, then click **Ok, got it!**.
1. Create a new release and add the code snippet to the Application custom resource manifest file to create the new field for either `proxyRegistryDomain` or `replicatedRegistryDomain`. For more information, see [proxyRegistryDomain](../reference/custom-resource-application#proxyRegistryDomain) and [replicatedRegistryDomain](../reference/custom-resource-application#replicatedRegistryDomain) in the _Application_ section.


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

1. For **Use Domain**, click **Yes, set as default** to set the domain as the default, so that the vendor portal will use it for links to the download portal, or click **Not now**.

## Change a Download Portal Custom Domain

You can change or add the assignment of an existing custom domain to the download portal at any time. You can also remove a custom domain from the vendor portal when it is not set as the default.

To change a download portal custom domain:

1. From the vendor portal, click **Teams > Custom Domains**.
1. (Optional) In the **Custom domain for the download portal** pane, click **Set as default domain** next to a domain that you want to set as the default.
1. (Optional)  In the **Custom domain for the download portal** pane, click **Remove** next to a domain that you want to remove from the vendor portal entirely.