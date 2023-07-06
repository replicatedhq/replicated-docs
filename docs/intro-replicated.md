# About KOTS and kURL

Replicated includes the KOTS and kURL installers that make it easier for you to manage and deploy applications, and for enterprise users to install and manage their instance of your application.

The following options are supported for installing your application:

- **KOTS Installer:** Installs on an existing cluster using the kots CLI or the admin console. 

- **kURL Installer:** Installs on a cluster created by the kURL installer.

- **Helm Installer:** Install with Helm when you distribute your Helm chart application with KOTS. For more information, see [Installing an Application with Helm (Beta)](install-with-helm).
    
The following diagram shows the Replicated components as they relate to you as a vendor packaging your application with KOTS, and the deployment to an existing cluster and a cluster provisioned by kURL. The application is packaged using either Helm charts, standard manifests, or Kubernetes operators.

![KOTS and kURL deployments](/images/replicated-components-diagram.png)

[View larger image](/images/replicated-components-diagram.png)

## KOTS

Replicated KOTS installs and manages applications in a Kubernetes cluster. You can use KOTS to deploy Kubernetes applications securely to the following Kubernetes cluster environments:

- Existing clusters
- Embedded clusters created by Replicated kURL. See [kURL](#kurl) below.
- Air gapped clusters (existing and embedded)

Your application can use Helm charts, standard manifest files, or Kubernetes opertators.

### Admin Console

The Replicated admin console is a graphical user interface (GUI) for interacting with KOTS. The admin console includes built-in functionality that allows users to install, manage, update, configure, monitor, backup and restore, and troubleshoot their application instances.

![Admin Console Dashboard](/images/guides/kots/application.png)

### kots CLI

The kots command-line interface (CLI) is a kubectl plugin. Users can run commands with the kots CLI to install and manage their application instances with KOTS programmatically. For more information, see [Installing the kots CLI](/reference/kots-cli-getting-started).

## kURL

Replicated kURL allows software vendors to create custom Kubernetes distributions to share with their users for installation in online or air gapped environments. kURL has a built-in integration with KOTS through its KOTS add-on. With this integration, users can run a kURL installation script in their virtual machine (VM) or bare metal server, which creates a cluster and then automatically installs KOTS in the cluster. Clusters created by kURL are called _embedded clusters_.

For information about how to install applications in embedded clusters, see [Installing with kURL](/enterprise/installing-embedded-cluster). For information about how to create a specification for kURL, see [Creating a Kubernetes Installer](/vendor/packaging-embedded-kubernetes).

kURL is an open source project that is maintained by Replicated. For more information, see the [kURL repository](https://github.com/replicatedhq/kURL) in GitHub and the [kURL documentation](https://kurl.sh).
