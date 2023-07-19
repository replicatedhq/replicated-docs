# About Proxying Images with Replicated

This topic describes how the Replicated proxy service can provide proxy access to your application's external private images. It also includes information about how Replicated KOTS automatically patches image names and inject pull secrets during installation and upgrade to use the proxy service.

## About the Proxy Service

If your application images are available in a private image registry exposed to the Internet, such as Docker Hub or Amazon Elastic Container Registry (ECR), then the Replicated proxy service can grant proxy, or _pull-through_, access to the images without exposing registry credentials to your customers. When you use the proxy service, you do not have to modify the process that you already use to build and push images to deploy your application with Replicated.

To grant proxy access, the proxy service uses the customer licenses that you create in the Replicated vendor portal. This allows you to revoke a customer’s ability to pull private images by editing their license, rather than having to manage image access through separate identity or authentication systems. For example, when a trial license expires, the customer's ability to pull private images is automatically revoked.

The following diagram demonstrates how the proxy service pulls images from your external registry, and how deployed instances of your application pull images from the proxy service:

![Proxy service workflow diagram](/images/private-registry-diagram.png)

[View a larger version of this image](/images/private-registry-diagram-large.png)

## How to Enable the Proxy Service

The proxy service requires the following to grant proxy access to your images:
* Read-only credentials to your private registry. For information about how to provide registry credentials, see [Adding an External Registry](packaging-private-images).
* An image pull Secret with `type: kubernetes.io/dockerconfigjson`. For KOTS installations, the required Secret is automatically created in the application namespace during installation or upgrade using the customer's license. For more information, see [How KOTS Accesses Images Through the Proxy Service](#how-kots).
  
  For Helm installations, you use values injected by the Replicated SDK to create the Secret. For more information about delivering image pull Secrets for Helm installations, see [Proxying Images for Helm Installations (Beta)](helm-image-registry).

You can also optionally use a custom domain for the proxy service instead of `proxy.replicated.com`. For more information, see [Using Custom Domains](custom-domains-using).  
## How KOTS Accesses Images Through the Proxy Service {#how-kots}

This section describes how KOTS uses the customer license during installation to access the images through the proxy service.
### Patching the Image Location with Kustomize

When KOTS is installing an application, it attempts to load image manifests
using the image reference from the PodSpec. If KOTS receives a 401 response,
it assumes that this is a private image that must be proxied through the
proxy service.

KOTS uses Kustomize to patch the `midstream/kustomization.yaml` file to change the image name during deployment to reference the proxy service.

For example, a PodSpec for a Deployment references a private image hosted at `quay.io/my-org/api:v1.0.1`:

```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: example
  spec:
    template:
      spec:
        containers:
          - name: api
            image: quay.io/my-org/api:v1.0.1
```

When this application is deployed, KOTS detects that it cannot access
the image at quay.io. So, it creates a patch in the `midstream/kustomization.yaml`
file that changes the image name in all manifest files for the application:

```yaml
  apiVersion: kustomize.config.k8s.io/v1beta1
  bases:
  - ../../base
  images:
  - name: quay.io/my-org/api:v1.0.1
    newName: proxy.replicated.com/proxy/my-kots-app/quay.io/my-org/api
```

This causes the container runtime in the cluster to use the proxy service to pull the images,
using the license information provided to KOTS for authentication.

### Accessing the Proxy Service with an Image Pull Secret

During installation, KOTS automatically creates an `imagePullSecret` with `type: kubernetes.io/dockerconfigjson`
that is based on the customer license. KOTS uses this secret to authenticate and
pull private images from `proxy.replicated.com`.

For information about how Kubernetes uses the `kubernetes.io/dockerconfigjson` Secret type to authenticate to a private image registry, see [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) in the Kubernetes documentation.

KOTS does not patch the image location URL for images hosted on the Replicated registry
at `registry.replicated.com`. However, KOTS adds the same `imagePullSecret` to
PodSpecs that reference images in the Replicated registry. For more information about using the Replicated registry, see [Using the Replicated Registry for KOTS Installations](private-images-replicated).

:::note
When deploying Pods to namespaces other than the application namespace, you must add the namespace to the `additionalNamespaces` attribute of the Application custom resource manifest.
This ensures that KOTS can provision the `imagePullSecret` in the namespace to allow the Pod to pull the image.
For more information about the `additionalNamespaces` attribute, see [Defining Additional Namespaces](operator-defining-additional-namespaces).
:::
