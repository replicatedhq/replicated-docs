# About the Replicated Proxy Service

This topic describes how the Replicated proxy service can be used to grant proxy access to your application's private images.

## Overview

If your application images are available in a private image registry exposed to the internet such as Docker Hub or Amazon Elastic Container Registry (ECR), then the Replicated proxy service can grant proxy, or _pull-through_, access to the images without exposing registry credentials to your customers. When you use the proxy service, you do not have to modify the process that you already use to build and push images to deploy your application.

To grant proxy access, the proxy service uses the customer licenses that you create in the Replicated vendor portal. This allows you to revoke a customer’s ability to pull private images by editing their license, rather than having to manage image access through separate identity or authentication systems. For example, when a trial license expires, the customer's ability to pull private images is automatically revoked.

The following diagram demonstrates how the proxy service pulls images from your external registry, and how deployed instances of your application pull images from the proxy service:

![Proxy service workflow diagram](/images/private-registry-diagram.png)

[View a larger version of this image](/images/private-registry-diagram-large.png)

## About Enabling the Proxy Service

To provide proxy access to private images, the proxy service requires the following:
* Read-only credentials to the private image registry in order to grant proxy access to the images
* The location where the image can be accessed at either `proxy.replicated.com` or a custom domain
* An image pull secret with `type: kubernetes.io/dockerconfigjson`

The steps the enable the proxy service vary depending on your application deployment method. For more information, see:
* [Using the Proxy Service with KOTS Installations](/vendor/private-images-kots)
* [Using the Proxy Service with Helm Installations](/vendor/helm-image-registry)