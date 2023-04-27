import NativeHelmLimitations from "../partials/helm/_native-helm-limitations.mdx"
import TemplateLimitation from "../partials/helm/_helm-template-limitation.mdx"
import VersionLimitation from "../partials/helm/_helm-version-limitation.mdx"
import ReplicatedHelmDeprecated from "../partials/helm/_replicated-deprecated.mdx"
import HooksLimitation from "../partials/helm/_hooks-limitation.mdx"

# Configuring Helm with App Manager

This topic describes the HelmChart custom resource that is required for native Helm and Replicated Helm releases with Replicated app manager. It also describe the limitations for native Helm and Replicated Helm installations.

## Limitations {#replicated-helm-limitations}

The following limitations apply when using the app manager for native Helm and Replicated Helm installations:
* <ReplicatedHelmDeprecated/>
* <TemplateLimitation/>
* <VersionLimitation/>

  For more information, see [helmVersion](/reference/custom-resource-helmchart#helmversion) in _HelmChart_.
* The name specified in the HelmChart custom resource must be an exact match to the actual Helm chart name that is provided to Replicated. If the Helm chart names do not match, then the installation can error or fail. See [HelmChart](/reference/custom-resource-helmchart) in _Custom Resources_.

* The following limitations apply to the native Helm deployment method only:

  <NativeHelmLimitations/>

  * <HooksLimitation/>

## About the HelmChart Custom Resource

App manager supports using native Helm and Replicated Helm to deliver enterprise applications as Helm charts, or including Helm charts as components of an application. An application can use more than one Helm chart, and can use more than a single instance of any Helm chart.

When you add a Helm chart TGZ file to a release, Replicated displays a copy of the `Chart.yaml` file and the `values.yaml` file from the Helm chart in the release. These files are read-only and are not editable in the release.

A HelmChart custom resource manifest file is also required for each Helm chart that you add to a release. A HelmChart custom resource is a YAML file with `kind: HelmChart`. The HelmChart custom resource references the TGZ file export of the Helm chart. You configure the custom resource file to provide the necessary instructions to the app manager for processing and preparing the chart for deployment.

## Configure Helm with App Manager

To configure a Native Helm (recommended) or Replicated Helm release, follow this process:

1. Add the HelmChart custom resource to a release using one of the following methods:

    - **replicated CLI:** If you are using the CLI, manually add the HelmChart custom resource to the local folder with your application files.
    - **Vendor Portal:** Drag and drop a Helm chart TGZ file to a release. Replicated automatically creates a corresponding HelmChart custom resource manifest that uses the naming convention `CHART_NAME.yaml`.

      For example, the following screenshot shows how a Postgres Helm chart displays in the file tree of a release in the vendor portal:

      ![Postgres Helm Chart](/images/postgres-helm-chart.png)

      [View a larger image](/images/postgres-helm-chart.png)

    For more information about creating releases, see [Managing Releases with the Vendor Portal](releases-creating-release) and [Managing Releases with the CLI](releases-creating-cli).

1. Configure the HelmChart custom resource using the following options:

    - Change the default Helm installation method. See [HelmChart](/reference/custom-resource-helmchart).
    - Specify Helm upgrade flags. See [HelmChart](/reference/custom-resource-helmchart).
    - Specify an alternative namespace. See [HelmChart](/reference/custom-resource-helmchart).
    - Configure installations for air gap environments. See [HelmChart](/reference/custom-resource-helmchart).
    - Use templating to map exclusions. See [Including Optional Charts](helm-optional-charts).
    - Use templating to map optional value keys. See [Including Optional Charts](helm-optional-charts).
    - Configure hooks and weights for native Helm installations. See [Defining Installation Order for Native Helm Charts](helm-native-helm-install-order).
