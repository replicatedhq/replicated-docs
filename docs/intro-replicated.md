---
pagination_prev: null
---

import ApiAbout from "/docs/partials/vendor-api/_api-about.mdx"

# Introduction to Replicated

This topic provides an introduction to working with the Replicated platform, including key features, supported application installation options, and platform interfaces.

## About the Replicated Platform

Replicated provides features that help software vendors successfully distribute commercial software to diverse customer environments. 

![replicated platform workflow](/images/replicated-platform.png)

[View a larger version of this image](/images/replicated-platform.png)

The following sections describe Replicated key features that simplify the complex tasks and challenges of distributing and supporting an application successfully.

### Develop

Manage development teams in the Replicated vendor platform, including:

- Invite and remove members. See [Managing Team Members](/vendor/team-management).
- Manage permissions. See [Configuring RBAC Policies](/vendor/team-management-rbac-configuring).
- Configure authentication options and enable two-factor authentication. See [Managing Google Authentication](/vendor/team-management-google-auth) and [Managing Two-Factor Authentication](/vendor/team-management-two-factor-auth).

Distribute the Replicated SDK with your application to get:
* Automatic access to insights and operational telemetry for instances running in customer environments.
* An in-cluster API that you can use to embed Replicated features into your application, including:
  * Collect custom metrics on instances running in online or air gap environments.
  * Check customer license entitlements at runtime.
  * Provide update checks to alert customers when new versions of your application are available for upgrade.

### Test

Rapidly provision ephemeral Kubernetes clusters using the Replicated compatibility matrix. Incorportate the compatibility matrix into your existing continuous integration and continuous delivery (CI/CD) workflows to install and test each release of your application in a variety of customer-representative environments before you share the release with customers.

See [About the Compatibility Matrix](/vendor/testing-about).

### Release

- Use release channels and versioning for controlled customer distribution and effective management of your product lifecycle. See [About Channels and Releases](/vendor/releases-about).
- Use the proxy service to grant proxy access to private images without exposing registry credentials to your customers. See [About Proxying Image with Replicated](/vendor/private-images-about).

### License

Create and manage custom license entitlements with granular control and flexibility, including free licenses for trial, dev, and community licenses. See [Creating and Managing Customers](/vendor/releases-creating-customer).

### Install

With Replicated,software vendors can distribute their application using Helm charts, Kubernetes manifests, or Kubernetes Operators, then securely install in any environment, including on-prem and air gap.

When you distribute your application with Replicated, you can install your application using the Helm CLI or Replicated installers:

- **Helm CLI:** You can use the Helm CLI to install Helm chart-based applications. See [About Installations with the Helm CLI](/vendor/distributing-overview#helm) in _About Distributing Applications with Replicated_.

- **KOTS:** The Replicated KOTS installer supports installation into the following environments:

    - Online or air gap
    - Existing Kubernetes clusters
    - VMs or bare metal servers

  For more information, see [About KOTS and kURL](intro-kots) and [About Installations with KOTS](/vendor/distributing-overview#about-installations-with-kots) in _About Distribution Applications with Replicated_.

### Report

Replicated provides comprehensive insights of application instances installed in customer environments:

- Get telemetry and key insights to understand the health and status of your distributed software, view adoption metrics, and monitor key performance metrics. See [About Instance and Event Data](/vendor/instance-insights-event-data) and [Adoption Report](/vendor/customer-adoption).

- Set up email and Slack notifications to get alerted for events to help ensure that important instance issues or performance trends are not missed. See [Configuring a Slack Webhook](/vendor/team-management-slack-config) and [Configuring Instance Notifications](/vendor/instance-notifications-config).

### Support

Use Replicated features to support your customers and application:

- Quickly understand the state of a customer instance, including application health, current running versions, and infrastructure and cluster details. See [Customer Reporting](/vendor/customer-reporting).
- Use preflight checks and support bundles to improve installation success and diagnose application issues faster. See [About Preflights Checks and Support Bundles](/vendor/preflight-support-bundle-about).
- Provision customer-representative environments to quickly recreate and diagnose issues.

## Interfaces

This section describes the GUI, CLI, and API that vendors use to interact with the Replicated platform.

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