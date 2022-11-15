# What is Replicated?

Replicated is an enterprise software distribution platform that lets you package and update your application using Kubernetes manifests or Helm charts, and securely distribute your application to Kubernetes clusters in diverse customer environments.

Environments include on-premises (including air gapped) and cloud hosted Kubernetes clusters. For customers who do not have an existing Kubernetes cluster, Replicated provisions a new cluster on a customer's virtual machine (VM), where the application is then installed.

To learn more about Replicated, see [Intro to Replicated: 20 Ways We Help](https://www.youtube.com/watch?v=2eOh7CofY3Q&t=779s) video.

## Replicated Components

Replicated includes components and features that make it easier for you to manage and deploy applications, and for enterprise users to install and manage their application instance.

The following diagram shows the Replicated components as they relate to you as a vendor packaging your application and the deployment to on-premise and cloud-based Kubernetes clusters. 

![What is Replicated?](/images/what-is-replicated.png)

[View larger image](/images/what-is-replicated.png)

### Vendor Portal

The Replicated vendor portal is the web-based user interface that you can use to package and manage applications.

![Create an Application in the vendor portal](/images/guides/kots/create-application.png)

You define Kubernetes manifest files, including application and custom resource manifests, using the built-in YAML editor and KOTS lint service. These files describe how to distribute the application. Alternatively, you can use Helm charts.

![YAML editor in the vendor portal](/images/yaml-editor.png)

You can also manage other artifacts, such as customer license files, image registries, and release channels.

![Channels](/images/channels.png)

### replicated CLI

The replicated command-line interface (CLI) is the CLI for the vendor portal. The replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

### Vendor API v3

The Vendor API is the API for the vendor portal. This API can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Using the Vendor API V3](/reference/vendor-api-using).

### App Manager

The Replicated app manager is the underlying technology that installs and manages applications on a Kubernetes cluster. It also installs the Replicated admin console and provides preflight and support bundle functionality from the Troubleshoot open source project. For more information about preflight checks and support bundles, see [Configuring Preflight Checks and Support Bundles](preflight-support-bundle-creating) in the Replicated documentation and the [Troubleshoot repository](https://github.com/replicatedhq/troubleshoot) in GitHub.

The app manager deploys applications securely to the following Kubernetes cluster environments:

- Existing clusters
- Replicated Kubernetes installer provisioned clusters on virtual machines (VMs)
- Air gapped on existing clusters or VM clusters
- High availability clusters

The Replicated app manager is based on the open source KOTS project, which is maintained by Replicated.

### Kubernetes Installer

The Replicated Kubernetes installer provisions a cluster on a customer's virtual machine. This is known as a Kubernetes installer cluster or embedded cluster, and it allows customers to install an application without an existing Kubernetes cluster. For more information about configuring a Kubernetes installer cluster, see [Creating a Kubernetes Installer](/vendor/packaging-embedded-kubernetes). For more information about how enterprise users install with the Kubernetes installer, see [Installing with the Kubernetes Installer](/enterprise/installing-embedded-cluster).

The Kubernetes installer is based on the kURL open source project, which is maintained by Replicated. For more information, see the [kURL repository](https://github.com/replicatedhq/kURL) in GitHub.

### Admin Console

The Replicated admin console is a graphical user interface that interacts with the app manager. Enterprise customers can use the admin console to manage, update, configure, monitor, backup and restore, and troubleshoot their application instance.

The admin console is installed by the app manager.

![Admin Console Dashboard](/images/guides/kots/application.png)

### kots CLI

Enterprise customers can install and use the kots command-line interface (CLI) to manage and update the application programmatically. The kots CLI interacts with the app manager and provides an alternative to using the admin console. For more information, see [Installing the kots CLI](/reference/kots-cli-getting-started).
