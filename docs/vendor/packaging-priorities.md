# Packaging Priorities

Your application is packaged as a set of standard Kubernetes manifests.
These manifests include your application manifests, plus several optional [custom resources](../reference/custom-resource-about) used to invoke various app manager functions.

Packaging your application for production can be done more easily in iterations. It can be helpful to understand the priority order in which to iterate. Some manifest files are required, some are highly recommended, and others are optional.

We recommend configuring and testing one manifest file at a time until the entire application is running as expected.

## Configuring the First Production Pass

These configuration tasks are either required or highly recommended in your first production pass, in the following order:

1. Connect to a private registry. If your images are open-source or pubic, skip this step. To connect your private registry, either push the image to Replicated's registry or link your private registry. See [Using Private Registry Images](packagine-private-images).

1. Configure the `deployment.yaml` file.
1. Configure the `services.yaml` file.
1. If your application is already templated and packaged as a Helm chart (or includes Helm charts), then you can follow our documentation on [packaging a Helm chart as an application](helm-installing-native-helm). Note that packaging with Helm charts is optional.
1. If you are using Kubernetes Operators, you must pass URLs to the Operator using template functions. See [About Packaging a Kubernetes Operator Application](operator-packaging-about) and [Template Functions](packaging-template-functions).

  :::note
  You can skip this step if you are using OSS or pubic images, unless you want to use an air gap environment.
  :::

## Configuring the Second Production Pass

These configuration tasks are either required or highly recommended in your second production pass, in the following order:

1.


## Basic Packaging


Most applications require some amount of customer supplied configuration values.
These values can be collected during the installation process by specifying a [Config custom resource](../reference/custom-resource-config) to [create a config screen](admin-console-customize-config-screen), and provided to the application by [using templates for your Kubernetes manifests](packaging-template-functions).



## Advanced Features
Vendors can invoke several other more advanced features by providing additional app manager custom resources.
For customizable preflight checks, vendors can provide a [Preflight custom resource](../reference/custom-resource-preflight) to test a cluster for necessary resources or other dependencies, and show warnings or errors if the target cluster fails any of these checks.

Similarly, troubleshooting features can be enabled by creating [Collector and Analyzer](../reference/custom-resource-support-bundle) custom resources.

Finally, the [Application](../reference/custom-resource-application) and [SIG Application](../reference/custom-resource-sig-application) custom resources provide branding metadata (icon, title, descriptions, and so on), readiness checks, and end-user links, enabling the admin console to show application health and readiness, and launch the app once it's ready.

Licenses are created and managed through the [vendor portal](https://vendor.replicated.com), which provides support for configurable pre-built entitlements, expiration dates, license types and a framework for delivering custom entitlements (seat count, etc). For more information. see the [entitlements documentation](licenses-adding-custom-fields).
