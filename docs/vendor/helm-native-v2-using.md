import KotsHelmCrDescription from "../partials/helm/_kots-helm-cr-description.mdx"

# Configure the HelmChart Custom Resource

This topic describes how to configure the Replicated KOTS HelmChart custom resource. The information in this topic applies to existing cluster KOTS installations, Replicated Embedded Cluster installations, and Replicated kURL installations for applications packaged with Helm.

For more information about how KOTS uses the HelmChart custom resource to install Helm charts, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about).

## Workflow

To configure the HelmChart custom resource, do the following:

1. Rewrite image names and inject the KOTS-generated image pull secret. See [Rewrite Image Names](#rewrite-image-names).
1. Add a pull secret for any Docker Hub images that could be rate limited. See [Add Pull Secret for Rate-Limited Docker Hub Images](#docker-secret).
1. Configure the `builder` key to allow users to push images to their own local registries. See [Configure the `builder` key to Support Local Image Registries](#local-registries).
1. (KOTS Existing Cluster and kURL Installations Only) Add backup labels to your resources to support backup and restore with the KOTS snapshots feature. See [Add Backup Labels for Snapshots](#add-backup-labels-for-snapshots).
   :::note
   Snapshots is not supported for installations with Replicated Embedded Cluster. For more information about configuring disaster recovery for Embedded Cluster, see [Disaster Recovery for Embedded Cluster](/vendor/embedded-disaster-recovery).
   :::

## Task 1: Rewrite Image Names and Inject the KOTS Image Pull Secret {#rewrite-image-names}

Rewriting image names and injecting the KOTS pull secret allows your application images to be accessed at one of the following locations, depending on the installation type and where the given image is available:
* The [Replicated proxy registry](private-images-about) at `proxy.replicated.com` or your custom domain. Private images are pulled through the proxy registry in online installations.
* A public image registry. Any public images that your application uses can be access directly from the public image registry in online installations.
* Your customer's local registry. The most common use case for configuring a local image registry is in KOTS existing cluster installations in air-gapped environments.
* The built-in registry that is used in Replicated Embedded Cluster or Replicated kURL installations in air-gapped environments.

To rewrite image names and inject the KOTS image pull secret:

1. In the HelmChart custom resource, under the `values` key, rewrite _private_ image names using the format `PROXY_DOMAIN/proxy/APP_SLUG/IMAGE`, where:

   * `PROXY_DOMAIN` is `proxy.replicated.com` or your custom domain. For more information about configuring a custom domain for the proxy registry, see [Using Custom Domains](/vendor/custom-domains-using).

   * `APP_SLUG` is the unique application slug in the Vendor Portal. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug).

   * `IMAGE` is the path to the image in your registry

   For example, if the private image is `quay.io/my-org/nginx:v1.0.1` and `images.yourcompany.com` is the custom proxy registry domain, then the image name should be rewritten to `images.yourcompany.com/proxy/your-app-slug/quay.io/my-org/nginx:v1.0.1`.

1. Add the KOTS-generated pull secret to provide authentication for the proxy registry.

    During installation, KOTS creates a `kubernetes.io/dockerconfigjson` type Secret that is based on the customer license. This pull secret grants access to the private image through the Replicated proxy registry or in the Replicated registry. Additionally, if the user configured a local image registry, then the pull secret contains the credentials for the local registry. You must provide the name of this KOTS-generated pull secret in any Pod definitions that reference the private image.
    
    For more information about the `kubernetes.io/dockerconfigjson` type Secret required by Kubernetes to authenticate with a registry and pull a private image, see [Specifying imagePullSecrets on a Pod](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod) in the Kubernetes documentation.

    **Example:**

    The following example shows a `spec.values.image.pullSecrets` array in the HelmChart custom resource that uses the ImagePullSecretName template function to inject the name of the KOTS-generated pull secret:

    ```yaml
    # kots.io/v1beta2 HelmChart custom resource

    apiVersion: kots.io/v1beta2
    kind: HelmChart
    metadata:
      name: samplechart
    spec:
      values:
        image: 
          registry: 
          repository: 
          pullSecrets:
          - name: '{{repl ImagePullSecretName }}'
    ```

1. Configure the `optionalValues` key so that KOTS conditionally rewrites private _and_ public image names only when there is a local image registry configured in the installation environment. You can do this using the KOTS [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry), [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost), and [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace) template functions.

   **Example:**

   ```yaml
   optionalValues:
    - when: 'repl{{ HasLocalRegistry }}'
      values:
        image:
          registry: '{{repl LocalRegistryHost }}' 
          repository: '{{repl LocalRegistryNamespace }}/gitea'
   ```    

## Task 2: Add Pull Secret for Rate-Limited Docker Hub Images {#docker-secret}

Docker Hub enforces rate limits for Anonymous and Free users. To avoid errors caused by reaching the rate limit, your users can run the `kots docker ensure-secret` command, which creates an `<app-slug>-kotsadm-dockerhub` secret for pulling Docker Hub images and applies the secret to Kubernetes manifests that have images. For more information, see [Avoiding Docker Hub Rate Limits](/enterprise/image-registry-rate-limits).

If you are deploying a Helm chart with Docker Hub images that could be rate limited, to support the use of the `kots docker ensure-secret` command, any Pod definitions in your Helm chart templates that reference the rate-limited image must be updated to access the `<app-slug>-kotsadm-dockerhub` pull secret, where `<app-slug>` is your application slug.

You can do this by adding the `<app-slug>-kotsadm-dockerhub` pull secret to a field in the `values` key of the HelmChart custom resource, along with a matching field in your Helm chart `values.yaml` file. During installation, KOTS sets the value of the matching field in the `values.yaml` file with the `<app-slug>-kotsadm-dockerhub` pull secret, and any Helm chart templates that access the value are updated.

For more information about Docker Hub rate limiting, see [Understanding Docker Hub rate limiting](https://www.docker.com/increase-rate-limits) on the Docker website.

#### Example

The following Helm chart `values.yaml` file includes `image.registry`, `image.repository`, and `image.pullSecrets` for a rate-limited Docker Hub image:

```yaml
# Helm chart values.yaml file

image:
  registry: docker.io
  repository: my-org/example-docker-hub-image
  pullSecrets: []
```

The following HelmChart custom resource includes `spec.values.image.registry`, `spec.values.image.repository`, and `spec.values.image.pullSecrets`, which correspond to those in the Helm chart `values.yaml` file above.

The `spec.values.image.pullSecrets` array lists the `<app-slug>-kotsadm-dockerhub` pull secret, where the slug for the application is `example-app-slug`:

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
      repository: my-org/example-docker-hub-image
      pullSecrets:
      - name: example-app-slug-kotsadm-dockerhub
```

## Task 3: Support the Use of Local Image Registries {#local-registries}

Local image registries are required for KOTS installations in air-gapped environments with no outbound internet connection. Also, users in online environments can optionally use a local registry.

To support the use of local registries, configure the `builder` key. For information about how to configure the `builder` key, see [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

For more information about how users configure a local image registry with KOTS, see [Configuring Local Image Registries](/enterprise/image-registry-settings).

##  (KOTS Existing Cluster and kURL Installations Only) Task 4: Add Backup Labels for Snapshots {#add-backup-labels-for-snapshots}

:::note
The Replicated [snapshots](snapshots-overview) feature for backup and restsore is supported only for KOTS existing cluster and kURL installations. Snapshots are not support for installations with Embedded Cluster. For more information about disaster recovery for installations with Embedded Cluster, see [Disaster Recovery for Embedded Cluster](/vendor/embedded-disaster-recovery.mdx).
:::

The snapshots feature requires the following labels on all resources in your Helm chart that you want to be included in the backup:
* `kots.io/backup: velero`
* `kots.io/app-slug: APP_SLUG`, where `APP_SLUG` is the slug of your Replicated application.

For more information about snapshots, see [Understanding Backup and Restore](snapshots-overview).

To support backup and restore with snapshots, add the `kots.io/backup: velero` and `kots.io/app-slug: APP_SLUG` labels to fields under the HelmChart custom resource `optionalValues` key. Add a `when` statement that evaluates to true only when the customer license has the `isSnapshotSupported` entitlement.

The fields that you create under the `optionalValues` key must map to fields in your Helm chart `values.yaml` file. For more information about working with the `optionalValues` key, see [optionalValues](/reference/custom-resource-helmchart-v2#optionalvalues) in _HelmChart v2_.

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
