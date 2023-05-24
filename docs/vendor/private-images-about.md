# About Using an External Registry

This topic provides information about how Replicated KOTS accesses images when you connect an external private registry.

## About the Proxy Service

If your application images are available in a private image registry exposed to the Internet, such as Docker Hub, Amazon Elastic Container Registry (ECR), or Google Container Registry (GCR), then the customer licenses for your application can grant proxy, or _pull-through_, access to the assignee without exposing registry credentials to the customer.

With proxy access, KOTS can use the Replicated registry proxy service to pull private images from an external registry. Instances of your application can then pull private images from the proxy service at `proxy.replicated.com` during deployment. KOTS determines what images are private by attempting to fetch image metadata. If the request is forbidden, KOTS pulls the image through `proxy.replicated.com` instead of pulling the image directly from an external registry.

Connecting KOTS to your external registry through a proxy is useful and recommended because it prevents you from having to modify the process you use to build and push application images in order to deploy your application with Replicated.

It also allows you to revoke a customer’s ability to pull private images without having to manage image access through separate identity or authentication systems. For example, when you connect KOTS to your external image registry, a customer's ability to pull private images is automatically revoked when their trial license expires.

The following diagram demonstrates how the registry proxy service pulls images from your external registry, and how deployed instances of your application pull images from the proxy service:

![Registry proxy service workflow diagram](/images/private-registry-diagram.png)

[View a larger version of this image](/images/private-registry-diagram-large.png)

## How KOTS Accesses Private Images

KOTS uses Kustomize to change the location of the private image registry in the PodSpec during application deployment from the external registry domain to the Replicated proxy service domain. It then creates an `imagePullSecret` to access the images through the proxy service.

### Patching the Image Location with Kustomize

When KOTS is installing an application, it attempts to load image manifests
using the image reference from the PodSpec. If KOTS receives a 401 response,
it assumes that this is a private image that must be proxied through the
registry proxy service.

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

During installation, KOTS automatically creates an `imagePullSecret`
that is based on the customer license. KOTS uses this secret to authenticate and
pull private images from `proxy.replicated.com`.

KOTS does not patch the image location URL for images hosted on the Replicated private registry
at `registry.replicated.com`. However, KOTS adds the same `imagePullSecret` to
PodSpecs that reference images in the Replicated private registry.

:::note
When deploying Pods to namespaces other than the application namespace, you must add the namespace to the `additionalNamespaces` attribute of the Application custom resource manifest.
This ensures that KOTS can provision the `imagePullSecret` in the namespace to allow the Pod to pull the image.
For more information about the `additionalNamespaces` attribute, see [Defining Additional Namespaces](operator-defining-additional-namespaces).
:::
