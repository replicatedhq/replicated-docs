import NativeHelmLimitations from "../partials/helm/_native-helm-limitations.mdx"
import TemplateLimitation from "../partials/helm/_helm-template-limitation.mdx"
import VersionLimitation from "../partials/helm/_helm-version-limitation.mdx"
import HooksLimitation from "../partials/helm/_hooks-limitation.mdx"
import ReplicatedHelmDeprecated from "../partials/helm/_replicated-deprecated.mdx"
import KotsHelmCrDescription from "../partials/helm/_kots-helm-cr-description.mdx"

# About Distributing Helm Charts with KOTS

This topic provides an overview of how Replicated KOTS deploys Helm charts, including the supported installation methods and limitations.

## Overview

When you distribute your Helm chart application with KOTS, your users have access to all of the KOTS features, including the Replicated admin console, backup and restore with snapshots, support for air gap installations, and support for installations into embedded clusters created by Replicated kURL. An application deployed with KOTS can use more than one Helm chart, can include Helm charts as components, and can use more than a single instance of any Helm chart.

<KotsHelmCrDescription/>

For more information about how to add your Helm chart and the HelmChart custom resource to a release, see [Creating a Release with Your Helm Chart for KOTS](helm-release).

## Installation Methods

KOTS supports the following methods for installing Helm charts:
* Native Helm v2 (Recommended)
* Native Helm v1
* Replicated Helm
### Native Helm v2 (Recommended)

> Introduced in Replicated KOTS v1.99.0

With native Helm v2, KOTS does a Helm install or upgrade of your Helm chart directly. The native Helm v2 installation method supports using Helm templating and all Helm functionality.

Native Helm v2 differs from v1 in that KOTS does _not_ modify the chart with Kustomize to rewrite images, inject pull secrets, and add backup labels. Because KOTS does not modify the Helm chart, native Helm v2 results in Helm installations that can be reproduced outside of KOTS.

### Native Helm v1 {#native}

The following diagram shows how KOTS processes Helm charts for deployment with the native Helm v1 method:

![Native Helm Deployment to Cluster](/images/native-helm-flowchart.png)

[View a larger image](/images/native-helm-flowchart.png)

As shown in the diagram above, when given a Helm chart, KOTS:

- Uses Kustomize to merge instructions from KOTS and the end user to chart resources (see steps 2 - 4 below)
- Packages the resulting manifest files into a new Helm chart (see step 5 below)
- Deploys the new Helm chart (see step 5 below)

To deploy Helm charts using the native Helm method, KOTS does the following:

1. **Checks for previous installations of the chart**: If the Helm chart has already been deployed with the Replicated Helm method, then KOTS does not attempt the install the chart using native Helm. The following error message is displayed if this check fails: `Deployment method for chart <chart_name> has changed`.

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
      kots.io/app-slug: native-helm-test
    images:
    - name: gcr.io/replicated-qa/postgresql
      newName: proxy.replicated.com/proxy/native-helm-test/gcr.io/replicated-qa/postgresql
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
<ReplicatedHelmDeprecated/>
:::

With the Replicated Helm deployment method, KOTS renders the Helm templates and deploys them as standard Kubernetes manifests using `kubectl apply`. KOTS also has additional functionality for specific Helm hooks. For example, when KOTS encounters an upstream Helm chart with a `helm.sh/hook-delete-policy` annotation, it automatically adds the same `kots.io/hook-delete-policy` to the Job object.

The resulting deployment is comprised of standard Kubernetes manifests. Therefore, cluster operators can view the exact differences between what is currently deployed and what an update will deploy.

## Air Gap Installations

KOTS supports installations into air gap environments. When a user installs an application with one or more Helm charts in an air gap environment, the chart processing is managed in the end user environment. This means that KOTS can use user-supplied values, license values, and existing values to create deployable manifests.

To support air gap installations of your Helm chart with KOTS, you configure the `builders` field in the HelmChart custom resource. For more information, see [`builder`](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_.

## Limitations {#replicated-helm-limitations}

### General Limitations

The following limitations apply when using KOTS to install Helm charts:

The name specified in the HelmChart custom resource must be an exact match to the actual Helm chart name that is provided to KOTS. If the Helm chart names do not match, then the installation can error or fail. See [HelmChart](/reference/custom-resource-helmchart) in _Custom Resources_.

### Native Helm v2 Limitations

The following limitations apply to native Helm v2:

* Supported with KOTS v1.99.0 and later.

* In order to support online installations that are configured to push and pull from a private registry (aka “disable image push” is NOT selected), vendors must provide the necessary values in the `builder` field to render the helm chart with all necessary images - this is the same concept that is used in the airgap builder. If the vendor is already doing this to support airgap installs, then no changes would be required, but if they are not supporting airgap installs and are not using the builder field, then they would need to add the necessary values there to support this install flow for this specific use case.

* Last-mile kustomization is not supported in this install flow because Kustomize is not used
Existing Replicated Helm installs still cannot be upgraded to this new Native Helm install flow for the same reasons as the existing Native Helm

* The rendered manifests shown in the `rendered` directory, which are used for diffing, may not exactly reflect the final manifests that will be deployed to the cluster.  This is because those manifests are generated using `helm template`, which is not run with cluster context, so may contain different values for the `lookup` and `Capabilities` functions.  These functions are not supported at all in the current Native Helm, so this is still a net benefit since they can be used, just not shown in the diff.

* When migrating a release from v1beta1 to v1beta2, the diff viewer will show a large diff since the underlying file structure of the rendered manifests is completely different. In the old flow, we `helm template` the chart, split up the resources, build a new chart with it, run kustomize, and then write the results back to the new chart.  In the new flow, we simply run `helm template` and just show the user that output in the diff viewer.


### Native Helm v1 Limitations

The following limitations apply to native Helm v1:

<NativeHelmLimitations/>

* <HooksLimitation/>

* <TemplateLimitation/>

* <VersionLimitation/>

  For more information, see [helmVersion](/reference/custom-resource-helmchart#helmversion) in _HelmChart_.

### Replicated Helm Limitations

The following limitations apply to Replicated Helm:

* <ReplicatedHelmDeprecated/>

* <TemplateLimitation/>

* <VersionLimitation/>

  For more information, see [helmVersion](/reference/custom-resource-helmchart#helmversion) in _HelmChart_.