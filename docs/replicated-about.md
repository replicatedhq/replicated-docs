# About Replicated

This topic provides an overview of the Replicated product, as well as information
about the key Replicated features.

## What is Replicated?

Replicated allows software vendors to securely distribute their application to
diverse customer environments, including both on-premises and cloud environments.

Replicated packages the vendor's application using a set of Kubernetes manifests
and installs the application onto a Kubernetes cluster in the customer's environment.
For customers who do not have an existing Kubernetes cluster, Replicated
provisions a new cluster on the customer's VM where it can then install the application.

Replicated includes several features that make it easier for vendors to manage their
applications, release channels, customer licenses, image
registries, and more. Replicated features also make it easier for the enterprise
users of the application to install, update, and manage their application instance.

## Replicated features

The Replicated product includes the following main features:

* **The vendor portal**: The vendor portal is the user interface where vendors
define Kubernetes manifest files, including application manifests and custom resource
manifests, for their application. These files describe to the app manager how to
package the application for distribution. Vendors can also use the vendor portal
to manage other artifacts, such as customer license files, image registries, and
release channels.
* **The app manager**: The app manager reads the Kubernetes manifest files that
the vendor defines to package and install an application on a Kubernetes cluster
in a customer environment. It also installs the admin console along with the application.
The app manager is based on the open-source KOTS project, which is maintained by
Replicated. For more information, see [Understanding packaging with app manager](vendor/packaging-an-app).
* **The Kubernetes installer**: The Kubernetes installer provisions a Kubernetes
cluster, called an _embedded cluster_, in the customer's environment if they do
not have an existing cluster. The Kubernetes installer is based on the open-source
kURL project, which is maintained by Replicated. For more information, see
[Introduction to kURL](https://kurl.sh/docs/introduction/) in the kURL documentation.
* **The admin console**: The admin console is the user interface where enterprise
application users can configure, update, manage, backup and restore, and troubleshoot
the application that they installed. The admin console is deployed by the app manager
when the customer installs the application.

Replicated also includes a Vendor API and CLIs that allow both vendors and enterprise
users to complete tasks programmatically.
For more information, see the _Reference_ section in the _Vendor_ documentation.
