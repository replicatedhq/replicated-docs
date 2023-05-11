# Introduction to Replicated

Topic to describe what is Replicated, how to navigate the sections in the docs, etc

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