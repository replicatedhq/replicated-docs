# Introduction to kURL

This topic provides an introduction to the Replicated kURL installer, including information about kURL specifications and installations.

:::note
The Replicated KOTS entitlement is required to install applications with KOTS and kURL. For more information, see [Pricing](https://www.replicated.com/pricing) on the Replicated website.
:::

:::note
Replicated kURL is available only for existing customers. If you are not an existing kURL user, use Replicated Embedded Cluster instead. For more information, see [Use Embedded Cluster](/vendor/embedded-overview).

kURL is a Generally Available (GA) product for existing customers. For more information about the Replicated product lifecycle phases, see [Support Lifecycle Policy](/vendor/policies-support-lifecycle).
:::

## Overview

kURL is an open source project maintained by Replicated that software vendors can use to create custom Kubernetes distributions that are embedded with their application. Enterprise customers can then run a kURL installation script on their virtual machine (VM) or bare metal server to provision a cluster and install the application. This allows software vendors to distribute Kubernetes applications to customers that do not have access to a cluster in their environment.

For more information about the kURL open source project, see the [kURL website](https://kurl.sh).

### kURL Installers

To provision a cluster on a VM or bare metal server, kURL uses a spec that is defined in a manifest file with `apiVersion: cluster.kurl.sh/v1beta1` and `kind: Installer`. This spec (called a _kURL installer_) lists the kURL add-ons that will be included in the cluster. kURL provides add-ons for networking, storage, ingress, and more. kURL also provides a KOTS add-on, which installs KOTS in the cluster and deploys the KOTS Admin Console. You can customize the kURL installer according to your application requirements.

To distribute a kURL installer alongside your application, you can promote the installer to a channel or include the installer as a manifest file within a given release. For more information about creating kURL installers, see [Create a kURL Installer](/vendor/packaging-embedded-kubernetes).

### kURL Installations

To install with kURL, users run a kURL installation script on their VM or bare metal server to provision a cluster.

When the KOTS add-on is included in the kURL installer spec, the kURL installation script installs the KOTS CLI and KOTS Admin Console in the cluster. After the installation script completes, users can access the Admin Console at the URL provided in the ouput of the command to configure and deploy the application with KOTS.

The following shows an example of the output of the kURL installation script:

```bash
        Installation
          Complete ✔

Kotsadm: http://10.128.0.35:8800
Login with password (will not be shown again): 3Hy8WYYid

This password has been set for you by default. It is recommended that you change
this password; this can be done with the following command:
kubectl kots reset-password default
```

kURL installations are supported in online (internet-connected) and air gapped environments.

For information about how to install applications with kURL, see [Online Installation with kURL](/enterprise/installing-kurl).

## About the Open Source kURL Documentation

The open source documentation for the kURL project is available at [kurl.sh](https://kurl.sh/docs/introduction/).

The open source kURL documentation contains additional information including kURL installation options, kURL add-ons, and procedural content such as how to add and manage nodes in kURL clusters. Software vendors can use the open source kURL documentation to find detailed reference information when creating kURL installer specs or testing installation.