# Introduction to Replicated

This topic describes the Replicated platform...

For an overview of the key use cases for software vendors that Replicated serves, see the [Intro to Replicated: 20 Ways We Help](https://www.youtube.com/watch?v=2eOh7CofY3Q) video.

## About the Replicated Platform

The Replicated platform lets you install, manage, support, and get insights on your applications in customer environments. With Replicated, you package and update your application using Kubernetes manifests or Helm charts, then securely distribute to customers.

Replicated includes features for managing, monitoring, distributing your apps, including:

Replicated offers a vendor portal and CLI where you can:

- Manage your releases and versioning
- Create and manage custom license entitlements for your customers
- Connect to a proxied image registry
- Test app compatibility with different environments with Reliability Matrix
- Integrate with the Troubleshoot open source project to provide Preflight Checks and Support Bundles for your app
- Get telemetry and key insights for the instances of your app running in customer environments.

When you manage your application with Replicated, you can use Helm to deploy or bring your own installer (proprietary).

With the Replicated SDK Helm chart, Replicated let's you get all this functionality in your existing Helm chart application while still allowing your customers to install and manage their application instances directly with the helm CLI. See more

With KOTS and the KOTS admin console, Replicated also offers a way for your customers to install your application in any Kubernetes cluster. See more

With kURL, Replicated offers a way for you to create your own K8s distribution where customers can install your app with KOTS. See more 

<!--Diagram

Create a diagram that shows the end-to-end workflow of importing your app into a release/channel, then pushing to a registry, then your customers pulling from the registry to install.

Should cover:

    Helm chart with the SDK
    Helm chart without the SDK (Native Helm)
    Standard manifest with KOTS
    Proxied registry
    Users installing with KOTS, Helm CLI, kURL
-->

## Release Workflow

High level workflow so that people understand how to navigate the docs

Workflow:

1. Log in to vendor portal to create your team
1. Connect to an image registry
1. Create a release with app files (could be helm chart or otherwise)
1. Promote it to a channel
1. Create a customer to define a license file
1. Test your install

See:

    Vendor Portal Team Management
    Image registries
    Channels and Releases
    Licenses and entitlements
    Install:
        SDK install flow
        Admin console install

## Vendor Portal

The Replicated vendor portal is the web-based user interface that you can use to package and manage applications.

![Create an Application in the vendor portal](/images/guides/kots/create-application.png)

You define Kubernetes manifest files, including application and Replicated custom resource manifests, using the built-in YAML editor and linter (in the Help pane). These files describe how to distribute the application. Alternatively, you can use Helm charts.

![YAML editor in the vendor portal](/images/yaml-editor.png)

You can also manage other artifacts, such as customer license files, image registries, and release channels.

![Channels](/images/channels.png)

### replicated CLI

The replicated command-line interface (CLI) is the CLI for the vendor portal. The replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

### Vendor API v3

The Vendor API is the API for the vendor portal. This API can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Using the Vendor API V3](/reference/vendor-api-using).

