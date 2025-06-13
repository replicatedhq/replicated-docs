# About Custom Domains

This topic provides an overview and the limitations of using custom domains to alias the Replicated proxy registry, the Replicated app service, the Replicated Download Portal, and the Replicated registry.

For information about adding and managing custom domains, see [Use Custom Domains](custom-domains-using).

## Overview

You can use custom domains to alias Replicated endpoints by creating Canonical Name (CNAME) records for your domains.

Replicated domains are external to your domain and can require additional security reviews by your customer. Using custom domains as aliases can bring the domains inside an existing security review and reduce your exposure.

You can configure custom domains for the following services:

- **Proxy registry:** Images can be proxied from external private registries using the Replicated proxy registry. By default, the proxy registry uses the domain `proxy.replicated.com`. Replicated recommends using a CNAME such as `proxy.{your app name}.com`. 

     :::note
     The default location for the image used by the Replicated SDK Helm chart is `proxy.replicated.com/library/replicated-sdk-image`. When you configure a custom domain for the Replicated proxy registry, the SDK is pulled from that custom domain. For more information about the Replicated SDK, see [About the Replicated SDK](/vendor/replicated-sdk-overview).
     :::

- **Replicated app service:** Upstream application YAML and metadata, including a license ID, are pulled from the app service. By default, this service uses the domain `replicated.app`. Replicated recommends using a CNAME such as `updates.{your app name}.com`. 

- **Enterprise Portal:** The Enterprise Portal is a web-based portal that provides end customers with a centralized location for managing their installation. By default, the Enterprise Portal uses the domain **`[DOMAIN].replicated.com`**. Replicated recommending using a CNAME such as `portal.{your app name}.com` or `enterprise.{your app name}.com`.

- **Download Portal:** The Download Portal can be used to share customer license files, air gap bundles, and so on. By default, the Download Portal uses the domain `get.replicated.com`. Replicated recommends using a CNAME such as `portal.{your app name}.com` or `enterprise.{your app name}.com`. 

- **Replicated registry:** Images and Helm charts can be pulled from the Replicated registry. By default, the Replicated registry uses the domain `registry.replicated.com`. Replicated recommends using a CNAME such as `registry.{your app name}.com`.

## Limitations

Using custom domains has the following limitations:

- A single custom domain cannot be used for multiple endpoints. For example, a single domain can map to `registry.replicated.com` for any number of applications, but cannot map to both `registry.replicated.com` and `proxy.replicated.com`, even if the applications are different.

- Custom domains cannot be used to alias `api.replicated.com` (legacy customer-facing APIs) or kURL.

- Multiple custom domains can be configured, but only one custom domain can be the default for each Replicated endpoint. All configured custom domains work whether or not they are the default.

- Each custom domain can only be used by one team.

- For [Replicated Embedded Cluster](/vendor/embedded-overview) installations, any Helm [`extensions`](/reference/embedded-config) that you add in the Embedded Cluster Config do not use custom domains. During deployment, Embedded Cluster pulls both the repo for the given chart and any images in the chart as written. Embedded Cluster does not rewrite image names to use custom domains.