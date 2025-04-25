# Introduction and Setup

This topic provides a summary of the goals and outcomes for the tutorial and also lists the prerequisites to set up your environment before you begin.

## Summary

This tutorial introduces you to preflight checks. The purpose of preflight checks is to provide clear feedback about any missing requirements or incompatibilities in the customer's cluster _before_ they install or upgrade an application. Thorough preflight checks provide increased confidence that an installation or upgrade will succeed and help prevent support escalations.

Preflight checks are part of the [Troubleshoot](https://troubleshoot.sh/) open source project, which is maintained by Replicated.

In this tutorial, you use a sample Helm chart to learn how to:

* Define custom preflight checks in a Kubernetes Secret in a Helm chart
* Package a Helm chart and add it to a release in the Replicated Vendor Portal
* Run preflight checks using the Helm CLI
* Run preflight checks in the Replicated KOTS Admin Console

## Set Up the Environment

Before you begin, do the following to set up your environment:

* Ensure that you have kubectl access to a Kubernetes cluster. You can use any cloud provider or tool that you prefer to create a cluster, such as Google Kubernetes Engine (GKE), Amazon Web Services (AWS), or minikube.

  For information about installing kubectl and configuring kubectl access to a cluster, see the following in the Kubernetes documentation:
    * [Install Tools](https://kubernetes.io/docs/tasks/tools/)
    * [Command line tool (kubectl)](https://kubernetes.io/docs/reference/kubectl/)

* Install the Helm CLI. To install the Helm CLI using Homebrew, run: 

   ```
   brew install helm
   ```

   For more information, including alternative installation options, see [Install Helm](https://helm.sh/docs/intro/install/) in the Helm documentation.

* Create a vendor account to access the Vendor Portal. See [Creating a Vendor Portal](/vendor/vendor-portal-creating-account).

  :::note
  If you do not yet have a Vendor Portal team to join, you can sign up for a trial account. By default, trial accounts do not include access to Replicated KOTS. To get access to KOTS with your trial account so that you can complete this and other tutorials, contact Replicated at contact@replicated.com.  
  :::

## Next Step

Get the sample Bitnami Helm chart and test installation with the Helm CLI. See [Step 1: Get the Sample Chart and Test](/vendor/tutorial-preflight-helm-get-chart)