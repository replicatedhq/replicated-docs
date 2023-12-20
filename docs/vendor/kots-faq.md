import SDKOverview from "../partials/replicated-sdk/_overview.mdx"

# KOTS Terminology and FAQs

This topic lists frequently-asked questions (FAQs) and key terminology for the Replicated KOTS installer.

## Key Terminology

This section includes key terminology related to KOTS that is useful to understand before getting started.

### Air Gap

_Air gap_ or _air-gapped_ refers to customer environments that do not have outbound internet access. Air gap environments are common for enterprise customers that require high security.

### Embedded Clusters

_Embedded clusters_ are Kubernetes clusters provisioned on a virtual machine (VM) or a bare metal server using Replicated kURL.

### KOTS Custom Resources

KOTS provides several custom resources in the `kots.io` API group that can be included in releases. KOTS custom resources provide instructions to KOTS and control the application experience.

KOTS custom resources are _not_ deployed to the cluster. Rather, they are consumed by KOTS or other kubectl plugins.

### KOTS Template Functions

KOTS provides a set of custom template functions based on the Go text/template library that can be used in any Kubernetes manifests for applications deployed with KOTS.

KOTS template functions can be used to generate values specific to the customer environment that can be useful during installation. For example, customer entitlement information, user-provided configuration values, or the number of nodes detected in the Kubernetes cluster where the application is installed.

## FAQs

This section provides FAQs related to the KOTS installer.

### What is KOTS?

Replicated KOTS is an open source kubectl plugin maintained by Replicated. KOTS provides highly successful installations of Kubernetes applications into diverse environments (including on-prem and air gap environments).

### How do KOTS installations work?

Enterprise users installing an application with KOTS first run the `kubectl kots install` command to install KOTS in the target cluster. KOTS then deploys the admin console where users can log in to provide their license file, define application-specific configuration values, run preflight checks, and install and deploy the application.

### How do embedded cluster installations with KOTS work?

In embedded cluster installations, users run the Replicated kURL installation command to provision a cluster, install KOTS in the cluster, and deploy the admin console.

Users log in to the admin console to provide their license file, define application-specific configuration values, run preflight checks, and install and deploy the application.

### What are the benefits of installing applications with KOTS versus Helm?

Many enterprise customers that have experience with Kubernetes and Helm will expect to be able to install an application with Helm.

Compared to Helm, installing with KOTS offers additional features and functionality, including:
* A UI-based installation experience, including a UI for collecting user configuration values
* Support for air gap installations
* Support for embedded cluster installations on a VM or bare metal server

Use cases for KOTS include:
* Enterprise customers that do not have experience with Helm
* Do not have an existing Kubernetes cluster (kURL might be helpful to have more consistent operating environments for your app)

### Does KOTS support installations into air gap environments?

Yes. KOTS supports installations into air gap environments in existing or embedded clusters.

### Can I deploy Helm charts with KOTS?

Yes. Using KOTS to install Helm charts provides additional functionality not directly available with the Helm CLI, such as:
* A user interface for collecting user configuration values
* Support for air gap installations
* Support for embedded cluster installations on a VM or bare metal server (for enterprise users that do not have an existing cluster)
* Backup and restore with the KOTS snapshots feature

### How does KOTS deploy Helm charts?

The KOTS HelmChart custom resource provides instructions to KOTS about how to install a given Helm chart. Each Helm chart in a release that will be installed by KOTS requires a unique HelmChart custom resource.

### Can I support both Helm CLI and KOTS installations for my application?

Yes. For software vendors with Helm chart-based applications, you can support installations with the Helm CLI and with KOTS from the same release.

For a tutorial that demonstrates how to add the Bitnami Gitea Helm chart to a release in the Replicated vendor portal and then install with both KOTS and the Helm CLI, see [Deploy a Helm Chart with KOTS and Helm CLI](/vendor/tutorial-kots-helm-setup).

### How does the Replicated SDK work with KOTS?

The Replicated SDK is a Helm chart that can be installed as a small service alongside your application. The SDK can be installed alongside Helm chart- or standard manifest-based applications using the Helm CLI or KOTS.

Replicated recommends that all applications include the SDK because it provides access to key functionality not available through KOTS, such as support for collecting custom metrics from application instances.

### What do I have to do to enable KOTS installations for my application?

To enable KOTS installations for your application:
* Request the KOTS entitlement
* Add a set of custom resources to your release to control the application experience, such as branding the admin console, setting up a page to collect user-provided configuration options, and defining preflight checks 