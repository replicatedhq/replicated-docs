import KotsHelmCrDescription from "../partials/helm/_kots-helm-cr-description.mdx"

# Support Installations with HelmChart v2

This topic describes how to configure a release to support installations with the Replicated HelmChart custom resource version `kots.io/v1beta2` (HelmChart v2). For more information about HelmChart v2, see [About Distributing Helm Chart with KOTS](/vendor/helm-native-about).

## Configure a Release to Support HelmChart v2 Installations

To configure a release to support installations with HelmChart v2:

1. For each Helm chart used by your application, update all image references in the Helm chart `values.yaml` file to use the domain of the Replicated proxy registry. See [Configure Your Application to Use the Proxy Registry](/vendor/private-images-kots) in _Use the Proxy Registry with Replicated Installers_.

1. Package each Helm chart and add the `.tgz` chart archives to a new release. See [Package a Helm Chart for a Release](/vendor/helm-install-release).

1. For each Helm chart in the release, ensure that there is a corresponding HelmChart v2 custom resource (version `kots.io/v1beta2`) . See [HelmChart v2](/reference/custom-resource-helmchart-v2).

1. If you are updating existing HelmChart v1 custom resource(s) to v2, remove any unsupported fields. See [HelmChart v1 and v2 Differences](#differences) below.

1. For each HelmChart resource in the release, configure the `builder` key. This ensures that all the required and optional images for your application are available for users to push to their own local image registry. Using a local image registry is required in air gap installations and optional in online installations. See [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

1. For each HelmChart resource in the release, configure the [`optionalValues`](/reference/custom-resource-helmchart-v2#optionalValues) key so that KOTS conditionally rewrites any application image references in your Helm values if a local image registry is used.

    **Example:**

   ```yaml
   # KOTS HelmChart custom resource

   apiVersion: kots.io/v1beta2
   kind: HelmChart
   metadata:
     name: samplechart
   spec:
     optionalValues:
       # Use KOTS HasLocalRegistry in the conditional statement
       # to evaluate if a local registry is used
       - when: 'repl{{ HasLocalRegistry }}'
         values:
           postgres:
             image:
               # Use KOTS LocalRegistryHost to inject 
               # the user's registry hostname
               registry: '{{repl LocalRegistryHost }}'
               # Use KOTS LocalRegistryNamespace to inject
               # the image namespace in the user's registry
               repository: '{{repl LocalRegistryNamespace }}'/cloudnative-pg/cloudnative-pg
    ```

    For more information about the KOTS template functions used, see [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry), [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost), and [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace).

   <details>
     <summary>What is the registry namespace?</summary>

      The registry namespace is the path between the registry and the image name. For example, `images.registry.com/namespace/image:tag`.
   </details>

1. In the HelmChart resource that corresponds to the chart where the Replicated SDK is declared as a dependency, configure the [`optionalValues`](/reference/custom-resource-helmchart-v2#optionalValues) key using the same method as in the previous step to conditionally rewrite the Replicated SDK image reference.

    **Example:**

    ```yaml
    # KOTS HelmChart custom resource
    apiVersion: kots.io/v1beta2
    kind: HelmChart
    metadata:
      name: samplechart
    spec:
      optionalValues:
        # Conditionally rewrite SDK image when a
        # local registry is configured
        - when: 'repl{{ HasLocalRegistry }}'
          values:
            replicated:
              image:
                registry: '{{repl LocalRegistryHost }}'
                # The default location for the SDK image is
                # proxy.replicated.com/library/replicated-sdk-image
                repository: '{{repl LocalRegistryNamespace }}/library/replicated-sdk-image'
    ```
    For more information about declaring the SDK as a dependency, see [Install the SDK as a Subchart](/vendor/replicated-sdk-installing#install-the-sdk-as-a-subchart) in _Install the Replicated SDK_.
    
1. For any of your application images that could be rate limited by Docker Hub, do the following to avoid errors caused by reaching the rate limit:
   
   <details>
     <summary>What is Docker Hub rate limiting?</summary>

     Docker Hub enforces rate limits for Anonymous and Free users. For more information, see [Understanding Docker Hub rate limiting](https://www.docker.com/increase-rate-limits) on the Docker website.
   </details>

   1. For each HelmChart resource in the release, configure the [`values`](/reference/custom-resource-helmchart-v2#values) key to add a new value with the KOTS `APP_SLUG-kotsadm-dockerhub` pull secret, where `APP_SLUG` is your unique application slug.

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
       <summary>What is the purpose of the `kotsadm-dockerhub` pull secret?</summary>
     
       To avoid errors caused by reaching the rate limit, your users can run the `kots docker ensure-secret` command, which creates an `<app-slug>-kotsadm-dockerhub` secret for pulling Docker Hub images and applies the secret to Kubernetes manifests that have images. For more information about this command, see [Avoiding Docker Hub Rate Limits](/enterprise/image-registry-rate-limits).

       If you are deploying a Helm chart with Docker Hub images that could be rate limited, any Pod definitions in your Helm chart templates that reference the rate-limited image must be updated to access the `<app-slug>-kotsadm-dockerhub` pull secret.
      </details>
   
   1. Ensure that there is a matching value in each of the corresponding Helm chart `values.yaml` files.

       **Example:**

       ```yaml
       # Helm chart values.yaml file

       image:
         registry: docker.io
         repository: your-org/your-docker-hub-image
         # include the new pullSecrets array
         pullSecrets: []
       ```
   
   1. In your Helm chart templates, update any Pod definitions that reference rate-limited Docker Hub images to include the pull secret.

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
          # the kotsadm-dockerhub pull secret is accessed from
          # the Helm values and added to this array  
          {{- with .Values.image.pullSecrets }}
          imagePullSecrets:
          {{- toYaml . | nindent 2 }}
          {{- end }}
        ```

1. (KOTS Existing Cluster and kURL Installations Only) If you support KOTS existing cluster or kURL installations, for each HelmChart v2 resource in the release, configure the [optionalValues](/reference/custom-resource-helmchart-v2#optionalvalues) key to add the `kots.io/backup: velero` and `kots.io/app-slug: APP_SLUG` labels to all resources that you want to be included in backups with Replicated snapshots. These labels are required to support the use of snapshots. In the `optionalValues` key, use a `when` statement that evaluates to true only when the customer has the [`isSnapshotSupported`](/vendor/licenses-using-builtin-fields#admin-console-feature-options) field enabled for their license.

    :::note
    The Replicated [snapshots](snapshots-overview) feature for backup and restore is supported only for KOTS existing cluster and kURL installations. Snapshots are not supported for installations with Embedded Cluster. For more information about disaster recovery for Embedded Cluster installations, see [Disaster Recovery for Embedded Cluster](/vendor/embedded-disaster-recovery.mdx).
    :::

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
    For more information about the KOTS LicenseFieldValue template function, see [LicenseFieldValue](/reference/template-functions-license).

    For more information about the `isSnapshotSupported` and `appSlug` built-in license fields, see the [Admin Console Feature Options](/vendor/licenses-using-builtin-fields#admin-console-feature-options) table in _Built-In License Fields_.

1. Promote the release a channel that your team uses for testing, and install the release in a development environment to test your changes.

## Next Step: Migrate Existing Installations to HelmChart v2

Existing installations can be migrated to use the KOTS HelmChart v2 method, without having to reinstall the application.

There are different steps for migrating to HelmChart v2 depending on the application deployment method used previously. For more information, see [Migrating Existing Installations to HelmChart v2](helm-v2-migrate).

## HelmChart v1 and v2 Differences {#differences}

The HelmChart v2 custom resource has the following differences from v1:

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
