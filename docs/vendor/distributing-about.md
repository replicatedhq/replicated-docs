# How to Distribute Applications with Replicated

This topic provides an overview of consideration for distributing your application with replicated, including a workflow. it's intended for users who are onboarding with or learning about Replicated.

## Supported Types of Applications

A release for your application can include:
* Helm charts, 
* standard Kubernetes manifests
* Kubernetes Operators. (While an operator is technically deployed either using plain Kubernetes manifests or a Helm chart, we list it separately because of the advanced image management work needed to effectively deliver Operators into customer environments.)

## Supported Installation Methods

From a single release, you can support one or more of these installation methods.

### Install with Helm

Add your Helm chart app to a release in the vendor portal.

Optionally use the SDK with your Helm chart to get access to replicated functionality.

### Install with KOTS

KOTS is the Replicated installer available to premium vendors. KOTS provides support for installations into existing clusters, VMs, and air gap environments. To support installations with KOTS, you add and configure [Replicated custom resources](/reference/custom-resource-about) to your release.

For more information, see KOTS

### Use Your Own Installer

If you have your own installer, you can also use that. 

## Basic Workflow for Helm

1. Sign up
1. Make an app
1. Add SDK
1. Create a release & promote to unstable
1. View telemetry
1. 
