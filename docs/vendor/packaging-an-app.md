# How applications are packaged with app manager

Software vendors with a Kubernetes application can package their app as a Kubernetes-off-The-Shelf (KOTS) software for distribution to enterprise customers as a modern on-prem, private instance.
The packaging process leverages several KOTS components (some optional, some required).
For context, Replicated KOTS is made of several purpose built, open source components, but should be thought of in two distinct (but highly integrated) categories.

* **Cluster Operator Tools**: A set of open source projects that KOTS vendors can invoke to provide cluster operators with the necessary tools to validate, install, configure, troubleshoot, and automate the management of the KOTS application.
These tools are built with a strong focus on production grade day-2 operations.
* **Software Vendor Tools**: Primarily provided by a hosted [Vendor Portal](https://vendor.replicated.com) that serves as a centralized collaboration platform to manage customers, licenses/entitlements, releases/release channels, and troubleshooting. The vendor tools are [deeply integrated with the OSS KOTS projects](https://blog.replicated.com/announcing-kots/) to provide processes and workflows to operationalize and scale the distribution of a modern on-prem application.

The foundational open source projects that KOTS coordinates are [Replicated Kots CLI and Kotsadm](https://kots.io) (installation and admin console), [Replicated Troubleshoot](https://troubleshoot.sh) (preflight checks and support bundles), [Replicated kURL](https://kurl.sh) (embedded K8s option) as well as several community driven OSS projects like Kubernetes, Kustomize, Helm, and Kubeadm.

This document starts with an overview on how to package and manage KOTS applications via the Replicated Vendor Portal (an API and CLI are available for more rapid or automated iteration).
Please refer to our documentation of the [Kots CLI](/kots-cli/getting-started/) to install and manage a KOTS application via the command line, or our [Kotsadm documentation](/kotsadm/installing/installing-a-kots-app/) for managing an application via the admin console.

## Basic Packaging
KOTS applications are packaged as a set of standard Kubernetes manifests.
These manifests include your application manifests, plus several optional [KOTS custom resources](/vendor/packaging/kots-custom-resources/) used to invoke various KOTS functions.
Together, these manifests can be managed via [release channels](/vendor/packaging/channels-and-releases), and delivered to customers by providing [installation instructions](/kotsadm/installing/installing-a-kots-app/), and a Replicated generated [license](/vendor/packaging/customers-and-licenses).

Most applications require some amount of customer supplied configuration values.
These values can be collected during the installation process by specifying a [config KOTS custom resource](/reference/v1beta1/config) to [create a config screen](/vendor/config/config-screen/), and provided to the application by [templating your Kubernetes manifests](/vendor/packaging/template-functions).

## Helm Chart Packaging
If your application is already templated and packaged as a Helm chart (or includes Helm charts), then you can follow our documentation on [packaging a Helm chart as a KOTS application](/vendor/helm/using-native-helm-charts/).

## Advanced Features
KOTS vendors can invoke several other more advanced features by providing additional KOTS custom resources.
For customizable Preflight checks, vendors can provide a [preflight custom resource](/reference/v1beta1/preflight/) in order to test a cluster for necessary resources or other dependencies, and show warnings or errors if the target cluster fails any of these checks.
Similarly, troubleshooting features can be enabled by creating [collector and analyzer](/reference/v1beta1/support-bundle) custom resources.
Finally, the [Application](/reference/v1beta1/application) and [sig-application](/reference/v1beta1/sig-application) custom resources provide branding metadata (icon, title, descriptions, etc...), readiness checks, and end-user links, enabling the Admin Console to show application health and readiness, and launch the app once it's ready.

KOTS licenses are created and managed through the Replicated [Vendor Portal](https://vendor.replicated.com), which provides support for configurable pre-built entitlements, expiration dates, license types and a framework for delivering custom entitlements (seat count, etc). See the [entitlements documentation](/vendor/entitlements/entitlements/) for more information.
