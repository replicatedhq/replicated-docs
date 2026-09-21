# About the Replicated proxy registry

This topic describes how the Replicated proxy registry can be used to grant proxy access to your application's private images or allow pull through access of public images.

## Overview

If your application images are available in a private image registry exposed to the internet such as Docker Hub or Amazon Elastic Container Registry (ECR), then the Replicated proxy registry can grant proxy, or _pull-through_, access to the images without exposing registry credentials to your customers. When you use the proxy registry, you do not have to modify the process that you already use to build and push images to deploy your application.

The proxy registry works with most registries that conform to the Open Container Initiative (OCI) standard. For the full list of supported registries, see [Supported registries](/vendor/packaging-private-images#supported-registries).

To grant proxy access, the proxy registry uses the customer licenses that you create in the Replicated vendor portal. This allows you to revoke a customer’s ability to pull private images by editing their license, rather than having to manage image access through separate identity or authentication systems. For example, when a trial license expires, the customer's ability to pull private images is automatically revoked.

:::note
The Replicated proxy registry provides pull-through access to your container images. It is not a general-purpose forward proxy and does not relay arbitrary outbound traffic, such as operating system packages or npm and pip requests. It delivers only content that Replicated supports serving.
:::

The following diagram demonstrates how the proxy registry pulls images from your external registry, and how deployed instances of your application pull images from the proxy registry:

![Proxy registry workflow diagram](/images/private-registry-diagram.png)

[View a larger version of this image](/images/private-registry-diagram-large.png)

## About image delivery and caching {#delivery}

The proxy registry runs on a globally-distributed edge network. Customers connect to the edge location nearest to them rather than to a single region, which shortens the round trip for authentication and image requests.

For teams that have image layer caching enabled, the proxy registry also caches image layers at the edge. When a customer pulls an image, the proxy registry serves any cached layers directly and requests only the remaining layers from your external registry. This has two effects:

* **Faster pulls for geographically distant customers.** Cached layers are served from the edge instead of being fetched from your external registry on every pull.
* **Lower egress from your external registry.** A layer served from the cache does not generate a pull against your external registry, which can reduce the egress costs you pay to providers such as Amazon ECR or Google Artifact Registry.

Image layer caching has the following characteristics:

* Only image layers are cached. Manifests are always requested from your external registry, so a pull by tag always resolves against the current state of your registry.
* Layers are cached by digest. Because layers are content-addressed, pulls by tag benefit from caching in the same way as pulls by digest.
* Cached layers expire after 14 days without a pull. Frequently pulled layers remain cached, and layers that are no longer pulled are removed.
* Your images must remain available in your external registry. Caching does not change what the proxy registry needs in order to serve your images.
* Caching reduces the egress from your external registry. It does not change the volume of image data that Replicated delivers to your customers. For more information about viewing that volume, see [View registry egress](/vendor/packaging-private-images#view-registry-egress).

Image layer caching is enabled for accounts based on the terms of their agreement with Replicated. To find out whether it is enabled for your team, or to ask about enabling it, contact your Replicated account representative.

## About enabling the proxy registry

The proxy registry requires read-only credentials to your private registry to access your application images. See [Add and Manage External Registries](/vendor/packaging-private-images).

After connecting your registry, the steps to enable the proxy registry vary depending on your application deployment method:

* **Helm CLI installations**: The Replicated SDK, included as a subchart, creates the image pull secret in the cluster at runtime. Customer credentials are provided during `helm registry login` before installation. For more information, see [Use the Proxy Registry with Helm CLI Installations](/vendor/helm-image-registry).

* **KOTS and Embedded Cluster v2 installations**: Replicated automatically builds an image pull secret using the customer's license ID and includes it in the release payload. Image references in your manifests are rewritten to proxy-prefixed URLs (for example, `proxy.replicated.com/proxy/<app-slug>/gcr.io/my-org/my-app:latest`). For more information, see [Use the Proxy Registry with Replicated Installers](/vendor/private-images-kots).

* **Embedded Cluster v3 installations**: The Embedded Cluster daemon handles registry authentication using an enterprise portal service account token instead of a license ID.

## About OCI Referrers API support

The proxy registry passes all Open Container Initiative (OCI) Referrers API requests (`GET /v2/<name>/referrers/<digest>`) through to your upstream registry. Whether these requests return referrers depends on your upstream registry:

* If your upstream registry serves the OCI Referrers API, the proxy passes the upstream response back unchanged, including response headers such as `OCI-Filters-Applied` when the upstream applies the `artifactType` filter.
* If your upstream registry does not serve the OCI Referrers API, it returns a `404` on the endpoint and the proxy passes that response through. The spec-compliant `404` signals clients to fall back to the `sha256-<digest>` referrers tag schema.

The Replicated-hosted registry (`registry.replicated.com`) does not serve the OCI Referrers API.

## About allowing pull-through access of public images

Using the Replicated proxy registry to grant pull-through access to public images can simplify network access requirements for your customers, as they only need to whitelist a single domain (either `proxy.replicated.com` or your custom domain) instead of multiple registry domains.

For more information about how to pull public images through the proxy registry, see [Connecting to a Public Registry through the Proxy Registry](/vendor/packaging-public-images).