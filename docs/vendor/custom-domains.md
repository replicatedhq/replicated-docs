import CustomDomainsAbout from "../partials/custom-domains/_custom-domains-about.mdx"
import UseCustomDomain from "../partials/custom-domains/_use-custom-domain.mdx"
import Limitations from "../partials/custom-domains/_limitations.mdx"
import Wizard from "../partials/custom-domains/_wizard.mdx"

# About Custom Domains

<CustomDomainsAbout/>

You can configure custom domains for the following registries and services, so that customer-facing URLs reflect your company's brand:

- **Replicated registry:** Images and Helm charts can be pulled from the Replicated registry. By default, this registry uses the domain `registry.replicated.com`.

- **Proxy service:** Images can be proxied from external private registries using the Replicated proxy service. By default, the proxy service uses the domain `proxy.replicated.com`.

- **replicated.app:** Upstream application YAML and metadata, including a license ID, are pulled from replicated.app. By default, this service uses the domain `replicated.app`.

- **Download portal:** The download portal can be used to share customer license files. By default, the download portal uses the domain `get.replicated.com`.

For information about configuring and managing custom domains, see [Using Custom Domains](custom-domains-using).

## Limitations

<Limitations/>
