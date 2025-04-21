# Package a Helm Chart for a Release

This topic describes how to package a Helm chart and the Replicated SDK into a chart archive that can be added to a release.

## Overview

To add a Helm chart to a release, you first add the Replicated SDK as a dependency of the Helm chart and then package the chart and its dependencies as a `.tgz` chart archive.

The Replicated SDK is a Helm chart can be installed as a small service alongside your application. The SDK provides access to key Replicated features, such as support for collecting custom metrics on application instances. For more information, see [About the Replicated SDK](replicated-sdk-overview). 

## Requirements and Recommendations

This section includes requirements and recommendations for Helm charts.

### Chart Version Requirement

The chart version in your Helm chart must comply with image tag format requirements. A valid tag can contain only lowercase and uppercase letters, digits, underscores, periods, and dashes.

The chart version must also comply with the Semantic Versioning (SemVer) specification. When you run the `helm install` command without the `--version` flag, Helm retrieves the list of all available image tags for the chart from the registry and compares them using the SemVer comparison rules described in the SemVer specification. The version that is installed is the version with the largest tag value. For more information about the SemVer specification, see the [Semantic Versioning](https://semver.org) documentation.

### Chart Naming

For releases that contain more than one Helm chart, Replicated recommends that you use unique names for each top-level Helm chart in the release. This aligns with Helm best practices and also avoids potential conflicts in filenames during installation that could cause the installation to fail. For more information, see [Installation Fails for Release With Multiple Helm Charts](helm-install-troubleshooting#air-gap-values-file-conflict) in _Troubleshooting Helm Installations_.

### Helm Best Practices

Replicated recommends that you review the [Best Practices](https://helm.sh/docs/chart_best_practices/) guide in the Helm documentation to ensure that your Helm chart or charts follows the required and recommended conventions.

## Package a Helm Chart {#release}

This procedure shows how to create a Helm chart archive to add to a release. For more information about the Helm CLI commands in this procedure, see the [Helm Commands](https://helm.sh/docs/helm/helm/) section in the Helm documentation.

To package a Helm chart so that it can be added to a release:

1. In your application Helm chart `Chart.yaml` file, add the YAML below to declare the SDK as a dependency. If your application is installed as multiple charts, declare the SDK as a dependency of the chart that customers install first. Do not declare the SDK in more than one chart.

    ```yaml
# Chart.yaml
dependencies:
- name: replicated
  repository: oci://registry.replicated.com/library
  version: 1.5.1
```

For the latest version information for the Replicated SDK, see the [replicated-sdk repository](https://github.com/replicatedhq/replicated-sdk/releases) in GitHub.
    
    For additional guidelines related to adding the SDK as a dependency, see [Install the SDK as a Subchart](replicated-sdk-installing#install-the-sdk-as-a-subchart) in _Installing the Replicated SDK_. 

1. Update dependencies and package the chart as a `.tgz` file:

    ```bash
helm package -u PATH_TO_CHART
```  
Where:
* `-u` or `--dependency-update` is an option for the `helm package` command that updates chart dependencies before packaging. For more information, see [Helm Package](https://helm.sh/docs/helm/helm_package/) in the Helm documentation.
* `PATH_TO_CHART` is the path to the Helm chart in your local directory. For example, `helm package -u .`.

The Helm chart, including any dependencies, is packaged and copied to your current directory in a `.tgz` file. The file uses the naming convention: `CHART_NAME-VERSION.tgz`. For example, `postgresql-8.1.2.tgz`.

    :::note
    If you see a 401 Unauthorized error after running `helm dependency update`, run the following command to remove credentials from the Replicated registry, then re-run `helm dependency update`:

```bash
helm registry logout registry.replicated.com
```

For more information, see [401 Unauthorized Error When Updating Helm Dependencies](replicated-sdk-installing#401).
    :::

1. Add the `.tgz` file to a release. For more information, see [Manage Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

    After the release is promoted, your Helm chart is automatically pushed to the Replicated registry. For information about how to install a release with the Helm CLI, see [Install with Helm](install-with-helm). For information about how to install Helm charts with KOTS, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about).