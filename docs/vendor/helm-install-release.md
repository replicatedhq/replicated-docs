import HelmReleaseSteps from "../partials/helm/_helm-release-steps.mdx"
import HelmReleaseStepsCLI from "../partials/helm/_helm-release-steps-cli.mdx"
import HelmChartPackage from "../partials/helm/_helm-chart-package-steps.mdx"
import FeatureFlag from "../partials/helm/_feature-flag.mdx"
import HelmInstallRequirements from "../partials/helm/_helm-install-requirements.mdx"

# Creating a Release with Your Helm Chart (Beta)

This topic describes how to create releases with your Helm chart to support installations with Helm. For information about how to create releases to support KOTS installations for your Helm chart, see [Creating a Release with Your Helm Chart for KOTS](/vendor/helm-release).

## Overview

To distribute your Helm chart application with Replicated and allow your customers to install with Helm, you can package your Helm chart and add it to a release in the Replicated vendor portal. When you promote the release, the vendor portal pushes your Helm chart to the Replicated registry where your customers can then authenticate to install with Helm. For more information, see [About Distributing with Helm (Beta)](helm-install).

To use Replicated functionality in your application such as instance insights and telemetry, entitlement checks, and instance update checks, you can include the Replicated SDK with your Helm chart as a dependency. For more information, see [About the Replicated SDK (Beta)](replicated-sdk-overview).

## Requirements

Supporting Helm installations has the following requirements:

<HelmInstallRequirements/>

* <FeatureFlag/>  

## Package the Helm Chart

<HelmChartPackage/>

## Add Your Helm Chart to a Release {#release}

You can create and promote a release with your Helm chart `.tgz` package using the replicated CLI or the vendor portal.

### Using the replicated CLI

<HelmReleaseStepsCLI/>

### Using the Vendor Portal

<HelmReleaseSteps/>   