# About Custom Domains

This topic provides an overview and the limitations of using custom domains to alias the Replicated private registry, Replicated proxy registry, Replicated app service, and the Download Portal.

For information about configuring and managing custom domains, see [Using Custom Domains](custom-domains-using).

## Overview

You can use custom domains to alias Replicated endpoints by creating Canonical Name (CNAME) records for your domains.

Replicated domains are external to your domain and can require additional security reviews by your customer. Using custom domains as aliases can bring the domains inside an existing security review and reduce your exposure.

TXT records must be created to verify:

- Domain ownership: Domain ownership is verified when you initially add a record.
- TLS certificate creation: Each new domain must have a new TLS certificate to be verified.

The TXT records can be removed after the verification is complete.

You can configure custom domains for the following services, so that customer-facing URLs reflect your company's brand:

- **Replicated registry:** Images and Helm charts can be pulled from the Replicated registry. By default, this registry uses the domain `registry.replicated.com`. We suggest using a CNAME such as `registry.{your app name}.com`. 

- **Proxy registry:** Images can be proxied from external private registries using the Replicated proxy registry. By default, the proxy registry uses the domain `proxy.replicated.com`. We suggest using a CNAME such as `proxy.{your app name}.com`. 

- **Replicated app service:** Upstream application YAML and metadata, including a license ID, are pulled from replicated.app. By default, this service uses the domain `replicated.app`. We suggest using a CNAME such as `updates.{your app name}.com`. 

- **Download Portal:** The Download Portal can be used to share customer license files, air gap bundles, and so on. By default, the Download Portal uses the domain `get.replicated.com`. We suggest using a CNAME such as `portal.{your app name}.com` or `enterprise.{your app name}.com`. 

## Limitations

Using custom domains has the following limitations:

- A single custom domain cannot be used for multiple endpoints. For example, a single domain can map to `registry.replicated.com` for any number of applications, but cannot map to both `registry.replicated.com` and `proxy.replicated.com`, even if the applications are different.

- Custom domains cannot be used to alias api.replicated.com (legacy customer-facing APIs) or kURL.

- Multiple custom domains can be configured, but only one custom domain can be the default for each Replicated endpoint. All configured custom domains work whether or not they are the default.

- A particular custom domain can only be used by one team.
