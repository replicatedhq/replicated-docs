# Introduction to Replicated

This topic describes the Replicated platform, including features, installation options, and management and development tools.

## About the Replicated Platform

The Replicated platform lets you distribute, install, support, and observe on your applications in customer environments. With Replicated, you distribute your application using Helm charts, Kubernetes manifests, or Kubernetes Operators, then securely distribute to any on-prem or cloud-hosted environments, including air gap.

The following sections describe the Replicated features that support the key aspects and challenges of distributing and supporting an application successfully. 

## Distributing  

Replicated provides features for distributing and managing your application in diverse environments, including:

- Use release channels and versioning for effective management of your product lifecycle
- Provision test environments quickly using the compatibility matrix to create a variety of customer-representative environments
- Create and manage custom license entitlements with granular control and flexibility, including free licenses for trial, dev, and community licenses
- Create custom domains to brand your customer-facing URLs

## Installing

When you use the Replicated platform, you can install your application using the Helm CLI or Replicated installers:

- **Helm CLI:** You can use the Helm CLI to install Helm charts. Add the the SDK to your Helm chart to integrate Replicated features. Supported for online environments.

- **KOTS:** With a KOTS entitlement, you use KOTS to install in online or air gap environments on:

    - Existing clusters
    - Embedded clusters created by Replicated kURL

    If your application uses Helm charts, you can create a single release that supports Helm and KOTS installations. This helps ensure that your application runs consistently in every environment.

    For more information about KOTS, see [About KOTS and kURL](intro-kots) in the KOTS documentation.

## Supporting

Use Replicated features to support your customers and application:

- Use reporting to find out which customers are running vulnerable versions of your application so you can contact them about upgrading to the latest version
- Use preflight checks and support bundles to improve installation success and diagnose application issues faster
- Provision customer-representative environments to quickly recreate and diagnose issues

## Observing and Measuring

Replicated provides comprehensive insights of application instances installed in customer environments:

- Get telemetry and key insights to understand the health and status of your distributed software, view adoption metrics, and monitor key performance metrics

- Set up notifications to get alerted for events to help ensure that important instance issues or performance trends are not missed

## Administering

Manage your teams in the vendor portal, such as:

- Inviting and removing members
- Managing permissions
- Configuring authentication options and enabling two-factor authentication

## Vendor Platform

This section describes the vendor platform options that you use to configure and manage your application and teams with Replicated.

### Vendor Portal

The Replicated vendor portal is the web-based user interface that you can use to configure and manage all of the Replicated features for distributing and managing application releases, supporting your release, viewing customer insights and reporting, and managing teams.

The following shows an example of the **Reporting** page for a customer that has two active application instances:

![Customer reporting page showing two active instances](/images/customer-reporting-page.png)

[View a larger version of this image](/images/customer-reporting-page.png)

<!--
For example, team management options let you invite members, manage their permissions and access to the collab repository, configure RBAC for a team, choose from multiple authentication types, use two-factor authentication, set password policies, and configure a Slack webhook to enable Slack notifications about customer instance status changes.

The following shows an example of the **Team Members** page that shows the list of members, including one with an expired invitation, and current permissions:

<img src="/images/teams-view.png" alt="View team members list in the vendor portal" width="700"/>

[View a larger image](/images/teams-view.png)

On the **Customers** and **Dashboard** pages, you can view customer reporting data and see adoption graphs to gain insights about performance, health, and usage. 

The following shows an example of the **Reporting** page for a customer that has two active application instances:

![Customer reporting page showing two active instances](/images/customer-reporting-page.png)

[View a larger version of this image](/images/customer-reporting-page.png)

You can also manage other artifacts, such as customer license files, image registries, and release channels.

The following shows an example of the **Channels** page with a KOTS entitlement:

![Channels](/images/channels.png) -->

### replicated CLI

The replicated command-line interface (CLI) is the CLI for the vendor portal. The replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

### Vendor API v3

The Vendor API is the API for the vendor portal. This API can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Using the Vendor API V3](/reference/vendor-api-using).

<!-- ### SDK API

The Replicated SDK API is designed for testing purposes. The SDK SPI runs in integration mode, which allows you to develop and test locally with mock data, without making any changes in the vendor portal or in your environment. You can test your changes in different scenarios and iterate faster.

-->

<!--Diagram

Create a diagram that shows the end-to-end workflow of importing your app into a release/channel, then pushing to a registry, then your customers pulling from the registry to install.

Should cover:

    Helm chart with the SDK
    Helm chart without the SDK (Native Helm)
    Standard manifest with KOTS
    Proxied registry
    Users installing with KOTS, Helm CLI, kURL
-->
