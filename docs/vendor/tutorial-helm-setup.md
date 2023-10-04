import KubernetesTraining from "../partials/getting-started/_kubernetes-training.mdx"
import LabsIntro from "../partials/getting-started/_labs-intro.mdx"
import TutorialIntro from "../partials/getting-started/_tutorial-intro.mdx"
import RelatedTopics from "../partials/getting-started/_related-topics.mdx"
import VMRequirements from "../partials/getting-started/_vm-requirements.mdx"

# Introduction and Setup

This topic provides a summary of the goals and outcomes for the tutorial and also lists the prerequisites to set up your environment before you begin.
## Summary

This tutorial introduces you to the Replicated vendor portal, the Replicated SDK, and the Replicated KOTS installer.

In this tutorial, you use a sample Helm chart for a basic NGINX application to learn how to:

* Add the Replicated SDK to a Helm chart
* Create a release with the Helm chart in the Replicated vendor portal
* Configure the release so that it supports installation with both the Helm CLI and with Replicated KOTS
* Install the release in a cluster using the Helm CLI
* Install the same release in a cluster using Replicated KOTS and the Replicated admin console

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