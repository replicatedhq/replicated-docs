# Introduction to Replicated

This topic describes the Replicated platform, including features, installations options, and release workflow.

For an overview of the key use cases for software vendors that Replicated serves, see the [Intro to Replicated: 20 Ways We Help](https://www.youtube.com/watch?v=2eOh7CofY3Q) video.

## About the Replicated Platform

The Replicated platform lets you install, manage, support, and get insights on your applications in customer environments. With Replicated, you package and update your application using Kubernetes manifests or Helm charts, then securely distribute to customers.

Replicated provides features for managing, monitoring, distributing your apps, including a vendor portal and the replicated CLI where you can:

- Manage your releases and versioning
- Create and manage custom license entitlements for your customers
- Connect to a proxied image registry
- Test application compatibility with different environments using the compatibility matrix
- Integrate with the Troubleshoot open source project to provide preflight checks and support bundles for your application
- Get telemetry and key insights for the instances of your app running in customer environments.

These features are available whether your use the Replicated SDK as a service to your Helm chart, or use the Replicated installation options with either a Helm chart, standard manifest files, or Kubernetes operators.

## SDK



## Installation Options

When you manage your application with Replicated, you can use any of the following installation options:

- Your own proprietary installer.

- With the Replicated SDK Helm chart, install and manage application instances directly with the helm CLI. For more information about the SDK, see [About the Replicated SDK (Alpha)](replicated-sdk-overview).

- With Replicated KOTS and the KOTS admin console, install your application in any existing Kubernetes cluster. For more information, see [About KOTS and kURL](intro-replicated).

- With kURL, Replicated provides a way to create a Kubernetes cluster and install your application with KOTS. For more information, see [About KOTS and kURL](intro-replicated).

<!--Diagram

Create a diagram that shows the end-to-end workflow of importing your app into a release/channel, then pushing to a registry, then your customers pulling from the registry to install.

Should cover:

    Helm chart with the SDK
    Helm chart without the SDK (Native Helm)
    Standard manifest with KOTS
    Proxied registry
    Users installing with KOTS, Helm CLI, kURL
-->

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

## Vendor Portal

The Replicated vendor portal is the web-based user interface that you can use to package and manage applications.

![Create an Application in the vendor portal](/images/guides/kots/create-application.png)

You define Kubernetes manifest files, including application and Replicated custom resource manifests, using the built-in YAML editor and linter (in the Help pane). These files describe how to distribute the application. Alternatively, you can use Helm charts.

![YAML editor in the vendor portal](/images/yaml-editor.png)

You can also manage other artifacts, such as customer license files, image registries, and release channels.

![Channels](/images/channels.png)

## replicated CLI

The replicated command-line interface (CLI) is the CLI for the vendor portal. The replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

## Vendor API v3

The Vendor API is the API for the vendor portal. This API can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Using the Vendor API V3](/reference/vendor-api-using).

