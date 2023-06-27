import ReplicatedHelmDeprecated from "../partials/helm/_replicated-deprecated.mdx"
import HelmChartPackage from "../partials/helm/_helm-chart-package-steps.mdx"
import V2Example from "../partials/helm/_v2-native-helm-cr-example.mdx"
import KotsHelmCrDescription from "../partials/helm/_kots-helm-cr-description.mdx"

# Creating a Release with Your Helm Chart for KOTS

This topic describes how to support Helm chart installations with Replicated KOTS. For information about creating releases with Helm charts for installation with Helm, see [Creating a Release with Your Helm Chart (Beta)](helm-install-release).

## Overview

<KotsHelmCrDescription/>

For more information about the HelmChart custom resource, see [HelmChart v2](/reference/custom-resource-helmchart-v2).

To create a release with your Helm chart for installation with KOTS:
1. [Package the Helm Chart](#package)
1. [Add the Helm Chart and HelmChart Custom Resource to a Release](#release)

## Package the Helm Chart {#package}

<HelmChartPackage/>

## Add the Helm Chart and HelmChart Custom Resource to a Release {#release}

After you package your Helm chart, add it to a release along with the HelmChart custom resource manifest file. For more information about creating releases, see [Managing Releases with the Vendor Portal](releases-creating-releases) and [Managing Releases with the CLI](releases-creating-cli).

### Using the Vendor Portal

When you add a Helm chart to a release using the vendor portal, the vendor portal automatically adds a HelmChart custom resource.

To add a Helm chart and HelmChart custom resource to a release using the vendor portal:

1. Drag and drop a Helm chart TGZ file to a release in the vendor portal. 
1. In the **Select Helm Install Method** dialog, select the installation method that you want KOTS to use for the release. Native Helm v2 is recommended. Click **OK**. 

  Replicated automatically creates a HelmChart custom resource manifest that uses the naming convention `CHART_NAME.yaml`.

1. Configure the HelmChart custom resource. For more information, see [HelmChart v2](/reference/custom-resource-helmchart-v2).

1. Repeat these steps for each Helm chart in your release.

1. Save and promote the release. See [Create a Release](releases-creating-releases#create-a-release) in _Managing Releases with the Vendor Portal_.

### Using the CLI

To create a release with a Helm chart using the replicated CLI:
  
1. Create a HelmChart custom resource (`kind: HelmChart` and `apiVersion: kots.io/v1beta2`) and add it to the local directory with your TGZ file. Give the chart a unique name, using the naming convention `CHART_NAME.yaml`.

  **Example:**
      
  <V2Example/>

1. Configure the HelmChart custom resource. See [HelmChart v2](/reference/custom-resource-helmchart-v2).

1. Repeat these steps for each Helm chart in your release.

1. Create and promote the release. See [Create a Release ](releases-creating-cli#create-a-release) _Managing Releases with the CLI_.