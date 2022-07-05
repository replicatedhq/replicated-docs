# Helm Overview

Helm is a popular package manager for Kubernetes applications.

For applications that are already packaged using Helm, Helm support in the Replicated app manager can help get an application packaged faster. The app manager supports delivering Helm charts as an enterprise application, or including Helm charts as components of an application. An application can support more than one Helm chart, and can support more than a single instance of any Helm chart.

If an application does not presently use Helm, there is no requirement to use Helm. The app manager has built-in templating that includes much of the same functionality as Helm charts, and the admin console includes a deep [kustomize.io integration](../enterprise/updating-patching-with-kustomize) to greatly reduce the amount of templating required by app maintainers.

There are two ways to deploy Helm charts within an application:

* With the default workflow, the app manager renders the Helm templates and deploys them as standard Kubernetes manifests. The app manager directly manages the lifecycle of the resources in this workflow, and it supports rendering the templates with both Helm V2 and V3.

* The native Helm workflow deploys the Helm charts with Helm V3 directly. In this workflow, Helm installs and manages the lifecycle of the chart resources that are part of a given application. For new applications, this workflow is the preferred method because it supports more features of Helm, such as hooks and weights. For more information, see [Installing with Native Helm](helm-installing-native-helm).

:::note
Migrating existing installations to the native Helm workflow is not supported. However, new Helm charts within an existing application      can leverage the workflow and the features that come with it.
:::

It is also possible for your customers to install your application with Helm rather than the app manager. This is an alpha feature. To learn more, reach out to your contacts at Replicated.
