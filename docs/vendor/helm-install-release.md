import HelmReleaseSteps from "../partials/helm/_helm-release-steps.mdx"
import HelmChartPackage from "../partials/helm/_helm-chart-package-steps.mdx"

# Creating a Release with Your Helm Chart

This topic describes how to support Helm installations when you distribute your application with Replicated.

## Overview

To distribute your Helm chart application with Helm, you can package your Helm chart and add it to a release in the Replicated vendor portal. After you promote the release, the vendor portal pushes your Helm chart to the Replicated registry where your customers can then authenticate to pull the chart and install with Helm. For more information, see [About Distributing with Helm (Beta)](helm-install).

To use Replicated functionality in your application such as instance insights and telemetry, entitlement verification at runtime, and instance update checks, you can also include the Replicated SDK with your Helm chart as a dependency. For more information, see [About the Replicated SDK (Alpha)](replicated-sdk-overview).
## Prerequisites

Before you add your Helm chart to a release, complete the following prerequisites:

* Ensure that the chart version in your Helm chart complies with image tag format requirements. A valid tag can contain only lowercase and uppercase letters, digits, underscores, periods, and dashes.

  The chart version must also comply with the Semantic Versioning (SemVer) specification. When you run the `helm install` command without the `--version` flag, Helm retrieves the list of all available image tags for the chart from the registry and compares them using the SemVer comparison rules described in the SemVer specification. The version that is installed is the version with the largest tag value. For more information about the SemVer specification, see the [Semantic Versioning](https://semver.org) documentation.

* The **Show Helm Install Tab** feature flag must be enabled for your team in the vendor portal.  

## Package the Helm Chart

<HelmChartPackage/>

## Add Your Helm Chart to a Release {#release}

<HelmReleaseSteps/>