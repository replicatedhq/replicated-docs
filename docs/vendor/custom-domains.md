# Using Custom Domains (Beta)

This topic describes using custom domains to alias Replicated endpoints, and how to configure them using the Replicated vendor portal or the vendor API.

## Limitations

Using custom domains have the following limitations:

- A single custom domain cannot be used for both the registry and proxy endpoints. A single domain can map to registry.replicated.com for any number of applications, but cannot map to both registry.replicated.com and  proxy.replicated.com, even if the applications are different.
- Custom domains cannot be used to alias replicated.app (release manifests), api.replicated.com (platform market API), the download portal, or other services.

## Custom Registry Domains {#registry}

You can use custom domains as aliases for the replicated.registry.com and proxy.replicated.com endpoints, by creating Canonical Name (CNAME) records for your domains.

Whether you use the Replicated private registry or the proxy service for your own private registry, these Replicated domains are external to your domain and require additional security reviews by your customer. Using custom domains as aliases for Replicated domains can bring the Replicated registry and proxy service inside an existing security review and reduce your exposure.

Using the Replicated vendor portal or the vendor API, you configure custom domains for the Replicated private registry and proxy service at the Team level. Then, you specify those domains within the release in the Application custom resource manifest file. This method lets you:

- Have different domains for your applications, if needed
- Roll out domain name changes in phases to prevent the application from breaking in production environments

### Verification

Verification of the domain is required using TXT records that undergo separate verification checks for:

- Domain ownership: This verification is done when you initially add a record.
- TLS certificate creation: Each new domain must have a new TLS certificate to be verified.

The TXT records can be removed once verification is complete.

### Configure Registry Domains

You can configure custom domains for the Replicated private registry or the proxy service in the vendor portal or the vendor API.

To configure a custom domain in the vendor portal:

1. Log in to the [vendor portal](https://vendor.replicated.com), and click **Team > Custom Domains**.

1. From the **Custom domains...** pane for either the Replicated registry or the proxy service, click **Add your first custom domain** for your first domain, or click **Add new domain** for additional domains.

  The **Configure a custom domain** wizard opens.

1. For **Domain**, enter the custom domain to use for images pushed to the Replicated registry or to proxy using the proxy service. Click **Save & continue**.

1. For **Create CNAME**, copy the text string and use it to create a CNAME record in your DNS account. Click **Continue**.

1. For **Verify ownership**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

  Your changes can take up to 24 hours to propagate.

1. For **TLS cert creation verification**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

    Your changes can take up to 24 hours to propagate.

1. For **Use Domain**, copy the snippet to use as a template if needed. Click **Ok. got it!**.

1. Create a new release and create the new field for either `proxyRegistryDomain` or `replicatedRegistryDomain` in the Application custom resource manifest file. You can use the code snippet template from the previous step or manually code the field. For more information, see [proxyRegistryDomain](../reference/custom-resource-application#proxyRegistryDomain) and [replicatedRegistryDomain](../reference/custom-resource-application#replicatedRegistryDomain) in the _Application_ section.

### Assign a Custom Domain to an Application

You can change or add the assignment of an existing custom domain to an application at any time.

To assign a custom domain to an application:

1. From the vendor portal, click **Teams > Custom Domains**.
1. Click **Use custom domain in an application** next to the domain that you want to use.
1. Copy the snippet from the **Use custom domain in an application** dialog that opens, then click **Ok, got it!**.
1. Create a new release and add the code snippet to the Application custom resource manifest file to create the new field for either `proxyRegistryDomain` or `replicatedRegistryDomain`. For more information, see [proxyRegistryDomain](../reference/custom-resource-application#proxyRegistryDomain) and [replicatedRegistryDomain](../reference/custom-resource-application#replicatedRegistryDomain) in the _Application_ section.


## Custom Domains for the Download Portal {#download}

You can configure the download portal to use a custom domain instead of the default get.replicated.com. The download portal is used to share license and release files with customers. For more information about the download portal, see [Share Files through the Download Portal](releases-sharing-license-install-script#download-portal) in _Share License Files and Releases_.

### Limitations

- Multiple custom domains can be active at once, but only one custom domain can be the default. This default custom domain is used in the vendor portal for links to the download portal for all apps in the team. All active custom domains work whether or not they are the default.

### Configure Custom Domains

To configure a custom domain for the download portal:

1. Log in to the [vendor portal](https://vendor.replicated.com), and click **Team > Custom Domains**.

1. From the **Custom domain for the download portal** pane, click **Add your first custom domain** for your first domain, or click **Add new domain** for additional domains.

  The **Configure a custom domain** wizard opens.

1. For **Domain**, enter the custom domain to use for the download portal. Click **Save & continue**.

1. For **Create CNAME**, copy the text string and use it to create a CNAME record in your DNS account. Click **Continue**.

1. For **Verify ownership**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

  Your changes can take up to 24 hours to propagate.

1. For **TLS cert creation verification**, copy the text string and use it to create a TXT record in your DNS account. Click **Validate & continue**.

    Your changes can take up to 24 hours to propagate.

1. For **Use Domain**, click **Yes, set as default** to set the domain as the default, so that the vendor portal will use it for links to the download portal, or click **Not now**.