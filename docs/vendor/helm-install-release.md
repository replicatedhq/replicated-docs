import HelmReleaseSteps from "../partials/helm/_helm-release-steps.mdx"
import HelmChartPackage from "../partials/helm/_helm-chart-package-steps.mdx"

# Creating a Release with Your Helm Chart

This topic describes how to support Helm installations when you distribute your application with Replicated.

## Overview

To distribute your Helm chart application with Replicated and allow your customers to install with Helm, you can package your Helm chart and add it to a release. When you promote the release, the vendor portal pushes your Helm chart to the Replicated registry where your customers can then authenticate to install with Helm. For more information, see [About Distributing with Helm (Beta)](helm-install).

To use Replicated functionality in your application such as instance insights and telemetry, entitlement checks, and instance update checks, you can include the Replicated SDK with your Helm chart as a dependency. For more information, see [About the Replicated SDK (Alpha)](replicated-sdk-overview).
## Requirements

Supporting Helm installations has the following requirements:

* The chart version in your Helm chart must comply with image tag format requirements. A valid tag can contain only lowercase and uppercase letters, digits, underscores, periods, and dashes.

  The chart version must also comply with the Semantic Versioning (SemVer) specification. When you run the `helm install` command without the `--version` flag, Helm retrieves the list of all available image tags for the chart from the registry and compares them using the SemVer comparison rules described in the SemVer specification. The version that is installed is the version with the largest tag value. For more information about the SemVer specification, see the [Semantic Versioning](https://semver.org) documentation.

* The **Show Helm Install Tab** feature flag must be enabled for your team in the vendor portal.  

## Package the Helm Chart

<HelmChartPackage/>

## Add Your Helm Chart to a Release {#release}

You can create and promote a release with your Helm chart `.tgz` package using the replicated CLI or the vendor portal.

### Using the replicated CLI

To create and promote a release with your Helm chart using the CLI:

1. Install the replicated CLI. See [Installing the replicated CLI](/reference/replicated-cli-installing).

1. Set the environment variables:
     * Set the `REPLICATED_APP` environment variable to the slug for your application in the vendor portal. 
     * Set the `REPLICATED_API_TOKEN` environment variable to your user API token from the vendor portal.
     
    See [Set Environment Variables](/reference/replicated-cli-installing#set-environment-variables) in _Installing the replicated CLI_.

    **Example**:

    ```bash
    export REPLICATED_APP=my-app-slug
    export REPLICATED_API_TOKEN=1234abcd
    ```
1. Create a release and promote it to the Unstable channel:

   ```bash
   replicated release create --chart=CHART_TGZ_FILE --promote=Unstable
   ```
   Replace `CHART_TGZ_FILE` with the `.tgz` Helm chart package that you created. For example, `--chart=my-chart-1.0.0.tgz`.

1. Confirm the release was created:

   ```
   replicated release ls
   ```

### Using the Vendor Portal

<HelmReleaseSteps/>   