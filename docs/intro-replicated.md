# What is Replicated?

Replicated allows software vendors to package and securely distribute their application to
diverse customer environments, including both on-premises and cloud environments.

Replicated packages the vendor's application using a set of Kubernetes manifests
and installs the application onto a Kubernetes cluster in the customer's environment.
For customers who do not have an existing Kubernetes cluster, Replicated
provisions a new cluster on the customer's VM where it can then install the application.

Replicated includes several features that make it easier for vendors to manage their
applications, release channels, customer licenses, image
registries, and more. Replicated features also make it easier for the enterprise
users of the application to install, update, and manage their application instance.

## Replicated Features

The Replicated product includes the following main features:

* **Vendor portal**: The Replicated vendor portal is the user interface where vendors
define Kubernetes manifest files, including application manifests and custom resource
manifests, for their application. These files describe to the app manager how to
package the application for distribution. Vendors can also use the vendor portal
to manage other artifacts, such as customer license files, image registries, and
release channels.
For more information about getting started with the vendor portal, see
[Creating a Vendor Account](vendor/vendor-portal-creating-account).
* **App manager**: The Replicated app manager is based on the open source KOTS project,
which is maintained by Replicated. The app manager reads the Kubernetes manifest files that
the vendor defines to package and install an application on a Kubernetes cluster
in a customer environment. It installs the admin console along with the application.

   The app manager also uses functionality from the Troubleshoot open source project,
   which is maintained by Replicated. For example, the app manager runs preflight
   checks before the customer deploys the application to ensure that the customer
   environment meets any application requirements.
   For more information about using the features from the Troubleshoot project
   in your application, see [Configuring Preflight Checks and Support Bundles](/vendor/preflight-support-bundle-creating).
* **Admin console**: The Replicated admin console is the user interface where enterprise
application users can configure, update, manage, backup and restore, and troubleshoot
the application that they installed. The admin console is deployed by the app manager
when the customer installs the application.
* **Kubernetes installer**: The Replicated Kubernetes installer is based on the open source
kURL project, which is maintained by Replicated. The Kubernetes installer provisions a Kubernetes
cluster, called an _embedded cluster_, in the customer's environment if they do
not have an existing cluster.

  For more information about configuring a Kubernetes
  installer cluster, see [Creating a Kubernetes Installer](/vendor/packaging-embedded-kubernetes).
  For more information about how enterprise users install with the Kubernetes installer,
  see [Installing with the Kubernetes Installer](/enterprise/installing-embedded-cluster).

## Replicated APIs and CLIs

Replicated includes a Vendor API and CLIs that allow both vendors and enterprise
users to complete tasks programmatically:

* **Vendor API v3**: The API for the vendor portal. See [Using the Vendor API v3](reference/vendor-api-using).
* **replicated CLI**: The CLI for the vendor portal. See [Installing the replicated CLI](reference/replicated-cli-installing).
* **kots CLI**: The CLI for the KOTS open source project. The kots CLI allows users to interact with the app manager on the command line, rather than through the admin console. See [Installing the kots CLI](reference/kots-cli-getting-started).
