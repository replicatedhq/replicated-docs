# How KOTS Accesses Images Through the Proxy Service

This topic describes how KOTS uses the customer license during application deployment to access private images through the proxy service.

## Patching the Image Location

For applications packaged as standard manifests (or Helm charts deploeyd with the HelmChart v1 custom resource), KOTS automatically patches image names to the location of the image at the proxy service URL during deployment.

:::note
KOTS does _not_ automatically patch the image location for Helm chart deployed with the HelmChart v2 custom resource or for application packaged with Kubernetes Operators.
:::

During deployment, KOTS attempts to load image manifests
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

## Accessing the Proxy Service with an Image Pull Secret

During application deployment, KOTS automatically creates an `imagePullSecret` with `type: kubernetes.io/dockerconfigjson` that is based on the customer license. KOTS uses this secret to authenticate and pull private images from `proxy.replicated.com`.

For information about how Kubernetes uses the `kubernetes.io/dockerconfigjson` Secret type to authenticate to a private image registry, see [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) in the Kubernetes documentation.

KOTS does not patch the image location URL for images hosted on the Replicated registry
at `registry.replicated.com`. However, KOTS adds the same `imagePullSecret` to
PodSpecs that reference images in the Replicated registry. For more information about using the Replicated registry, see [Using the Replicated Registry for KOTS Installations](private-images-replicated).