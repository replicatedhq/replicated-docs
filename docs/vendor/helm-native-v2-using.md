import KotsHelmCrDescription from "../partials/helm/_kots-helm-cr-description.mdx"

# Support Installations with HelmChart v2

This topic describes how to configure your application to support installations with the Replicated HelmChart custom resource version `kots.io/v1beta2`.

## Prerequisite

Update your Helm chart values to proxy your application images through the Replicated proxy registry. See [Configure Your Application to Use the Proxy Registry](/vendor/private-images-kots) in _Use the Proxy Registry with Replicated Installers_.

## Configure HelmChart v2

1. Configure the `builder` key. This ensures that all of the required and optional images for your application are available to users to push their own local registry. See [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

1. Configure the `optionalValues` key so that image references in your Helm values are correctly rewritten to the user's local registry.To support the use of local image registries in air gap and online installations. Local image registries are required for installations in air-gapped environments with limited or no outbound internet access. Also, users in online environments can optionally use a local registry. For more information about how users configure a local image registry, see [Configuring Local Image Registries](/enterprise/image-registry-settings). 

     You will use the KOTS [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry) template function to create the conditional statement. You will use the KOTS [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost) and [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace) template functions to inject the hostname and namespace for the user's registry in the image reference(s).

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

1. To avoid errors caused by reaching the Docker Hub rate limit, add the `<app-slug>-kotsadm-dockerhub` pull secret to a field in the `values` key of the HelmChart custom resource, along with a matching field in your Helm chart `values.yaml` file. For more information about Docker Hub rate limiting, see [Understanding Docker Hub rate limiting](https://www.docker.com/increase-rate-limits) on the Docker website.

   <details>
     <summary>Why?</summary>

     Docker Hub enforces rate limits for Anonymous and Free users. To avoid errors caused by reaching the rate limit, your users can run the `kots docker ensure-secret` command, which creates an `<app-slug>-kotsadm-dockerhub` secret for pulling Docker Hub images and applies the secret to Kubernetes manifests that have images. For more information, see [Avoiding Docker Hub Rate Limits](/enterprise/image-registry-rate-limits).

     If you are deploying a Helm chart with Docker Hub images that could be rate limited, to support the use of the `kots docker ensure-secret` command, any Pod definitions in your Helm chart templates that reference the rate-limited image must be updated to access the `<app-slug>-kotsadm-dockerhub` pull secret, where `<app-slug>` is your application slug. For more information, see [Get the Application Slug](/vendor/vendor-portal-manage-app#slug).

     During installation, KOTS sets the value of the matching field in the `values.yaml` file with the `<app-slug>-kotsadm-dockerhub` pull secret, and any Helm chart templates that access the value are updated.
    </details>

    **Example:**

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

1. (KOTS Existing Cluster and kURL Installations Only) To support backup and restore with snapshots, configure the HelmChart v2 [optionalValues](/reference/custom-resource-helmchart-v2#optionalvalues) key so that the required `kots.io/backup: velero` and `kots.io/app-slug: APP_SLUG` labels are added to all resources that you want to be included in backups.

    :::note
    The Replicated [snapshots](snapshots-overview) feature for backup and restore is supported only for KOTS existing cluster and kURL installations. Snapshots are not supported for installations with Embedded Cluster. For more information about disaster recovery for installations with Embedded Cluster, see [Disaster Recovery for Embedded Cluster](/vendor/embedded-disaster-recovery.mdx).
    :::

    In the `optionalValues` key, use a `when` statement that evaluates to true only when the customer has the [`isSnapshotSupported`](/vendor/licenses-using-builtin-fields#admin-console-feature-options) field enabled for their license. You can use the KOTS [LicenseFieldValue](/reference/template-functions-license) template function to check the value of the `isSnapshotSupported` license field.

    **Example**:

    ```yaml
    # kots.io/v1beta2 HelmChart custom resource

    apiVersion: kots.io/v1beta2
    kind: HelmChart
    metadata:
      name: samplechart
    spec:
      ...
      optionalValues:
      # Add backup labels only when the license supports snapshots.
      # Use the LicenseFieldValue template function to check if
      # the isSnapshotSupported license field is enabled
      - when: "repl{{ LicenseFieldValue `isSnapshotSupported` }}"
        recursiveMerge: true
        values:
          mariadb:
            commonLabels:
              kots.io/backup: velero
              # Use the LicenseFieldValue template function and the 
              # built-in appSlug license field value to inject your 
              # unique app slug
              kots.io/app-slug: repl{{ LicenseFieldValue "appSlug" }}
            podLabels:
              kots.io/backup: velero
              kots.io/app-slug: repl{{ LicenseFieldValue "appSlug" }}
    ```

## Additional Information

### HelmChart v1 and v2 Differences

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
