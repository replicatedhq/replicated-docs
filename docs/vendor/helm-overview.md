# Helm overview

Helm is a popular package manager for Kubernetes applications. Replicated KOTS supports delivering Helm charts as an enterprise application, or including Helm charts as components of an application. A KOTS application can support more than one Helm chart, and can support more than a single instance of any Helm chart.

There are two ways to deploy Helm charts within a KOTS application:
* With the default workflow, KOTS renders the Helm templates and deploys them as standard Kubernetes manifests. KOTS directly manages the lifecycle of the resources in this workflow, and it supports rendering the templates with both Helm V2 and V3. See the docs on [installing with Replicated KOTS](/vendor/helm/using-replicated-helm-charts/) for more information.
* The newer workflow deploys the Helm charts with Helm V3 directly. In this workflow, Helm installs and manages the lifecycle of the chart resources that are part of a given KOTS application. For new applications, this workflow is the preferred method because it supports more features of Helm, such as hooks and weights. See the docs on [installing with native Helm](/vendor/helm/using-native-helm-charts/) for more information on this workflow.

> Currently, migrating existing installations to the native Helm workflow is not supported. However, new Helm charts within an existing KOTS application can leverage the workflow and the features that come with it.
