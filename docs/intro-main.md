# Introduction to Replicated

This topic describes the Replicated platform, including features, installations options, and release workflow.

For an overview of the key use cases for software vendors that Replicated serves, see the [Intro to Replicated: 20 Ways We Help](https://www.youtube.com/watch?v=2eOh7CofY3Q) video.

## About the Replicated Platform

The Replicated platform provides multiple options to manage, support, get insights, and deploy your applications in customer environments:

- **Replicated SDK:** Using the SDK, you can pick and choose which feature options you want to use with your application and use your own installation method. For more information, see [SDK](#sdk).

- **Replicated KOTS and Replicated kURL:** With KOTS and kURL installers, you package and update your application using KOTS and then securely distribute to customers using either Replicated installer. For more information, see [KOTS and kURL Installers](#installers).

- **SDK, KOTS, and kURL:** You can use the SDK in the same release with KOTS and kURL. This lets you create one release to support multiple types of customer environments and installation needs so that your application runs consistently in every environment. For example, you might have customers that only want a Helm CLI installation for their existing cluster, and other customers who want a Kubernetes cluster provisioned for them with the application in an air gapped environment.

Replicated provides the following features for managing, monitoring, distributing your apps, including a vendor portal and the replicated CLI to:

- Manage your releases and versioning
- Create and manage custom license entitlements for your customers
- Connect to a proxied image registry
- Test application compatibility with different environments using the compatibility matrix
- Integrate with the Troubleshoot open source project to provide preflight checks and support bundles for your application
- Get telemetry and key insights for the instances of your application running in customer environments

For more information about these features, see [Key Features](key-features).

## SDK

Using the SDK, you can choose which feature options you want to add to your Helm charts, integrate the features into your own user interface, and use your current installation method. You add the SDK as a service to your Helm chart application.

For example, your application might already have a proprietary method of managing customer licenses, but you want to get telemetry and insights for customer instances and have an easier way to test your application with different environments. You can add just the Replicated telemetry and compatibility matrix features to your application using the Replicated vendor portal or replicated CLI.

For installation, you can use one of the following methods:

- **Proprietary Installer:** You can use your own proprietary installer.

- **Helm CLI:** With the Replicated SDK Helm chart, install and manage application instances directly with the helm CLI. For more information, see [About Distributing Helm Charts with Replicated](helm-overview).

For more information about the SDK, see [About the Replicated SDK (Beta)](replicated-sdk-overview).

## KOTS and kURL Installers {#installers}

With the Replicated KOTS, you can deploy your application with Helm charts, standard manifests, or Kubernetes operators. KOTS includes an admin console that lets your customers manage their applications instances.

You can use any of the following installation options, depending on your customer needs.

- **KOTS:** With KOTS and the KOTS admin console, install your application in any existing Kubernetes cluster.

- **kURL:**, Replicated provides a way to create a Kubernetes cluster and install your application with KOTS. 

- **Native Helm with KOTS:** Install with the Helm CLI when you distribute your Helm chart application with KOTS. KOTS supports more Helm options, including hooks and weights. Customer instances are managed using the Helm CLI. For more information, see Installing an Application with Helm (Beta). For more information, see [ABout Distributing Helm Charts with Replicated](helm-overview).

For more information, see [About KOTS and kURL](intro-replicated).

<!--Diagram

Create a diagram that shows the end-to-end workflow of importing your app into a release/channel, then pushing to a registry, then your customers pulling from the registry to install.

Should cover:

    Helm chart with the SDK
    Helm chart without the SDK (Native Helm)
    Standard manifest with KOTS
    Proxied registry
    Users installing with KOTS, Helm CLI, kURL
-->

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

## Key Features

This section describes some of the key features and use cases for the Replicated platform. ALl of these features are supported by the SDK, KOTS, and kURL.

### Release Management

Replicated release features help you manages your product lifecycle effectively. Each release has release properties that let you define version numbers, optionally use semantic versioning, specify whether a KOTS release is required for upgrade or can be skipped, and provide your own release notes. You can test releases in a channel reserved for development, then promote the release to a Beta channel for customer testing, and then promote the release to a Stable channel when it is ready for general availability.

You manage releases using the vendor portal or the replicated CLI.

### Custom License Entitlements

When you use the SDK, you can check in with the service to provide custom license entitlements that are signed, synchronized, and verified, such as expiration dates, which features are enabled, usage limits, and then integrate those values with your application code to enforce the entitlements. By default, the SDK automatically synchronizes and updates custom entitlement values in the running application.

### Custom Domains for Image Registries

Whether you use an external private registry, which is accessed by the Replicated proxy service, or use the Replicated registry, you can create custom domains to alias the image registries. This lets you use your own branding instead of the default Replicated domain names for these image registries.

### Compatibility Matrix

Test application compatibility using the compatibility matrix, which provides fast, on-demand programmatic access to test clusters of various Kubernetes distributions and versions many combinations of customer-representative environments. 

Your team can test as they develop, test before every release, and recreate customer environments for testing support cases. For example, testing as you develop or before every release can help uncover version incompatibilities, letting you fix the issue before it is released to a customer.

Because each vendor's needs are different, you develop any variety of tests that you need, such as smoke tests, policy tests, release tests, and canary tests, and the run the tests with the compatibility matrix. You can explore a simple configuration, end-to-end configurations, or a broad matrix of combinations. 

When you use the compatibility matrix in conjunction with instance insights, you can use insights information to programmatically provision accurate customer-representative environments, configure them, and set up a series of tests for each release. If the test passes, a script that can even automatically promote the release to your stable or latest release channels and notify customers that is available for upgrade.

Using the compatibility matrix you can reduce costs and the effort to test, increase install success rates, reduce support incidents in the field, and reduce risk in diverse environments. The compatibility matrix helps you test more comprehensively, automate common tests to reduce effort, and ultimately catch issues before customers find them.


### Preflight Checks and Support Bundles

Use preflight checks to improve installation success and support bundles to help troubleshoot the cluster and application.

Preflight checks let you define requirements and dependencies for the cluster where your application is installed. Preflight checks provide clear, immediate feedback to your customer about any missing requirements or incompatibilities in the cluster before they install and upgrade your application.

Support bundles collect and analyze cluster information, such as node status and available memory. You can also collect and analyze data about your application deployment. For example, you can customize your support bundle specifications with application log analyzers and provide customers with error messages that contain remediation steps that you define. This can help reduce the support burden.

### Insights and Telemetry

Get telemetry and key insights for the instances of your application running in customer environments. This data provides key performance measurements such as time-to-install, uptime, mean-time-to-resolution (MTTR), upgrade lifecycle, adoption rates, and more. 

Instance data helps the update service compile a list of new versions that are available to an instance for upgrade. Adoption metrics helps you track how frequently customers are upgrading and which versions they are using. If you see that your customers are on the latest versions, you can reduce the number of older versions that you support and maintain.

For air gap instances, the telemetry component integrates closely with the support bundle feature to include valuable telemetry and usage data in support bundles to help with troubleshooting.

Set up notifications to get alerted for the events and metrics to help ensure that important instance issues or performance trends are not missed. For example, you can be notified of a degraded status and you can contact your customer about fixing it before downtime occurs.


## Getting Started Release Workflow

The following workflow helps you get started with your first release and understand how to navigate the documentation.

To get started with your first release:

1. Create a vendor account. See [Creating a Vendor Account](vendor-portal-creating-account).
1. Invite members to your team and manage permissions. See [Managing Team Members](team-management).
1. Connect to an image registry. See [COnnecting to an Image Registry](packaging-private-images).
1. Create a release with your application files. See [Managing Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli).
1. Promote the release to a channel. See [Managing Releases with the Vendor Portal](releases-creating-releases) or [Managing Releases with the CLI](releases-creating-cli)
1. Create a customer to define a license file. See [Creating and Managing Customers](releases-creating-customer).
1. Test your installation:

    - For SDK installations using integration mode, see [Developing Against the SDK API (Alpha)](replicated-sdk-development).
    - For KOTS and kURL installations, see [About Installing an Application](installing-overview) in the KOTS documentation.
    - For Helm installations, see [Installing an Application with Helm (Beta)](install-with-helm).