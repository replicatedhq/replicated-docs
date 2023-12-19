import SDKOverview from "../partials/replicated-sdk/_overview.mdx"

# KOTS Terminology and FAQs

This topic lists frequently-asked questions (FAQs) and key terminology for the Replicated KOTS installer.

## Key Terminology

This section includes key terminology related to KOTS that is useful to understand before getting started.

### Air Gap

_Air gap_ or _air-gapped_ refers to customer environments that do not have outbound internet access. Air gap environments are common for enterprise customers that require high security.

### Embedded Clusters

_Embedded clusters_ are Kubernetes clusters provisioned on a virtual machine (VM) or a bare metal server using Replicated's embedded cluster offering.

### KOTS Custom Resources

KOTS provides several custom resources in the `kots.io` API group that can be included in releases to provide instructions to KOTS and control the application experience.

KOTS custom resources are _not_ deployed to the cluster. Rather, they are consumed by KOTS or other kubectl plugins.

### KOTS Template Functions

KOTS provides a set of custom template functions based on the Go text/template library.

A common use case for KOTS template functions is to generate values that are specific to the customer environment, such as customer entitlement information, user-provided configurations, or the number of nodes detected in the Kubernetes cluster where the application is installed.

## FAQs

This section provides FAQs related to the KOTS installer.

### What is KOTS?

Replicated KOTS is an open source kubectl plugin maintained by Replicated. KOTS provides highly successful installations of Kubernetes applications into diverse environments (including on-prem and air gap environments).

### How do KOTS installations work?

KOTS deploys an admin console, which provides a user interface for installing and managing applications. After installing KOTS in a cluster, users can log in to the admin console to provide their license file, define configuration values, run preflight checks, and then install and deploy your application with KOTS.

### How do embedded cluster installations with KOTS work?

Users that do not have an existing Kubernetes cluster can install KOTS and your application using Replicated's embedded cluster offering.

When doing an embedded cluster installation, users can run a single command to provision a cluster, install KOTS in the cluster, provide their license file. This command also makes the admin console available, where users can log in to complete application installation. 

### What are the pros and cons of installing applications with KOTS versus Helm?

Helm is a popular package manager for Kubernetes applications and many enterprise users expect to be able to install an application with Helm.

### Does KOTS support installations into air gap environments?

Yes. KOTS supports installations in air gap environments in both existing and embedded clusters.

For information about installing in air gap environments with KOTS:
* **Existing clusters**: See [Air Gap Installation in Existing Clusters](installing-existing-cluster-airgapped)
* **Embedded clusters**: See [Air Gap Installation with kURL](installing-embedded-airgapped)

### Can I deploy Helm charts with KOTS?

Yes. Using KOTS to install Helm charts provides additional functionality not directly available with the Helm CLI, such as a user interface for collecting user configuration values, support for air gap installations, and backup and restore with the KOTS snapshots feature.

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