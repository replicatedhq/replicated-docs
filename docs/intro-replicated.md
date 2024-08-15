---
pagination_prev: null
---

import ApiAbout from "/docs/partials/vendor-api/_api-about.mdx"
import Kots from "/docs/partials/kots/_kots-definition.mdx"

# Introduction to Replicated

This topic provides an introduction to working with the Replicated Platform, including key features, supported application installation options, and interfaces.

## Overview

The Replicated Platform is a commercial software distribution platform. Independent software vendors (ISVs) can use features of the Replicated Platform to distribute modern enterprise software into complex, customer-controlled environments, including on-prem and air gap.

Replicated Platform features are designed to support ISVs in each phase of the commercial software distribution life cycle, as shown below:

![software distribution life cycle wheel](/images/software-dev-lifecycle.png)

[View a larger version of this image](/images/software-dev-lifecycle.png)

The following describes the phases of the software distribution life cycle:

* **[Develop](#develop)**: Application design and architecture decisions align with customer needs, and development teams can quickly iterate on new features.
* **[Test](#test)**: Run automated tests in several customer-representative environments as part of continuous integration and continuous delivery (CI/CD) workflows.
* **[Release](#release)**: Use a single, automated release process to share new releases with both on-prem and SaaS customers.
* **[License](#license)**: Licenses are customized to each customer and are easy to issue, manage, and update.
* **[Install](#install)**: Provide unique installation options depending on customers' preferences and experience levels.
* **[Report](#report)**: Make more informed prioritization decisions by collecting adoption and performance data for application instances running in customer environments.
* **[Support](#support)**: Diagnose and resolve support issues quickly.

For more information about the Replicated features that support each of these phases, see the sections below.

### Develop

The Replicated SDK exposes an in-cluster API that can be developed against to quickly integrate and test core functionality with an application. For example, when the SDK is installed alongside an application in a customer environment, the in-cluster API can be used to send custom metrics from the instance to the Replicated vendor platform. 

For more information about using the Replicated SDK, see [About the Replicated SDK](/vendor/replicated-sdk-overview).

### Test

The Replicated Compatibility Matrix rapidly provisions ephemeral Kubernetes clusters, including multi-node and OpenShift clusters. When integrated into existing CI/CD pipelines for an application, the Compatibility Matrix can be used to automatically create a variety of customer-representative environments for testing code changes.

For more information, see [About Compatibility Matrix](/vendor/testing-about).

### Release

Release channels in the Replicated Vendor Portal allow ISVs to make different application versions available to different customers, without needing to maintain separate code bases. For example, a "Beta" channel can be used to share beta releases of an application with only a certain subset of customers. 

For more information about working with channels, see [About Channels and Releases](/vendor/releases-about).

Additionally, the Replicated proxy service grants proxy access to private application images using the customers' license. This ensures that customers have the right access to images based on the channel they are assigned. For more information about using the proxy registry, see [About the Replicated Proxy Service](/vendor/private-images-about).

### License

Create customers in the Replicated Vendor Portal to handle licensing for your application in both online and air gap environments. For example:
* License free trials and different tiers of product plans
* Create and manage custom license entitlements
* Automatically restrict access to expired accounts
* Verify license entitlements both before installation and during runtime

For more information about working with customers and custom license fields, see [About Customers](/vendor/licenses-about).

### Install

Applications distributed with Replicated can be installed using the Helm CLI or the Replicated KOTS installer. The Helm CLI supports installation of Helm charts and KOTS supports installation of Helm charts and Kubernetes manifests.

<Kots/>

For more information, see the [KOTS documentation](intro-kots).

### Report

When installed alongside an application, the Replicated SDK and Replicated KOTS automatically send instance data from the customer environment to the Replicated Vendor Portal. This instance data includes health and status indicators, adoption metrics, and performance metrics. For more information, see [About Instance and Event Data](/vendor/instance-insights-event-data).

ISVs can also set up email and Slack notifications to get alerted of important instance issues or performance trends. For more information, see [Configuring Instance Notifications](/vendor/instance-notifications-config).

### Support

Support teams can use Replicated features to more quickly diagnose and resolve application issues. For example:

- Customize and generate support bundles, which collect and analyze redacted information from the customer's cluster, environment, and application instance. See [About Preflights Checks and Support Bundles](/vendor/preflight-support-bundle-about).
- Provision customer-representative environments with Compatibility Matrix to recreate and diagnose issues. See [About Compatibility Matrix](/vendor/testing-about).
- Get insights into an instance's status by accessing telemetry data, which covers the health of the application, the current application version, and details about the infrastructure and cluster where the application is running. For more information, see [Customer Reporting](/vendor/customer-reporting). For more information, see [Customer Reporting](/vendor/customer-reporting).

## Replicated Terminology

The following are some key Replicated Platform terms that are helpful to know before getting started:

* **Replicated KOTS**: Replicated KOTS is a kubectl plugin and in-cluster Admin Console that installs Kubernetes applications in customer-controlled environments. See [Introduction to KOTS](intro-kots).

* **Admin Console**: The Admin Console is the user interface for installing and managing applications with KOTS.

* **Replicated Embedded Cluster**: Replicated Embedded Cluster is a Kubernetes installer based on the open source Kubernetes distribution k0s. With Embedded Cluster, users install and manage both the cluster and the application together a single appliance on a VM or bare metal server. In this way, Kubernetes is _embedded_ alongside the application. Each version of Embedded Cluster includes a specific version of Replicated KOTS, which provides the Admin Console. See [Using Embedded Cluster](/vendor/embedded-overview).

* **Air gap**: _Air gap_ refers to customer environments that do not have outbound internet access. Air gap environments are common for enterprise users that require high security.

* **Preflight Checks**: 

* **Support Bundles**: 

* **Vendor Portal**: The Replicated Vendor Portal is the web-based user interface that you can use to configure and manage all of the Replicated features for distributing and managing application releases, supporting your release, viewing customer insights and reporting, and managing teams.

* **Replicated CLI**: The Replicated command-line interface (CLI) is the CLI for the Vendor Portal. The Replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the Replicated CLI](/reference/replicated-cli-installing).

* **Vendor API v3**: The Vendor API is the API for the Vendor Portal. This API can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams and license files.

* **Customer**: In the Vendor Portal, a customer represents a single licensed user of your software.

* **Release**: A release represents a single version of your application. Releases contain the files (Helm charts and YAML manifests) that will be distributed to your customers. For example, an Embedded Cluster release includes the application Helm chart, the Embedded Cluster Config, and a KOTS manifest that describes the Helm chart.

* **Channel**: Each release is promoted to one or more channels, which are used to control which customers can access the release. For example, vendors might keep separate channels for internal-only, experimental, beta, and generally available (GA) releases. Customers and internal users can access the releases promoted to the channel where they are assigned.

* **Application**: Within a Vendor Portal team, an application is the top-level container that groups a set of customers, releases, and channels. It is common for teams to create multiple different applications for testing purposes.

* **Replicated SDK**: The Replicated SDK is a Helm chart that can be installed as a small service alongside your application. It provides access to telemetry and custom metrics on instances of your application running in customer environments as well as an in-cluster API. See [About the Replicated SDK](/vendor/replicated-sdk-overview).

* **Replicated Compatibility Matrix**: Replicated Compatibility Matrix quickly provisions clusters with support for various Kubernetes distributions and versions. You can use Compatibility Matrix to get kubectl access to running clusters within minutes or less. See [About Compatibility Matrix](/vendor/testing-about).
