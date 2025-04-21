# Introduction and Setup

This tutorial introduces you to the Replicated features for software vendors and their enterprise users. It is designed to familiarize you with the key concepts and processes that you use as a software vendor when you package and distribute your application with Replicated.

In this tutorial, you use a set of sample manifest files for a basic NGINX application to learn how to:
* Create and promote releases for an application as a software vendor
* Install and update an application on a Kubernetes cluster as an enterprise user

The steps in this KOTS CLI-based tutorial show you how to use the Replicated CLI to perform these tasks. The Replicated CLI is the CLI for the Replicated Vendor Portal. You can use the Replicated CLI as a software vendor to programmatically create, configure, and manage your application artifacts, including application releases, release channels, customer entitlements, private image registries, and more.

:::note
This tutorial assumes that you have a working knowledge of Kubernetes. For an introduction to Kubernetes and free training resources, see [Training](https://kubernetes.io/training/) in the Kubernetes documentation.
:::

## Set Up the Environment

As part of this tutorial, you will install a sample application into a Kubernetes cluster. Before you begin, do the following to set up your environment:

* Create a Kubernetes cluster that meets the minimum system requirements described in [KOTS Installation Requirements](/enterprise/installing-general-requirements). You can use any cloud provider or tool that you prefer to create a cluster, such as Google Kubernetes Engine (GKE), Amazon Web Services (AWS), or minikube.

   **Example:**

   For example, to create a cluster in GKE, run the following command in the gcloud CLI:

   ```
   gcloud container clusters create NAME --preemptible --no-enable-ip-alias
   ```
   Where `NAME` is any name for the cluster.

* Install kubectl, the Kubernetes command line tool. See [Install Tools](https://kubernetes.io/docs/tasks/tools/) in the Kubernetes documentation.
* Configure kubectl command line access to the cluster that you created. See [Command line tool (kubectl)](https://kubernetes.io/docs/reference/kubectl/) in the Kubernetes documentation.

## Related Topics

For more information about the subjects in the getting started tutorials, see the following topics:

* [Installing the Replicated CLI](/reference/replicated-cli-installing)
* [Linter Rules](/reference/linter)
* [Online Installation in Existing Clusters with KOTS](/enterprise/installing-existing-cluster)
* [Performing Updates in Existing Clusters](/enterprise/updating-app-manager)