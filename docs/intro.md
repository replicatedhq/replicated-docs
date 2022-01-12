# Welcome to Replicated Documentation

This topic provides an introduction to Replicated as well as information about
how to navigate the Replicated product documentation.

## What is Replicated?

With Replicated, software vendors can deliver their applications into complex, diverse customer environments with speed, security, and ease; for customers running Kubernetes or not, on-prem, or in the cloud.



## Replicated features

The Replicated product includes the following main features:

* **The vendor portal**: The vendor portal is the user interface where vendors
define Kubernetes manifest files, including application manifests and custom resource
manifests, for their application. These files describe to the app manager how to
package the application for distribution. Vendors can also use the vendor portal
to create and manage other application artifacts, such as customer license files,
external image registries, and release channels.
* **The app manager**: The app manager reads the Kubernetes manifest files that
the vendor defines in the vendor portal to package and install an application on
a Kubernetes cluster in a customer environment. It also installs the admin console
along with the application. The app manager is based on the open-source KOTS project,
which is maintained by Replicated.
* **The Kubernetes installer**: The Kubernetes installer provisions a Kubernetes cluster, called an _embedded cluster_, for application enterprise users who do not have an existing cluster. The Kubernetes installer is based on the open-source
kURL project, which is maintained by Replicated.
* **The admin console**: The admin console is the user interface where Enterprise
application users can configure, update, manage, backup and restore, and troubleshoot
the application that they installed.

Replicated also includes a Vendor API and multiple CLIs to allow vendors and enterprise
users to programmatically manage their applications, releases, deployments, and more.
For more information, see the _Reference_ section in the _Vendor_ documentation.

## About the Replicated documentation

The Replicated product documentation is divided into the following main sections:

 * **Vendor**: The Vendor section includes information for software providers, or
 _vendors_. The topics in this section guide vendors through packaging,
 distributing, and managing their application with Replicated.
 * **Enterprise**: The Enterprise section includes information for the _enterprise users_
 of vendor applications. The topics in this section describe how enterprise
 users can install, update, manage, and monitor applications that are distributed
 with Replicated.
