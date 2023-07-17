# Introduction to Replicated

This topic describes the Replicated platform, including features, installations options, and release workflow.

For an overview of the key use cases for software vendors that Replicated serves, see the [Intro to Replicated: 20 Ways We Help](https://www.youtube.com/watch?v=2eOh7CofY3Q) video.

## About the Replicated Platform

The features of the Replicated platform are designed to help vendors of enterprise software to more easily distribute, test, support, and measure the success of Kubernetes applications in diverse customer environments. Whether your customers are SaaS or on-prem, you can use Replicated to deliver the same containers to both instance types without doubling the engineering effort. Replicated is highly scalable, and you can integrate Replicated with your CI/CD pipeline.

Replicated features help to simplify complex tasks with reliable end-to-end solutions, saving vendors effort and cost. For example, Replicated uses channels to manage release readiness. You can iterate on an application release in the Unstable channel, used for internal testing, and then promote a production-ready release to the Stable channel. If you have a Replicated KOTS entitlement, that release upgrade automatically becomes visible in and installable from the customers' Replicated admin consoles.

Additionally, when you distribute your application with Replicated, you can install your application using Helm, using our installers, or using your own proprietary installer. The Replicated platform is useful for vendors who have applications that are Helm charts, that use standard Kubernetes manifests, or that use Kubernetes Operators. Replicated installers support online and air gap installations.

Replicated provides the following features for managing, getting insights and telemetry, and distributing your apps, including:

- Manage your releases and versioning for effective management of your product lifecycle with the vendor portal, replicated CLI, or Vendor API
- Create and manage custom license entitlements with flexibility and granular control
- Connect to a proxied image registry to allow customer to install without having to share the credentials to your private registry
<!-- - Test application compatibility with different environments using the compatibility matrix and fast, reliable automatic provisioning of test environments.-->
- Integrate with the Troubleshoot open source project to provide preflight checks and support bundles for your application to improve installation success and faster diagnosis with troubleshooting cluster and application issues
- Get telemetry and key insights for the instances of your application running in customer environments
- Management and configuration tools, which include the Replicated vendor portal, replicated CLI, and the vendor API
- With a KOTS entitlement, you also get Replicated KOTS and Replicated kURL installers and additional features. For more information about KOTS and kURL, see [KOTS and kURL](#kots-and-kurl).

For more information about these key features, see [Key Features and Use Cases](#key-features-and-use-cases).

## Pricing Plans

Replicated offers multiple pricing plans to provide flexibility in supporting your application needs. For more information about pricing, see [Pricing](https://www.replicated.com/pricing) on the Replicated website.

- **Builders Plan:** This option supports Helm chart applications and Helm CLI installations using the Replicated SDK. This plan lets you use all of the Helm features and pick and choose which Replicated features you want to use with the SDK, depending on your needs. For example, you can use all of the feature-rich SDK services or just use the compatibility matrix, if all you need is automatic provisioning of test environments. 

   Alternatively, you might want to use just the vendor portal to manage your releases without using any other feature. In this case, you would not need to add the SDK subchart to your Helm charts.

- **KOTS Entitlement:** A KOTS entitlement includes everything on the Builders plan, plus the KOTS and kURL installers. There are additional KOTS features, such as an admin console for customers to manage your application, Replicated support, and more. You can deploy applications using Helm charts, Kubernetes standard manifests, or Kubernetes Operators.

    You can also support multiple deployment types with a single release, such as KOTS, kURL, and Helm installations using the SDK.


## Key Features and Use Cases

This section describes some of the key features and use cases for the Replicated platform. KOTS denoted functionality requires a KOTS entitlement.

### Release Management

Replicated release features help you manage your product lifecycle effectively. You manage releases using the vendor portal or the replicated CLI.

You import your application files to the vendor portal to create and package a release using the Replicated features. _Packaging_ refers to the act of authoring, testing, iterating on, and accepting a set of Helm charts or Kubernetes manifests for release to your customers with Replicated.

Each release has properties that let you define version numbers, optionally use semantic versioning, and provide your own release notes. You can test releases in a channel reserved for development, then promote the release to a Beta channel for customer testing, and then promote the release to a Stable channel when it is ready for general availability.

If you have a KOTS entitlement, you can also specify whether a KOTS or kURL release is required for upgrade or can be skipped.

### Custom License Entitlements

The license service lets you provide custom license entitlements that are signed, synchronized, and verified, such as expiration dates, which features are enabled, usage limits, and then integrate those values with your application code to enforce the entitlements. By default, Replicated automatically synchronizes and updates custom entitlement values in the running application.

Using Replicated license entitlements helps to reduce release complexities. The vendor portal lets you create and manage different license types, such as maintaining community and enterprise licensing. You can also manage granular feature entitlements, which gives you flexibility in how to manage your own pricing and feature plans. You can also create Dev entitlements for testing purposes, or create temporary entitlements for product trials.

Additionally, Replicated license entitlements are used to verify customers through the Replicated proxy registry if you are using an external private registry, eliminating the need to share your registry credentials with customers. For more information, see [Proxy Service](#proxy-service).

### Proxy Service

The vendor portal can connect to your private image registry using the Replicated proxy service. The proxy service pulls your image and then customer instances of your image are pulled from the proxy service. 

Replicated customer licenses provide validated access to your private registry through the proxy service. This lets customers install without needing the credentials to your private registry. Instead, customers are validated using their license. And, if a company is no longer a customer, you can revoke their license and they cannot pull images from your private registry. 

Additionally, you can configure custom domains in the vendor portal for services that use customer-facing URLs, such as the proxy service, so your customers see your own branding.

<!--### Compatibility Matrix

The compatibility matrix provides fast, on-demand programmatic access to test your application compatibility in clusters of various Kubernetes distributions and versions many combinations of customer-representative environments. 

Your team can test as they develop, test before every release, and recreate customer environments for testing support cases. For example, testing as you develop or before every release can help uncover version incompatibilities, letting you fix the issue before it is released to a customer.

Because each vendor's needs are different, you develop the variety of tests that you need, such as smoke tests, policy tests, release tests, and canary tests, and the run the tests with the compatibility matrix. You can explore a simple configuration, end-to-end configurations, or a broad matrix of combinations. 

When you use the compatibility matrix in conjunction with instance insights, you can use insights information to programmatically provision and configure accurate customer-representative environments, and set up a series of tests for each release. If a test passes, you can create a script that automatically promotes the release to your stable or latest release channels, and automatically notify customers that is available for upgrade.

Using the compatibility matrix can help reduce the costs and effort to test, increase install success rates, reduce support incidents in the field, and reduce risk in diverse environments. The compatibility matrix helps you test more comprehensively, automate common tests to reduce effort, and catch issues before customers find them. -->

### Preflight Checks and Support Bundles

Use preflight checks to improve installation success and use support bundles to help troubleshoot the cluster and application. 

Preflight checks let you define requirements and dependencies for the cluster where your application is installed. Preflight checks verify a customer environment before they install or upgrade your application, and preflight checks provide clear, immediate feedback to your customer about any missing requirements or incompatibilities. This increases the success rate of the installation and helps to prevent support issues.

Support bundles collect and analyze cluster information, such as node status and available memory. You can also collect and analyze data about your application deployment. For example, you can customize your support bundle specifications with application log analyzers and provide customers with error messages that contain remediation steps that you define. This can help reduce the support burden.

With the Builders plan, you add these features manually to your Helm chart and they are integrated with the Helm CLI experience. With KOTS, these features are embedded in the installation and admin console experience.

Preflight checks and support bundles are based on the open source Troubleshoot project, maintained by Replicated.

### Insights and Telemetry

Get telemetry and key insights for the instances of your application running in customer environments. This data provides key performance measurements such as time-to-install, uptime, mean-time-to-resolution (MTTR), upgrade lifecycle, adoption rates, and more. 

Instance data helps the update service compile a list of new versions that are available to an instance for upgrade. Adoption metrics helps you track how frequently customers are upgrading and which versions they are using. If you see that your customers are on the latest versions, you can reduce the number of older versions that you support and maintain.

Set up notifications to get alerted for the events and metrics to help ensure that important instance issues or performance trends are not missed. For example, you can be notified of a degraded status and you can contact your customer about fixing it before downtime occurs.

For air gap instances, which are supported with KOTS entitlements, the telemetry component integrates closely with the support bundle feature to include valuable telemetry and usage data in support bundles to help with troubleshooting.

## Management and Development Tools

This section describes the management and development tools that you use to configure and manage your application and teams with Replicated.

### Vendor Portal

The Replicated vendor portal is the web-based user interface that you can use to package and manage applications, and manage teams.

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

![Channels](/images/channels.png)

### replicated CLI

The replicated command-line interface (CLI) is the CLI for the vendor portal. The replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

### Vendor API v3

The Vendor API is the API for the vendor portal. This API can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Using the Vendor API V3](/reference/vendor-api-using).

### SDK

The Replicated SDK is a Helm chart that can be installed as a small service alongside your application Helm chart. The SDK supports installing your application with Helm while having access to Replicated features.

### SDK API

The Replicated SDK API is designed for testing purposes. The SDK SPI runs in integration mode, which allows you to develop and test locally with mock data, without making any changes in the vendor portal or in your environment. You can test your changes in different scenarios and iterate faster.

## Installation Options

When you use the Replicated platform, you can install your application using the Helm CLI, KOTS, kURL, or use a proprietary installer.

With a KOTS entitlement, you can create a single release that supports using a Helm installation, optionally including the SDK, along side of the KOTS and kURL installers. This lets you create one release to support multiple types of customer environments so that your application runs consistently in every environment. For example, you might have customers that only want a Helm CLI installation for their existing cluster, and other customers who want a Kubernetes cluster provisioned for them with the application in an air gapped environment.

One of the many advantages of using a combined release is that you can include the compatibility matrix and test all of the installations using the same application version.

### Helm Installer

Customers can use the Helm CLI to install Helm charts. You can include the SDK as a dependency of your Helm chart if you want to integrate some or all of the Replicated features. For example, you might want to relay performance, usage, and health data from your proprietary customer user interface to the vendor portal and set up notifications for events. For more information about the SDK, see [About the Replicated SDK (Beta)](replicated-sdk-overview).

### KOTS and kURL Installers

KOTS entitlements let you package and update applications using Helm charts, Kubernetes manifests, or Kubernetes Operators. Applications are then securely deployed in customer environments using the KOTS installer.

For customers that do not have an existing cluster, you can include a kURL installer to provision an embedded cluster, and then KOTS installs the application.

KOTS and kURL support installing in air gapped environments.

KOTS provides an admin console that lets your customers manage your application. You can customize the admin console. For example, you can customize the Config screen to allow customers to specify inputs related to unique options that your application provides. You can also include your own branding on the admin console, configure status informers, and add custom graphs.

For more information, see [About KOTS and kURL](intro-replicated) in the KOTS documentation.

### Proprietary Installer

Using your own installer with Helm charts, you can leverage only the following Replicated features with your Helm charts:

- Release management
- Preflight checks and support bundles

<!--Diagram

Create a diagram that shows the end-to-end workflow of importing your app into a release/channel, then pushing to a registry, then your customers pulling from the registry to install.

Should cover:

    Helm chart with the SDK
    Helm chart without the SDK (Native Helm)
    Standard manifest with KOTS
    Proxied registry
    Users installing with KOTS, Helm CLI, kURL
-->
