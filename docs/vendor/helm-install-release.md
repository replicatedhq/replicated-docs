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

This procedure shows how to create a Helm chart archive to add to a release. For more information about the Helm CLI commands in this procedure, see the [Helm Commands](https://helm.sh/docs/helm/helm/) section in the Helm documentation.

To package a Helm chart so that it can be added to a release:

1. In your local directory, `cd` to the location of the `Chart.yaml` file for the Helm chart.

   :::note
   If the Helm chart that you want to use is available in a chart repository and you do not have access to the source, you can use `helm repo add` and `helm pull` to download a local copy of the chart archive. For more information, see [Helm Repo](https://helm.sh/docs/helm/helm_repo/) and [Helm Pull](https://helm.sh/docs/helm/helm_pull/) in the Helm documentation.
   :::

1. In the Helm chart `Chart.yaml`, add the Replicated SDK as a dependency:

    <DependencyYaml/>
    
    For additional guidelines related to adding the SDK as a dependency, see [How to Distribute the SDK](replicated-sdk-overview#how-to-distribute-the-sdk) in _About the Replicated SDK_.

1. Update the `charts/` directory:

   ```
   helm dependency update
   ```
   
1. Package the Helm chart into a `.tgz` archive:

   ```
   helm package .
   ```

   The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `CHART_NAME-VERSION.tgz`. For example, `postgresql-8.1.2.tgz`.

1. Add the `.tgz` chart archive to a release. See [Managing Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

  After the release is promoted, your Helm chart is automatically pushed to the Replicated registry. For information about how to install the release in a development environment with Helm, see [Installing with Helm](install-with-helm).  