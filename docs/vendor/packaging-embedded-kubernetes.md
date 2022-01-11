# Creating a specification for embedded cluster installations

This topic describes creating a Kubernetes installer specification for your application
to support installations on embedded clusters.

## About installing an application on an embedded cluster

When you package your application with Replicated, your customers can install the
application either on an existing Kubernetes cluster or on an _embedded cluster_.

Embedded clusters are Kubernetes clusters that are provisioned by the Replicated
Kubernetes installer on your customer's VM.

The Kubernetes installer is based on the open-source kURL project, which is maintained
by Replicated. For more information, see [Introduction to kURL](https://kurl.sh/docs/introduction/)
in the kURL open-source documentation.

## Create a Kubernetes installer specification

To allow your customers to use the Kubernetes installer to provision an embedded
cluster, you must create a Kubernetes installer specification file that is associated
with your application.

To create a Kubernetes installer specification:

1. In the vendor portal, select your application and click **Kubernetes Installer**.
1. On the **Kubernetes Installer** page, click **Create kubernetes installer**.
1. Edit the file and click **Save installer**. For information about editing a
Kubernetes installer specification file, see [Create An Installer](https://kurl.sh/docs/create-installer/)
in the kURL open-source documentation.
