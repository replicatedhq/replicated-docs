# Introduction to Replicated

Topic to describe what is Replicated, how to navigate the sections in the docs, etc

## About

The Replicated platform lets you install, manage, support, and get insights on your applications in customer environments. With Replicated, you package and update your application using Kubernetes manifests or Helm charts, then securely distribute to customers.

Replicated includes features for managing, monitoring, distributing your apps, including:
* Release channels
* Licensing/entitlements
* Insights and telemetry 
* Reliability testing
* Preflight checks and support bundles (Supportability)
* Proxied OCI Registry (you can give proxied access to your images without giving away your log in information to your users)

When you manage your application with Replicated, you can use Helm to deploy or bring your own installer (proprietary).

Additionally, Replicated offers an installer:
  * KOTS is an installer/method for managing your app. 
  * kURL pr

You manage all this in the Replicated vendor portal/replicated CLI.    




















## Diagram

Create a diagram that shows the end-to-end workflow of importing your app into a release/channel, then pushing to a registry, then your customers pulling from the registry to install.

Should cover:
* Helm chart with the SDK
* Helm chart without the SDK (Native Helm)
* Standard manifest with KOTS
* Proxied registry
* Users installing with KOTS, Helm CLI, kURL

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
* Vendor Portal Team Management
* Image registries
* Channels and Releases
* Licenses and entitlements
* Install:
  * SDK install flow
  * Admin console install




  ## What is Replicated?

Replicated offers a vendor portal and CLI where you can:
* Manage your releases and versioning
* Create and manage custom license entitlements for your customers
* Connect to a proxied image registry
* Test app compatibility with different environments with Reliability Matrix
* Integrate with the Troubleshoot open source project to provide Preflight Checks and Support Bundles for your app
* Get telemetry and key insights for the instances of your app running in customer environments.

With the Replicated SDK Helm chart, Replicated let's you get all this functionality in your existing Helm chart app while still allowing your customers to install and manage their app instances directly with the helm CLI. See more

With KOTS and the KOTS admin console, Replicated also offers a way for your customers to install your application in any Kubernetes cluster. See more

With kURL, Replicated offers a way for you to create your own K8s distribution where customers can install your app with KOTS. See more