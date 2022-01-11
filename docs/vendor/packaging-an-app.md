# Understanding packaging with app manager

Software vendors with a Kubernetes application can package their app as a Kubernetes-off-The-Shelf (KOTS) software for distribution to enterprise customers as a modern on-prem, private instance.
The packaging process leverages several KOTS components (some optional, some required).
For context, Replicated KOTS is made of several purpose built, open source components, but should be thought of in two distinct (but highly integrated) categories.

* **Cluster Operator Tools**: A set of open source projects that KOTS vendors can invoke to provide cluster operators with the necessary tools to validate, install, configure, troubleshoot, and automate the management of the KOTS application.
These tools are built with a strong focus on production grade day-2 operations.
* **Software Vendor Tools**: Primarily provided by a hosted [vendor portal](https://vendor.replicated.com) that serves as a centralized collaboration platform to manage customers, licenses/entitlements, releases/release channels, and troubleshooting. The vendor tools are [deeply integrated with the OSS KOTS projects](https://blog.replicated.com/announcing-kots/) to provide processes and workflows to operationalize and scale the distribution of a modern on-prem application.

The foundational open source projects that KOTS coordinates are [Replicated KOTS CLI](https://kots.io/vendor/cli/getting-started/) and [Kotsadm](../enterprise/installing-overview) (installation and admin console), [Replicated Troubleshoot](https://troubleshoot.sh) (preflight checks and support bundles), [Replicated kURL](https://kurl.sh) (embedded K8s option) as well as several community driven OSS projects like Kubernetes, Kustomize, Helm, and Kubeadm.

This document starts with an overview on how to package and manage KOTS applications via the Replicated Vendor Portal (an API and CLI are available for more rapid or automated iteration).
Please refer to our documentation of the [KOTS CLI](https://kots.io/kots-cli/getting-started/) to install and manage a KOTS application via the command line, or our [Enterprise documentation](../enterprise/installing-overview) for managing an application via the admin console.

## Basic Packaging
KOTS applications are packaged as a set of standard Kubernetes manifests.
These manifests include your application manifests, plus several optional [custom resources](custom-resource-about) used to invoke various KOTS functions.
Together, these manifests can be managed via [release channels](releases-understanding), and delivered to customers by providing [installation instructions](../enterprise/installing-overview), and a Replicated generated [license](licenses-about).

Most applications require some amount of customer supplied configuration values.
These values can be collected during the installation process by specifying a [config KOTS custom resource](custom-resource-config) to [create a config screen](admin-console-customize-config-screen), and provided to the application by [templating your Kubernetes manifests](packaging-template-functions).

## Helm Chart Packaging
If your application is already templated and packaged as a Helm chart (or includes Helm charts), then you can follow our documentation on [packaging a Helm chart as a KOTS application](helm-installing-native-helm). Note that packaging with Helm charts is optional.

## Advanced Features
KOTS vendors can invoke several other more advanced features by providing additional KOTS custom resources.
For customizable Preflight checks, vendors can provide a [preflight custom resource](custom-resource-preflight) in order to test a cluster for necessary resources or other dependencies, and show warnings or errors if the target cluster fails any of these checks.

Similarly, troubleshooting features can be enabled by creating [collector and analyzer](custom-resource-support-bundle) custom resources.

Finally, the [Application](custom-resource-application) and [sig-application](custom-resource-sig-application) custom resources provide branding metadata (icon, title, descriptions, and so on), readiness checks, and end-user links, enabling the admin console to show application health and readiness, and launch the app once it's ready.

KOTS licenses are created and managed through the Replicated [vendor portal](https://vendor.replicated.com), which provides support for configurable pre-built entitlements, expiration dates, license types and a framework for delivering custom entitlements (seat count, etc). For more information. see the [entitlements documentation](licenses-adding-custom-fields).
