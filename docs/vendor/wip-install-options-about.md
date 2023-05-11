# About Deploying Apps with KOTS

Your app can use helm charts, standard manifests, k8s operators. KOTS support air gap

Here's the options that the app manager supports for installing your app:

* KOTS Install: Install on an existing cluster using the kots CLI or the admin console UI. Can be Helm chart of standard manifests or k8s operators
* Embedded Cluster: Install on a cluster provisioned by the Replicated Kubernetes installer
* (Helm Chart Only) Helm Install: Install on an existing cluster using the helm CLI

## Distributing and Installing Apps with KOTS and kURL

Replicated includes components and features that make it easier for you to manage and deploy applications, and for enterprise users to install and manage their instance of your application.

The following diagram shows the Replicated components as they relate to you as a vendor packaging your application, and the deployment to an existing cluster and a cluster provisioned by the Replicated Kubernetes installer on a VM.

![What is Replicated?](/images/replicated-components-diagram.png)

[View larger image](/images/replicated-components-diagram.png)

## How to Add KOTS Functionality to your Releases

You add app manager functionality to your releases with custom resources

### What are the KOTS custom resources? 

What are they? https://docs.replicated.com/reference/custom-resource-about

* About working with custom resources
* list of
* link to ref

* Table of app manager functionality? https://docs.replicated.com/vendor/distributing-workflow#adding-functionality-to-your-releases 

