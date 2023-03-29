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

When you distribute an application packaged with Helm, your customers can install and manage the application with the Replicated app manager or with the helm CLI.

### Using the App Manager

Users can install an application packaged with Helm charts using the app manager on an existing cluster or on a cluster provisioned by the Kubernetes installer.

The app manager deploys Helm charts using one of the following deployment methods:

* [Native Helm (Recommended)](#native)
* [Replicated KOTS](#replicated-kots)

You specify the deployment method in the Replicated HelmChart custom resource manifest file with the `useHelmInstall` flag. For more information, see [useHelmInstall](/reference/custom-resource-helmchart#usehelminstall) in _HelmChart_.
#### Native Helm (Recommended) {#native}

With the Native Helm deployment method, the app manager uses the Helm binary to install and manage the lifecycle of the chart resources that are part of the application. Native Helm is the preferred method because it supports more features of Helm, such as hooks and weights.

To process Helm charts using the Native Helm method, the app manager does the following:

1. **Checks for previous installations of the chart**: If the chart has already been deployed with the Replicated KOTS method, then the app manager does not attempt the install the chart using Native Helm. If this check fails, the following error message is displayed: `Deployment method for chart <chart_name> has changed`.

1. **Writes base files**:  The app manager extracts Helm manifests, renders them with Replicated templating, and then adds all files from the original Helm tarball to a `base/charts/` directory.

   The app manager also add a `kustomization.yaml` file in each chart and sub chart directory. The app manager uses the `kustomization.yaml` file later to merge instructions from Kustomize to the chart resources. For more information about Kustomize, see the [Kustomize website](https://kustomize.io).

   ![Base directory example for Native Helm charts](/images/native-helm-base.png)

1. **Writes midstream files**: The app manager copies the directory structure in `base/charts/` to `overlays/midstream/charts/`. The `midstream` directory contains Replicated Kustomize instructions for all deployed resources, such as imagePullSecrets, image proxies, and backup labels.
   
   The app manager searches all manifests for private images, then adds the images to a `kustomization.yaml` file. The `kustomization.yaml` file is written at the chart or subchart level matching the resource being kustomized.
   
   For example, if the app manager finds the Postgres image at `base/charts/postgres/templates/deployment.yaml`, the `kustomization.yaml` to overwrite the image will be added to `overlays/midstream/charts/postgres/kustomization.yaml`. This midstream kustomization has a `bases` entry that points to the corresponding `kustomization.yaml` file from `base`. Other midstream kustomizations are processed here as well, such as backup label transformers and image pull secrets. They are appended to the same file as above for each chart and subchart.

1. **Writes downstream files**: Replicated allows last-mile customization on Helm resources using downstream kustomize files.

   As above, the directory structure in `base/charts` is copied to `overlays/downstream/this-cluster/charts`. Each chart and subchart directory receives a `kustomization.yaml`. These files only have `bases` defined, which points to the corresponding `midstream` kustomization file. End users can edit these downstream `kustomization.yaml` files before deploying the application. Any instructions that users add to the downstream `kustomization.yaml` files take priority over `midstream` and `base` kustomizations.

1. **Deploys the Helm chart**: When deploying the application, the app manager runs `kustomize build` for any `kustomization.yaml` files in the `overlays/downstream/charts` directory. The app manager packages the resulting manifests together into a new tarball for Helm to consume.

   Finally, the app manager runs `helm upgrade -i chart.tar.gz`. The helm binary processes hooks and weights, applies manifests to the Kubernetes cluster, and saves a release secret similar to `sh.helm.release.v1.chart-name.v1`. This secret is how Helm tracks upgrades and rollbacks of applications.
#### Replicated KOTS

The app manager renders the Helm templates and deploys them as standard Kubernetes manifests using `kubectl apply`. With Replicated KOTS, the app manager manages the lifecycle of the resources. The Replicated Helm installation creates deployable YAML by using the same functionality that the `helm template` command uses, with some extended functionality for [specific Helm hooks](packaging-cleaning-up-jobs#helm-charts).

To deploy charts with the Replicated KOTS method, the app manager runs the following command: `helm upgrade -i chart.tar.gz --timeout 60m -n <namespace>`. The helm binary processes hooks and weights, applies manifests to the Kubernetes cluster, and saves a release secret similar to `sh.helm.release.v1.chart-name.v1`. This secret is how Helm tracks upgrades and rollbacks of applications.

When a user installs a Helm chart-based application in an air gap environment, the processing of the chart is managed in the end customer environment. This means that the customer-supplied values, license values, and existing values can be used to create the deployable manifests. For more information, see [builder](/reference/custom-resource-helmchart#builder) in _HelmChart_.

In both online and air gap environments, the resulting deployment is comprised of raw Kubernetes manifests. Therefore, cluster operator's are always able to view the exact difference between what is currently deployed and what the update will deploy. This level of change management provides the necessary transparency to provide the level of assurance that cluster operators require.
### Using the helm CLI (Beta)

Users can install an application packaged with a Helm chart into an existing cluster using the helm CLI. When users install with the helm CLI directly, Helm, rather than the app manager, manages the lifecycle of the application.

Deploying an application with the helm CLI differs from the "Native Helm" deployment method described above because, when users install with the helm CLI directly, they have access to all Helm functionality. Some enterprise users also prefer or require using the helm CLI because their existing CI/CD pipeline is already compatible with Helm charts. Similarly, enterprise users might have organizational policies that require using Helm to manage applications.

Users do not have access to certain Replicated features when they install and manage the application with the helm CLI directly. This is because the app manager does not manage the lifecycle of the application. For example, users must update the application using the `helm upgrade` command, rather than using the admin console UI or the kots CLI.

For more information about how to package an application so that users can install using the helm CLI, see [Supporting helm CLI Installations (Beta)](helm-install).

## Limitations

This section lists the limitations for packaging an application with Helm charts.

There are different limitations depending on if your customers install and manage the application with the app manager, or if they use the helm CLI directly:

* [Replicated KOTS and Native Helm Limitations](#replicated-helm-limitations)
* [helm CLI Install Limitations](#helm-cli-limitations)

### Native Helm and Replicated KOTS Limitations {#replicated-helm-limitations}

The following limitations apply when using the app manager to install and manage Helm charts:

* <TemplateLimitation/>

* <VersionLimitation/>

   For more information, see [helmVersion](/reference/custom-resource-helmchart#helmversion) in _HelmChart_.

* The following limitations apply to the Native Helm deployment method only:

  <NativeHelmLimitations/>

### helm CLI Install Limitations {#helm-cli-limitations}

The helm CLI installation method is Beta and has the following limitations:

<HelmCLILimitations/>