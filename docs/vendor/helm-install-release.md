import HelmReleaseSteps from "../partials/helm/_helm-release-steps.mdx"
import HelmChartPackage from "../partials/helm/_helm-chart-package-steps.mdx"

# Adding Your Helm Chart to a Release

This topic describes how to support Helm installations when you distribute your application with Replicated.

## Overview



## Prerequisites

Before you add your Helm chart to a release, complete the following prerequisites:

* If your application uses private images, update your Helm chart to deliver the required image pull secret and to reference the Replicated proxy service. For more information, see [Using Private Registries for helm CLI Installations (Beta)](helm-image-registry).

* Ensure that the chart version in your Helm chart complies with image tag format requirements. A valid tag can contain only lowercase and uppercase letters, digits, underscores, periods, and dashes.

  The chart version must also comply with the Semantic Versioning (SemVer) specification. When you run the `helm install` command without the `--version` flag, Helm retrieves the list of all available image tags for the chart from the registry and compares them using the SemVer comparison rules described in the SemVer specification. The version that is installed is the version with the largest tag value. For more information about the SemVer specification, see the [Semantic Versioning](https://semver.org) documentation.

## Package the Helm Chart

<HelmChartPackage/>

## Add Your Helm Chart to a Release {#release}

<HelmReleaseSteps/>