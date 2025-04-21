import KotsHelmCrDescription from "../partials/helm/_kots-helm-cr-description.mdx"

# Configure the HelmChart v2 Custom Resource

This topic describes how to configure the Replicated KOTS HelmChart v2 custom resource. The information in this topic applies to existing cluster KOTS installations, Replicated Embedded Cluster installations, and Replicated kURL installations for applications packaged with Helm.

For more information about how KOTS uses the HelmChart custom resource to install Helm charts, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about).

## Overview

The tasks in this topic involve editing the HelmChart `values` and `optionalValues` keys in order to set Helm values during deployment. For more information about working with these fields, see [`values`](/reference/custom-resource-helmchart-v2#values) and [`optionalValues`](/reference/custom-resource-helmchart-v2#optionalvalues) in _HelmChart v2_.

## Workflow

Complete the tasks in this workflow to configure the HelmChart v2 custom resource.

### Task 1: Rewrite Image Names and Inject the KOTS Image Pull Secret {#rewrite-image-names}

Rewriting image names and injecting the KOTS pull secret allows your application images to be accessed at one of the following locations, depending on the installation type and where the given image is available:
* The [Replicated proxy registry](private-images-about) at `proxy.replicated.com` or your custom domain. Private images are pulled through the proxy registry in online installations.
* A public image registry. Any public images that your application uses can be access directly from the public image registry in online installations.
* Your customer's local registry. The most common use case for configuring a local image registry is in KOTS existing cluster installations in air-gapped environments.
* The built-in registry that is used in Replicated Embedded Cluster or Replicated kURL installations in air-gapped environments.

To rewrite image names and inject the KOTS image pull secret:

1. In the HelmChart custom resource, under the `values` key, rewrite the names of any _private_ images used by your application so that they can be accessed through the Replicated proxy registry.

   Use the following format:

   ```yaml
   PROXY_DOMAIN/proxy/APP_SLUG/IMAGE
   ```
   Where:

   * `PROXY_DOMAIN` is `proxy.replicated.com` or your custom domain. For more information about configuring a custom domain for the proxy registry, see [Using Custom Domains](/vendor/custom-domains-using).

   * `APP_SLUG` is the unique application slug in the Vendor Portal. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug).

   * `IMAGE` is the path to the image in your registry

   **Example:**

   ```yaml
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
    ```        

1. For each image that you included under the `values` key, use the KOTS [ImagePullSecretName](/reference/template-functions-config-context#imagepullsecretname) template function to inject the KOTS-generated image pull secret, which is used to authenticate with the proxy registry.

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
        api:
          image:
            registry: proxy.yourcompany.com
            repository: proxy/app/ghcr.io/cloudnative-pg/cloudnative-pg
            tag: catalog-1.24.0 
            # Inject the pull secret with ImagePullSecretName
            pullSecrets:
            - name: '{{repl ImagePullSecretName }}'
    ```

1. In the HelmChart `optionalValues` key, use the KOTS [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry), [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost), and [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace) template functions to conditionally rewrite any private or public images to the location of the image in the user's local image registry.

   **Example:**

   ```yaml
   # KOTS HelmChart custom resource

    apiVersion: kots.io/v1beta2
    kind: HelmChart
    metadata:
      name: samplechart
    spec:
      values:
        api:
          image:
            registry: proxy.yourcompany.com
            repository: proxy/app/ghcr.io/cloudnative-pg/cloudnative-pg
            tag: catalog-1.24.0
            pullSecrets:
            - name: '{{repl ImagePullSecretName }}'
      optionalValues:
        # Define the conditional statement in the when field
        - when: 'repl{{ HasLocalRegistry }}'
          values:
            api:
              image:
                registry: '{{repl LocalRegistryHost }}' 
                repository: '{{repl LocalRegistryNamespace }}/cloudnative-pg/cloudnative-pg'
   ```    
   <details>
    <summary>What is the registry namespace?</summary>
    
    The registry namespace is the path between the registry and the image name. For example, `images.yourcompany.com/namespace/image:tag`.
   </details>

### Task 2: Add Pull Secret for Rate-Limited Docker Hub Images {#docker-secret}

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

### Task 3: Support the Use of Local Image Registries {#local-registries}

Local image registries are required for KOTS installations in air-gapped environments with no outbound internet connection. Also, users in online environments can optionally use a local registry.

To support the use of local registries, configure the `builder` key in the HelmChart custom resource. For information about how to configure the `builder` key, see [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

For more information about how users can configure and push images to a local registry with KOTS, see [Configuring Local Image Registries](/enterprise/image-registry-settings).

### Task 4: (KOTS Existing Cluster and kURL Only) Add Backup Labels for Snapshots {#add-backup-labels-for-snapshots}

:::note
The Replicated [snapshots](snapshots-overview) feature for backup and restore is supported only for KOTS existing cluster and kURL installations. Snapshots are not support for installations with Embedded Cluster. For more information about disaster recovery for installations with Embedded Cluster, see [Disaster Recovery for Embedded Cluster](/vendor/embedded-disaster-recovery.mdx).
:::

The snapshots feature requires the following labels on all resources in your Helm chart that you want to be included in the backup:
* `kots.io/backup: velero`
* `kots.io/app-slug: APP_SLUG`, where `APP_SLUG` is the slug of your Replicated application.

For more information about snapshots, see [Understanding Backup and Restore](snapshots-overview).

To support backup and restore with snapshots, edit the the HelmChart custom resource `optionalValues` key to add `kots.io/backup: velero` and `kots.io/app-slug: APP_SLUG` labels to the resources you want backed up. Add a `when` statement that evaluates to true only when the customer license has the `isSnapshotSupported` entitlement.

#### Example

The following example shows how to add backup labels for snapshots in the `optionalValues` key of the HelmChart custom resource:

```yaml
# kots.io/v1beta2 HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  ...
  optionalValues:
  # add backup labels only if the license supports snapshots
  - when: "repl{{ LicenseFieldValue `isSnapshotSupported` }}"
    recursiveMerge: true
    values:
      mariadb:
        commonLabels:
          kots.io/backup: velero
          kots.io/app-slug: repl{{ LicenseFieldValue "appSlug" }}
        podLabels:
          kots.io/backup: velero
          kots.io/app-slug: repl{{ LicenseFieldValue "appSlug" }}
```

## Additional Information

### About the HelmChart Custom Resource

<KotsHelmCrDescription/>

For more information about the HelmChart custom resource, including the unique requirements and limitations for the keys described in this topic, see [HelmChart v2](/reference/custom-resource-helmchart-v2).

### HelmChart v1 and v2 Differences

To support the use of local registries with version `kots.io/v1beta2` of the HelmChart custom resource, provide the necessary values in the builder field to render the Helm chart with all of the necessary images so that KOTS knows where to pull the images from to push them into the local registry.

For more information about how to configure the `builder` key, see [Packaging Air Gap Bundles for Helm Charts](/vendor/helm-packaging-airgap-bundles) and [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

The `kots.io/v1beta2` HelmChart custom resource has the following differences from `kots.io/v1beta1`:

<table>
  <tr>
    <th>HelmChart v1beta2</th>
    <th>HelmChart v1beta1</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>apiVersion: kots.io/v1beta2</code></td>
    <td><code>apiVersion: kots.io/v1beta1</code></td>
    <td><code>apiVersion</code> is updated to <code>kots.io/v1beta2</code></td>
  </tr>
  <tr>
    <td><code>releaseName</code></td>
    <td><code>chart.releaseName</code></td>
    <td><code>releaseName</code> is a top level field under <code>spec</code></td>
  </tr>
  <tr>
    <td>N/A</td>
    <td><code>helmVersion</code></td>
    <td><code>helmVersion</code> field is removed</td>
  </tr>
  <tr>
    <td>N/A</td>
    <td><code>useHelmInstall</code></td>
    <td><code>useHelmInstall</code> field is removed</td>
  </tr>
</table>

### Migrate Existing KOTS Installations to HelmChart v2

Existing KOTS installations can be migrated to use the KOTS HelmChart v2 method, without having to reinstall the application.

There are different steps for migrating to HelmChart v2 depending on the application deployment method used previously. For more information, see [Migrating Existing Installations to HelmChart v2](helm-v2-migrate).
