import NativeHelmLimitations from "../partials/helm/_native-helm-limitations.mdx"
import TemplateLimitation from "../partials/helm/_helm-template-limitation.mdx"
import VersionLimitation from "../partials/helm/_helm-version-limitation.mdx"
import HelmCLILimitations from "../partials/helm/_helm-cli-limitations.mdx"

# Helm Chart Installation Options 

This topic describes the different options available for installing applications that are packaged with Helm charts.

## About Deploying Helm Charts with Replicated

Helm is a popular package manager for Kubernetes applications. Using Replicated to distribute applications packaged with Helm provides additional functionality not available through Helm, such as preflight checks, support bundles, a user interface for collecting user configuration values, support for using private images, and more.

Replicated supports delivering an enterprise application as Helm charts, or including Helm charts as components of an application. An application can use more than one Helm chart, and can use more than a single instance of any Helm chart.

To package an application with Helm, start by adding an existing Helm chart to a release in the Replicated vendor portal. For information about how to create a new release from an existing Helm chart, see [Creating Releases with Helm Charts](helm-release).

## How Users Install Helm Charts

When you distribute an application packaged with Helm, your customers can install and manage the application using the Replicated app manager or the helm CLI.

### Using the App Manager

Users can install an application packaged with Helm charts using the app manager on an existing cluster or on a cluster provisioned by the Kubernetes installer.

The app manager deploys Helm charts using one of the following deployment methods:

* [Native Helm (Recommended)](#native)
* [Replicated KOTS](#replicated-kots)

You specify the deployment method in the `useHelmInstall` field of the Replicated HelmChart custom resource manifest file for the Helm chart. For more information, see [useHelmInstall](/reference/custom-resource-helmchart#usehelminstall) in _HelmChart_.
#### Native Helm (Recommended) {#native}

With the Native Helm deployment method, the app manager uses the Helm binary to install and manage the lifecycle of the chart resources that are part of the application. Native Helm is the preferred method because it supports more features of Helm, such as hooks and weights.

The app manager does the following steps to deploy Helm charts using the Native Helm method:

1. **Check for previous installations of the chart**: If the chart has already been deployed with the Replicated KOTS method, then the app manager does not attempt the install the chart using Native Helm. The following error message is displayed if this check fails: `Deployment method for chart <chart_name> has changed`.

1. **Write base files**:  The app manager extracts Helm manifests, renders them with Replicated templating, and then adds all files from the original Helm tarball to a `base/charts/` directory.

  Under `base/charts/`, the app manager adds a `kustomization.yaml` file in the directories for each chart and subchart. The app manager uses these `kustomization.yaml` files later in the deployment process to merge instructions from Kustomize to the chart resources. For more information about Kustomize, see the [Kustomize website](https://kustomize.io).

  The following screenshot from the Replicated admin console shows a `base/charts/` directory that contains a deployed Helm chart named `postgresql` with one subchart:

  ![Base directory example for Native Helm charts](/images/native-helm-base.png)

  In the screenshot above, a `kustomization.yaml` file that targets the `postgresql` Helm chart resources appears in the `base/charts/postgresql/` directory:

   ```yaml
   apiVersion: kustomize.config.k8s.io/v1beta1
   kind: Kustomization
   resources:
   - secrets.yaml
   - statefulset.yaml
   - svc-headless.yaml
   - svc.yaml
   ```

1. **Write midstream files for Kustomize instructions from Replicated**: The app manager then copies the directory structure from `base/charts/` to `overlays/midstream/charts/`. This midstream directory contains Kustomize instructions from Replicated for all deployed resources, such as imagePullSecrets, image proxies, and backup labels.
   
   The app manager searches manifest files for private images, then adds the images to a `kustomization.yaml` file. The `kustomization.yaml` file is written at the chart or subchart level matching the resource being kustomized.
   
   For example, if the app manager finds the Postgres image at `base/charts/postgres/templates/deployment.yaml`, the `kustomization.yaml` to overwrite the image will be added to `overlays/midstream/charts/postgres/kustomization.yaml`. This midstream kustomization has a `bases` entry that points to the corresponding `kustomization.yaml` file from `base`. Other midstream kustomizations are processed here as well, such as backup label transformers and image pull secrets. They are appended to the same file as above for each chart and subchart.

   ![Midstream directory example for Native Helm charts](/images/native-helm-midstream.png)

   The following shows the contents of the `kustomization.yaml` file is the `overlays/midstream/charts/` directory:

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

1. **Write downstream files for end user Kustomize instructions**: The app manager again copies the directory structure in `base/charts` to `overlays/downstream/this-cluster/charts` and adds another `kustomization.yaml` file to each chart and subchart directory. These `kustomization.yaml` files only have `bases` defined, which points to the corresponding `kustomization.yaml` file in the `midstream`  directory.
   
   End users can edit these downstream `kustomization.yaml` files before deploying the application. Any instructions that users add to the `kustomization.yaml` files in the `downstream` directory take priority over `midstream` and `base` kustomizations. For more information about how users can edit these files, see [Patching with Kustomize](/enterprise/updating-patching-with-kustomize) in _Enterprise User Documentation_.

   The following shows an example of the downstream directory:

   ![Downstream directory example for Native Helm charts](/images/native-helm-downstream.png)

   The following shows the contents of the downstream `kustomization.yaml` files:

    ```yaml
    apiVersion: kustomize.config.k8s.io/v1beta1
    bases:
    - ../../../../midstream/charts/postgresql
    kind: Kustomization

    ```

1. **Deploy the Helm chart**: When deploying the application, the app manager runs `kustomize build` for any `kustomization.yaml` files in the `overlays/downstream/charts` directory. The app manager packages the resulting manifests together into a new tarball for Helm to consume.

   Finally, the app manager runs `helm upgrade -i chart.tar.gz`. The helm binary processes hooks and weights, applies manifests to the Kubernetes cluster, and saves a release secret similar to `sh.helm.release.v1.chart-name.v1`. This secret is how Helm tracks upgrades and rollbacks of applications.
#### Replicated KOTS

With the Replicated KOTS deployment method, the app manager renders the Helm templates and deploys them as standard Kubernetes manifests using `kubectl apply`. With Replicated KOTS, the app manager manages the lifecycle of the resources. The Replicated KOTS method creates deployable YAML by using the same functionality that the `helm template` command uses.

With the Replicated KOTS method, the app manager also has extended functionality for specific Helm hooks. For example, when the app manager encounters an upstream Helm chart with a `helm.sh/hook-delete-policy` annotation, it adds the same `kots.io/hook-delete-policy` automatically to the job object. This means that there is nothing extra to configure when deploying a Helm chart with Helm delete hooks.

To deploy charts with the Replicated KOTS method, the app manager runs the following command: `helm upgrade -i chart.tar.gz --timeout 60m -n <namespace>`. The helm binary processes hooks and weights, applies manifests to the Kubernetes cluster, and saves a release secret similar to `sh.helm.release.v1.chart-name.v1`. This secret is how Helm tracks upgrades and rollbacks of applications.Therefore, cluster operators are able to view the differences between what is currently deployed and what an update will deploy. The resulting deployment is comprised of standard Kubernetes manifests.  This level of change management provides the necessary transparency to provide the level of assurance that cluster operators require.

When a user installs a Helm chart-based application in an air gap environment, the processing of the chart is managed in the end customer environment. This means that the customer-supplied values, license values, and existing values can be used to create the deployable manifests. For more information, see [builder](/reference/custom-resource-helmchart#builder) in _HelmChart_.
### Using the helm CLI (Beta)

Users can also install an application packaged with a Helm chart into an existing cluster using the helm CLI. When users install with the helm CLI directly, Helm, rather than the app manager, manages the lifecycle of the application.

Deploying an application with the helm CLI differs from the Native Helm deployment method described above because, when users install with the helm CLI directly, they have access to all Helm functionality. Some enterprise users prefer or require using the helm CLI because their existing CI/CD pipeline is already compatible with Helm charts. Similarly, enterprise users might have organizational policies that require using Helm to manage applications.

Users do not have access to certain Replicated features when they install and manage the application with the helm CLI directly. This is because the app manager does not manage the lifecycle of the application. For example, users must update the application using the `helm upgrade` command, rather than using the admin console UI or the kots CLI.

For more information about how to package an application so that users can install using the helm CLI, see [Supporting helm CLI Installations (Beta)](helm-install).

## Limitations

This section lists the limitations for packaging an application with Helm charts.

There are different limitations depending on if your customers install and manage the application with the app manager, or if they use the helm CLI directly:

* [Replicated KOTS and Native Helm Limitations](#replicated-helm-limitations)
* [helm CLI Limitations](#helm-cli-limitations)

### Native Helm and Replicated KOTS Limitations {#replicated-helm-limitations}

The following limitations apply when using the app manager to install and manage Helm charts:

* <TemplateLimitation/>

* <VersionLimitation/>

   For more information, see [helmVersion](/reference/custom-resource-helmchart#helmversion) in _HelmChart_.

* The following limitations apply to the Native Helm deployment method only:

  <NativeHelmLimitations/>

### helm CLI Limitations {#helm-cli-limitations}

The helm CLI installation method is Beta and has the following limitations:

<HelmCLILimitations/>