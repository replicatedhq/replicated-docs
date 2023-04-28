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

You must add a HelmChart custom resource manifest file (`kind: HelmChart`) for each Helm chart that you add to a release. When you add a Helm chart TGZ file to a release, Replicated copies the `Chart.yaml` and `values.yaml` files as read-only files. You use the HelmChart custom resource to provide the necessary instructions to the app manager for processing and preparing the chart for deployment, such as whether to use the native Helm or Replicated Helm installation. 

Using the HelmChart custom resource, you can create a mapping between the `values.yaml` file and the admin console Config page. This allows values to be changed in the chart. 

Other options include adding conditional statements that exclude certain Helm charts, depending on the user's input. You can also configure optional value keys that allow dynamic deployment, such as allowing users to configure an external database.

For native Helm, you can configure hooks and weights to define the installation order and bundle actions, such as performing database backups before upgrading.


## Add a HelmChart Custom Resource

Add a unique HelmChart custom resource to the release for each Helm chart that you are deploying with the app manager.

To add a HelmChart custom resource:

1. Add the custom resource using one of the following methods:

    - **replicated CLI:** If you are using the CLI, manually add the HelmChart custom resource to the local folder with your Helm chart. For more information about creating releases, see [Managing Releases with the CLI](releases-creating-cli).

    - **Vendor Portal:** Drag and drop a Helm chart TGZ file to a release. Replicated automatically creates a corresponding HelmChart custom resource manifest that uses the naming convention `CHART_NAME.yaml`. For more information about creating releases, see [Managing Releases with the Vendor Portal](releases-creating-releases).

      For example, the following screenshot shows how a Postgres Helm chart displays in the file tree of a release in the vendor portal:

      ![Postgres Helm Chart](/images/postgres-helm-chart.png)

      [View a larger image](/images/postgres-helm-chart.png)

1. Make sure the HelmChart custom resource has a unique name and set the `useHelmInstall` flag to `true` to use native Helm. Native Helm is recommended. To use Replicated Helm, use the default value `false`.

1. Configure the HelmChart custom resource. For more information, see [HelmChart](/reference/custom-resource-helmchart).

1. Repeat these steps for each Helm chart in your release.

