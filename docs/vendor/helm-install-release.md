import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"

# Packaging a Helm Chart for a Release

This topic describes how to package a Helm chart and the Replicated SDK into a chart archive that can be added to a release.

## Overview

To add a Helm chart to a release, you first add the Replicated SDK as a dependency of the Helm chart and then package the chart and its dependencies into a `.tgz` chart archive.

The Replicated SDK is a Helm chart can be installed as a small service alongside your application. The SDK is strongly recommended for applications that will be installed with Helm because it provides access to key Replicated features, such as instance insights and telemetry. For more information, see [About the Replicated SDK](replicated-sdk-overview). 

## Chart Version Requirement

The chart version in your Helm chart must comply with image tag format requirements. A valid tag can contain only lowercase and uppercase letters, digits, underscores, periods, and dashes.

The chart version must also comply with the Semantic Versioning (SemVer) specification. When you run the `helm install` command without the `--version` flag, Helm retrieves the list of all available image tags for the chart from the registry and compares them using the SemVer comparison rules described in the SemVer specification. The version that is installed is the version with the largest tag value. For more information about the SemVer specification, see the [Semantic Versioning](https://semver.org) documentation.

## Package a Helm Chart {#release}

For more information about the Helm CLI commands in this procedure, see the [Helm Commands](https://helm.sh/docs/helm/helm/) section in the Helm documentation.

To package a Helm chart so that it can be added to a release:

1. (Optional) If the Helm chart source is in a chart repository, do the following:

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

   1. If you are going to add the Replicated SDK as a dependency, untar the `.tgz` archive.   

1. In your local directory, `cd` to the location of the `Chart.yaml` file for the Helm chart.

1. (Recommended) In the Helm chart `Chart.yaml`, add the Replicated SDK as a dependency:

    <DependencyYaml/>

1. Update the `charts/` directory:

   ```
   helm dependency update
   ```
1. Package the Helm chart:

   ```
   helm package .
   ```

   The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `CHART_NAME-VERSION.tgz`. For example, `postgresql-8.1.2.tgz`.

1. Add the `.tgz` chart archive to a release. See [Managing Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

  After the release is promoted, your Helm chart is automatically pushed to the Replicated registry. For information about how to install the release in a development environment with Helm, see [Installing with Helm](install-with-helm).  