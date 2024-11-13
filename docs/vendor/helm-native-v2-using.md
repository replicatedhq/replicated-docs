import KotsHelmCrDescription from "../partials/helm/_kots-helm-cr-description.mdx"

# Configuring the HelmChart Custom Resource v2

This topic describes how to configure the Replicated HelmChart custom resource version `kots.io/v1beta2` to support Helm chart installations with Replicated KOTS.

## Workflow

To support Helm chart installations with the KOTS `kots.io/v1beta2` HelmChart custom resource, do the following:
1. Rewrite image names to use the Replicated proxy registry. See [Rewrite Image Names](#rewrite-image-names).
1. Inject a KOTS-generated image pull secret that grants proxy access to private images. See [Inject Image Pull Secrets](#inject-image-pull-secrets).
1. Add a pull secret for any Docker Hub images that could be rate limited. See [Add Pull Secret for Rate-Limited Docker Hub Images](#docker-secret).
1. Configure the `builder` key to allow your users to push images to their own local registries. See [Support Local Image Registries](#local-registries).
1. (KOTS Existing Cluster Installations Only) Add backup labels to your resources to support backup and restore with the KOTS snapshots feature. See [Add Backup Labels for Snapshots](#add-backup-labels-for-snapshots).
   :::note
   Snapshots is not supported for installations with Replicated Embedded Cluster. For more information about configuring disaster recovery for Embedded Cluster, see [Disaster Recovery for Embedded Cluster](/vendor/embedded-disaster-recovery).
   :::

## Task 1: Rewrite Image Names {#rewrite-image-names}

Configure the KOTS HelmChart custom resource `values` key so that KOTS rewrites the names for both private and public images in your Helm values during deployment. This allows images to be accessed at one of the following locations, depending on where they were pushed:
* The [Replicated proxy registry](private-images-about) (`proxy.replicated.com`)
* A public image registry
* Your customer's local registry
* The built-in registry used in Replicated Embedded Cluster or Replicated kURL installations in air-gapped environments

You will use the following KOTS template functions to conditionally rewrite image names depending on where the given image should be accessed: 
* [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry): Returns true if the installation environment is configured to use a local image registry. HasLocalRegistry is always true in air gap installations. HasLocalRegistry is also true in online installations if the user pushed images to their own registry.
* [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost): Returns the host of the local registry that the user configured. Alternatively, for air gap installations with Embedded Cluster or kURL, LocalRegistryHost returns the host of the built-in registry.
* [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace): Returns the namespace of the local registry that the user configured. Alternatively, for air gap installations with Embedded Cluster or kURL, LocalRegistryNamespace returns the namespace of the built-in registry.

    <details>
    <summary>What is the registry namespace?</summary>
    
    The registry namespace is the path between the registry and the image name. For example, `my.registry.com/namespace/image:tag`.
    </details>

### Task 1a: Rewrite Private Image Names

For any private images used by your application, configure the HelmChart custom resource so that image names are rewritten to either the Replicated proxy registry (for online installations) or to the local registry in the user's installation environment (for air gap installations or online installations where images were pushed to a local registry).

To rewrite image names to the location of the image in the proxy registry, use the format `proxy.replicated.com/proxy/<app-slug>/<image>`, where:
* `<app-slug>` is the unique application slug in the Vendor Portal
* `<image>` is the path to the image in your registry

For example, if the private image is `quay.io/my-org/nginx:v1.0.1`, then the image name should be rewritten to `proxy.replicated.com/proxy/my-app-slug/quay.io/my-org/nginx:v1.0.1`.

For more information, see the example below. 

#### Example

The following HelmChart custom resource uses the KOTS [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry), [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost), and [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace) template functions to conditionally rewrite an image registry and repository depending on if a local registry is used:

```yaml
# kots.io/v1beta2 HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  ...
  values:
    image:
    # If the user configured a registry, use that registry's hostname
    # If air gap Embedded Cluster/kURL install, use the buit-in registry's hostname
    # Else use proxy.replicated.com 
      registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "proxy.replicated.com" }}'
      # If the user configured a registry, use the registry namespace they provided
      # If air gap Embedded Cluster/kURL install, use the buit-in registry's hostname
      # Else use the image's namespace at proxy.replicated.com
      repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/my-app/quay.io/my-org" }}/nginx'
      tag: v1.0.1
```

The `spec.values.image.registry` and `spec.values.image.repository` fields in the HelmChart custom resource above correspond to `image.registry` and `image.repository` fields in the Helm chart `values.yaml` file, as shown below:

```yaml
# Helm chart values.yaml file

image:
  registry: quay.io
  repository: my-org/nginx
  tag: v1.0.1
```

During installation, KOTS renders the template functions and sets the `image.registry` and `image.repository` fields in the Helm chart `values.yaml` file based on the value of the corresponding fields in the HelmChart custom resource.

Any templates in the Helm chart that access the `image.registry` and `image.repository` fields are updated to use the appropriate value, as shown in the example below:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: 
    image: {{ .Values.image.registry }}/{{ .Values.image.repository }}:{{ .Values.image.tag }}
```

### Task 1b: Rewrite Public Image Names

For any public images used by your application, configure the HelmChart custom resource so that image names are rewritten to either the location of the image in the public registry (for online installations) or the local registry (for air gap installations or online installations where images were pushed to a local registry).

For more information, see the example below.

#### Example

The following HelmChart custom resource uses the KOTS [HasLocalRegistry](/reference/template-functions-config-context#haslocalregistry), [LocalRegistryHost](/reference/template-functions-config-context#localregistryhost), and [LocalRegistryNamespace](/reference/template-functions-config-context#localregistrynamespace) template functions to conditionally rewrite an image registry and repository depending on if a local registry is used:

```yaml
# kots.io/v1beta2 HelmChart custom resource

apiVersion: kots.io/v1beta2
kind: HelmChart
metadata:
  name: samplechart
spec:
  ...
  values:
    image: 
      # If a local registry is used, use that registry's hostname
      # Else, use the public registry host (ghcr.io) 
      registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "ghcr.io" }}' 
      # If the user configured a registry, use the registry namespace provided
      # Else, use the path to the image in the public registry 
      repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "cloudnative-pg" }}/cloudnative-pg'
      tag: catalog-1.24.0
```

The `spec.values.image.registry` and `spec.values.image.repository` fields in the HelmChart custom resource correspond to `image.registry` and `image.repository` fields in the Helm chart `values.yaml` file, as shown in the example below:

```yaml
# Helm chart values.yaml file

image:
  registry: ghcr.io
  repository: cloudnative-pg/cloudnative-pg
  tag: catalog-1.24.0
```

During installation, KOTS renders the template functions and sets the `image.registry` and `image.repository` fields in your Helm chart `values.yaml` file based on the value of the corresponding fields in the HelmChart custom resource. Any templates in the Helm chart that access the `image.registry` and `image.repository` fields are updated to use the appropriate value, as shown in the example below:

```yaml
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: 
    image: {{ .Values.image.registry }}/{{ .Values.image.repository }}:{{ .Values.image.tag }}
```

## Task 2: Inject Image Pull Secrets {#inject-image-pull-secrets}

Kubernetes requires a Secret of type `kubernetes.io/dockerconfigjson` to authenticate with a registry and pull a private image. When you reference a private image in a Pod definition, you also provide the name of the Secret in a `imagePullSecrets` key in the Pod definition. For more information, see [Specifying imagePullSecrets on a Pod](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod) in the Kubernetes documentation.

During installation, KOTS creates a `kubernetes.io/dockerconfigjson` type Secret that is based on the customer license. This pull secret grants access to the private image through the Replicated proxy registry or in the Replicated registry. Additionally, if the user configured a local image registry, then the pull secret contains the credentials for the local registry. You must provide the name of this KOTS-generated pull secret in any Pod definitions that reference the private image.

You can inject the name of this pull secret into a field in the HelmChart custom resource using the Replicated ImagePullSecretName template function. During installation, KOTS sets the value of the corresponding field in your Helm chart `values.yaml` file with the rendered value of the ImagePullSecretName template function. 

#### Example

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
      registry: '{{repl HasLocalRegistry | ternary LocalRegistryHost "proxy.replicated.com" }}'
      repository: '{{repl HasLocalRegistry | ternary LocalRegistryNamespace "proxy/my-app/ecr.us-east-1.amazonaws.com/my-org" }}/api'
      pullSecrets:
      - name: '{{repl ImagePullSecretName }}'
```

The `spec.values.image.pullSecrets` array in the HelmChart custom resource corresponds to a `image.pullSecrets` array in the Helm chart `values.yaml` file, as shown in the example below:

```yaml
# Helm chart values.yaml file

image:
  registry: ecr.us-east-1.amazonaws.com
  repository: my-org/api/nginx
  pullSecrets:
  - name: my-org-secret
```

During installation, KOTS renders the ImagePullSecretName template function and adds the rendered pull secret name to the `image.pullSecrets` array in the Helm chart `values.yaml` file.

Any templates in the Helm chart that access the `image.pullSecrets` field are updated to use the name of the KOTS-generated pull secret, as shown in the example below:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: {{ .Values.image.registry }}/{{ .Values.image.repository }}
  {{- with .Values.image.pullSecrets }}
  imagePullSecrets:
  {{- toYaml . | nindent 2 }}
  {{- end }}
```

## Task 3: Add Pull Secret for Rate-Limited Docker Hub Images {#docker-secret}

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

## Task 4: Support the Use of Local Image Registries {#local-registries}

Local image registries are required for KOTS installations in air-gapped environments with no outbound internet connection. Also, users in online environments can optionally push images to a local registry. For more information about how users configure a local image registry with KOTS, see [Using Private Registries](/enterprise/image-registry-settings).

To support the use of local registries, configure the `builder` key. For more information about how to configure the `builder` key, see [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

## Task 5: Add Backup Labels for Snapshots (KOTS Existing Cluster Installations Only) {#add-backup-labels-for-snapshots}

:::note
The Replicated [snapshots](snapshots-overview) feature for backup and restsore is supported only for existing cluster installations with KOTS. Snapshots are not support for installations with Embedded Cluster. For more information about disaster recovery for installations with Embedded Cluster, see [Disaster Recovery for Embedded Cluster](/vendor/embedded-disaster-recovery.mdx).
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

### Migrate Existing HelmChart v1 Installations to v2

After you complete the tasks in this topic to configure the `kots.io/v1beta2` HelmChart custom resource, you can migrate any existing installations that were deployed with `kots.io/v1beta1` with `useHelmInstall: true` to use `kots.io/v1beta2` instead. For more information, see [Migrating Existing Installations to HelmChart v2](helm-v2-migrate).
