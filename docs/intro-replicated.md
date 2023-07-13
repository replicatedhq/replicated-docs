# About KOTS and kURL

This topic describes the Replicated KOTS and Replicated kURL installers, and the Replicated admin console for packaging, deploying, and managing applications in a Kubernetes cluster.

## Overview

KOTS lets you package and update applications using Helm charts, Kubernetes manifests, or Kubernetes Operators. Applications are then securely deployed in customer environments using the KOTS installer. 

For customers that do not have an existing cluster, you can include a kURL installer to provision an embedded cluster, and then KOTS installs the application.

KOTS and kURL support installing in air gapped environments.

KOTS installs the admin console and the kots CLI on a cluster that lets customers manage the application, in addition to helping deploy the application and upgrades.

## Architecture

The following architecture diagram shows the components as they relate to you as a vendor packaging your application with KOTS using either the vendor portal, replicated CLI, or Vendor API. The application can be packaged using either Helm charts, Kubernetes manifests, or Kubernetes operators.

 Then the application, admin console, and kots CLI are installed in an existing cluster and on a cluster provisioned by kURL.

![KOTS and kURL deployments](/images/replicated-components-diagram.png)

[View larger image](/images/replicated-components-diagram.png)

For more information, see:

- [KOTS](#kots)
- [Admin Console](#admin-console)
- [kots CLI](#kots-cli)
- [kURL](#kurl)

## KOTS

KOTS installs the admin console and the kots CLI on a cluster, and deploys the application files using either the admin console or kots CLI. The admin console and kots CLI also let customers manage the application.

### Admin Console

KOTS installs the admin console. The admin console is a customer-facing user interface includes built-in functionality that allows users to install, manage, update, configure, monitor, backup and restore, and troubleshoot their application instances. The admin console communicates securely with KOTS to synchronize licenses, check for upgrades, and so on. 

As a vendor, you can customize the admin console. For example, you can customize the Config screen to allow customers to specify inputs related to unique options that your application provides. You can also include your own branding on the admin console, configure status informers, and add custom graphs.

![Admin Console Dashboard](/images/guides/kots/application.png)

### kots CLI

The kots command-line interface (CLI) is a kubectl plugin. Customers can run commands with the kots CLI to install and manage their application instances with KOTS programmatically. For more information, see [Installing the kots CLI](/reference/kots-cli-getting-started).

## kURL

Replicated kURL allows software vendors to create custom Kubernetes distributions to share with their users for installation in online or air gapped environments. kURL has a built-in integration with KOTS through its KOTS add-on. With this integration, users can run a kURL installation script in their virtual machine (VM) or bare metal server, which creates a cluster and then automatically installs KOTS in the cluster. Clusters created by kURL are called _embedded clusters_.

For information about how to install applications in embedded clusters, see [Installing with kURL](/enterprise/installing-embedded-cluster). For information about how to create a specification for kURL, see [Creating a Kubernetes Installer](/vendor/packaging-embedded-kubernetes).

kURL is an open source project that is maintained by Replicated. For more information, see the [kURL repository](https://github.com/replicatedhq/kURL) in GitHub and the [kURL documentation](https://kurl.sh).
