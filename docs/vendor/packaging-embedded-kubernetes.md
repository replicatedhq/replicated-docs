# Creating a Kubernetes specification for embedded cluster installations

This topic describes creating a Kubernetes installer specification for your application
to support installations on embedded clusters.

## About installing an application on an embedded cluster

When you package your application with Replicated, your customers can install the
application on either an existing Kubernetes cluster or an _embedded cluster_.

Embedded clusters are Kubernetes clusters that are provisioned by the Replicated
Kubernetes installer on your customer's VM. The Kubernetes installer allows customers
who do not have an existing cluster to install your application without manually
provisioning a new cluster themselves.

The Kubernetes installer is based on the open source kURL project, which is maintained
by Replicated. For more information, see [Introduction to kURL](https://kurl.sh/docs/introduction/)
in the kURL open source documentation.

## Create a Kubernetes installer specification

To allow your customers to use the Kubernetes installer to provision an embedded
cluster, you must create a Kubernetes installer specification file that is associated
with your application.

To create a Kubernetes installer specification:

1. In the vendor portal, select your application and click **Kubernetes Installer**.
1. On the **Kubernetes Installer** page, click **Create kubernetes installer**.
1. Edit the file and click **Save installer**. For information about editing a
Kubernetes installer specification file, see [Create An Installer](https://kurl.sh/docs/create-installer/)
in the kURL open source documentation.

   **Tip**: Replicated recommends that you pin specific versions of Kubernetes and Kubernetes add-ons in the Kubernetes installer specification. This ensures easily-reproducible versions across your customer installations. For example, pin `Kubernetes 1.23.x` in your specification to ensure that v1.23 of Kubernetes is installed along with the latest security and bug patch release for that version.
