---
pagination_prev: null
---

import ApiAbout from "/docs/partials/vendor-api/_api-about.mdx"

# Introduction to Replicated

This topic provides an introduction to working with the Replicated platform, including key features, supported application installation options, and platform interfaces.

## Overview

Replicated is a commercial software distribution platform. Independent software vendors (ISVs) can use features of the Replicated platform to distribute modern enterprise software into complex, customer-controlled environments, including on-prem and air gap.

Replicated features are designed to support ISVs in each phase of the software development lifecycle, as shown below:

<img alt="software development lifecycle wheel" src="/images/software-dev-lifecycle.png" width="600px"/>

[View a larger version of this image](/images/software-dev-lifecycle.png)

The following describes the phases of the software development lifecycle:

* **[Develop](#develop)**: Development teams quickly integrate and test new features.
* **[Test](#test)**: Run automated tests in several customer-representative environments as part of continuous integration and continuous delivery (CI/CD) workflows.
* **[License](#license)**: Customers have access to the correct features based on their license.
* **[Release](#release)**: Use an single, automated release process to share new releases with both on-prem and SaaS customers.
* **[Install](#install)**: Provide unique installation options depending on customers' preferences and experience levels.
* **[Report](#report)**: Collect adoption and performance data for application instances running in customer environments.
* **[Support](#support)**: Triage and resolve support issues quickly.

For more information about the Replicated features that support each of these phases, see the sections below.

### Develop

The Replicated SDK exposes an in-cluster API that can be developed against to quickly integrate and test core functionality with an application. For example, when the SDK is installed alongside an application in a customer environment, the in-cluster API can be used to send custom metrics from the instance to the Replicated vendor platform. 

For more information about using the Replicated SDK, see [About the Replicated SDK](/vendor/replicated-sdk-overview).

### Test

The Replicated compatibility matrix rapidly provisions ephemeral Kubernetes clusters, including multi-node and OpenShift clusters. When integrated into existing CI/CD pipelines for an application, the compatibility matrix can be used to automatically create a variety of customer-representative environments for testing code changes.

For more information, see [About the Compatibility Matrix](/vendor/testing-about).

### Release

Release _channels_ in the Replicated vendor platform allow ISVs to make different application versions available to different customers, without needing to maintain separate code bases. For example, a "Beta" channel can be used to share beta releases of an application with only a certain subset of customers. 

For more information about working with channels, see [About Channels and Releases](/vendor/releases-about).

Additionally, to make it easier to host image regsitries as part of releasing an application, the Replicated proxy service can be used to grant proxy access to private images without exposing registry credentials to customers. For more information about using the proxy registry, see [About Proxying Image with Replicated](/vendor/private-images-about).

### License

Create _customers_ in the Replicated vendor platform to handle licensing for your application in both online and air gap environments. For example:
* License free trials and different tiers of product plans
* Create and manage custom license entitlements
* Automatically restrict access to expired accounts
* Verify license entitlements both before installation during runtime

For more information about working with customers and custom license fields, see [About Customers](/vendor/licenses-about).

### Install

Applications distributed with Replicated can be installed using any method, including the Helm CLI for Helm charts or any proprietary installation method already used by the ISV.

Replicated also offers the Replicated KOTS installer, which is a kubectl plugin that provides highly successful installs of Helm charts and Kubernetes applications into customer-controlled environments, including air gap (offline) environments.

The UI-based installation experience available through the KOTS admin console can make installation easier for customers that are less sophisticated with Kubernetes or Helm. 

For more information, see [About KOTS and kURL](intro-kots).

### Report

When installed alongside an application, the Replicated SDK and Replicated KOTS automatically send instance data from the customer environment to the Replicated vendor platform. This instance data includes health and status indicators, adoption metrics, and performance metrics. For more information, see [About Instance and Event Data](/vendor/instance-insights-event-data).

ISVs can also set up email and Slack notifications to get alerted of important instance issues or performance trends. For more information, see [Configuring Instance Notifications](/vendor/instance-notifications-config).

### Support

Support teams can use Replicated features to more quickly diagnose and resolve application issues. For example:

- Provision customer-representative environments with the compatibility matrix to recreate and diagnose issues. See [About the Compatiblity Matrix](/vendor/testing-about).
- Understand the state of an instance with access to telemetry, including application health, current running versions, and infrastructure and cluster details. See [Customer Reporting](/vendor/customer-reporting).

Additionally, Replicated maintains the Troubleshoot open source project, which provides the following features for reducing and resolving support issues:

- _Preflight checks_ run before installation to verify that the customer environment meets application requirements.
- _Support bundles_ collect and analyze redacted data from customer environments to diagnose application issues faster.

For more information, see [About Preflights Checks and Support Bundles](/vendor/preflight-support-bundle-about).

## Interfaces

This section describes the GUI, CLI, and API that software vendors use to interact with the vendor platform.

### Vendor Portal

The Replicated vendor portal is the web-based user interface that you can use to configure and manage all of the Replicated features for distributing and managing application releases, supporting your release, viewing customer insights and reporting, and managing teams.

The following shows an example of the **Reporting** page for a customer that has two active application instances:

![Customer reporting page showing two active instances](/images/customer-reporting-page.png)

[View a larger version of this image](/images/customer-reporting-page.png)

### replicated CLI

The replicated command-line interface (CLI) is the CLI for the vendor portal. The replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

![terminal with replicated CLI commands](/images/replicated-cli.gif)

### Vendor API v3

<ApiAbout/>

For more information, see [Using the Vendor API V3](/reference/vendor-api-using).

![landing page of the vendor api documentation site](/images/vendor-api-docs.png)