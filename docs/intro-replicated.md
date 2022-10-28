# What is Replicated?

Replicated is an enterprise software distribution platform that lets vendors package their application using Kubernetes manifests or Helm charts and securely distribute their application to diverse customer environments, including both on-premises and cloud environments.

To learn more about Replicated, see [Intro to Replicated: 20 Ways We Help](https://www.youtube.com/watch?v=2eOh7CofY3Q&t=779s) video.

## Replicated Components

Replicated includes components and features that make it easier for vendors to manage and deploy applications, and for enterprise users to install and manage their application instance.

![What is Replicated?](/images/what-is-replicated.png)

[View larger image](/images/what-is-replicated.png)

### Vendor User Interfaces

Vendors can use any of the following user interfaces to package and manage their applications. You define Kubernetes manifest files, including application and custom resource manifests. These files describe to the app manager how to package the application for distribution. Alternatively, you can use Helm charts. Vendors can also manage other artifacts, such as customer license files, image registries, and release channels.

<table>
  <tr>
    <th width="30%">User Interface</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td>Vendor Portal</td>
    <td>The graphical user interface for packaging and distributing an application with Replicated.</td>
  </tr>
  <tr>
    <td>replicated CLI</td>
    <td>The command-line interface (CLI) for interacting with the vendor portal. This CLI can be used to complete tasks programmatically. See <a href="reference/replicated-cli-installing">Installing the replicated CLI</a>.</td>
  </tr>
  <tr>
    <td>Vendor API v3</td>
    <td>The API for interacting with the vendor portal. This API can be used to complete tasks programmatically. See <a href="reference/vendor-api-using">Using the Vendor API V3</a>.</td>
  </tr>
</table>

### App Manager

The Replicated app manager is the underlying technology that installs and manages applications on a Kubernetes cluster. The app manager reads the Kubernetes manifest files that you define to package and install an application in a customer environment. It also installs the Replicated admin console and provides preflight and support bundle functionality from the Troubleshoot open source project.

The app manager deploys applications securely to the following Kubernetes cluster environments:

- Existing clusters
- Virtual machines, using the Replicated Kubernetes installer
- Air gapped existing or virtual machine clusters
- High availability clusters

The Replicated app manager is based on the open source KOTS project, which is maintained by Replicated.


### Customer User Interfaces

Enterprise customers can use either of the following user interfaces to manage the application in their environment. Customers can configure, update, manage, backup and restore, and troubleshoot
the application.

<table>
  <tr>
    <th width="30%">User Interface</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td>Admin Console</td>
    <td>The graphical user interface for interacting with the app manager. The admin console is installed by the app manager when customers install the application.</td>
  </tr>
  <tr>
    <td>kots CLI</td>
    <td>The command-line interface (CLI) for interacting with the app manager to manage and troubleshoot the application programmatically. See <a href="reference/kots-cli-getting-started">Installing the kots CLI</a>.</td>
  </tr>
</table>
