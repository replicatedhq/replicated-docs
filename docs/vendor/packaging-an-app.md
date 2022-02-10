# Understanding packaging with the app manager

Software vendors can use Replicated to package their application for distribution to enterprise customers as an on-premises, private instance.

The Replicated app manager is the component that packages applications for distribution. The app manager is based on the open source KOTS project, which is maintained by Replicated. The packaging process leverages several open source KOTS components (some optional, some required).

In general, Replicated components are grouped into one of the following categories:

* **Cluster Operator Tools**: A set of open source projects that vendors can invoke to provide cluster operators with the necessary tools to validate, install, configure, troubleshoot, and automate the management of applications.
These tools are built with a strong focus on production grade day-2 operations.
* **Software Vendor Tools**: Primarily hosted by the [Replicated vendor portal](https://vendor.replicated.com) that serves as a centralized collaboration platform to manage customers, licenses/entitlements, releases/release channels, and troubleshooting. The vendor tools are [integrated with the open source KOTS projects](https://blog.replicated.com/announcing-kots/) to provide processes and workflows to operationalize and scale the distribution of a modern on-prem application.

The foundational open source projects that Replicated coordinates are the [kots CLI](../reference/kots-cli-getting-started/) and [KOTS](../enterprise/installing-overview) (installation and admin console), [Troubleshoot](https://troubleshoot.sh) (preflight checks and support bundles), [kURL](https://kurl.sh) (embedded K8s option) as well as several community driven open source software (OSS) projects like Kubernetes, Kustomize, Helm, and Kubeadm.

This document starts with an overview on how to package and manage applications via the Replicated vendor portal (an API and CLI are available for more rapid or automated iteration).

For information about installing and managing an application using the kots CLI, see [Getting Started with KOTS](../reference/kots-cli-getting-started/).

For information about installing and managing an application using the Replicated admin console, see [Overview of installing an application](../enterprise/installing-overview).

## Basic Packaging
Your application is packaged as a set of standard Kubernetes manifests.
These manifests include your application manifests, plus several optional [custom resources](custom-resource-about) used to invoke various app manager functions.
Together, these manifests can be managed via [release channels](releases-understanding), and delivered to customers by providing [installation instructions](../enterprise/installing-overview), and a Replicated generated [license](licenses-about).

Most applications require some amount of customer supplied configuration values.
These values can be collected during the installation process by specifying a [Config custom resource](custom-resource-config) to [create a config screen](admin-console-customize-config-screen), and provided to the application by [using templates for your Kubernetes manifests](packaging-template-functions).

## Helm Chart Packaging
If your application is already templated and packaged as a Helm chart (or includes Helm charts), then you can follow our documentation on [packaging a Helm chart as an application](helm-installing-native-helm). Note that packaging with Helm charts is optional.

## Advanced Features
Vendors can invoke several other more advanced features by providing additional app manager custom resources.
For customizable preflight checks, vendors can provide a [Preflight custom resource](custom-resource-preflight) to test a cluster for necessary resources or other dependencies, and show warnings or errors if the target cluster fails any of these checks.

Similarly, troubleshooting features can be enabled by creating [Collector and Analyzer](custom-resource-support-bundle) custom resources.

Finally, the [Application](custom-resource-application) and [SIG Application](custom-resource-sig-application) custom resources provide branding metadata (icon, title, descriptions, and so on), readiness checks, and end-user links, enabling the admin console to show application health and readiness, and launch the app once it's ready.

Licenses are created and managed through the [vendor portal](https://vendor.replicated.com), which provides support for configurable pre-built entitlements, expiration dates, license types and a framework for delivering custom entitlements (seat count, etc). For more information. see the [entitlements documentation](licenses-adding-custom-fields).
