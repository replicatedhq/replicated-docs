# What is Replicated?

The Replicated platform lets you install, manage, support, and get insights on your applications in customer environments. With Replicated, you package and update your application using Kubernetes manifests or Helm charts, then securely distribute to any on-premises or cloud-hosted environments, including air gap.

For information about the Replicated features and components, see [Replicated Components](#replicated-components) below.

For an overview of the key use cases for software vendors that Replicated serves, see the [Intro to Replicated: 20 Ways We Help](https://www.youtube.com/watch?v=2eOh7CofY3Q) video.

## Replicated Components

Replicated includes components and features that make it easier for you to manage and deploy applications, and for enterprise users to install and manage their instance of your application.

The following diagram shows the Replicated components as they relate to you as a vendor packaging your application, and the deployment to an existing cluster and a cluster provisioned by the Replicated Kubernetes installer on a VM.

![What is Replicated?](/images/replicated-components-diagram.png)

[View larger image](/images/replicated-components-diagram.png)

## Vendor Portal

The Replicated vendor portal is the web-based user interface that you can use to package and manage applications.

![Create an Application in the vendor portal](/images/guides/kots/create-application.png)

You define Kubernetes manifest files, including application and Replicated custom resource manifests, using the built-in YAML editor and linter (in the Help pane). These files describe how to distribute the application. Alternatively, you can use Helm charts.

![YAML editor in the vendor portal](/images/yaml-editor.png)

You can also manage other artifacts, such as customer license files, image registries, and release channels.

![Channels](/images/channels.png)

### replicated CLI

The replicated command-line interface (CLI) is the CLI for the vendor portal. The replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

### Vendor API v3

The Vendor API is the API for the vendor portal. This API can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Using the Vendor API V3](/reference/vendor-api-using).

## KOTS

Replicated KOTS installs and manages applications in a Kubernetes cluster. You can use KOTS to deploy Kubernetes applications or Helm charts securely to the following Kubernetes cluster environments:

- Existing clusters
- Embedded clusters created by Replicated kURL. See [kURL](#kurl) below.
- Air gapped clusters

KOTS is an open source project that is maintained by Replicated. For more information, see the [kots](https://github.com/replicatedhq/kots) repository in GitHub.

### Admin Console

The Replicated admin console is a graphical user interface (GUI) for interacting with KOTS. The admin console includes built-in functionality that allows users to install, manage, update, configure, monitor, backup and restore, and troubleshoot their application instances.

![Admin Console Dashboard](/images/guides/kots/application.png)

### kots CLI

The kots command-line interface (CLI) is a kubectl plugin. Users can run commands with the kots CLI to install and manage their application instances with KOTS programmatically. For more information, see [Installing the kots CLI](/reference/kots-cli-getting-started).

## kURL

Replicated kURL allows software vendors to create a custom Kubernetes distributions to share with their users for installation in online or air gapped environments. kURL has a built-in integration with KOTS through its KOTS add-on. With this integration, users can run a kURL installation script in their virtual machine (VM) or bare metal server that creates a cluster and then automatically installs KOTS in the cluster. Clusters created by kURL are called _embedded clusters_.

For information about how to install applications in embedded clusters, see [Installing with kURL](/enterprise/installing-embedded-cluster). For information about how to create a specification for kURL, see [Creating a Kubernetes Installer](/vendor/packaging-embedded-kubernetes).

kURL is an open source project that is maintained by Replicated. For more information, see the [kURL repository](https://github.com/replicatedhq/kURL) in GitHub and the [kURL documentation](https://kurl.sh).
