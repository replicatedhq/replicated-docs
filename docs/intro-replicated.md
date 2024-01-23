---
pagination_prev: null
---

import ApiAbout from "/docs/partials/vendor-api/_api-about.mdx"

# Introduction to Replicated

This topic provides an introduction to working with the Replicated platform, including key features, supported application installation options, and platform interfaces.

## Overview

Replicated is a commercial software distribution platform. Independent software vendors (ISVs) can use Replicated features to distribute modern enterprise software into complex, customer-controlled environments.

## Replicated Features

The Replicated platform provides features that support ISVs through each phase of the software development lifecycle, including:
* Develop
* Test
* Release
* License
* Install
* Report
* Support

![replicated platform workflow](/images/replicated-platform.png)

[View a larger version of this image](/images/replicated-platform.png)

For more information about the Replicated features that support each of these phases, see the sections below.

### Develop

When you distribute the Replicated SDK with your application, you get access to an in-cluster API that makes it easy to embed Replicated features with your application, such as:
* Collecting custom metrics on instances running in online or air gap environments
* Checking customer license entitlements at runtime
* Providing update checks to alert customers when new versions are available for upgrade

The Replicated SDK also provides automatic access to operational telemetry for instances running in customer environments.

### Test

The Replicated compatibility matrix allows you to rapidly provision ephemeral Kubernetes clusters for testing, developing, or troubleshooting.

You can integrate the compatibility matrix into existing continuous integration and continuous delivery (CI/CD) workflows to test each release of your application in a variety of customer-representative environments.

For more information, see [About the Compatibility Matrix](/vendor/testing-about).

### Release

The Replicated vendor platform 

- Use release channels and versioning for controlled customer distribution and effective management of your product lifecycle. See [About Channels and Releases](/vendor/releases-about).
- Use the proxy service to grant proxy access to private images without exposing registry credentials to your customers. See [About Proxying Image with Replicated](/vendor/private-images-about).

### License

Create _customers_ in the Replicated vendor platform to handle licensing for your application in online and air gap environments, including:
* Licensing free trials and different tiers of product plans
* Managing custom license entitlements
* Restricting access to expired accounts

### Install

Applications distributed with Replicated can be installed using any method, including the Helm CLI for Helm charts or any proprietary installation method already used by the ISV.

Applications distributed with Replicated can also be installed with Replicated KOTS, which is a kubectl plugin that provides highly successful installs in diverse environments using a single installer.

Key features of KOTS installations include:
* UI-based installation and management experience with the KOTS admin console
* Support for installation into air gap environments
* Support for installations into VMs or bare metal servers for users with little to no Kubernetes experience

For more information, see [About KOTS and kURL](intro-kots).

### Report

Applications that include the Replicated SDK or that are installed with Replicated KOTS get automatic access to comprehensive insights for instances installed in customer environments, including health and status indicators, adoption metrics, and performance metrics. For more information, see [About Instance and Event Data](/vendor/instance-insights-event-data).

You can also set up email and Slack notifications to get alerted of important instance issues or performance trends. For more information, see [Configuring Instance Notifications](/vendor/instance-notifications-config).

### Support

The Troubleshoot open source project (maintained by Replicated) provides access to features 

- Quickly understand the state of a customer instance, including application health, current running versions, and infrastructure and cluster details. See [Customer Reporting](/vendor/customer-reporting).
- Use preflight checks and support bundles to improve installation success and diagnose application issues faster. See [About Preflights Checks and Support Bundles](/vendor/preflight-support-bundle-about).
- Provision customer-representative environments to quickly recreate and diagnose issues.

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