# What is Replicated?

Replicated is an enterprise software distribution platform that lets vendors package their application using Kubernetes manifests or Helm charts and securely distribute their application to diverse customer environments, including both on-premises and cloud environments.

To learn more about Replicated, see [Intro to Replicated: 20 Ways We Help](https://www.youtube.com/watch?v=2eOh7CofY3Q&t=779s) video.

## Replicated Components

Replicated includes components and features that make it easier for vendors to manage and deploy applications, and for enterprise users to install and manage their application instance.

![What is Replicated?](/images/what-is-replicated.png)

[View larger image](/images/what-is-replicated.png)

### Vendor Portal

The vendor portal is the graphical user interface that vendors can use to package and manage their applications. You define Kubernetes manifest files, including application and custom resource manifests. These files describe to the app manager how to package the application for distribution. Alternatively, you can use Helm charts. Vendors can also manage other artifacts, such as customer license files, image registries, and release channels.

![Create an Application in the Vendor Portal](/images/guides/kots/create-application.png)

### replicated CLI

Vendors can use the replicated command-line interface (CLI) to interact with the vendor portal. The replicated CLI can be used to complete tasks programmatically. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

### Vendor API v3

Vendors can use the Vendor API to interacting with the vendor portal. This API can be used to complete tasks programmatically. For more information, see [Using the Vendor API V3](/reference/vendor-api-using).

### App Manager

The Replicated app manager is the underlying technology that installs and manages applications on a Kubernetes cluster. The app manager reads the Kubernetes manifest files that you define to package and install an application in a customer environment. It also installs the Replicated admin console and provides preflight and support bundle functionality from the Troubleshoot open source project.

The app manager deploys applications securely to the following Kubernetes cluster environments:

- Existing clusters
- Replicated Kubernetes installer provisioned clusters on virtual machines (VMs)
- Air gapped on existing clusters or VM clusters
- High availability clusters

The Replicated app manager is based on the open source KOTS project, which is maintained by Replicated.

### Kubernetes Installer

The Replicated Kubernetes installer provisions a cluster on a customer's virtual machine. This is known as a Kubernetes installer cluster or embedded cluster, and it allows customers to install an application without an existing Kubernetes cluster. The Kubernetes installer is based on the open source kURL project, which is maintained by Replicated.

For more information about configuring a Kubernetes installer cluster, see [Creating a Kubernetes Installer](/vendor/packaging-embedded-kubernetes). For more information about how enterprise users install with the Kubernetes installer, see [Installing with the Kubernetes Installer](/enterprise/installing-embedded-cluster).

### Admin Console

The admin console is a graphical user interface that enterprise users can use to manage the application in their environment. Customers can configure, update, manage, backup and restore, and troubleshoot the application.

The admin console is installed with the application by the app manager.

![Admin Console Dashboard](/images/guides/kots/application.png)

### kots CLI

Enterprise users can install and use the kots command-line interface (CLI) to manage and troubleshoot the application programmatically. The kots CLI interacts with the app manager. For more information, see [Installing the kots CLI](/reference/kots-cli-getting-started).
