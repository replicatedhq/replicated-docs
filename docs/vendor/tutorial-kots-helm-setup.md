import Cluster from "../partials/getting-started/_setup-cluster.mdx"

# Introduction and Setup

This topic provides a summary of the goals and outcomes for the tutorial and also lists the prerequisites to set up your environment before you begin.

## Summary

This tutorial introduces you to the Replicated Vendor Portal, the Replicated CLI, the Replicated SDK, and the Replicated KOTS installer.

In this tutorial, you use a sample Helm chart to learn how to:

* Add the Replicated SDK to a Helm chart as a dependency
* Create a release with the Helm chart using the Replicated CLI
* Add custom resources to the release so that it supports installation with both the Helm CLI and Replicated KOTS
* Install the release in a cluster using KOTS and the KOTS Admin Console
* Install the same release using the Helm CLI

## Set Up the Environment

Before you begin, do the following to set up your environment:

* <Cluster/>

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

Get the sample Bitnami Helm chart and test installation with the Helm CLI. See [Step 1: Get the Sample Chart and Test](/vendor/tutorial-kots-helm-get-chart)