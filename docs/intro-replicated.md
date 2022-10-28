# What is Replicated?

Replicated is an enterprise software distribution platform that lets vendors package their application using Kubernetes manifests or Helm charts and securely distribute their application to diverse customer environments, including both on-premises and cloud environments.

To learn more about Replicated, see [Intro to Replicated: 20 Ways We Help](https://www.youtube.com/watch?v=2eOh7CofY3Q&t=779s) video.

## Replicated Components

Replicated includes several components that make it easier for vendors to manage their
applications, release channels, customer licenses, image
registries, and more. Replicated components and features also make it easier for the enterprise
users of the application to install, update, and manage their application instance.

![What is Replicated?](/images/what-is-replicated.png)

[View larger image](/images/what-is-replicated.png)

### Vendor User Interfaces

Vendors can use the following user interface options to package and manage their applications:

<table>
  <tr>
    <th width="30%">User Interface</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td>Vendor Portal</td>
    <td>The graphical user interface where vendors
    define Kubernetes manifest files or Helm charts, including application and custom resource
    manifests. These files describe to the app manager how to
    package the application for distribution. <br></br><br></br>Vendors can also use the vendor portal
    to manage other artifacts, such as customer license files, image registries, and
    release channels.</td>
  </tr>
  <tr>
    <td>replicated CLI</td>
    <td>The CLI for the vendor portal. This CLI can be used to complete tasks programmatically, such as manage applications, releases, customers, licenses, and everything related to an application managed by the app manager. See <a href="reference/replicated-cli-installing">Installing the replicated CLI</a>.</td>
  </tr>
  <tr>
    <td>Vendor API v3</td>
    <td>The API for the vendor portal. This API can be used to complete tasks programmatically, such as manage applications, releases, customers, licenses, and everything related to an application managed by the app manager. See <a href="reference/vendor-api-using">Using the Vendor API V3</a>.</td>
  </tr>
</table>

### App Manager

The Replicated app manager is the underlying technology that installs and manages applications on a Kubernetes cluster. The app manager reads the Kubernetes manifest files that you define to package and install an application in a customer environment. It also installs the Replicated admin console and provides preflight and support bundle functionality from the Troubleshoot open source project.

The app manager deploys applications securely to the following Kubernetes cluster environments:

- Existing clusters
- Virtual machines, using the Replicated Kubernetes installer
- Air gapped existing or virtual machine clusters

High availability clusters are supported.

The Replicated app manager is based on the open source KOTS project, which is maintained by Replicated.


### Customer User Interfaces

Enterprise customers can use the following user interface options to manage the application in their environment:

<table>
  <tr>
    <th width="30%">User Interface</th>
    <th width="70%">Description</th>
  </tr>
  <tr>
    <td>Admin Console</td>
    <td>The graphical user interface where customers can configure, update, manage, backup and restore, and troubleshoot
    the application. <br></br><br></br>The admin console is deployed by the app manager
    when customers install the application.</td>
  </tr>
  <tr>
    <td>kots CLI</td>
    <td>The kots CLI lets customers interact with the app manager on the command line to manage and troubleshoot the application programmatically. See <a href="reference/kots-cli-getting-started">Installing the kots CLI</a>.</td>
  </tr>
</table>
