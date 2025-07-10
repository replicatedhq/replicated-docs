import KotsHelmCrDescription from "../partials/helm/_kots-helm-cr-description.mdx"

# Support Installations with HelmChart v2

This topic describes how to configure your application to support installations with the Replicated HelmChart custom resource version `kots.io/v1beta2`.

## Workflow

To support HelmChart v2 installations for your application, do the following:
1. Update your Helm chart values to proxy your application images through the Replicated proxy registry. See [Configure Your Application to Use the Proxy Registry](/vendor/private-images-kots) in _Use the Proxy Registry with Replicated Installers_.
1. Configure the `builder` and `optionalValues` keys to allow your users to push images to their own local registries. See [Support Local Image Registries](#local-registries).
1. Add a pull secret for any Docker Hub images that could be rate limited. See [Add Pull Secret for Rate-Limited Docker Hub Images](#docker-secret).
1. (KOTS Existing Cluster and kURL Installations Only) Add backup labels to your resources to support backup and restore with the KOTS snapshots feature. See [Add Backup Labels for Snapshots](#add-backup-labels-for-snapshots).
   :::note
   Snapshots is not supported for installations with Replicated Embedded Cluster. For more information about configuring disaster recovery for Embedded Cluster, see [Disaster Recovery for Embedded Cluster](/vendor/embedded-disaster-recovery).
   :::

## Add Pull Secret for Rate-Limited Docker Hub Images {#docker-secret}

Docker Hub enforces rate limits for Anonymous and Free users. To avoid errors caused by reaching the rate limit, your users can run the `kots docker ensure-secret` command, which creates an `<app-slug>-kotsadm-dockerhub` secret for pulling Docker Hub images and applies the secret to Kubernetes manifests that have images. For more information, see [Avoiding Docker Hub Rate Limits](/enterprise/image-registry-rate-limits).

If you are deploying a Helm chart with Docker Hub images that could be rate limited, to support the use of the `kots docker ensure-secret` command, any Pod definitions in your Helm chart templates that reference the rate-limited image must be updated to access the `<app-slug>-kotsadm-dockerhub` pull secret, where `<app-slug>` is your application slug. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug).

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

During installation, KOTS adds the `example-app-slug-kotsadm-dockerhub` secret to the `image.pullSecrets` array in the Helm chart `values.yaml` file. Any templates in the Helm chart that access `image.pullSecrets` are updated to use `example-app-slug-kotsadm-dockerhub`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example
spec:
  containers:
  - name: example
    image: {{ .Values.image.registry }}/{{ .Values.image.repository }}
  {{- with .Values.image.pullSecrets }}
  imagePullSecrets:
  {{- toYaml . | nindent 2 }}
  {{- end }}
```

## Support the Use of Local Image Registries {#local-registries}

Local image registries are required for installations in air-gapped environments with limited or no outbound internet access. Also, users in online environments can optionally use a local registry. For more information about how users configure a local image registry, see [Configuring Local Image Registries](/enterprise/image-registry-settings).

This section describes how to configure the HelmChart v2 custom resource so that your users can push application images to their own local registry, and so that image references in your Helm values are correctly rewritten to the user's local registry.

To support the use of local image registries in air gap and online installations:

1. Configure the `builder` key. This ensures that all of the required and optional images for your application are available to users to push their own local registry. See [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

1. Configure the `optionalValues` key so that KOTS conditionally rewrites image references in your Helm values during deployment when the user has a local image registry. You will use the KOTS [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry) template function to create the conditional statement. You will use the KOTS [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost) and [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace) template functions to inject the hostname and namespace for the user's registry in the image reference(s).

   <details>
    <summary>What is the registry namespace?</summary>

    The registry namespace is the path between the registry and the image name. For example, `images.yourcompany.com/namespace/image:tag`.
   </details>

   Do the following:

   1. Rewrite each of the application image references in your Helm values.

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
                    repository: '{{repl LocalRegistryNamespace }}'/cloudnative-pg/cloudnative-pg
        ```

   1. Rewrite the reference Replicated SDK image in your Helm values.

        **Example:**

        ```yaml
        # KOTS HelmChart custom resource
        apiVersion: kots.io/v1beta2
        kind: HelmChart
        metadata:
          name: samplechart
        spec:
          optionalValues:
            # Conditionally rewrite SDK image when a local registry
            # is configured
            - when: 'repl{{ HasLocalRegistry }}'
              values:
                replicated:
                  image:
                    registry: '{{repl LocalRegistryHost }}'
                    # The default location for the SDK image is
                    # proxy.replicated.com/library/replicated-sdk-image
                    repository: '{{repl LocalRegistryNamespace }}/library/replicated-sdk-image'
        ```

## (KOTS Existing Cluster and kURL Installations Only) Add Backup Labels for Snapshots {#add-backup-labels-for-snapshots}

:::note
The Replicated [snapshots](snapshots-overview) feature for backup and restore is supported only for KOTS existing cluster installations and kURL installations. Snapshots are not supported for installations with Embedded Cluster. For more information about disaster recovery for installations with Embedded Cluster, see [Disaster Recovery for Embedded Cluster](/vendor/embedded-disaster-recovery.mdx).
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

For more information about how to configure the `builder` key, see [Package Air Gap Bundles for Helm Charts](/vendor/helm-packaging-airgap-bundles) and [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

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
