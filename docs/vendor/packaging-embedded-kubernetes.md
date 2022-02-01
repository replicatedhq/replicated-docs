# Creating a Kubernetes installer specification

This topic describes creating a specification file for your application to support
installations on clusters created by the Replicated Kubernetes installer.

## About installing an application without an existing cluster

When you package and release your application with Replicated, your customers can
install the application on either an existing Kubernetes cluster or a cluster created
by the Kubernetes installer.

The Kubernetes installer is a feature of the Replicated product that provisions
a new cluster on your customer's VM. This allows customers who do not have an
existing cluster to install your application without manually provisioning a new
cluster themselves.

The Kubernetes installer is based on the open source kURL project, which is maintained
by Replicated. For more information, see [Introduction to kURL](https://kurl.sh/docs/introduction/)
in the kURL open source documentation.

## Create a Kubernetes installer specification

To allow your customers to use the Kubernetes installer to provision a cluster,
you must create a Kubernetes installer specification file that is associated
with your application.

To create a Kubernetes installer specification:

1. In the Replicated [vendor portal](https://vendor.replicated.com), select your application and click **Kubernetes Installer**.
1. On the **Kubernetes Installer** page, click **Create kubernetes installer**.
1. Edit the file and click **Save installer**. For information about editing a
Kubernetes installer specification file, see [Create An Installer](https://kurl.sh/docs/create-installer/)
in the kURL open source documentation.

   **Note**: Replicated recommends that you pin specific versions of Kubernetes
   and Kubernetes add-ons in the Kubernetes installer specification. This ensures
   easily-reproducible versions across your customer installations. For example,
   pin `Kubernetes 1.23.x` in your specification to ensure that v1.23 of Kubernetes
   is installed along with the latest security and bug patch release for that version.
