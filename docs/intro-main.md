# Introduction to Replicated

This topic describes the Replicated platform, including features, installations options, and release workflow.

For an overview of the key use cases for software vendors that Replicated serves, see the [Intro to Replicated: 20 Ways We Help](https://www.youtube.com/watch?v=2eOh7CofY3Q) video.

## About the Replicated Platform

Replicated provides the following features on all pricing plans for managing, monitoring, distributing your apps, including:

- Manage your releases and versioning
- Create and manage custom license entitlements for your customers
- Connect to a proxied image registry
- Test application compatibility with different environments using the compatibility matrix
- Integrate with the Troubleshoot open source project to provide preflight checks and support bundles for your application
- Get telemetry and key insights for the instances of your application running in customer environments
- Management and configuration tools, which include the Replicated vendor portal, replicated CLI, and the vendor API.

Additional features are available for Replicated KOTS and Replicated kURL. For more information, see [KOTS and kURL](kots-and-kurl).

## Key Features

This section describes some of the key features and use cases for the Replicated platform. KOTS denoted functionality require a KOTS entitlement.

### Release Management

Replicated release features help you manages your product lifecycle effectively. You manage releases using the vendor portal or the replicated CLI.

You import your application files to the vendor portal to create and package a release using the Replicated features. _Packaging_ refers to the act of authoring, testing, iterating on, and accepting a set of Helm charts or Kubernetes manifests for release to your customers with Replicated.

Each release has properties that let you define version numbers, optionally use semantic versioning, and provide your own release notes. You can test releases in a channel reserved for development, then promote the release to a Beta channel for customer testing, and then promote the release to a Stable channel when it is ready for general availability.

If you have a KOTS entitlement, you can also specify whether a KOTS or kURL release is required for upgrade or can be skipped.

### Custom License Entitlements

The license service lets you provide custom license entitlements that are signed, synchronized, and verified, such as expiration dates, which features are enabled, usage limits, and then integrate those values with your application code to enforce the entitlements. By default, Replicated automatically synchronizes and updates custom entitlement values in the running application.

### Custom Domains

You can use custom domains for services that use customer-facing URLs. This lets you use your own branding instead of the default Replicated domain name.

Custom domains can be used for external private registries, the Replicated registry, the Replicated app service, and the download portal. The download portal is an option you can use to distribute your application, license files, and so on.

### Compatibility Matrix

The compatibility matrix provides fast, on-demand programmatic access to test your application compatibility in clusters of various Kubernetes distributions and versions many combinations of customer-representative environments. 

Your team can test as they develop, test before every release, and recreate customer environments for testing support cases. For example, testing as you develop or before every release can help uncover version incompatibilities, letting you fix the issue before it is released to a customer.

Because each vendor's needs are different, you develop the variety of tests that you need, such as smoke tests, policy tests, release tests, and canary tests, and the run the tests with the compatibility matrix. You can explore a simple configuration, end-to-end configurations, or a broad matrix of combinations. 

When you use the compatibility matrix in conjunction with instance insights, you can use insights information to programmatically provision and configure accurate customer-representative environments, and set up a series of tests for each release. If a test passes, you can create a script that automatically promotes the release to your stable or latest release channels, and automatically notify customers that is available for upgrade.

Using the compatibility matrix can help reduce the costs and effort to test, increase install success rates, reduce support incidents in the field, and reduce risk in diverse environments. The compatibility matrix helps you test more comprehensively, automate common tests to reduce effort, and catch issues before customers find them.

### Preflight Checks and Support Bundles

Use preflight checks to improve installation success and support bundles to help troubleshoot the cluster and application.

Preflight checks let you define requirements and dependencies for the cluster where your application is installed. Preflight checks provide clear, immediate feedback to your customer about any missing requirements or incompatibilities in the cluster before they install and upgrade your application.

Support bundles collect and analyze cluster information, such as node status and available memory. You can also collect and analyze data about your application deployment. For example, you can customize your support bundle specifications with application log analyzers and provide customers with error messages that contain remediation steps that you define. This can help reduce the support burden.

### Insights and Telemetry

Get telemetry and key insights for the instances of your application running in customer environments. This data provides key performance measurements such as time-to-install, uptime, mean-time-to-resolution (MTTR), upgrade lifecycle, adoption rates, and more. 

Instance data helps the update service compile a list of new versions that are available to an instance for upgrade. Adoption metrics helps you track how frequently customers are upgrading and which versions they are using. If you see that your customers are on the latest versions, you can reduce the number of older versions that you support and maintain.

For air gap instances, which are supported with KOTS entitlements, the telemetry component integrates closely with the support bundle feature to include valuable telemetry and usage data in support bundles to help with troubleshooting.

Set up notifications to get alerted for the events and metrics to help ensure that important instance issues or performance trends are not missed. For example, you can be notified of a degraded status and you can contact your customer about fixing it before downtime occurs.

## Management and Configuration Tools

This section describes the management tools that you use to configure and manage your application and teams.

### Vendor Portal

The Replicated vendor portal is the web-based user interface that you can use to package and manage applications, and manage teams.

![Create an Application in the vendor portal](/images/guides/kots/create-application.png)

You configure your application to use Replicated and services using the built-in YAML editor and linter (in the Help pane).

![YAML editor in the vendor portal](/images/yaml-editor.png)

You can also manage other artifacts, such as customer license files, image registries, and release channels.

![Channels](/images/channels.png)

### replicated CLI

The replicated command-line interface (CLI) is the CLI for the vendor portal. The replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

### Vendor API v3

The Vendor API is the API for the vendor portal. This API can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Using the Vendor API V3](/reference/vendor-api-using).

## Installation Options

When you use the Replicated platform, you can install your application using the Helm CLI, KOTS or kURL, or use a proprietary installer.

### Helm

Uses the Helm CLI to install Helm charts. You can include the SDK as a dependency of your Helm chart if you want to integrate some or all of the Replicated features. For example, you might want to relay performance, usage, and health data from your proprietary customer user interface to the vendor portal and set up notifications for events. For more information about the SDK, see [About the Replicated SDK (Beta)](replicated-sdk-overview).

### KOTS and kURL

KOTS lets you package and update applications using Helm charts, Kubernetes manifests, or Kubernetes Operators. Applications are then securely deployed in customer environments using the KOTS installer. 

For customers that do not have an existing cluster, you can include a kURL installer to provision an embedded cluster, and then KOTS installs the application.  

KOTS also provides an admin console that lets your customers manage your application. You can customize the admin console. For example, you can customize the Config screen to allow customers to specify inputs related to unique options that your application provides. You can also include your own branding on the admin console, configure status informers, and add custom graphs.

For more information, see [About KOTS and kURL](intro-replicated).

### Helm, KOTS, and kURL

You can create a single release that supports using a Helm installation, including the SDK, along side of the KOTS and kURL installers. This lets you create one release to support multiple types of customer environments so that your application runs consistently in every environment. For example, you might have customers that only want a Helm CLI installation for their existing cluster, and other customers who want a Kubernetes cluster provisioned for them with the application in an air gapped environment.

One of the many advantages of using a combined release is that you can include the compatibility matrix and test all of the installations using the same application version.

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
