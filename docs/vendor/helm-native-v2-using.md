import KotsHelmCrDescription from "../partials/helm/_kots-helm-cr-description.mdx"

# Support Installations with HelmChart v2

This topic describes how to configure your application to support installations with the Replicated HelmChart custom resource version `kots.io/v1beta2` (HelmChart v2).

## Prerequisite

For each Helm chart in your release, update all image references in your Helm values to use the domain of the Replicated proxy registry. See [Configure Your Application to Use the Proxy Registry](/vendor/private-images-kots) in _Use the Proxy Registry with Replicated Installers_.

## Configure HelmChart v2

To support installations with HelmChart v2: 

1. In the HelmChart v2 custom resource, configure the `builder` key. This ensures that all the required and optional images for your application are available for users to push to their own local image registry. See [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

1. Configure the HelmChart v2 [`optionalValues`](/reference/custom-resource-helmchart-v2#optionalValues) key so that KOTS conditionally rewrites any application image references in your Helm values if the user configured a local image registry.

   You will use the KOTS [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost) and [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace) template functions to inject the hostname and namespace for the user's registry in the image reference(s). You will use the KOTS [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry) template function to create a conditional statement that evaluates if a local registry is configured.

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
        # Create a conditional statement in the `when` field
        - when: 'repl{{ HasLocalRegistry }}'
          values:
            postgres:
              image:
                registry: '{{repl LocalRegistryHost }}'
                repository: '{{repl LocalRegistryNamespace }}'/cloudnative-pg/cloudnative-pg
    ```

1. In the [`optionalValues`](/reference/custom-resource-helmchart-v2#optionalValues) key, use the same method as in the previous step to update the Replicated SDK image reference.

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
    
1. To avoid errors caused by reaching the Docker Hub rate limit, do the following:

   1. In the HelmChart v2 [`values`](/reference/custom-resource-helmchart-v2#values) key, add a new value with the KOTS `APP_SLUG-kotsadm-dockerhub` pull secret, where `APP_SLUG` is your unique application slug.

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
            repository: your-org/example-docker-hub-image
            # Add a new pullSecrets array with the <app-slug>-kotsadm-dockerhub pull secret
            pullSecrets:
            - name: your-app-slug-kotsadm-dockerhub
      ```
      <details>
       <summary>How does the `kotsadm-dockerhub` pull secret avoid Docker Hub rate limiting errors?</summary>

       Docker Hub enforces rate limits for Anonymous and Free users. For more information, see [Understanding Docker Hub rate limiting](https://www.docker.com/increase-rate-limits) on the Docker website.
     
       To avoid errors caused by reaching the rate limit, your users can run the `kots docker ensure-secret` command, which creates an `<app-slug>-kotsadm-dockerhub` secret for pulling Docker Hub images and applies the secret to Kubernetes manifests that have images. For more information, see [Avoiding Docker Hub Rate Limits](/enterprise/image-registry-rate-limits).

       If you are deploying a Helm chart with Docker Hub images that could be rate limited, to support the use of the `kots docker ensure-secret` command, any Pod definitions in your Helm chart templates that reference the rate-limited image must be updated to access the `<app-slug>-kotsadm-dockerhub` pull secret.

      During installation, KOTS sets the value of the matching field in the `values.yaml` file with the `<app-slug>-kotsadm-dockerhub` pull secret, and any Helm chart templates that access the value are updated.
      </details>
   
   1. Ensure that there is a matching value in your Helm chart `values.yaml`.

       **Example:**

       ```yaml
       # Helm chart values.yaml file

       image:
         registry: docker.io
         repository: your-org/your-docker-hub-image
         # include the new pullSecrets array
         pullSecrets: []
       ```
   
   1. In your Helm chart templates, update any Pod definitions that reference rate-limited Docker Hub images to access the Helm value with the Docker Hub pull secret.

      **Example:**

        ```yaml
        apiVersion: v1
        kind: Pod
        metadata:
          name: example
        spec:
          containers:
          - name: example
            image: {{ .Values.image.registry }}/{{ .Values.image.repository }}
          # the kotsadm-dockerhub pull secret is access from values and added to this array  
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

## Differences From HelmChart v1

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

## Next Step: Migrate Existing Installations to HelmChart v2

Existing installations can be migrated to use the KOTS HelmChart v2 method, without having to reinstall the application.

There are different steps for migrating to HelmChart v2 depending on the application deployment method used previously. For more information, see [Migrating Existing Installations to HelmChart v2](helm-v2-migrate).
