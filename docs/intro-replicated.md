# Introduction to Replicated

This topic describes the Replicated platform, including features, installation options, and vendor platform interface options for distributing and managing your application with Replicated.

## About the Replicated Platform

The Replicated platform lets you distribute, install, support, and observe your applications in customer environments. With Replicated, you distribute your application using Helm charts, Kubernetes manifests, or Kubernetes Operators, then securely install in any environment, including on-prem and air gap.

The following sections describe Replicated key features that simplify the complex tasks and challenges of distributing and supporting an application successfully. 

## Distributing  

Replicated provides features for distributing and managing your application in diverse environments, including:

- Use release channels and versioning for effective management of your product lifecycle. See [About Releases](/vendor/releases-about) and [About Channels](/vendor/releases-about-channels).
- Provision test environments quickly using the compatibility matrix to create a variety of customer-representative environments
- Create and manage custom license entitlements with granular control and flexibility, including free licenses for trial, dev, and community licenses. See [Creating and Managing Customers](/vendor/releases-creating-customer).
- Create custom domains to brand your customer-facing URLs. See [Using Custom Domains](/vendor/custom-domains-using).
- Use the proxy service to grant proxy access to private images without exposing registry credentials to your customers. See [About Proxying Image with Replicated](/vendor/private-images-about).

## Installing

When you use the Replicated platform, you can install your application using the Helm CLI or Replicated installers:

- **Helm CLI:** You can use the Helm CLI to install Helm charts. Add the the SDK to your Helm chart to integrate Replicated features. Supported for online environments. See [About Distributing with Helm](/vendor/helm-install).

- **KOTS:** With a KOTS entitlement, you use KOTS to install in online or air gap environments in:

    - Existing clusters
    - Embedded clusters provisioned by Replicated kURL on a VM or bare metal server

  For more information about KOTS, see [About KOTS and kURL](intro-kots) in the KOTS documentation.

If your application uses Helm charts, you can create a single release that supports both Helm and KOTS installations, without having to maintain separate sets of Helm charts or application manifests.

## Supporting

Use Replicated features to support your customers and application:

- Quickly understand the state of a customer instance, including application health, current running versions, and infrastructure and cluster details. See [Customer Reporting](/vendor/customer-reporting).
- Use preflight checks and support bundles to improve installation success and diagnose application issues faster. See [About Preflights Checks and Support Bundles](/vendor/preflight-support-bundle-about).
- Provision customer-representative environments to quickly recreate and diagnose issues.

## Observing and Measuring

Replicated provides comprehensive insights of application instances installed in customer environments:

- Get telemetry and key insights to understand the health and status of your distributed software, view adoption metrics, and monitor key performance metrics. See [About Instance and Event Data](/vendor/instance-insights-event-data) and [Adoption Report](/vendor/customer-adoption).

- Set up email and Slack notifications to get alerted for events to help ensure that important instance issues or performance trends are not missed. See [Configuring a Slack Webhook (Alpha)](/vendor/team-management-slack-config) and [Configuring Instance Notifications (Alpha)](/vendor/instance-notifications-config).

## Team Management

Manage your teams in the vendor portal, such as:

- Invite and remove members. See [Managing Team Members](/vendor/team-management).
- Manage permissions. See [Configuring RBAC Policies](/vendor/team-management-rbac-configuring).
- Configure authentication options and enable two-factor authentication. See [Managing Google Authentication](/vendor/team-management-google-auth) and [Managing Two-Factor Authentication](/vendor/team-management-two-factor-auth).

## Vendor Platform

This section describes the Replicated vendor platform (vendor portal, replicated CLI, and Vendor API).

### Vendor Portal

The Replicated vendor portal is the web-based user interface that you can use to configure and manage all of the Replicated features for distributing and managing application releases, supporting your release, viewing customer insights and reporting, and managing teams.

The following shows an example of the **Reporting** page for a customer that has two active application instances:

![Customer reporting page showing two active instances](/images/customer-reporting-page.png)

[View a larger version of this image](/images/customer-reporting-page.png)

### replicated CLI

The replicated command-line interface (CLI) is the CLI for the vendor portal. The replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

![terminal with replicated CLI commands](/images/replicated-cli.gif)

### Vendor API v3

The Vendor API is the API for the vendor portal. This API can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Using the Vendor API V3](/reference/vendor-api-using).

![landing page of the vendor api documentation site](/images/vendor-api-docs.png)