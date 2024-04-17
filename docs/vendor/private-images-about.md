# About Using the Replicated Proxy Service

This topic describes how the Replicated proxy service can be used to grant proxy access to your application's private images.

## Overview

If your application images are available in a private image registry exposed to the internet, such as Docker Hub or Amazon Elastic Container Registry (ECR), then the Replicated proxy service can grant proxy, or _pull-through_, access to the images without exposing registry credentials to your customers. When you use the proxy service, you do not have to modify the process that you already use to build and push images to deploy your application.

To grant proxy access, the proxy service uses the customer licenses that you create in the Replicated vendor portal. This allows you to revoke a customer’s ability to pull private images by editing their license, rather than having to manage image access through separate identity or authentication systems. For example, when a trial license expires, the customer's ability to pull private images is automatically revoked.

The following diagram demonstrates how the proxy service pulls images from your external registry, and how deployed instances of your application pull images from the proxy service:

![Proxy service workflow diagram](/images/private-registry-diagram.png)

[View a larger version of this image](/images/private-registry-diagram-large.png)

## How to Enable the Proxy Service

To grant proxy access to private images, the Replicated proxy service requires the following:
* **Registry credentials**: Read-only credentials to the private image registry.
* **Image location**: The URL where the image can be accessed (at either the `proxy.replicated.com` domain or a custom domain configured by the software vendor).
* **Image pull secret**: An image pull secret with `type: kubernetes.io/dockerconfigjson`.
  
   For information about how Kubernetes uses the `kubernetes.io/dockerconfigjson` Secret type to authenticate to a private image registry, see [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) in the Kubernetes documentation.


To enable the proxy service:

1. Add read-only credentials to your private registry. See [Connecting to an External Registry](packaging-private-images).

1. (Optional) Set up a custom domain for the proxy service to be used instead of `proxy.replicated.com`. See [Using Custom Domains](custom-domains-using).

1. Ensure that image names are rewritten to the location where the image can be accessed at the proxy service and that an image pull secret with `type: kubernetes.io/dockerconfigjson` is created. The required steps vary based on your application type and deployment method:
   * **Standard manifests deployed with KOTS and Helm Charts Deployed with KOTS HelmChart v1 custom resource**: KOTS automatically rewrites image names and creates the secret during deployment. No additional configuration is required.
   * **Helm Charts deployed with KOTS HelmChart v2 Custom Resource**: Configure the HelmChart v2 custom resource to dynamically update image names in your Helm chart and to inject the image pull secret. For more information, see [Configuring the HelmChart Custom Resource v2](/vendor/helm-native-v2-using).
   * **Helm Charts deployed with the Helm CLI**: Create the image pull secret using a value that is automatically injected into the Helm chart `values.yaml` during installation. For more information, see [Proxying Images for Helm Installations](helm-image-registry).

1. When deploying Pods to namespaces other than the application namespace, you must add the namespace to the `additionalNamespaces` attribute of the Application custom resource manifest. This ensures that KOTS can provision the `imagePullSecret` in the namespace to allow the Pod to pull the image. For more information about the `additionalNamespaces` attribute, see [Defining Additional Namespaces](operator-defining-additional-namespaces).