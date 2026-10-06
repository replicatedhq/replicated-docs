import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"
import RegistryLogout from "../partials/replicated-sdk/_registry-logout.mdx"
import HelmPackage from "../partials/helm/_helm-package.mdx"
import SdkChartPlacement from "../partials/replicated-sdk/_sdk-chart-placement.mdx"

# Package a Helm chart for a release

This topic describes how to package a Helm chart and the Replicated SDK into a chart archive that can be added to a release.

## Overview

To add a Helm chart to a release, you first add the Replicated SDK as a dependency of the Helm chart and then package the chart and its dependencies as a `.tgz` chart archive.

The Replicated SDK is a Helm chart that should be installed as a small service alongside your application. The SDK provides access to key Replicated functionality including instance telemetry, license verification, and an in-cluster API. For more information, see [About the Replicated SDK](replicated-sdk-overview).

## Choose a packaging approach

Replicated supports packaging your application as an umbrella Helm chart. An umbrella chart is a single parent chart that declares one or more other charts as dependencies in its `Chart.yaml` file. The subcharts can be charts that you author, third-party charts such as the ones published by Bitnami, or a mix of both.

This differs from a release that contains multiple top-level Helm charts, where you package and add each chart separately and each gets its own [HelmChart custom resource](/reference/custom-resource-helmchart-v2). The two approaches involve different tradeoffs:

- **Umbrella chart:** customers run a single `helm install` command, and your release has a single HelmChart custom resource. Every subchart ships on the parent chart's release cadence.
- **Multiple top-level charts:** each chart is versioned and released independently. Customers run a separate `helm install` command for each chart. Your release needs a separate HelmChart custom resource, values file, and chart name for each one. See [Chart naming](#chart-naming) on this page.

For an umbrella chart, configure a single HelmChart custom resource with `chart.name` and `chart.chartVersion` matching the umbrella chart's own `Chart.yaml` file, not a subchart's. For more information, see [chart](/reference/custom-resource-helmchart-v2#chart) in _HelmChart v2_.

For more information about working with subcharts, see:

- [Helm optional dependencies](packaging-include-resources#helm-optional-dependencies) in _Conditionally include or exclude resources_, to let customers turn a subchart on or off.
- [builder](/reference/custom-resource-helmchart-v2#builder) in _HelmChart v2_, to render every subchart's images into the release's image list. This list is what generates the air gap install instructions, builds the `.airgap` bundle, and determines which images the Security Center scans.
- [About the Replicated SDK](replicated-sdk-overview), to understand the distinction between the SDK's own values and the `global.replicated` values that every subchart can read.

## Requirements and recommendations

This section includes requirements and recommendations for Helm charts.

### Chart version requirement

The chart version in your Helm chart must comply with image tag format requirements. A valid tag can contain only lowercase and uppercase letters, digits, underscores, periods, and dashes.

The chart version must also comply with the Semantic Versioning (SemVer) specification. When you run the `helm install` command without the `--version` flag, Helm retrieves the list of all available image tags for the chart from the registry and compares them using the SemVer comparison rules described in the SemVer specification. The version that is installed is the version with the largest tag value. For more information about the SemVer specification, see the [Semantic Versioning](https://semver.org) documentation.

### Chart naming

For releases that contain more than one Helm chart, Replicated recommends that you use unique names for each top-level Helm chart in the release. This aligns with Helm best practices and also avoids potential conflicts in filenames during installation that could cause the installation to fail. For more information, see [Installation Fails for Release With Multiple Helm Charts](helm-install-troubleshooting#air-gap-values-file-conflict) in _Troubleshooting Helm Installations_.

### Helm best practices

Replicated recommends that you review the [Best Practices](https://helm.sh/docs/chart_best_practices/) guide in the Helm documentation to ensure that your Helm chart or charts follows the required and recommended conventions.

## Package a Helm chart {#release}

This procedure shows how to create a Helm chart archive to add to a release. For more information about the Helm CLI commands in this procedure, see the [Helm Commands](https://helm.sh/docs/helm/helm/) section in the Helm documentation.

To package a Helm chart so that it can be added to a release:

1. In your application Helm chart `Chart.yaml` file, add the YAML below to declare the SDK as a dependency.

    <DependencyYaml/>

    <SdkChartPlacement/>
    
    For additional guidelines related to adding the SDK as a dependency, see [Install the SDK as a Subchart](replicated-sdk-installing#install-the-sdk-as-a-subchart) in _Installing the Replicated SDK_. 

1. Update dependencies and package the chart as a `.tgz` file:

    <HelmPackage/>

    :::note
    <RegistryLogout/>
    :::

1. Add the `.tgz` file to a release. For more information, see [Manage Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

1. Add a HelmChart custom resource to the release for each top-level Helm chart. The Vendor Portal uses these custom resources to build the release's image list, which generates the air gap install instructions, builds the `.airgap` bundle, and determines which images the Security Center scans. A release that contains charts but no HelmChart custom resource has an empty image list. For more information, see [HelmChart v2](/reference/custom-resource-helmchart-v2).
