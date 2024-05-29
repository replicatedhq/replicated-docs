# Introduction and Setup

This topic provides a summary of the goals and outcomes for the tutorial and also lists the prerequisites to set up your environment before you begin.

## Summary

This tutorial introduces you to mapping user-supplied values from the Replicated KOTS Admin Console configuration page to a Helm chart `values.yaml` file.

In this tutorial, you use a sample Helm chart to learn how to:

* Define a user-facing application configuration page in the KOTS Admin Console
* Set Helm chart values with the user-supplied values from the Admin Console configuration page

## Set Up the Environment

Before you begin, ensure that you have kubectl access to a Kubernetes cluster. You can use any cloud provider or tool that you prefer to create a cluster, such as [Replicated Compatibility Matrix](/vendor/testing-how-to), Google Kubernetes Engine (GKE), or minikube.

## Next Step

Get the sample Bitnami Helm chart and test installation with the Helm CLI. See [Step 1: Get the Sample Chart and Test](/vendor/tutorial-config-get-chart)