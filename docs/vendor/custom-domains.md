# About Custom Domains

This topic provides an overview and the limitations of using custom domains to alias the Replicated private registry, Replicated proxy service, Replicated app service, and the download portal.

For information about configuring and managing custom domains, see [Using Custom Domains](custom-domains-using).

## Overview

You can use custom domains to alias Replicated endpoints by creating Canonical Name (CNAME) records for your domains.

Replicated domains are external to your domain and can require additional security reviews by your customer. Using custom domains as aliases can bring the domains inside an existing security review and reduce your exposure.

TXT records must be created to verify:

- Domain ownership: Domain ownership is verified when you initially add a record.
- TLS certificate creation: Each new domain must have a new TLS certificate to be verified.

The TXT records can be removed after the verification is complete.

You can configure custom domains for the following services, so that customer-facing URLs reflect your company's brand:

- **Replicated registry:** Images and Helm charts can be pulled from the Replicated registry. By default, this registry uses the domain `registry.replicated.com`.

- **Proxy service:** Images can be proxied from external private registries using the Replicated proxy service. By default, the proxy service uses the domain `proxy.replicated.com`.

- **Replicated app service:** Upstream application YAML and metadata, including a license ID, are pulled from replicated.app. By default, this service uses the domain `replicated.app`.

- **Download portal:** The download portal can be used to share customer license files, air gap bundles, and so on. By default, the download portal uses the domain `get.replicated.com`.

## Limitations

Using custom domains has the following limitations:

- A single custom domain cannot be used for multiple endpoints. For example, a single domain can map to `registry.replicated.com` for any number of applications, but cannot map to both `registry.replicated.com` and `proxy.replicated.com`, even if the applications are different.

- Custom domains cannot be used to alias api.replicated.com (legacy customer-facing APIs) or kURL.

- Multiple custom domains can be configured, but only one custom domain can be the default for each Replicated endpoint. All configured custom domains work whether or not they are the default.

- A particular custom domain can only be used by one team.
