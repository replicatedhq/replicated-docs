# What is Replicated?

Replicated is an enterprise software distribution platform that lets you package and update your application using Kubernetes manifests or Helm charts, and securely distribute your application to diverse customer environments. This includes on-premises, including air gapped environments, and cloud environments. For customers who do not have an existing Kubernetes cluster, Replicated provisions a new cluster on the customer's VM where it can then install the application

As a vendor, you can customize your deployment with features such as preflight checks, support bundles, status informers, versions, role-based access control (RBAC), and other custom resources. Replicated supports various image registry options. You can customize the user-facing configuration screen and brand the admin console. Team management options include (RBAC), multi-factor authentication, enable auto-join, and use Google or SAML authentication.

End customers can manage, update, configure, monitor, backup and restore, and troubleshoot their application instance using either the Replicated admin console or the kots CLI.

To learn more about Replicated, see [Intro to Replicated: 20 Ways We Help](https://www.youtube.com/watch?v=2eOh7CofY3Q&t=779s) video.

## Replicated Components

Replicated includes components and features that make it easier for you to manage and deploy applications, and for enterprise users to install and manage their application instance.

![What is Replicated?](/images/what-is-replicated.png)

[View larger image](/images/what-is-replicated.png)

### Vendor Portal

The vendor portal is the web browser that you can use to package and manage applications. You define Kubernetes manifest files, including application and custom resource manifests. These files describe to the app manager how to package the application for distribution. Alternatively, you can use Helm charts. You can also manage other artifacts, such as customer license files, image registries, and release channels.

![Create an Application in the Vendor Portal](/images/guides/kots/create-application.png)

### replicated CLI

The replicated command-line interface (CLI) is the CLI for the vendor portal. The replicated CLI can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Installing the replicated CLI](/reference/replicated-cli-installing).

### Vendor API v3

The Vendor API is the API for the vendor portal. This API can be used to complete tasks programmatically, including all tasks for packaging and managing applications, and managing artifacts such as teams, license files, and so on. For more information, see [Using the Vendor API V3](/reference/vendor-api-using).

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

The admin console is a graphical user interface that interacts with the app manager. Enterprise customers can use the admin console to configure, update, manage, backup and restore, and troubleshoot the application.

The admin console is installed with the application by the app manager.

![Admin Console Dashboard](/images/guides/kots/application.png)

### kots CLI

Enterprise customers can install and use the kots command-line interface (CLI) to manage and troubleshoot the application programmatically. The kots CLI interacts with the app manager and provides an alternative to using the admin console. For more information, see [Installing the kots CLI](/reference/kots-cli-getting-started).
