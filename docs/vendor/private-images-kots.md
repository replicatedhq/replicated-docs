# Using the Proxy Service with KOTS Installations

This topic describes how to use the Replicated proxy service with applications deployed with Replicated KOTS.

## Overview

#### Generating the Image Pull Secret

During application deployment, KOTS automatically creates an `imagePullSecret` with `type: kubernetes.io/dockerconfigjson` that is based on the customer license. This secret is used to authenticate with the proxy registry and grant proxy access to private images.

For information about how Kubernetes uses the `kubernetes.io/dockerconfigjson` Secret type to authenticate to a private image registry, see [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) in the Kubernetes documentation.

#### Patching the Image Location (Standard Manifests and HelmChart v1)

For applications packaged as standard manifests (or Helm charts deploeyd with the HelmChart v1 custom resource), KOTS automatically patches image names to the location of the image at the proxy service URL during deployment.

If KOTS receives a 401 response when attempting to load image manifests using the image reference from the PodSpec, it assumes that this is a private image that must be proxied through the proxy service. KOTS uses Kustomize to patch the `midstream/kustomization.yaml` file to change the image name during deployment to reference the proxy service.

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
file that changes the image name in all manifest files for the application. This causes the container runtime in the cluster to use the proxy service to pull the images, using the license information provided to KOTS for authentication.

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
bases:
- ../../base
images:
- name: quay.io/my-org/api:v1.0.1
  newName: proxy.replicated.com/proxy/my-kots-app/quay.io/my-org/api
```

## Prerequisites

* Provide read-only credentials for the external private registry in your Replicated account. This allows Replicated to access the images through the proxy service. See [Add Credentials for an External Registry](packaging-private-images#add-credentials-for-an-external-registry) in _Connecting to an External Registry_.
* (Optional) Add a custom domain for the proxy service instead of `proxy.replicated.com`. See [Using Custom Domains](custom-domains-using).

## Enable the Proxy Service

### Standard Manifests and HelmChart v1

No additional configuration is required.

### HelmChart v2

If you are deploying with the HelmChart v2 custom resource, configure the HelmChart v2 custom resource to dynamically update image names in your Helm chart and to inject the automatically-generated image pull secret.

For more information, see [Configuring the HelmChart Custom Resource v2](/vendor/helm-native-v2-using).

### Pods Deployed to Additional Namespaces

If you are deploying Pods to namespaces other than the application namespace, add the namespace to the `additionalNamespaces` attribute of the KOTS Application custom resource. This ensures that KOTS can provision the `imagePullSecret` in the namespace to allow the Pod to pull the image.

For more information, see [Defining Additional Namespaces](operator-defining-additional-namespaces).

### Kubernetes Operators

For applications packaged with Kubernetes Operators, KOTS cannot modify pods that are created at runtime by the Operator. To support the use of private images in all environments, the Operator code should use KOTS functionality to determine the image name and image pull secrets for all pods when they are created.

For more information, see [Referencing Images](/vendor/operator-referencing-images) in the _Packaging Kubernetes Operators_ section.