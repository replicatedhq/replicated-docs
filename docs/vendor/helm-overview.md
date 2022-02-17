# Helm overview

Helm is a popular package manager for Kubernetes applications.

If an application does not presently use Helm, there is no requirement to use Helm, as the the app manager built-in templating includes much of the same functionality, and the admin console includes a deep [kustomize.io integration](../enterprise/updating-patching-with-kustomize) to greatly reduce the amount of templating required by app maintainers in the first place.

For applications that are already packaged using Helm, the Helm support in the Replicated app manager can help get an app packaged faster.The app manager supports delivering Helm charts as an enterprise application, or including Helm charts as components of an application. An application can support more than one Helm chart, and can support more than a single instance of any Helm chart.

There are two ways to deploy Helm charts within an application:

* With the default workflow, the app manager renders the Helm templates and deploys them as standard Kubernetes manifests. The app manager directly manages the lifecycle of the resources in this workflow, and it supports rendering the templates with both Helm V2 and V3. See the docs on [Installing with the app manager](helm-installing-replicated-helm) for more information.

* The newer workflow deploys the Helm charts with Helm V3 directly. In this workflow, Helm installs and manages the lifecycle of the chart resources that are part of a given application. For new applications, this workflow is the preferred method because it supports more features of Helm, such as hooks and weights. For more information, see [Installing with native Helm](helm-installing-native-helm).

> Migrating existing installations to the native Helm workflow is not supported. However, new Helm charts within an existing application can leverage the workflow and the features that come with it.
