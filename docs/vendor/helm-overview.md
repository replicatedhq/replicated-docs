import NativeHelmLimitations from "../partials/helm/_native-helm-limitations.mdx"
import TemplateLimitation from "../partials/helm/_helm-template-limitation.mdx"
import HelmCLILimitations from "../partials/helm/_helm-cli-limitations.mdx"

# About Packaging with Helm

Helm is a popular package manager for Kubernetes applications. If your application is already packaged using Helm, you can use Replicated to more easily distribute and manage your application. Using Replicated to distribute applications packaged with Helm provides additional functionality not available through Helm, such as preflight checks, support bundles, a user interface for collecting user configuration values, support for using private images, and more.

Replicated supports delivering an enterprise application as Helm charts, or including Helm charts as components of an application. An application can use more than one Helm chart, and can use more than a single instance of any Helm chart.

To package an application with Helm, start by adding an existing Helm chart to a release in the Replicated vendor portal. For information about how to create a new release from an existing Helm chart, see [Creating Releases with Helm Charts](helm-release).

## How Replicated Deploys Helm Charts

When you distribute an application packaged with Helm, your customers can install and manage the application with the Replicated app manager or with the helm CLI.

### Using the App Manager

Users can install an application packaged with Helm charts using the app manager on an existing cluster or on a cluster provisioned by the Kubernetes installer. When installing with the app manager, users can either use the Replicated admin console UI or the kots CLI.

The app manager installs applications packaged with Helm charts using either the "Native Helm" or "Replicated KOTS" deployment method. You specify the deployment method in the Replicated HelmChart custom resource manifest file with the `useHelmInstall` flag. For more information, see [useHelmInstall](/reference/custom-resource-helmchart#usehelminstall) in _HelmChart_.

The following describes the Native Helm and Replicated KOTS deployment methods:

* **Native Helm (Recommended)**: The app manager uses the Helm binary to install and manage the lifecycle of the chart resources that are part of the application. This is the preferred method because it supports more features of Helm, such as hooks and weights.

For more information, see [Native Helm](helm-processing#native-helm) in _How the App Manager Processes Helm Charts_. See also [Enabling and Using Native Helm Charts](helm-installing-native-helm#enabling-and-using-native-helm-charts) in _Installing with Native Helm_.

* **Replicated KOTS**: The app manager renders the Helm templates and deploys them as standard Kubernetes manifests using `kubectl apply`. The app manager manages the lifecycle of the resources.

   For more information, see [Replicated KOTS](helm-processing#replicated-kots) in _How the App Manager Processes Helm Charts_.

For limitations of the Native Helm and Replicated KOTS deployment methods, see [Native Helm and Replicated KOTS Limitations](#replicated-helm-limitations) below.  
### Using the helm CLI (Beta)

Users can install an application packaged with a Helm chart into an existing cluster using the helm CLI. When users install with the helm CLI directly, Helm, rather than the app manager, manages the lifecycle of the application.

Deploying an application with the helm CLI differs from the "Native Helm" deployment method described above because, when users install with the helm CLI directly, they have access to all Helm functionality. Some enterprise users also prefer or require using the helm CLI because their existing CI/CD pipeline is already compatible with Helm charts. Similarly, enterprise users might have organizational policies that require using Helm to manage applications.

Users do not have access to certain Replicated features when they install and manage the application with the helm CLI directly. This is because the app manager does not manage the lifecycle of the application. For example, users must update the application using the `helm upgrade` command, rather than using the admin console UI or the kots CLI.

For more information about how to package an application so that users can install using the helm CLI, see [Supporting helm CLI Installations (Beta)](helm-install).

## Limitations

This section lists the limitations for packaging an application with Helm charts.

There are different limitations depending on if your customers install and manage the application with the app manager, or if they use the helm CLI directly:

* [Replicated KOTS and Native Helm Limitations](#replicated-helm-limitations)
* [helm CLI Install Limitations](#helm-cli-limitations)

### Native Helm and Replicated KOTS Limitations {#replicated-helm-limitations}

The following limitations apply when using the app manager to install and manage Helm charts:

<TemplateLimitation/>

* The following limitations apply to the Native Helm deployment method:

  <NativeHelmLimitations/>

### helm CLI Install Limitations {#helm-cli-limitations}

The helm CLI installation method is Beta and has the following limitations:

<HelmCLILimitations/>