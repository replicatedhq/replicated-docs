import NativeHelmLimitations from "../partials/helm/_native-helm-limitations.mdx"
import TemplateLimitation from "../partials/helm/_helm-template-limitation.mdx"
import VersionLimitation from "../partials/helm/_helm-version-limitation.mdx"
import HooksLimitation from "../partials/helm/_hooks-limitation.mdx"
import Deprecated from "../partials/helm/_replicated-deprecated.mdx"
import KotsHelmCrDescription from "../partials/helm/_kots-helm-cr-description.mdx"

# About Distributing Helm Charts with KOTS

This topic provides an overview of how Replicated KOTS deploys Helm charts, including the supported installation methods and limitations.

## Overview

When you distribute your Helm chart application with KOTS, your users have access to all of the KOTS features, including the Replicated admin console, backup and restore with snapshots, support for air gap installations, and support for installations into embedded clusters created by Replicated kURL. An application deployed with KOTS can use more than one Helm chart, can include Helm charts as components, and can use more than a single instance of any Helm chart.

<KotsHelmCrDescription/>

For more information about how to add your Helm chart and the HelmChart custom resource to a release, see [Creating a Release with Your Helm Chart for KOTS](helm-release).

## Installation Methods

The version and configuration of the HelmChart custom resource determines the method that KOTS uses to install the associated Helm chart in your release. The HelmChart custom resource supports either `apiVersion: kots.io/v1beta2` or `apiVersion: kots.io/v1beta1`.

For more information about how KOTS processes and installs Helm charts based on the version of the HelmChart custom resource, see the sections below:
* [HelmChart kots.io/v1beta2](#v1beta2)
* [HelmChart kots.io/v1beta1](#v1beta1) (Deprecated)
* [Replicated Helm](#replicated) (Deprecated)
### HelmChart `kots.io/v1beta2` {#v1beta2}

> Introduced in Replicated KOTS v1.99.0

When you include a HelmChart custom resource with `apiVersion: kots.io/v1beta2` in a release, KOTS v1.99.0 or later does a Helm install or upgrade of the associated Helm chart directly. This installation method supports all Helm functionality, including the use of Helm templating.

The HelmChart custom resource `kots.io/v1beta2` differs from `kots.io/v1beta1` in that KOTS does _not_ modify the chart with Kustomize during installation to automatically rewrite images, inject pull secrets, and add backup labels. Because the chart is not modified, `kots.io/v1beta2` results in Helm chart installations that can be reproduced outside of KOTS.

The `kots.io/v1beta2` HelmChart custom resource requires additional configuration to support the use of local registries, rewrite images, inject image pull secrets, and add backup labels. For more information, see [Configuring the HelmChart Custom Resource](helm-native-v2-using).    

### HelmChart `kots.io/v1beta1` {#v1beta1}

:::note
<Deprecated/>
:::

When you include version `kots.io/v1beta1` of the HelmChart custom resource with `useHelmInstall: true`, KOTS uses Kustomize to modify the chart and then packages the resulting manifests to install. For more information about Kustomize, see the [Kustomize documentation](https://kubectl.docs.kubernetes.io/).

The following diagram shows how KOTS processes Helm charts for deployment with the `kots.io/v1beta1` method:

![Flow chart of a v1beta1 Helm chart deployment to a cluster](/images/native-helm-flowchart.png)

[View a larger image](/images/native-helm-flowchart.png)

As shown in the diagram above, when given a Helm chart, KOTS:

- Uses Kustomize to merge instructions from KOTS and the end user to chart resources (see steps 2 - 4 below)
- Packages the resulting manifest files into a new Helm chart (see step 5 below)
- Deploys the new Helm chart (see step 5 below)

To deploy Helm charts with version `kots.io/v1beta1` of the HelmChart custom resource, KOTS does the following:

1. **Checks for previous installations of the chart**: If the Helm chart has already been deployed with the Replicated Helm method, then KOTS does not attempt the install the chart. The following error message is displayed if this check fails: `Deployment method for chart <chart_name> has changed`.

1. **Writes base files**:  KOTS extracts Helm manifests, renders them with Replicated templating, and then adds all files from the original Helm tarball to a `base/charts/` directory.

  Under `base/charts/`, KOTS adds a Kustomization file named `kustomization.yaml` in the directories for each chart and subchart. KOTS uses these Kustomization files later in the deployment process to merge instructions from Kustomize to the chart resources. For more information about Kustomize, see the [Kustomize website](https://kustomize.io).

  The following screenshot from the Replicated admin console shows a `base/charts/` directory for a deployed application. The `base/charts/` directory contains a Helm chart named postgresql with one subchart:

  ![Base directory in the admin console](/images/native-helm-base.png)

  In the screenshot above, a Kustomization file that targets the resources from the postgresql Helm chart appears in the `base/charts/postgresql/` directory:

   ```yaml
   apiVersion: kustomize.config.k8s.io/v1beta1
   kind: Kustomization
   resources:
   - secrets.yaml
   - statefulset.yaml
   - svc-headless.yaml
   - svc.yaml
   ```
   
1. **Writes midstream files with Kustomize instructions from KOTS**: KOTS then copies the directory structure from `base/charts/` to an `overlays/midstream/charts/` directory. The following screenshot shows an example of the midstream directory for the postgresql Helm chart: 
   
  ![Midstream directory in the admin console UI](/images/native-helm-midstream.png)

  As shown in the screenshot above, the midstream directory also contains a Kustomization file with instructions from KOTS for all deployed resources, such as image pull secrets, image rewrites, and backup labels. For example, in the midstream Kustomization file, KOTS rewrites any private images to pull from the Replicated proxy service.

  The following shows an example of a midstream Kustomization file for the postgresql Helm chart:

    ```yaml
    apiVersion: kustomize.config.k8s.io/v1beta1
    bases:
    - ../../../../base/charts/postgresql
    commonAnnotations:
      kots.io/app-slug: helm-test
    images:
    - name: gcr.io/replicated-qa/postgresql
      newName: proxy.replicated.com/proxy/helm-test/gcr.io/replicated-qa/postgresql
    kind: Kustomization
    patchesStrategicMerge:
    - pullsecrets.yaml
    resources:
    - secret.yaml
    transformers:
    - backup-label-transformer.yaml
    ```

    As shown in the example above, all midstream Kustomization files have a `bases` entry that references the corresponding Kustomization file from the `base/charts/` directory.

1. **Writes downstream files for end user Kustomize instructions**: KOTS then creates an `overlays/downstream/this-cluster/charts` directory and again copies the directory structure of `base/charts/` to this downstream directory:

   ![Downstream directory in the admin console UI](/images/native-helm-downstream.png)

   As shown in the screenshot above, each chart and subchart directory in the downstream directory also contains a Kustomization file. These downstream Kustomization files contain only a `bases` entry that references the corresponding Kustomization file from the midstream directory. For example:

    ```yaml
    apiVersion: kustomize.config.k8s.io/v1beta1
    bases:
    - ../../../../midstream/charts/postgresql
    kind: Kustomization
    ```
   
   End users can edit the downstream Kustomization files to make changes before deploying the application. Any instructions that users add to the Kustomization files in the downstream directory take priority over midstream and base Kustomization files. For more information about how users can make changes before deploying, see [Patching with Kustomize](/enterprise/updating-patching-with-kustomize) in _Enterprise User Documentation_.

1. **Deploys the Helm chart**: KOTS runs `kustomize build` for any Kustomization files in the `overlays/downstream/charts` directory. KOTS then packages the resulting manifests into a new chart for Helm to consume.

   Finally, KOTS runs `helm upgrade -i <release-name> <chart> --timeout 3600s -n <namespace>`. The Helm binary processes hooks and weights, applies manifests to the Kubernetes cluster, and saves a release secret similar to `sh.helm.release.v1.chart-name.v1`. Helm uses this secret to track upgrades and rollbacks of applications.


### Replicated Helm {#replicated}

:::note
<Deprecated/>
:::

The Replicated Helm method uses version `kots.io/v1beta1` of HelmChart custom resource with `useHelmInstall: false`.

With the Replicated Helm deployment method, KOTS renders the Helm templates and deploys them as standard Kubernetes manifests using `kubectl apply`. KOTS also has additional functionality for specific Helm hooks. For example, when KOTS encounters an upstream Helm chart with a `helm.sh/hook-delete-policy` annotation, it automatically adds the same `kots.io/hook-delete-policy` to the Job object.

The resulting deployment is comprised of standard Kubernetes manifests. Therefore, cluster operators can view the exact differences between what is currently deployed and what an update will deploy.

## Air Gap Installations

KOTS supports installations into air gap environments. When a user installs an application with one or more Helm charts in an air gap environment, the chart processing is managed in the end user environment. This means that KOTS can use user-supplied values, license values, and existing values to create deployable manifests.

To support air gap installations of your Helm chart with KOTS, you configure the `builders` field in the HelmChart custom resource. For more information, see [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

## Limitations {#replicated-helm-limitations}

This section lists the limitations for the KOTS Helm chart installation methods.
### `kots.io/v1beta2` Limitations

The following limitations apply when using version `kots.io/v1beta2` of the HelmChart custom resource:

* Available only for Helm V3.
* Available only for KOTS v1.99.0 and later.
* To support online installations that are configured to use a local private registry, you must provide the necessary values in the `builder` field to render the Helm chart with all necessary images. For more information, see [Supporting Local Image Registries](helm-native-v2-using#supporting-local-image-registries) in _Configuring the HelmChart v2 Custom Resource_.
* Editing the downstream Kustomization files to make changes before deploying the application is not supported because KOTS does not use Kustomize to install the Helm chart.
* The rendered manifests shown in the `rendered` directory might not reflect the final manifests that will be deployed to the cluster. This is because the manifests in the `rendered` directory are generated using `helm template`, which is not run with cluster context. So, the values for the `lookup` and `Capabilities` functions might differ.
* When updating the HelmChart custom resource in a release from `kots.io/v1beta1` to `kots.io/v1beta2`, the diff viewer shows a large diff because the underlying file structure of the rendered manifests is different. For more information about migrating, see [Migrating from v1beta1 to v1beta2](helm-native-v2-using#migrating).

### `kots.io/v1beta1` Limitations

The following limitations apply when using version `kots.io/v1beta1` of the HelmChart custom resource with `useHelmInstall: true`:

* <Deprecated/>

<NativeHelmLimitations/>

* <HooksLimitation/>

* <TemplateLimitation/>

* <VersionLimitation/>

  For more information, see [helmVersion](/reference/custom-resource-helmchart#helmversion) in _HelmChart_.

### Replicated Helm Limitations

The following limitations apply when using the Replicated Helm installation method (version kots.io/v1beta1 of the HelmChart custom resource with `useHelmInstall: false`):

* <Deprecated/>

* <TemplateLimitation/>

* <VersionLimitation/>

  For more information, see [helmVersion](/reference/custom-resource-helmchart#helmversion) in _HelmChart_.

* You cannot migrate from Replicated Helm to a different installation method for an existing chart in an existing installation. For more information, see [Migrating from Replicated Helm](#migrate-repl-helm) in _Configuring the HelmChart Custom Resource_.