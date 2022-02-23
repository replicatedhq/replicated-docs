# What is Replicated?

Replicated allows software vendors to package and securely distribute their application to
diverse customer environments, including both on-premises and cloud environments.

Replicated packages the vendor's application using a set of Kubernetes manifests
and installs the application onto a Kubernetes cluster in the customer's environment.
For customers who do not have an existing Kubernetes cluster, Replicated
provisions a new cluster on the customer's VM where it can then install the application.

Replicated includes several features that make it easier for vendors to manage their
applications, release channels, customer licenses, image
registries, and more. Replicated features also make it easier for the enterprise
users of the application to install, update, and manage their application instance.

## Replicated Features

The Replicated product includes the following main features:

* **Vendor portal**: The Replicated vendor portal is the user interface where vendors
define Kubernetes manifest files, including application manifests and custom resource
manifests, for their application. These files describe to the app manager how to
package the application for distribution. Vendors can also use the vendor portal
to manage other artifacts, such as customer license files, image registries, and
release channels. For more information, see [Creating a Vendor Account](vendor/vendor-portal-creating-account).
* **App manager**: The Replicated app manager reads the Kubernetes manifest files that
the vendor defines to package and install an application on a Kubernetes cluster
in a customer environment. It also installs the admin console along with the application.
The app manager is based on the open-source KOTS project, which is maintained by
Replicated. For more information, see [Understanding packaging with app manager](vendor/packaging-an-app).
* **Kubernetes installer**: The Replicated Kubernetes installer provisions a Kubernetes
cluster, called an _embedded cluster_, in the customer's environment if they do
not have an existing cluster. The Kubernetes installer is based on the open-source
kURL project, which is maintained by Replicated. For more information, see
[Introduction to kURL](https://kurl.sh/docs/introduction/) in the kURL documentation.
* **Admin console**: The Replicated admin console is the user interface where enterprise
application users can configure, update, manage, backup and restore, and troubleshoot
the application that they installed. The admin console is deployed by the app manager
when the customer installs the application.

## How Replicated Works with Open-source Tools

In general, Replicated components are grouped into one of the following categories:

* **Cluster Operator Tools**: A set of open source projects that vendors can invoke to provide cluster operators with the necessary tools to validate, install, configure, troubleshoot, and automate the management of applications.
These tools are built with a strong focus on production grade day-2 operations.
* **Software Vendor Tools**: Primarily hosted by the [Replicated vendor portal](https://vendor.replicated.com) that serves as a centralized collaboration platform to manage customers, licenses/entitlements, releases/release channels, and troubleshooting. The vendor tools are [integrated with the open source KOTS projects](https://blog.replicated.com/announcing-kots/) to provide processes and workflows to operationalize and scale the distribution of a modern on-prem application.

The foundational open source projects that Replicated coordinates are the [kots CLI](../reference/kots-cli-getting-started/) and [KOTS](../enterprise/installing-overview) (installation and admin console), [Troubleshoot](https://troubleshoot.sh) (preflight checks and support bundles), [kURL](https://kurl.sh) (embedded K8s option) as well as several community driven open source software (OSS) projects like Kubernetes, Kustomize, Helm, and Kubeadm.

## Replicated APIs and CLIs

Replicated also includes a Vendor API and CLIs that allow both vendors and enterprise
users to complete tasks programmatically.

For information about the Vendor API v3, see [Using the Vendor API v3](reference/vendor-api-using).

For information about the replicated CLI, see [Installing the replicated CLI](reference/replicated-cli-installing).

For information about the kots CLI, see [Getting Started with KOTS](reference/kots-cli-getting-started)
in the kots CLI documentation.
