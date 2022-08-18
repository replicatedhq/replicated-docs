# About Packaging with Helm

Helm is a popular package manager for Kubernetes applications. If your application is already packaged using Helm, you can use Replicated to more easily distribute and manage your application. Using Replicated to distribute applications packaged with Helm provides additional functionality not available through Helm, such as preflight checks, support bundles, a user interface for collecting user configuration values, and more.

Replicated supports delivering an enterprise application as one or more Helm charts, or including Helm charts as components of an application. An application can use more than one Helm chart, and can use more than a single instance of any Helm chart.

To package an application with Helm, start by adding an existing Helm chart to a release in the Replicated vendor portal. For information about how to create a new release from an existing Helm chart, see [Adding Helm Charts to a Release](helm-release).

## How Replicated Deploys Helm Charts

When you distribute an application packaged with Helm, your customers can install and manage the application with the Replicated kots CLI or with the helm CLI.

### Using the kots CLI

Users can install an application packaged with Helm charts using the kots CLI on an existing cluster or on a cluster provisioned by the Kubernetes installer.

The kots CLI installs applications packaged with Helm charts using either the "Native Helm" or "Replicated KOTS" deployment method. You specify the deployment method in the Replicated HelmChart custom resource manifest file with the `useHelmInstall` flag. For more information, see [useHelmInstall](/reference/helmchart#usehelminstall) in _HelmChart_.

The following describes the Native Helm and Replicated KOTS deployment methods:

* **Native Helm (Recommended)**: The kots CLI uses the Helm binary to install and manage the lifecycle of the chart resources that are part of the application. This is the preferred method because it supports more features of Helm, such as hooks and weights.

   For more information, see see [Native Helm](helm-processing#native-helm) in _How the App Manager Processes Helm Charts_. See also [Enabling and Using Native Helm Charts](helm-installing-native-helm#enabling-and-using-native-helm-charts) in _Installing with Native Helm_.

* **Replicated KOTS**: The kots CLI renders the Helm templates and deploys them as standard Kubernetes manifests using `kubectl apply`. The kots CLI manages the lifecycle of the resources.

   For more information, see [Replicated KOTS](helm-processing#replicated-kots) in _How the App Manager Processes Helm Charts_.

### Using the helm CLI (Alpha)

Users can install an application packaged with a Helm chart into an existing cluster using the helm CLI. When users install with the helm CLI directly, Helm, rather than the app manager, manages the lifecycle of the application.

Deploying an application with the helm CLI differs from the kots CLI "Native Helm" deployment method described above because, when users install with the helm CLI directly, they have access to all Helm functionality. Some enterprise users also prefer or require using the helm CLI because their existing CI/CD pipeline or policies are already compatible with Helm charts.

Users do not have access to certain Replicated features when they install and manage the application with the helm CLI directly. This is because the kots CLI does not manage the lifecycle of the application. For example, users must update the application using the `helm upgrade` command, rather than using the admin console UI or the kots CLI.

For more information about how to package an application so that users can install using the helm CLI, see [Using Helm to Install an Application (Alpha)](helm-install).
