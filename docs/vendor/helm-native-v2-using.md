import KotsHelmCrDescription from "../partials/helm/_kots-helm-cr-description.mdx"

# Rewrite Images to Local Registries with HelmChart v2

This topic describes how to configure the Replicated KOTS HelmChart v2 custom resource to allow users to configure and push images to a local image registry. The main use case for local image registries is air gap installations with Replicated KOTS in existing clusters.

<!-- This topic describes how to configure the Replicated KOTS HelmChart v2 custom resource to support Replicated KOTS installations in existing clusters, Replicated Embedded Cluster installations, and Replicated kURL installations for applications packaged with Helm. -->

<!-- For more information about how KOTS uses the HelmChart custom resource to install Helm charts, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about). -->

<!-- ## Workflow

The purpose of this workflow is to configure the HelmChart v2 custom resource so that application images can be accessed during deployment and to support certain Replicated features for your application.

The tasks in this workflow involve editing the `values` and `optionalValues` fields in the HelmChart custom resource in order to set Helm values during deployment. For more information about working with these fields, see [`values`](/reference/custom-resource-helmchart-v2#values) and [`optionalValues`](/reference/custom-resource-helmchart-v2#optionalvalues) in _HelmChart v2_. -->

<!-- ## Overview

Rewriting image names and injecting the KOTS pull secret allows your application images to be accessed at one of the following locations, depending on the installation type and where the given image is available:
* The [Replicated proxy registry](private-images-about) at `proxy.replicated.com` or your custom domain. Private images are pulled through the proxy registry in online installations.
* A public image registry. Any public images that your application uses can be access directly from the public image registry in online installations.
* Your customer's local registry. The most common use case for configuring a local image registry is in KOTS existing cluster installations in air-gapped environments.
* The built-in registry that is used in Replicated Embedded Cluster or Replicated kURL installations in air-gapped environments.

## Rewrite Image Names and Inject the KOTS Image Pull Secret {#rewrite-image-names} -->

<!-- To rewrite image names and inject the KOTS image pull secret:

1. In your Helm chart `values.yaml` file, set the value or values for any private images to the URL where the image can be accessed through the Replicated proxy service.

   Use the following format:

   ```yaml
   PROXY_DOMAIN/proxy/APP_SLUG/IMAGE
   ```
   Where:

   * `PROXY_DOMAIN` is `proxy.replicated.com` or your custom domain. For more information about setting a custom domain for the proxy registry, see [Using Custom Domains](/vendor/custom-domains-using).

   * `APP_SLUG` is the unique application slug in the Vendor Portal. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug).

   * `IMAGE` is the path to the image in your registry

   **Example:**

   ```yaml
   # values.yaml

   postgres:
     image:
       # proxy.registry.com or your custom domain
       registry: proxy.yourcompany.com
       # image URL
       repository: proxy/app/ghcr.io/cloudnative-pg/cloudnative-pg
       tag: catalog-1.24.0
       imagePullSecrets:
         - name: secret-name
   ``` -->

   <!-- ```yaml
   # KOTS HelmChart custom resource

   apiVersion: kots.io/v1beta2
   kind: HelmChart
   metadata:
     name: samplechart
   spec:
     values:
       api:
         image:
           # proxy.registry.com or your custom domain
           registry: proxy.yourcompany.com
           repository: proxy/app/ghcr.io/cloudnative-pg/cloudnative-pg
           tag: catalog-1.24.0
    ```         -->
<!-- 
1. In the KOTS HelmChart custom resource, under the `values` key, use the KOTS [ImagePullSecretName](/reference/template-functions-config-context#imagepullsecretname) template function to set the image pull secret to the KOTS-generated image pull secret. This pull secret is used to authenticate with the Replicated proxy registry.

    <details>
     <summary>What is the KOTS-generated image pull secret?</summary>
    
     During installation, KOTS creates a `kubernetes.io/dockerconfigjson` type Secret that is based on the customer license. This pull secret grants access to the images through the Replicated proxy registry. Additionally, if the user configured a local image registry, then the pull secret contains the credentials for the local registry.
    
     Kubernetes requires a Secret with the type `kubernetes.io/dockerconfigjson` to authenticate with a registry and pull a private image. For more information, see [Specifying imagePullSecrets on a Pod](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod) in the Kubernetes documentation.
    </details>

    **Example:**

    ```yaml
    # KOTS HelmChart custom resource

    apiVersion: kots.io/v1beta2
    kind: HelmChart
    metadata:
      name: samplechart
    spec:
      values:
        postgres:
          image:
            # Inject the pull secret with ImagePullSecretName
            imagePullSecrets:
              - name: '{{repl ImagePullSecretName }}'
    ``` -->

## Rewrite Application Images

1. In the HelmChart `optionalValues` key, use the KOTS [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry), [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost), and [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace) template functions so that any private or public images are conditionally rewritten to the location of the image in the user's local image registry, only when a local registry is configured.

   <details>
    <summary>What is the registry namespace?</summary>
    
    The registry namespace is the path between the registry and the image name. For example, `images.yourcompany.com/namespace/image:tag`.
   </details>

   **Example:**

   ```yaml
   # KOTS HelmChart custom resource

    apiVersion: kots.io/v1beta2
    kind: HelmChart
    metadata:
      name: samplechart
    spec:
      optionalValues:
        # Define the conditional statement in the when field
        - when: 'repl{{ HasLocalRegistry }}'
          values:
            postgres:
              image:
                registry: '{{repl LocalRegistryHost }}'
                repository: '{{repl LocalRegistryNamespace }}/cloudnative-pg/cloudnative-pg
   ```   

## Rewrite the Replicated SDK Image

This section describes how to rewrite the image for the Replicated SDK for KOTS HelmChart v2 installations.

To rewrite the image for the Replicated SDK:

1. In your Helm chart `values.yaml` file, 

1. In the KOTS HelmChart custom resource, under the `optionalValues` key, rewrite the image for the Replicated SDK so that it can be accessed from the user's local registry, if a local registry was configured:

    ```yaml
       # KOTS HelmChart custom resource

    apiVersion: kots.io/v1beta2
    kind: HelmChart
    metadata:
      name: samplechart
    spec:
      optionalValues:
        # Rewrite Replicated SDK image to local registry
        - when: 'repl{{ HasLocalRegistry }}'
          values:
            replicated:
              image:
                registry: '{{repl LocalRegistryHost }}'
                repository: '{{repl LocalRegistryNamespace }}/replicated-sdk'
    ```

## Add a Pull Secret for Rate-Limited Docker Hub Images {#docker-secret}

Docker Hub enforces rate limits for Anonymous and Free users. For more information about Docker Hub rate limiting, see [Understanding Docker Hub rate limiting](https://www.docker.com/increase-rate-limits) on the Docker website.

To avoid errors caused by reaching the rate limit, your users can run the `kots docker ensure-secret` command, which creates an `APP_SLUG-kotsadm-dockerhub` secret for pulling Docker Hub images and applies the secret to Kubernetes manifests that have images. For more information, see [Avoiding Docker Hub Rate Limits](/enterprise/image-registry-rate-limits). 

To support the use of the `kots docker ensure-secret` command, add the `APP_SLUG-kotsadm-dockerhub` pull secret (where `APP_SLUG` is your application slug) to any Docker images that could be rate-limited.

**Example:**

```yaml
# kots.io/v1beta2 HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  values:
    image:
      registry: docker.io
      repository: org-name/example-docker-hub-image
      # Add the dockerhub secret
      pullSecrets:
      - name: gitea-kotsadm-dockerhub
```    