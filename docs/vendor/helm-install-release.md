import HelmChartPackage from "../partials/helm/_helm-chart-package-steps.mdx"
import FeatureFlag from "../partials/helm/_feature-flag.mdx"

# Creating a Release with Your Helm Chart (Beta)

This topic describes how to create releases with your Helm chart to support installations with Helm. For information about how to create releases to support KOTS installations for your Helm chart, see [Creating a Release with Your Helm Chart for KOTS](/vendor/helm-release).

## Overview

To distribute your Helm chart application with Replicated and allow your customers to install with Helm, you can package your Helm chart and add it to a release in the Replicated vendor portal. When you promote the release, the vendor portal pushes your Helm chart to the Replicated registry where your customers can then authenticate to install with Helm. For more information, see [About Distributing with Helm (Beta)](helm-install).

To use Replicated functionality in your application such as instance insights and telemetry, entitlement checks, and instance update checks, you can include the Replicated SDK with your Helm chart as a dependency. For more information, see [About the Replicated SDK (Beta)](replicated-sdk-overview).

## Requirements

Supporting Helm installations has the following requirements:

* The chart version in your Helm chart must comply with image tag format requirements. A valid tag can contain only lowercase and uppercase letters, digits, underscores, periods, and dashes.

  The chart version must also comply with the Semantic Versioning (SemVer) specification. When you run the `helm install` command without the `--version` flag, Helm retrieves the list of all available image tags for the chart from the registry and compares them using the SemVer comparison rules described in the SemVer specification. The version that is installed is the version with the largest tag value. For more information about the SemVer specification, see the [Semantic Versioning](https://semver.org) documentation.

* <FeatureFlag/>  

## Package a Helm Chart and Create a Release

Before you can include a Helm chart in a release, you must first package the Helm chart, including any of its dependencies, as a `.tgz` file. Then, you add the `.tgz` Helm chart package to your release. For more information about the Helm CLI commands in this procedure, see the [Helm Commands](https://helm.sh/docs/helm/helm/) section in the Helm documentation.

To add a Helm chart to a release:

1. If the Helm chart source is in a chart repository, do the following:

   1. Run the following command to update your local directory with the latest available Helm chart information from your chart repositories:

      ```
      helm repo update
      ```
      :::note
      You can also pass the names of a specific repository or repositories that you want to update in the `helm repo update` command. For more information, see [Helm Repo Update](https://helm.sh/docs/helm/helm_repo_update/) in the Helm documentation.
      :::
      
   1. Download the latest copy of the desired Helm chart from a repository:

      ```
      helm fetch REPO_NAME/CHART_NAME
      ```
      Replace:
      * `REPO_NAME` with the name of the repository where the Helm chart is located.
      * `CHART_NAME` with the name of the Helm chart as it appears in the repository.

      The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `CHART_NAME-VERSION.tgz`. For example, `postgresql-8.1.2.tgz`.

1. (Recommended) In the Helm chart `Chart.yaml`, add the Replicated SDK as a dependency:

    ```yaml
    # Chart.yaml
    dependencies:
    - name: replicated
      repository: oci://registry.replicated.com/library
      version: 0.0.1-alpha.15
    ```  

  The Replicated SDK is a Helm chart that provides access to Replicated features and can be installed as a small service alongside your application. For more information, see [About the Replicated SDK](replicated-sdk-about).

1. If the Helm chart source is in your local directory, do the following:

   1. In your local directory, `cd` to the location of the `Chart.yaml` file for the Helm chart.

   1. If the `Chart.yaml` file includes any dependencies, update the `charts/` directory:

      ```
      helm dependency update
      ```
   1. Package the Helm chart:

      ```
      helm package .
      ```

      The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `CHART_NAME-VERSION.tgz`. For example, `postgresql-8.1.2.tgz`.

1. Add the `.tgz` to a release. See [Managing Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

  After the release is promoted, your Helm chart is automatically pushed to the Replicated registry. For information about how to install the release in a development environment with Helm, see [Installing an Application with Helm (Beta)](install-with-helm).  