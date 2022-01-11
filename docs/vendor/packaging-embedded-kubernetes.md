# Creating an installer for embedded cluster installations

This topic describes creating a Kubernetes installer for your application to support installations on embedded clusters.

## About installing an application on an embedded cluster

When you package your application with Replicated, your customers can install the application in one of two ways:

* **On an existing Kubernetes cluster**: Customers who already have a Kubernetes cluster can install your application on their existing cluster.
* **On a new cluster with the Kubernetes installer**: Customers who do not have an existing cluster can use the Replicated Kubernetes installer to provision a new cluster where they will install your application. Clusters provisioned by the Kubernetes installer are called _embedded clusters_.

The Kubernetes installer is based on the open-source kURL project, which is maintained by Replicated. For more information, see [Introduction to kURL](https://kurl.sh/docs/introduction/) in the kURL documentation.

## Create a Kubernetes installer

To allow your customers to use the Kubernetes installer to install on an embedded cluster, you must create a Kubernetes installer specification file that is associated with your application. This specification file is called a Kubernetes installer.

To create a Kubernetes installer:

1. In the vendor portal, select your application and click **Kubernetes Installer**.
1. On the **Kubernetes Installer** page, click **Create kubernetes installer**.
1. Edit the specification file and click **Save installer**. For information about editing a Kubernetes installer specification file, see [Create An Installer](https://kurl.sh/docs/create-installer/) in the kURL documentation.
