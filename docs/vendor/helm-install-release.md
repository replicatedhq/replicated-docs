import DependencyYaml from "../partials/replicated-sdk/_dependency-yaml.mdx"
import RegistryLogout from "../partials/replicated-sdk/_registry-logout.mdx"
import HelmPackage from "../partials/helm/_helm-package.mdx"

# Packaging a Helm Chart for a Release

This topic describes how to package a Helm chart and the Replicated SDK into a chart archive that can be added to a release.

## Overview

To add a Helm chart to a release, you first add the Replicated SDK as a dependency of the Helm chart and then package the chart and its dependencies as a `.tgz` chart archive.

The Replicated SDK is a Helm chart can be installed as a small service alongside your application. The SDK is strongly recommended because it provides access to key Replicated features, such as support for collecting custom metrics on application instances. For more information, see [About the Replicated SDK](replicated-sdk-overview). 

## Chart Version Requirement

The chart version in your Helm chart must comply with image tag format requirements. A valid tag can contain only lowercase and uppercase letters, digits, underscores, periods, and dashes.

The chart version must also comply with the Semantic Versioning (SemVer) specification. When you run the `helm install` command without the `--version` flag, Helm retrieves the list of all available image tags for the chart from the registry and compares them using the SemVer comparison rules described in the SemVer specification. The version that is installed is the version with the largest tag value. For more information about the SemVer specification, see the [Semantic Versioning](https://semver.org) documentation.

## Package a Helm Chart {#release}

This procedure shows how to create a Helm chart archive to add to a release. For more information about the Helm CLI commands in this procedure, see the [Helm Commands](https://helm.sh/docs/helm/helm/) section in the Helm documentation.

To package a Helm chart so that it can be added to a release:

1. In your application Helm chart `Chart.yaml` file, add the YAML below to declare the SDK as a dependency. If your application is installed as multiple charts, declare the SDK as a dependency of the chart that customers install first. Do not declare the SDK in more than one chart.

    <DependencyYaml/>
    
    For additional guidelines related to adding the SDK as a dependency, see [Install the SDK as a Subchart](replicated-sdk-installing#install-the-sdk-as-a-subchart) in _Installing the Replicated SDK_.

1. <RegistryLogout/> 

1. Update dependencies and package the chart as a `.tgz` file:

    <HelmPackage/>

1. Add the `.tgz` file to a release. For more information, see [Managing Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).

    After the release is promoted, your Helm chart is automatically pushed to the Replicated registry. For information about how to install a release with the Helm CLI, see [Installing with Helm](install-with-helm). For information about how to install Helm charts with KOTS, see [About Distributing Helm Charts with KOTS](/vendor/helm-native-about).
