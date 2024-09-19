# About the Replicated Proxy Registry

This topic describes how the Replicated proxy registry can be used to grant proxy access to your application's private images.

## Overview

If your application images are available in a private image registry exposed to the internet such as Docker Hub or Amazon Elastic Container Registry (ECR), then the Replicated proxy registry can grant proxy, or _pull-through_, access to the images without exposing registry credentials to your customers. When you use the proxy registry, you do not have to modify the process that you already use to build and push images to deploy your application.

To grant proxy access, the proxy registry uses the customer licenses that you create in the Replicated vendor portal. This allows you to revoke a customer’s ability to pull private images by editing their license, rather than having to manage image access through separate identity or authentication systems. For example, when a trial license expires, the customer's ability to pull private images is automatically revoked.

The following diagram demonstrates how the proxy registry pulls images from your external registry, and how deployed instances of your application pull images from the proxy registry:

![Proxy registry workflow diagram](/images/private-registry-diagram.png)

[View a larger version of this image](/images/private-registry-diagram-large.png)

## About Enabling the Proxy Registry

The proxy registry requires read-only credentials to your private registry to access your application images. See [Connecting to an External Registry](/vendor/packaging-private-images).

After connecting your registry, the steps the enable the proxy registry vary depending on your application deployment method. For more information, see:
* [Using the Proxy Registry with KOTS Installations](/vendor/private-images-kots)
* [Using the Proxy Registry with Helm Installations](/vendor/helm-image-registry)
